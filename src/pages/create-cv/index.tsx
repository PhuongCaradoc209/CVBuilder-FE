import { Link } from 'react-router-dom';
import { ChevronDown, Download, Eye, Search, Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { NAV_PATH } from '@/router/router.constant';

function SectionRow({ title }: { title: string }) {
  return (
    <button
      type='button'
      className='w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm transition-colors hover:bg-slate-50'>
      <div className='flex items-center justify-between'>
        <span className='font-semibold text-slate-900'>{title}</span>
        <ChevronDown className='h-4 w-4 text-slate-500' />
      </div>
    </button>
  );
}

export default function CreateCvPage() {
  return (
    <div className='mx-auto w-full max-w-[1440px]'>
      <div className='mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between'>
        <div>
          <p className='text-xs font-semibold tracking-[0.28em] text-orange-500 uppercase'>Resume Builder</p>
          <h1 className='mt-2 text-4xl font-bold tracking-tight text-slate-900'>Build Your Resume</h1>
          <p className='mt-2 text-slate-500'>Precision instruments for professional identity.</p>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          <Button asChild variant='outline' className='rounded-xl border-slate-200'>
            <Link to={NAV_PATH.APP.MY_CVS}>Back to My CVs</Link>
          </Button>

          <Button type='button' variant='outline' className='rounded-xl border-slate-200 bg-white'>
            Save Draft
          </Button>

          <Button type='button' className='rounded-xl bg-orange-500 text-white hover:bg-orange-600'>
            Download PDF
          </Button>
        </div>
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.05fr_0.95fr]'>
        <div className='space-y-4'>
          <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='mb-5 flex items-center justify-between'>
              <h2 className='font-semibold text-slate-900'>Personal Information</h2>
              <ChevronDown className='h-4 w-4 text-slate-500' />
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='rounded-xl border border-dashed border-orange-200 bg-orange-50 p-4 text-sm text-slate-500'>
                Profile Photo Upload
              </div>
              <div className='rounded-xl bg-slate-50 p-4 text-sm text-slate-500'>Quick Details</div>
              <div className='rounded-xl bg-slate-50 p-4 text-sm text-slate-500'>Full Name</div>
              <div className='rounded-xl bg-slate-50 p-4 text-sm text-slate-500'>Email Address</div>
              <div className='rounded-xl bg-slate-50 p-4 text-sm text-slate-500'>Job Title</div>
              <div className='rounded-xl bg-slate-50 p-4 text-sm text-slate-500'>Location</div>
              <div className='rounded-xl bg-slate-50 p-4 text-sm text-slate-500 md:col-span-2'>Profile Summary</div>
            </div>
          </div>

          <SectionRow title='Experience' />
          <SectionRow title='Education' />
          <SectionRow title='Skills & Expertise' />
        </div>

        <div className='rounded-[28px] border border-slate-200 bg-slate-100 p-6 xl:sticky xl:top-6 xl:self-start'>
          <div className='mx-auto mb-5 flex w-fit items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm'>
            <Search className='h-4 w-4 text-slate-500' />
            <span className='text-sm font-medium text-slate-700'>100%</span>
            <Share2 className='h-4 w-4 text-slate-500' />
            <Eye className='h-4 w-4 text-slate-500' />
            <Download className='h-4 w-4 text-slate-500' />
          </div>

          <div className='mx-auto min-h-[760px] w-full max-w-[480px] rounded-sm bg-white p-8 shadow-lg'>
            <h2 className='text-3xl font-bold text-slate-900'>ALEX JONES</h2>
            <p className='mt-1 text-sm font-semibold tracking-[0.2em] text-orange-500 uppercase'>Senior Product Designer</p>

            <div className='mt-8 grid grid-cols-[1fr_140px] gap-8'>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-xs font-bold tracking-[0.24em] text-slate-700 uppercase'>Professional Experience</h3>
                  <div className='mt-3 h-2 w-28 rounded bg-slate-300' />
                  <div className='mt-2 h-2 w-full rounded bg-slate-200' />
                  <div className='mt-2 h-2 w-11/12 rounded bg-slate-200' />
                </div>

                <div>
                  <h3 className='text-xs font-bold tracking-[0.24em] text-slate-700 uppercase'>Education</h3>
                  <div className='mt-3 h-2 w-24 rounded bg-slate-300' />
                  <div className='mt-2 h-2 w-10/12 rounded bg-slate-200' />
                </div>
              </div>

              <div className='space-y-6'>
                <div className='mx-auto h-20 w-20 rounded-lg bg-slate-200' />
                <div>
                  <h3 className='text-xs font-bold tracking-[0.24em] text-slate-700 uppercase'>Contact</h3>
                  <div className='mt-3 h-2 w-full rounded bg-slate-200' />
                  <div className='mt-2 h-2 w-10/12 rounded bg-slate-200' />
                  <div className='mt-2 h-2 w-8/12 rounded bg-slate-200' />
                </div>
                <div>
                  <h3 className='text-xs font-bold tracking-[0.24em] text-slate-700 uppercase'>Expertise</h3>
                  <div className='mt-3 h-2 w-full rounded bg-slate-200' />
                  <div className='mt-2 h-2 w-10/12 rounded bg-slate-200' />
                  <div className='mt-2 h-2 w-9/12 rounded bg-slate-200' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
