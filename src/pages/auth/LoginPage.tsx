import InputField from '@/components/common/inputField';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import GithubIcon from '@/icon/githubIcon';
import GoogleIcon from '@/icon/googleIcon';
import { authService } from '@/services/auth.service';
import { CheckCircleIcon, EnvelopeIcon, FileTextIcon, LightningIcon, LockKeyIcon } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { toast } from 'sonner';

function LoginPage() {
  const backendUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/auth/google`;
  };
  const handleGithubLogin = () => {
    window.location.href = `${backendUrl}/auth/github`;
  };
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data: any) => {
      localStorage.setItem('access_token', data.accessToken);
      toast.success('Login successfully!');
      navigate('/');
    },
    onError: (error: any) => {
      console.log(error);
      toast.error('Wrong email or password! Please try again.');
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      toast.warning('Please enter your email or password!');
      return;
    }
    // Gọi API
    loginMutation.mutate({ email, password });
  };
  return (
    <main className='flex h-screen w-full'>
      {/* LEFT - ORANGE */}
      <section className='hidden flex-col items-center justify-center bg-linear-to-br from-[#FF8C00] to-[#FF6A00] text-white md:flex md:flex-1'>
        {/* TOP */}
        <div className='flex w-90 flex-col justify-center'>
          {/* Logo */}
          <div className='mb-10 flex items-center gap-2 text-lg font-bold'>
            <FileTextIcon className='rounded-full border border-white/40 bg-white/20 p-1' size={30} />
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
        <div className='mt-10 -rotate-5'>
          <div className='relative aspect-video h-[250px] w-[384px] rounded-4xl bg-white/15 p-6 shadow-2xl backdrop-blur'>
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
              <div className='inline-block h-6 w-16 rounded bg-white/25'></div>
              <div className='inline-block h-6 w-16 rounded bg-white/25'></div>
              <div className='inline-block h-6 w-16 rounded bg-white/25'></div>
            </div>

            <div className='absolute top-10 -left-10 -rotate-10 rounded-full bg-white px-4 py-6 shadow-lg'>
              <LightningIcon size={25} color='#FF6A00' weight='bold' />
            </div>

            {/* badge */}
            <div className='absolute -right-8 -bottom-4 flex rotate-9 items-center gap-1 rounded-full bg-white/10 px-4.5 py-3 text-xs font-semibold text-white shadow-lg'>
              <CheckCircleIcon className='text-green-300' size={25} />
              ATS Optimized
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className='mt-10 text-sm text-white/60'>© 2026 CV Builder Pro. Empowering the next generation of talent.</div>
      </section>

      {/* RIGHT WHITE */}
      <section className='flex flex-1 items-center justify-center bg-white'>
        <div className='flex w-112.5 flex-col'>
          <div className='mb-5'>
            {/* Title */}
            <h2 className='mb-2 text-3xl font-bold text-black/85'>Welcome Back</h2>

            <p className='mb-6 text-gray-500'>Please enter your credentials to access your workspace.</p>
          </div>

          {/*Social Login*/}
          <div className='mb-6 flex gap-4'>
            <Button
              onClick={handleGoogleLogin}
              className='flex-1 rounded-full border border-gray-400 bg-white py-6 hover:bg-gray-100'>
              <GoogleIcon />
              <span className='text-base font-semibold text-gray-700'>Google</span>
            </Button>
            <Button
              onClick={handleGithubLogin}
              className='flex-1 rounded-full border border-gray-400 bg-white py-6 hover:bg-gray-100'>
              <GithubIcon />
              <span className='text-base font-semibold text-gray-700'>Github</span>
            </Button>
          </div>

          <div className='mb-6 flex items-center gap-3'>
            <div className='h-px flex-1 bg-gray-200' />
            <span className='text-xs font-bold text-gray-500'>OR CONTINUE WITH EMAIL</span>
            <div className='h-px flex-1 bg-gray-200' />
          </div>

          <FieldSet className='mb-6 w-full'>
            <FieldGroup>
              <InputField
                id='email'
                label='Email Address'
                subLabel=''
                icon={<EnvelopeIcon className='absolute left-4 text-gray-400' weight='light' size={24} />}
                placeholder='name@career.com'
                type='email'
                onChange={(e: any) => setEmail(e.target.value)}
              />

              <InputField
                id='password'
                label='Password'
                subLabel='Forgot password?'
                icon={<LockKeyIcon className='absolute left-4 text-gray-400' weight='light' size={24} />}
                placeholder='Enter your password'
                type='password'
                onChange={(e: any) => setPassword(e.target.value)}
              />

              <Field orientation='horizontal'>
                <Checkbox
                  id='checkbox-login'
                  name='checkbox-login'
                  className='h-5 w-5 rounded-lg border-gray-400 bg-white data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500'
                />
                <FieldLabel className='cursor-pointer text-sm font-semibold text-gray-500' htmlFor='checkbox-login'>
                  Keep me logged in
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>

          {/* Button */}
          <Button
            onClick={handleLogin}
            className='w-full rounded-full bg-orange-500 py-6 text-base font-semibold text-white hover:bg-orange-500/80'>
            Sign In to Dashboard
          </Button>

          {/*Register*/}
          <Link to='/register' className='mt-6 text-center text-sm font-medium text-gray-500'>
            New here? <span className='cursor-pointer text-orange-500'>Create your professional account</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
