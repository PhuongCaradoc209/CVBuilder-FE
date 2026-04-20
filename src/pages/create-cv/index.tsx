import { useMemo } from 'react';

import { Download, Eye, Search, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// import ModernSidebarTemplate from '@/components/cv-templates/modern-sidebar';
import ATSStandardTemplate from '@/components/cv-templates/ats-standard';
import type { Certificate, Education, Experience, Info, Language, Skill } from '@/components/types/type';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { NAV_PATH } from '@/router/router.constant';
import { ScaledTemplatePreview } from './components/TemplateReview';

export default function CreateCvPage() {
  const mockInfo: Info = useMemo(
    () => ({
      fullName: 'Alex Morgan',
      jobTitle: 'Frontend Developer',
      email: 'alex.morgan@example.com',
      phone: '+84 912 345 678',
      address: 'Ho Chi Minh City, Vietnam',
      url: 'https://linkedin.com/in/alexmorgan',
      summary:
        'Frontend developer focused on building fast, accessible UI systems. Comfortable shipping features end-to-end from design handoff to production monitoring.',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/alexmorgan' },
        { platform: 'GitHub', url: 'https://github.com/alexmorgan' },
      ],
    }),
    [],
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
        major: 'Software Engineering',
        startDate: '2020',
        endDate: '2024',
        description: 'Relevant coursework: Web Development, Data Structures, Software Design, UX Fundamentals.',
      },
    ],
    [],
  );

  const mockSkills: Skill[] = useMemo(
    () => [
      { skillName: 'React' },
      { skillName: 'TypeScript' },
      { skillName: 'Vite' },
      { skillName: 'Tailwind CSS' },
      { skillName: 'REST APIs' },
      { skillName: 'Accessibility (a11y)' },
    ],
    [],
  );

  const mockCertificates: Certificate[] = useMemo(
    () => [
      {
        name: 'Front-End Developer',
        issuer: 'Meta (Coursera)',
        issueDate: '2024',
        url: 'https://coursera.org/verify/example',
      },
    ],
    [],
  );

  const mockLanguages: Language[] = useMemo(
    () => [
      { languageName: 'Vietnamese', level: 'Native' },
      { languageName: 'English', level: 'Intermediate' },
    ],
    [],
  );

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
          <Accordion type='multiple' defaultValue={['personal-info']} className='space-y-4'>
            <AccordionItem value='personal-info' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
              <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>
                Personal Information
              </AccordionTrigger>
              <AccordionContent className='pb-6'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='border-border bg-muted text-muted-foreground rounded-xl border border-dashed p-4 text-sm'>
                    Profile Photo Upload
                  </div>
                  <div className='bg-muted text-muted-foreground rounded-xl p-4 text-sm'>Quick Details</div>
                  <div className='bg-muted text-muted-foreground rounded-xl p-4 text-sm'>Full Name</div>
                  <div className='bg-muted text-muted-foreground rounded-xl p-4 text-sm'>Email Address</div>
                  <div className='bg-muted text-muted-foreground rounded-xl p-4 text-sm'>Job Title</div>
                  <div className='bg-muted text-muted-foreground rounded-xl p-4 text-sm'>Location</div>
                  <div className='bg-muted text-muted-foreground rounded-xl p-4 text-sm md:col-span-2'>Profile Summary</div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='experience' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
              <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>Experience</AccordionTrigger>
              <AccordionContent className='text-muted-foreground pb-6 text-sm'>Experience form here</AccordionContent>
            </AccordionItem>

            <AccordionItem value='education' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
              <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>Education</AccordionTrigger>
              <AccordionContent className='text-muted-foreground pb-6 text-sm'>Education form here</AccordionContent>
            </AccordionItem>

            <AccordionItem value='skills' className='border-border bg-card rounded-2xl border px-6 shadow-sm'>
              <AccordionTrigger className='text-foreground py-5 font-semibold hover:no-underline'>
                Skills & Expertise
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground pb-6 text-sm'>Skills form here</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className='border-border bg-muted rounded-3xl border p-6 xl:sticky xl:top-6 xl:self-start'>
          <div className='bg-card mx-auto mb-5 flex w-fit items-center gap-3 rounded-full px-4 py-2 shadow-sm'>
            <Search className='text-muted-foreground h-4 w-4' />
            <span className='text-foreground text-sm font-medium'>100%</span>
            <Share2 className='text-muted-foreground h-4 w-4' />
            <Eye className='text-muted-foreground h-4 w-4' />
            <Download className='text-muted-foreground h-4 w-4' />
          </div>

          <ScaledTemplatePreview>
            <ATSStandardTemplate
              info={mockInfo}
              experiences={mockExperiences}
              educations={mockEducations}
              skills={mockSkills}
              certificates={mockCertificates}
              languages={mockLanguages}
            />
          </ScaledTemplatePreview>
        </div>
      </div>
    </div>
  );
}
