import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Download, Eye, Search, Share2 } from 'lucide-react';

import { TEMPLATE_OPTIONS, TEMPLATE_REGISTRY } from '@/components/templates/template-registry';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NAV_PATH } from '@/router/router.constant';
import { cvService } from '@/services/cv.service';
import { userService } from '@/services/user.service';
import type { CV } from '@/services/types';
import { formatDateForAPI, formatDateForInput } from '@/utils/date';
import {
  CertificationSection,
  EducationSection,
  ExperienceSection,
  FormLabel,
  LanguageSection,
  PersonalInfoSection,
  ProjectSection,
  SkillSection,
  FormField,
} from './index'; // Import from local index
import { validationMessages } from './shared/validation-messages';
import { ScaledTemplatePreview } from './TemplateReview';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';

const defaultValues: Partial<CV> = {
  cvTitle: 'Untitled CV',
  templateId: 'modern-sidebar',
  status: 'draft',
  personalInfo: {
    fullName: '',
    email: '',
    socialLinks: [{ platform: '', url: '' }],
    imgUrl: '',
  },
  experiences: [],
  educations: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
};

// Expanded mock data for preview and manual filling
const mockData: Partial<CV> = {
  cvTitle: 'Senior Frontend Developer - Jane Doe',
  templateId: 'modern-sidebar',
  personalInfo: {
    fullName: 'Jane Doe',
    jobTitle: 'Senior Frontend Engineer',
    email: 'jane.doe@example.com',
    phone: '+84 901 234 567',
    address: 'District 1, Ho Chi Minh City, Vietnam',
    summary:
      'Passionate Frontend Engineer with 5+ years of experience building scalable web applications. Expert in React, TypeScript, and modern CSS frameworks. Proven track record of delivering high-performance UI/UX solutions.',
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/janedoe' },
      { platform: 'GitHub', url: 'https://github.com/janedoe' },
    ],
  },
  experiences: [
    {
      companyName: 'Tech Innovators Corp',
      position: 'Senior Frontend Developer',
      startDate: '2021-01-01T00:00:00.000Z',
      endDate: '2024-04-21T00:00:00.000Z',
      description:
        '• Lead the frontend team in migrating legacy apps to Next.js.\n• Optimized application performance by 40% through code splitting and lazy loading.\n• Mentored junior developers and established coding standards.',
    },
    {
      companyName: 'Digital Solutions Agency',
      position: 'Web Developer',
      startDate: '2018-06-01T00:00:00.000Z',
      endDate: '2020-12-01T00:00:00.000Z',
      description:
        '• Developed 20+ responsive websites for international clients.\n• Integrated REST APIs and managed complex app states with Redux.',
    },
  ],
  educations: [
    {
      schoolName: 'University of Technology',
      major: 'Bachelor of Software Engineering',
      startDate: '2014-09-01T00:00:00.000Z',
      endDate: '2018-06-01T00:00:00.000Z',
      description: 'Graduated with Distinction. GPA: 3.8/4.0',
    },
  ],
  skills: [
    { skillName: 'React / Next.js', level: 'Expert' },
    { skillName: 'TypeScript', level: 'Advanced' },
    { skillName: 'Tailwind CSS', level: 'Expert' },
    { skillName: 'Node.js', level: 'Intermediate' },
  ],
  projects: [
    {
      projectName: 'E-commerce Platform',
      description: 'A full-featured online store with payment integration and inventory management.',
      url: 'https://github.com/janedoe/shop',
      startDate: '2022-01-01T00:00:00.000Z',
      endDate: '2023-01-01T00:00:00.000Z',
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2022-05-01T00:00:00.000Z',
      url: '',
    },
  ],
  languages: [
    { languageName: 'English', level: 'Professional Working' },
    { languageName: 'Vietnamese', level: 'Native' },
  ],
};

interface CVEditorProps {
  id?: string;
}

export function CVEditor({ id }: CVEditorProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const templateFromQuery = searchParams.get('template');
  const cvRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([
    'personal-info',
    'experience',
    'education',
    'skills',
  ]);

  const { data: profileData } = useQuery({
    queryKey: ['userProfile'],
    queryFn: userService.getProfile,
    enabled: true,
    select: (res: any) => res?.user,
  });

  const methods = useForm<CV>({
    defaultValues: { ...defaultValues, templateId: templateFromQuery || defaultValues.templateId } as any,
    mode: 'onChange',
  });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  // Watch form values for live preview
  const formData = watch();

  // Load CV data if editing
  useEffect(() => {
    if (id) {
      cvService.getById(id).then((res) => {
        if (res.success && res.data) {
          const sanitized = {
            ...res.data,
            personalInfo: {
              ...res.data.personalInfo,
              fullName: res.data.personalInfo?.fullName || '',
              email: res.data.personalInfo?.email || '',
              phone: res.data.personalInfo?.phone === 'Not provided' ? '' : res.data.personalInfo?.phone || '',
              jobTitle: res.data.personalInfo?.jobTitle === 'Not provided' ? '' : res.data.personalInfo?.jobTitle || '',
              address: res.data.personalInfo?.address === 'Not provided' ? '' : res.data.personalInfo?.address || '',
              summary: res.data.personalInfo?.summary === 'Not provided' ? '' : res.data.personalInfo?.summary || '',
              imgUrl:
                res.data.personalInfo?.imgUrl && res.data.personalInfo?.imgUrl !== 'Not provided'
                  ? res.data.personalInfo.imgUrl
                  : (profileData?.avatarUrl && profileData?.avatarUrl !== 'Not provided'
                    ? profileData.avatarUrl
                    : (profileData?.imgUrl && profileData?.imgUrl !== 'Not provided' ? profileData.imgUrl : '')),
            },
          };
          reset(sanitized);
        }
      });
    } else if (profileData) {
      // Map profile data to CV format
      const mappedData: Partial<CV> = {
        ...defaultValues,
        templateId: templateFromQuery || defaultValues.templateId,
        personalInfo: {
          ...defaultValues.personalInfo,
          fullName: profileData.fullName || '',
          email: profileData.email || '',
          phone: profileData.phone !== 'Not provided' ? profileData.phone : '',
          jobTitle: profileData.jobTitle !== 'Not provided' ? profileData.jobTitle : '',
          address: profileData.address !== 'Not provided' ? profileData.address : '',
          summary: profileData.summary !== 'Not provided' ? profileData.summary : '',
          imgUrl: (profileData.avatarUrl && profileData.avatarUrl !== 'Not provided') 
            ? profileData.avatarUrl 
            : (profileData.imgUrl && profileData.imgUrl !== 'Not provided' ? profileData.imgUrl : ''),
          socialLinks: profileData.website
            ? [{ platform: 'Website', url: profileData.website }]
            : defaultValues.personalInfo?.socialLinks,
        },
        experiences:
          profileData.experiences?.map((exp: any) => ({
            companyName: exp.companyName || '',
            position: exp.position || '',
            startDate: formatDateForInput(exp.startDate),
            endDate: formatDateForInput(exp.endDate),
            description: exp.description || '',
          })) || [],
        educations:
          profileData.educations?.map((edu: any) => ({
            schoolName: edu.schoolName || '',
            major: edu.major || '',
            startDate: formatDateForInput(edu.startDate),
            endDate: formatDateForInput(edu.endDate),
            description: edu.description || '',
          })) || [],
      };
      reset(mappedData as any);
    } else {
      // Fallback if no profile data or while loading
      if (templateFromQuery) {
        setValue('templateId', templateFromQuery);
      } else {
        reset(defaultValues as any);
      }
    }
  }, [id, reset, templateFromQuery, setValue, profileData]);

  // Mutations
  const saveMutation = useMutation({
    mutationFn: (data: CV) => {
      const sanitizedData = {
        ...data,
        experiences: data.experiences?.map((exp) => ({
          ...exp,
          startDate: formatDateForAPI(exp.startDate),
          endDate: formatDateForAPI(exp.endDate),
        })),
        educations: data.educations?.map((edu) => ({
          ...edu,
          startDate: formatDateForAPI(edu.startDate),
          endDate: formatDateForAPI(edu.endDate),
        })),
        projects: data.projects?.map((proj) => ({
          ...proj,
          startDate: formatDateForAPI(proj.startDate),
          endDate: formatDateForAPI(proj.endDate),
        })),
        certifications: data.certifications?.map((cert) => ({
          ...cert,
          issueDate: formatDateForAPI(cert.issueDate),
        })),
      };

      if (id) {
        return cvService.update(id, { ...sanitizedData, status: 'completed' } as any);
      }
      return cvService.create(sanitizedData as any);
    },
    onSuccess: (res) => {
      if (res.success) {
        toast.success(id ? 'CV updated successfully!' : 'CV created successfully!');
        queryClient.invalidateQueries({ queryKey: ['cvs'] });
        navigate(NAV_PATH.APP.MY_CVS);
      } else {
        toast.error('Operation failed. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Error saving CV:', error);
      toast.error('Failed to save CV');
    },
  });

  const onSave = (data: CV) => {
    saveMutation.mutate(data);
  };

  const onInvalid = (formErrors: typeof errors) => {
    const firstErrorField = Object.keys(formErrors)[0];
    if (!firstErrorField) return;

    const sectionMap: Record<string, string> = {
      personalInfo: 'personal-info',
      experiences: 'experience',
      educations: 'education',
      skills: 'skills',
      projects: 'projects',
      certifications: 'certifications',
      languages: 'languages',
    };

    const section = sectionMap[firstErrorField];
    if (section && !expandedItems.includes(section)) {
      setExpandedItems((prev) => [...prev, section]);
    }

    // Delay to allow accordion to open before scrolling
    setTimeout(() => {
      const firstErrorElement = document.querySelector('[aria-invalid="true"]');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (firstErrorElement as HTMLElement).focus();
      }
    }, 100);
  };

  const handleDownloadPDF = async () => {
    if (!cvRef.current) return;

    try {
      setIsDownloading(true);
      const element = cvRef.current;
      const fileName = `${formData.cvTitle?.replace(/\s+/g, '_') || 'CV'}.pdf`;

      // Convert HTML to high resolution PNG
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        skipFonts: false,
        backgroundColor: '#ffffff',
      });

      const elementWidth = element.offsetWidth;
      const elementHeight = element.offsetHeight;

      const pdf = new jsPDF({
        orientation: elementWidth > elementHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [elementWidth, elementHeight],
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, elementWidth, elementHeight);
      pdf.save(fileName);

      toast.success('CV downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFillSampleData = () => {
    reset(mockData as any);
  };

  const activeTemplate = formData.templateId || 'modern-sidebar';
  const TemplateComponent = TEMPLATE_REGISTRY[activeTemplate] || TEMPLATE_REGISTRY['modern-sidebar'];

  // Map form data to template props, using mock data for empty essential fields
  const previewProps = useMemo(() => {
    const hasInfo = formData.personalInfo?.fullName || formData.personalInfo?.email;

    return {
      info: hasInfo ? formData.personalInfo : mockData.personalInfo,
      avatarUrl: formData.personalInfo?.imgUrl || '',
      experiences: formData.experiences?.length ? formData.experiences : mockData.experiences,
      educations: formData.educations?.length ? formData.educations : mockData.educations,
      skills: formData.skills?.length ? formData.skills : mockData.skills,
      certificates: formData.certifications?.length ? formData.certifications : mockData.certifications,
      languages: formData.languages?.length ? formData.languages : mockData.languages,
    };
  }, [formData]);

  return (
    <FormProvider {...methods}>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between'>
          <div>
            <p className='text-primary text-base font-semibold tracking-widest uppercase'>Resume Builder</p>
            <h1 className='text-foreground mt-2 text-4xl font-bold tracking-tight'>
              {id ? 'Edit Your Resume' : 'Build Your Resume'}
            </h1>
            <p className='text-muted-foreground mt-2'>Precision instruments for professional identity.</p>
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <Button asChild variant='outline' className='border-border rounded-xl'>
              <Link to={NAV_PATH.APP.MY_CVS}>Back to My CVs</Link>
            </Button>

            <Button
              type='button'
              onClick={handleSubmit(onSave, onInvalid)}
              variant='outline'
              disabled={saveMutation.isPending}
              className='border-border bg-card rounded-xl shadow-none'>
              {saveMutation.isPending ? (id ? 'Updating...' : 'Saving...') : id ? 'Update CV' : 'Save Draft'}
            </Button>

            <Button
              type='button'
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-none'>
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </Button>
          </div>
        </div>

        <div className='grid gap-6 xl:grid-cols-2'>
          <div className='space-y-4'>
            {/* Metadata Card */}
            <div className='border-border bg-card rounded-2xl border p-6 shadow-sm'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='md:col-span-2'>
                  <FormField label={validationMessages.cvTitle} error={errors.cvTitle?.message}>
                    <Input
                      {...register('cvTitle', { required: validationMessages.required(validationMessages.cvTitle) })}
                      placeholder='Web Developer Fresher CV'
                      className={inputClassName}
                    />
                  </FormField>
                </div>

                <div className='space-y-2'>
                  <FormLabel>Status</FormLabel>
                  <Controller
                    name='status'
                    control={methods.control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={inputClassName}>
                          <SelectValue placeholder='Select status' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='draft'>draft</SelectItem>
                          <SelectItem value='published'>published</SelectItem>
                          <SelectItem value='private'>private</SelectItem>
                          <SelectItem value='completed'>completed</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Sections Accordion */}
            <Accordion
              type='multiple'
              value={expandedItems}
              onValueChange={setExpandedItems}
              className='space-y-4'>
              <AccordionItem value='personal-info' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
                <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>
                  Personal Information
                </AccordionTrigger>
                <AccordionContent className='pb-6'>
                  <PersonalInfoSection />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='experience' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
                <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>Experience</AccordionTrigger>
                <AccordionContent className='pb-6'>
                  <ExperienceSection />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='education' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
                <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>Education</AccordionTrigger>
                <AccordionContent className='pb-6'>
                  <EducationSection />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='skills' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
                <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>
                  Skills & Expertise
                </AccordionTrigger>
                <AccordionContent className='pb-6'>
                  <SkillSection />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='projects' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
                <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>Projects</AccordionTrigger>
                <AccordionContent className='pb-6'>
                  <ProjectSection />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='certifications' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
                <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>
                  Certifications
                </AccordionTrigger>
                <AccordionContent className='pb-6'>
                  <CertificationSection />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='languages' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
                <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>Languages</AccordionTrigger>
                <AccordionContent className='pb-6'>
                  <LanguageSection />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Preview Panel */}
          <div className='border-border bg-muted rounded-3xl border p-6 xl:sticky xl:top-6 xl:self-start'>
            <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
              <div className='bg-card flex items-center gap-3 rounded-full px-4 py-2 shadow-sm'>
                <Search className='text-muted-foreground h-4 w-4' />
                <span className={`text-sm font-medium ${formData.status === 'completed' ? 'text-green-600' : 'text-foreground'}`}>
                  {formData.status}
                </span>
                <Share2 className='text-muted-foreground h-4 w-4' />
                <Eye className='text-muted-foreground h-4 w-4' />
                <Download className='text-muted-foreground h-4 w-4' />
              </div>

              {/* ACTION: FILL SAMPLE DATA */}
              <Button
                type='button'
                onClick={handleFillSampleData}
                variant='secondary'
                className='bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 rounded-xl border shadow-none'>
                Fill with Sample Data
              </Button>
            </div>

            {/* Template Selector - Now a Select component */}
            <div className='mb-4 space-y-2'>
              <FormLabel>Choose Template</FormLabel>
              <Select value={activeTemplate} onValueChange={(val) => setValue('templateId', val)}>
                <SelectTrigger className='bg-background min-h-12 w-full rounded-xl'>
                  <SelectValue placeholder='Select a template' />
                </SelectTrigger>
                <SelectContent>
                  {TEMPLATE_OPTIONS.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Scaled Preview */}
            <ScaledTemplatePreview>
              <div ref={cvRef}>
                <TemplateComponent {...previewProps} />
              </div>
            </ScaledTemplatePreview>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
