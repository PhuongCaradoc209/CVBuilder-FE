import RegisterForm from '@/components/RegisterForm';
import { LightningIcon } from '@phosphor-icons/react';

export default function RegisterPage() {
  return (
    <div className='flex min-h-screen'>
      {/* LEFT SIDE */}
      <div className='hidden w-1/2 flex-col justify-between bg-linear-to-br from-[#FF8C00] to-[#FF6A00] p-12 text-white lg:flex'>
        <div className='text-lg font-semibold'>CV Builder Pro</div>

        <div>
          <h1 className='text-5xl leading-tight font-bold'>
            Launch your <br />
            career with a <br />
            pro resume.
          </h1>

          <p className='mt-6 text-lg opacity-90'>
            The smartest way for students and junior
            <br /> developers to build a standout CV in minutes
            <br /> and land your dream job.
          </p>
        </div>

        <div className='mx-auto -rotate-5'>
          <div className='relative flex aspect-video h-75 w-62.5 flex-col justify-between rounded-4xl bg-white/15 p-6 shadow-2xl backdrop-blur'>
            <div>
              <div className='mb-5 flex items-center gap-3'>
                <div className='h-14 w-14 rounded-full bg-white/30'></div>
                <div className='flex-1 space-y-2'>
                  <div className='h-3 w-3/4 rounded bg-white/38'></div>
                  <div className='h-2.5 w-1/2 rounded bg-white/25'></div>
                </div>
              </div>

              <div className='space-y-3.5'>
                <div className='h-1.5 w-full rounded bg-white/25'></div>
                <div className='h-1.5 w-full rounded bg-white/25'></div>
                <div className='h-1.5 w-3/4 rounded bg-white/25'></div>
              </div>
            </div>

            <div className='mt-auto space-x-2'>
              <div className='inline-block h-6 w-16 rounded bg-white/25'></div>
              <div className='inline-block h-6 w-16 rounded bg-white/25'></div>
            </div>

            <div className='absolute top-1/2 -right-10 -translate-y-1/2 rotate-12 rounded-3xl bg-white p-6 shadow-lg'>
              <LightningIcon size={25} color='#FF6A00' weight='bold' />
            </div>
          </div>
        </div>

        <div className='text-sm opacity-80'>Joined by 10k+ developers this month</div>
      </div>

      {/* RIGHT SIDE */}
      <div className='flex w-full items-center justify-center bg-gray-50 lg:w-1/2'>
        <RegisterForm />
      </div>
    </div>
  );
}
