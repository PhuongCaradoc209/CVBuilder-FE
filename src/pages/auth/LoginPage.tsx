import { Input } from '@/components/ui/input';

import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { EnvelopeIcon } from '@phosphor-icons/react';
import GoogleIcon from '@/icon/googleIcon';

function LoginPage() {
  return (
    <main className='flex h-screen w-full'>
      {/* LEFT - ORANGE */}
      <section className='md:flex md:flex-1 flex-col items-center hidden md:block justify-center bg-gradient-to-br from-[#FF8C00] to-[#FF6A00] text-white'>
        {/* TOP */}
        <div className='flex w-90 flex-col justify-center'>
          {/* Logo */}
          <div className='mb-10 flex items-center gap-2 text-lg font-bold'>
            <div>Logo</div>
            CV Builder Pro
          </div>

          {/* Title */}
          <h1 className='mb-6 text-5xl font-bold'>
            Launch your <br />
            career with a <br />
            pro resume.
          </h1>

          {/* Description */}
          <p className='max-w-md text-white/90'>
            Join over 50,000 students and junior developers who land interviews at top-tier companies.
          </p>
        </div>

        {/* CARD DEMO */}
        <div className='mt-10'>
          <div className='relative h-[220px] w-[350px] rounded-4xl bg-white/10 p-6 shadow-2xl backdrop-blur'>
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

            <div className='mt-6 space-x-2'>
              <div className='inline-block h-6.5 w-16 rounded bg-white/25'></div>
              <div className='inline-block h-6.5 w-16 rounded bg-white/25'></div>
              <div className='inline-block h-6.5 w-16 rounded bg-white/25'></div>
            </div>

            {/* badge */}
            <div className='absolute -right-10 -bottom-5 rotate-6 rounded-full bg-white/10 px-6 py-3 text-xs font-semibold text-white shadow-lg'>
              ATS Optimized
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className='mt-10 text-sm text-white/60'>© 2026 CV Builder Pro. Empowering the next generation of talent.</div>
      </section>

      {/* RIGHT WHITE */}
      <section className='flex flex-1 items-center justify-center bg-white'>
        <div className='flex w-[450px] flex-col'>
          <div className='mb-5'>
            {/* Title */}
            <h2 className='mb-2 text-3xl font-bold'>Welcome Back</h2>

            <p className='mb-6 text-gray-500'>Please enter your credentials to access your workspace.</p>
          </div>

          {/*Social Login*/}
          <div className='mb-6 flex gap-4'>
            <div>
              <GoogleIcon/>
              <button className='flex-1 rounded-full border border-gray-400 py-3 hover:bg-orange-400'>Google</button>
            </div>
            <button className='flex-1 rounded-full border border-gray-400 py-3 hover:bg-orange-400'>GitHub</button>
          </div>

          <div className='mb-6 flex items-center gap-3'>
            <div className='h-px flex-1 bg-gray-200' />
            <span className='text-xs font-bold text-gray-500'>OR CONTINUE WITH EMAIL</span>
            <div className='h-px flex-1 bg-gray-200' />
          </div>

          {/* Form */}
          <div className='mb-4'>
            <label className='text-sm font-medium'>Email Address</label>

            <input
              className='mt-1 w-full rounded-full border border-gray-400 bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:black]'
              type='email'
              placeholder='name@carrer.com'
            />
          </div>

          <FieldSet className='w-full'>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='username'>Username</FieldLabel>
                <div className='relative flex items-center'>
                  <EnvelopeIcon className='text-gray-400 absolute left-4' weight='light' size={24} />
                  <Input
                    className='rounded-3xl px-12 py-5 outline-none focus:ring-1 focus:ring-orange-500'
                    id='username'
                    type='text'
                    placeholder='Max Leiter'
                  />
                </div>
                {/* <FieldDescription>Choose a unique username for your account.</FieldDescription> */}
              </Field>
              <Field>
                <div className='flex justify-between'>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <FieldLabel className='cursor-pointer font-semibold text-orange-500' htmlFor='f-password'>
                    Forgot password?
                  </FieldLabel>
                </div>
                {/* <FieldDescription>Must be at least 8 characters long.</FieldDescription> */}
                <Input id='password' type='password' placeholder='••••••••' />
              </Field>
            </FieldGroup>
          </FieldSet>

          {/* <div className='mb-4'>
            <div className='flex justify-between text-sm'>
              <label className='text-sm font-medium'>Password</label>
              <span className='cursor-pointer font-semibold text-orange-500'>Forgot password?</span>
            </div>

            <input
              className='mt-1 w-full rounded-full border border-gray-400 bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:black]'
              type='password'
              placeholder='•••••••••'
            />
          </div> */}

          {/*Check box*/}
          <div className='mb-7 flex cursor-pointer items-center gap-2 text-sm font-semibold text-gray-500'>
            <input
              type='checkbox'
              className="h-5 w-5 cursor-pointer appearance-none rounded-lg border border-gray-400 bg-white bg-center bg-no-repeat checked:border-orange-500 checked:bg-orange-500 checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22%2F%3E%3C%2Fsvg%3E')]"
            />
            Keep me logged in
          </div>

          {/* Button */}
          <button className='w-full rounded-full bg-orange-500 py-3 font-semibold text-white hover:bg-orange-500/80'>
            Sign In to Dashboard
          </button>

          {/*Register*/}
          <p className='mt-6 text-center text-sm font-medium text-gray-500'>
            New here? <span className='cursor-pointer text-orange-500'>Create your professional account</span>
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
