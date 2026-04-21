import { useMemo, useState } from 'react';

import { Download, Eye, Plus, Search, Share2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { Certificate, Education, Experience, Info, Language, Project, Skill, SocialLink } from '@/components/types/type';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NAV_PATH } from '@/router/router.constant';
import { ScaledTemplatePreview } from './components/TemplateReview';
import ATSStandardTemplate from '@/components/cv-templates/ats-standard';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';
const textareaClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground min-h-28 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

const emptySocialLink = (): SocialLink => ({
  platform: '',
  url: '',
});

const emptyExperience = (): Experience => ({
  companyName: '',
  position: '',
  startDate: '',
  endDate: '',
  description: '',
});

const emptyEducation = (): Education => ({
  schoolName: '',
  major: '',
  startDate: '',
  endDate: '',
  description: '',
});

const emptySkill = (): Skill => ({
  skillName: '',
  level: '',
});

const emptyProject = (): Project => ({
  projectName: '',
  description: '',
  url: '',
  startDate: '',
  endDate: '',
});

const emptyCertificate = (): Certificate => ({
  name: '',
  issuer: '',
  issueDate: '',
  expiryDate: '',
  url: '',
});

const emptyLanguage = (): Language => ({
  languageName: '',
  level: '',
});

const emptyInfo: Info = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  address: '',
  url: '',
  summary: '',
  socialLinks: [emptySocialLink()],
};

type InfoTextField = 'fullName' | 'jobTitle' | 'email' | 'phone' | 'address' | 'url' | 'summary';

function hasText(value?: string) {
  return Boolean(value?.trim());
}

function FormLabel({ children }: { children: string }) {
  return <label className='text-foreground text-sm font-medium'>{children}</label>;
}

function SectionToolbar({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className='mb-4 flex items-center justify-between'>
      <p className='text-muted-foreground text-sm font-medium'>{title}</p>
      <Button type='button' variant='outline' size='sm' className='border-border'>
        <span onClick={onAdd} className='inline-flex items-center gap-1'>
          <Plus className='h-4 w-4' />
          Add
        </span>
      </Button>
    </div>
  );
}

function EntryCard({
  title,
  index,
  onRemove,
  children,
  canRemove = true,
}: {
  title: string;
  index: number;
  onRemove: () => void;
  children: React.ReactNode;
  canRemove?: boolean;
}) {
  return (
    <div className='border-border bg-background rounded-2xl border p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h4 className='text-foreground text-sm font-semibold'>
          {title} {index + 1}
        </h4>

        {canRemove && (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='text-muted-foreground hover:text-destructive'
            onClick={onRemove}>
            <Trash2 className='h-4 w-4' />
          </Button>
        )}
      </div>

      {children}
    </div>
  );
}

export default function CreateCvPage() {
  const [cvTitle, setCvTitle] = useState('Untitled CV');
  const [status, setStatus] = useState('draft');

  const [info, setInfo] = useState<Info>(emptyInfo);
  const [experiences, setExperiences] = useState<Experience[]>([emptyExperience()]);
  const [educations, setEducations] = useState<Education[]>([emptyEducation()]);
  const [skills, setSkills] = useState<Skill[]>([emptySkill()]);
  const [projects, setProjects] = useState<Project[]>([emptyProject()]);
  const [certificates, setCertificates] = useState<Certificate[]>([emptyCertificate()]);
  const [languages, setLanguages] = useState<Language[]>([emptyLanguage()]);
  const [avatarUrl, setAvatarUrl] = useState('');

  const updateInfoField = (field: InfoTextField, value: string) => {
    setInfo((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    setInfo((prev) => {
      const next = [...(prev.socialLinks ?? [])];
      next[index] = {
        ...next[index],
        [field]: value,
      };
      return { ...prev, socialLinks: next };
    });
  };

  const addSocialLink = () => {
    setInfo((prev) => ({
      ...prev,
      socialLinks: [...(prev.socialLinks ?? []), emptySocialLink()],
    }));
  };

  const removeSocialLink = (index: number) => {
    setInfo((prev) => {
      const next = [...(prev.socialLinks ?? [])];
      next.splice(index, 1);
      return {
        ...prev,
        socialLinks: next.length ? next : [emptySocialLink()],
      };
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    setExperiences((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setEducations((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    setSkills((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    setProjects((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateCertificate = (index: number, field: keyof Certificate, value: string) => {
    setCertificates((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    setLanguages((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const previewInfo = useMemo<Info>(() => {
    const filteredLinks = (info.socialLinks ?? []).filter((link) => hasText(link.platform) || hasText(link.url));

    return {
      ...info,
      url: info.url?.trim() || filteredLinks.find((link) => hasText(link.url))?.url || '',
      socialLinks: filteredLinks,
    };
  }, [info]);

  const previewExperiences = useMemo(
    () =>
      experiences.filter((item) =>
        [item.companyName, item.position, item.startDate, item.endDate, item.description].some(hasText),
      ),
    [experiences],
  );

  const previewEducations = useMemo(
    () => educations.filter((item) => [item.schoolName, item.major, item.startDate, item.endDate, item.description].some(hasText)),
    [educations],
  );

  const mockInfo: Info = useMemo(
    () => ({
      fullName: 'Jane Doe',
      jobTitle: 'Frontend Developer',
      email: 'jane.doe@example.com',
      phone: '+84 901 234 567',
      address: 'Ho Chi Minh City, Vietnam',
      url: 'linkedin.com/in/janedoe',
      imgUrl: avatarUrl?.trim() || undefined,
      summary:
        'Frontend developer focused on building responsive interfaces, improving performance, and turning product requirements into maintainable React applications.',
      socialLinks: [],
    }),
    [avatarUrl],
  );

  const mockExperiences: Experience[] = useMemo(
    () => [
      {
        companyName: 'NovaTech',
        position: 'Frontend Developer',
        startDate: '06/2023',
        endDate: 'Present',
        description:
          'Built reusable UI components with React + Tailwind, improved Lighthouse performance from 68 → 92, and implemented form flows with validation and optimistic updates.',
      },
      {
        companyName: 'Bright Studio',
        position: 'Junior Web Developer',
        startDate: '08/2022',
        endDate: 'Aus 2023',
        description:
          'Delivered responsive landing pages and dashboards, integrated REST APIs, and collaborated with designers to refine spacing/typography for better readability.',
      },
    ],
    [],
  );

  const mockEducations: Education[] = useMemo(
    () => [
      {
        schoolName: 'University of Technology',
        major: 'Bachelor of Software Engineering',
        startDate: '2020',
        endDate: '2024',
        description: 'Focused on web engineering, software architecture, and human-computer interaction.',
      },
    ],
    [],
  );

  const mockSkills: Skill[] = useMemo(
    () => [
      { skillName: 'React', level: 'Advanced' },
      { skillName: 'TypeScript', level: 'Advanced' },
      { skillName: 'Tailwind CSS', level: 'Advanced' },
      { skillName: 'REST APIs', level: 'Intermediate' },
      { skillName: 'Testing', level: 'Intermediate' },
    ],
    [],
  );

  const mockCertificates: Certificate[] = useMemo(
    () => [
      {
        name: 'Frontend Development Certificate',
        issuer: 'Coursera',
        issueDate: '2024',
        expiryDate: '',
        url: '',
      },
    ],
    [],
  );

  const mockLanguages: Language[] = useMemo(
    () => [
      { languageName: 'English', level: 'Professional working proficiency' },
      { languageName: 'Vietnamese', level: 'Native' },
    ],
    [],
  );

  const previewSkills = useMemo(() => skills.filter((item) => [item.skillName, item.level].some(hasText)), [skills]);

  const previewProjects = useMemo(
    () => projects.filter((item) => [item.projectName, item.description, item.url, item.startDate, item.endDate].some(hasText)),
    [projects],
  );

  const previewCertificates = useMemo(
    () => certificates.filter((item) => [item.name, item.issuer, item.issueDate, item.expiryDate, item.url].some(hasText)),
    [certificates],
  );

  const previewLanguages = useMemo(() => languages.filter((item) => [item.languageName, item.level].some(hasText)), [languages]);

  const templateInfo = hasText(previewInfo.fullName) || hasText(previewInfo.email) || hasText(previewInfo.summary) ? previewInfo : mockInfo;
  const templateExperiences = previewExperiences.length > 0 ? previewExperiences : mockExperiences;
  const templateEducations = previewEducations.length > 0 ? previewEducations : mockEducations;
  const templateSkills = previewSkills.length > 0 ? previewSkills : mockSkills;
  const templateCertificates = previewCertificates.length > 0 ? previewCertificates : mockCertificates;
  const templateLanguages = previewLanguages.length > 0 ? previewLanguages : mockLanguages;

  return (
    <div className='mx-auto w-full max-w-7xl'>
      <div className='mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between'>
        <div>
          <p className='text-primary text-base font-semibold tracking-widest uppercase'>Resume Builder</p>
          <h1 className='text-foreground mt-2 text-4xl font-bold tracking-tight'>Build Your Resume</h1>
          <p className='text-muted-foreground mt-2'>Precision instruments for professional identity.</p>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          <Button asChild variant='outline' className='border-border rounded-xl'>
            <Link to={NAV_PATH.APP.MY_CVS}>Back to My CVs</Link>
          </Button>

          <Button type='button' variant='outline' className='border-border bg-card rounded-xl'>
            Save Draft
          </Button>

          <Button type='button' className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl'>
            Download PDF
          </Button>
        </div>
      </div>

      <div className='grid gap-6 xl:grid-cols-2'>
        <div className='space-y-4'>
          <div className='border-border bg-card rounded-2xl border p-6 shadow-sm'>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2 md:col-span-2'>
                <FormLabel>CV Title</FormLabel>
                <Input
                  value={cvTitle}
                  onChange={(e) => setCvTitle(e.target.value)}
                  placeholder='Web Developer Fresher CV'
                  className={inputClassName}
                />
              </div>

              <div className='space-y-2'>
                <FormLabel>Status</FormLabel>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={`${inputClassName} w-full px-4 text-sm`}>
                  <option value='draft'>draft</option>
                  <option value='published'>published</option>
                </select>
              </div>

              <div className='space-y-2'>
                <FormLabel>Avatar URL (preview only)</FormLabel>
                <Input
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder='https://...'
                  className={inputClassName}
                />
              </div>
            </div>
          </div>

          <Accordion type='multiple' defaultValue={['personal-info', 'experience', 'education', 'skills']} className='space-y-4'>
            <AccordionItem value='personal-info' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
              <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>
                Personal Information
              </AccordionTrigger>

              <AccordionContent className='pb-6'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      value={info.fullName}
                      onChange={(e) => updateInfoField('fullName', e.target.value)}
                      placeholder='Jane Doe'
                      className={inputClassName}
                    />
                  </div>

                  <div className='space-y-2'>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={info.email}
                      onChange={(e) => updateInfoField('email', e.target.value)}
                      placeholder='jane.doe@example.com'
                      className={inputClassName}
                    />
                  </div>

                  <div className='space-y-2'>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      value={info.phone}
                      onChange={(e) => updateInfoField('phone', e.target.value)}
                      placeholder='0901234567'
                      className={inputClassName}
                    />
                  </div>

                  <div className='space-y-2'>
                    <FormLabel>Address</FormLabel>
                    <Input
                      value={info.address}
                      onChange={(e) => updateInfoField('address', e.target.value)}
                      placeholder='123 Sample Street, Ho Chi Minh City'
                      className={inputClassName}
                    />
                  </div>

                  <div className='space-y-2'>
                    <FormLabel>Job Title</FormLabel>
                    <Input
                      value={info.jobTitle}
                      onChange={(e) => updateInfoField('jobTitle', e.target.value)}
                      placeholder='Software Engineer'
                      className={inputClassName}
                    />
                  </div>

                  <div className='space-y-2'>
                    <FormLabel>Personal URL</FormLabel>
                    <Input
                      value={info.url ?? ''}
                      onChange={(e) => updateInfoField('url', e.target.value)}
                      placeholder='https://linkedin.com/in/janedoe'
                      className={inputClassName}
                    />
                  </div>

                  <div className='space-y-2 md:col-span-2'>
                    <FormLabel>Summary</FormLabel>
                    <textarea
                      value={info.summary}
                      onChange={(e) => updateInfoField('summary', e.target.value)}
                      placeholder='Building modern web applications with JavaScript, React, and Node.js'
                      className={textareaClassName}
                    />
                  </div>
                </div>

                <div className='mt-6'>
                  <SectionToolbar title='Social Links' onAdd={addSocialLink} />

                  <div className='space-y-4'>
                    {(info.socialLinks ?? []).map((link, index) => (
                      <EntryCard
                        key={`social-link-${index}`}
                        title='Link'
                        index={index}
                        onRemove={() => removeSocialLink(index)}
                        canRemove={(info.socialLinks ?? []).length > 1}>
                        <div className='grid gap-4 md:grid-cols-2'>
                          <div className='space-y-2'>
                            <FormLabel>Platform</FormLabel>
                            <Input
                              value={link.platform}
                              onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                              placeholder='LinkedIn'
                              className={inputClassName}
                            />
                          </div>

                          <div className='space-y-2'>
                            <FormLabel>URL</FormLabel>
                            <Input
                              value={link.url}
                              onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                              placeholder='https://linkedin.com/in/janedoe'
                              className={inputClassName}
                            />
                          </div>
                        </div>
                      </EntryCard>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='experience' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
              <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>Experience</AccordionTrigger>

              <AccordionContent className='pb-6'>
                <SectionToolbar title='Experience entries' onAdd={() => setExperiences((prev) => [...prev, emptyExperience()])} />

                <div className='space-y-4'>
                  {experiences.map((experience, index) => (
                    <EntryCard
                      key={`experience-${index}`}
                      title='Experience'
                      index={index}
                      onRemove={() =>
                        setExperiences((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : [emptyExperience()]))
                      }
                      canRemove={experiences.length > 1}>
                      <div className='grid gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                          <FormLabel>Company Name</FormLabel>
                          <Input
                            value={experience.companyName}
                            onChange={(e) => updateExperience(index, 'companyName', e.target.value)}
                            placeholder='Tech Company'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>Position</FormLabel>
                          <Input
                            value={experience.position}
                            onChange={(e) => updateExperience(index, 'position', e.target.value)}
                            placeholder='Frontend Developer Intern'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>Start Date</FormLabel>
                          <Input
                            value={experience.startDate}
                            onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                            placeholder='2023'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>End Date</FormLabel>
                          <Input
                            value={experience.endDate}
                            onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                            placeholder='2024 / Present'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2 md:col-span-2'>
                          <FormLabel>Description</FormLabel>
                          <textarea
                            value={experience.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            placeholder='Describe your responsibilities and achievements...'
                            className={textareaClassName}
                          />
                        </div>
                      </div>
                    </EntryCard>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='education' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
              <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>Education</AccordionTrigger>

              <AccordionContent className='pb-6'>
                <SectionToolbar title='Education entries' onAdd={() => setEducations((prev) => [...prev, emptyEducation()])} />

                <div className='space-y-4'>
                  {educations.map((education, index) => (
                    <EntryCard
                      key={`education-${index}`}
                      title='Education'
                      index={index}
                      onRemove={() =>
                        setEducations((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : [emptyEducation()]))
                      }
                      canRemove={educations.length > 1}>
                      <div className='grid gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                          <FormLabel>School Name</FormLabel>
                          <Input
                            value={education.schoolName}
                            onChange={(e) => updateEducation(index, 'schoolName', e.target.value)}
                            placeholder='ABC University'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>Major</FormLabel>
                          <Input
                            value={education.major}
                            onChange={(e) => updateEducation(index, 'major', e.target.value)}
                            placeholder='Information Technology'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>Start Date</FormLabel>
                          <Input
                            value={education.startDate}
                            onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                            placeholder='2020'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>End Date</FormLabel>
                          <Input
                            value={education.endDate}
                            onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                            placeholder='2024'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2 md:col-span-2'>
                          <FormLabel>Description</FormLabel>
                          <textarea
                            value={education.description}
                            onChange={(e) => updateEducation(index, 'description', e.target.value)}
                            placeholder='Relevant coursework, honors, achievements...'
                            className={textareaClassName}
                          />
                        </div>
                      </div>
                    </EntryCard>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='skills' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
              <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>
                Skills & Expertise
              </AccordionTrigger>

              <AccordionContent className='pb-6'>
                <SectionToolbar title='Skill entries' onAdd={() => setSkills((prev) => [...prev, emptySkill()])} />

                <div className='space-y-4'>
                  {skills.map((skill, index) => (
                    <EntryCard
                      key={`skill-${index}`}
                      title='Skill'
                      index={index}
                      onRemove={() =>
                        setSkills((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : [emptySkill()]))
                      }
                      canRemove={skills.length > 1}>
                      <div className='grid gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                          <FormLabel>Skill Name</FormLabel>
                          <Input
                            value={skill.skillName}
                            onChange={(e) => updateSkill(index, 'skillName', e.target.value)}
                            placeholder='React'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>Level</FormLabel>
                          <Input
                            value={skill.level ?? ''}
                            onChange={(e) => updateSkill(index, 'level', e.target.value)}
                            placeholder='Advanced'
                            className={inputClassName}
                          />
                        </div>
                      </div>
                    </EntryCard>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='projects' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
              <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>Projects</AccordionTrigger>

              <AccordionContent className='pb-6'>
                <SectionToolbar title='Project entries' onAdd={() => setProjects((prev) => [...prev, emptyProject()])} />

                <div className='space-y-4'>
                  {projects.map((project, index) => (
                    <EntryCard
                      key={`project-${index}`}
                      title='Project'
                      index={index}
                      onRemove={() =>
                        setProjects((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : [emptyProject()]))
                      }
                      canRemove={projects.length > 1}>
                      <div className='grid gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                          <FormLabel>Project Name</FormLabel>
                          <Input
                            value={project.projectName}
                            onChange={(e) => updateProject(index, 'projectName', e.target.value)}
                            placeholder='Portfolio Website'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>Project URL</FormLabel>
                          <Input
                            value={project.url}
                            onChange={(e) => updateProject(index, 'url', e.target.value)}
                            placeholder='https://...'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>Start Date</FormLabel>
                          <Input
                            value={project.startDate}
                            onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                            placeholder='2024'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>End Date</FormLabel>
                          <Input
                            value={project.endDate}
                            onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                            placeholder='Present'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2 md:col-span-2'>
                          <FormLabel>Description</FormLabel>
                          <textarea
                            value={project.description}
                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                            placeholder='Briefly describe the project...'
                            className={textareaClassName}
                          />
                        </div>
                      </div>
                    </EntryCard>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='certifications' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
              <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>
                Certifications
              </AccordionTrigger>

              <AccordionContent className='pb-6'>
                <SectionToolbar
                  title='Certification entries'
                  onAdd={() => setCertificates((prev) => [...prev, emptyCertificate()])}
                />

                <div className='space-y-4'>
                  {certificates.map((certificate, index) => (
                    <EntryCard
                      key={`certificate-${index}`}
                      title='Certification'
                      index={index}
                      onRemove={() =>
                        setCertificates((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : [emptyCertificate()]))
                      }
                      canRemove={certificates.length > 1}>
                      <div className='grid gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                          <FormLabel>Name</FormLabel>
                          <Input
                            value={certificate.name}
                            onChange={(e) => updateCertificate(index, 'name', e.target.value)}
                            placeholder='Front-End Developer'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>Issuer</FormLabel>
                          <Input
                            value={certificate.issuer}
                            onChange={(e) => updateCertificate(index, 'issuer', e.target.value)}
                            placeholder='Coursera'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>Issue Date</FormLabel>
                          <Input
                            value={certificate.issueDate}
                            onChange={(e) => updateCertificate(index, 'issueDate', e.target.value)}
                            placeholder='2024'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>Expiry Date</FormLabel>
                          <Input
                            value={certificate.expiryDate ?? ''}
                            onChange={(e) => updateCertificate(index, 'expiryDate', e.target.value)}
                            placeholder='Optional'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2 md:col-span-2'>
                          <FormLabel>Certificate URL</FormLabel>
                          <Input
                            value={certificate.url ?? ''}
                            onChange={(e) => updateCertificate(index, 'url', e.target.value)}
                            placeholder='https://...'
                            className={inputClassName}
                          />
                        </div>
                      </div>
                    </EntryCard>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='languages' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
              <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>Languages</AccordionTrigger>

              <AccordionContent className='pb-6'>
                <SectionToolbar title='Language entries' onAdd={() => setLanguages((prev) => [...prev, emptyLanguage()])} />

                <div className='space-y-4'>
                  {languages.map((language, index) => (
                    <EntryCard
                      key={`language-${index}`}
                      title='Language'
                      index={index}
                      onRemove={() =>
                        setLanguages((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : [emptyLanguage()]))
                      }
                      canRemove={languages.length > 1}>
                      <div className='grid gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                          <FormLabel>Language Name</FormLabel>
                          <Input
                            value={language.languageName}
                            onChange={(e) => updateLanguage(index, 'languageName', e.target.value)}
                            placeholder='English'
                            className={inputClassName}
                          />
                        </div>

                        <div className='space-y-2'>
                          <FormLabel>Level</FormLabel>
                          <Input
                            value={language.level ?? ''}
                            onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                            placeholder='Intermediate'
                            className={inputClassName}
                          />
                        </div>
                      </div>
                    </EntryCard>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className='border-border bg-muted rounded-3xl border p-6 xl:sticky xl:top-6 xl:self-start'>
          <div className='bg-card mx-auto mb-5 flex w-fit items-center gap-3 rounded-full px-4 py-2 shadow-sm'>
            <Search className='text-muted-foreground h-4 w-4' />
            <span className='text-foreground text-sm font-medium'>{status}</span>
            <Share2 className='text-muted-foreground h-4 w-4' />
            <Eye className='text-muted-foreground h-4 w-4' />
            <Download className='text-muted-foreground h-4 w-4' />
          </div>

          <ScaledTemplatePreview>
            <ATSStandardTemplate
              info={templateInfo}
              experiences={templateExperiences}
              educations={templateEducations}
              skills={templateSkills}
              certificates={templateCertificates}
              languages={templateLanguages}
            />
          </ScaledTemplatePreview>

          {previewProjects.length > 0 && (
            <div className='border-border bg-card text-muted-foreground mt-4 rounded-2xl border border-dashed p-4 text-sm'>
              Projects currently update form state and can be saved later, but are not shown in this preview template yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
