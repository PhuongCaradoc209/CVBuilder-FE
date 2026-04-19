import { Link } from 'react-router-dom';
import { Download, Eye, Search, Share2 } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { NAV_PATH } from '@/router/router.constant';

export default function CreateCvPage() {
  return (
    <div className='mx-auto w-full max-w-7xl'>
      <div className='mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between'>
        <div>
          <p className='text-primary text-xs font-semibold tracking-widest uppercase'>Resume Builder</p>
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

          <div className='bg-card mx-auto w-full max-w-md rounded-sm p-8 shadow-lg'>
            <h2 className='text-foreground text-3xl font-bold'>ALEX JONES</h2>
            <p className='text-primary mt-1 text-sm font-semibold tracking-wider uppercase'>Senior Product Designer</p>

            <div className='mt-8 flex gap-8'>
              <div className='flex-1 space-y-6'>
                <div>
                  <h3 className='text-foreground text-xs font-bold tracking-wider uppercase'>Professional Experience</h3>
                  <div className='bg-border mt-3 h-2 w-28 rounded' />
                  <div className='bg-muted mt-2 h-2 w-full rounded' />
                  <div className='bg-muted mt-2 h-2 w-11/12 rounded' />
                </div>

                <div>
                  <h3 className='text-foreground text-xs font-bold tracking-wider uppercase'>Education</h3>
                  <div className='bg-border mt-3 h-2 w-24 rounded' />
                  <div className='bg-muted mt-2 h-2 w-10/12 rounded' />
                </div>
              </div>

              <div className='w-36 space-y-6'>
                <div className='bg-muted mx-auto h-20 w-20 rounded-lg' />

                <div>
                  <h3 className='text-foreground text-xs font-bold tracking-wider uppercase'>Contact</h3>
                  <div className='bg-muted mt-3 h-2 w-full rounded' />
                  <div className='bg-muted mt-2 h-2 w-10/12 rounded' />
                  <div className='bg-muted mt-2 h-2 w-8/12 rounded' />
                </div>

                <div>
                  <h3 className='text-foreground text-xs font-bold tracking-wider uppercase'>Expertise</h3>
                  <div className='bg-muted mt-3 h-2 w-full rounded' />
                  <div className='bg-muted mt-2 h-2 w-10/12 rounded' />
                  <div className='bg-muted mt-2 h-2 w-9/12 rounded' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
