import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import googleIcon from '@/assets/google.svg';
import githubIcon from '@/assets/github.png';

import { User, Mail, Lock, Eye } from 'lucide-react';

export default function RegisterForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register submitted');
  };

  return (
    <div className='w-full max-w-[448px]'>
      {/* TITLE */}
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold text-gray-900'>Create your account</h1>

        <p className='mt-2 text-gray-500'>Start building your professional future today.</p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* SOCIAL LOGIN */}
        <div className='flex gap-4'>
          <Button type='button' variant='outline' className='flex flex-1 items-center justify-center gap-2'>
            <img src={googleIcon} alt='google' className='h-4 w-4' />
            Google
          </Button>

          <Button type='button' variant='outline' className='flex flex-1 items-center justify-center gap-2'>
            <img src={githubIcon} alt='github' className='h-4 w-4' />
            GitHub
          </Button>
        </div>

        {/* DIVIDER */}
        <div className='flex items-center'>
          <div className='flex-1 border-t'></div>

          <span className='px-3 text-xs text-gray-400'>OR REGISTER WITH EMAIL</span>

          <div className='flex-1 border-t'></div>
        </div>

        {/* FULL NAME */}
        <div className='space-y-2'>
          <Label>Full Name</Label>

          <div className='relative'>
            <User className='absolute top-3.5 left-3 h-4 w-4 text-gray-400' />

            <Input placeholder='John Doe' className='pl-10' />
          </div>
        </div>

        {/* EMAIL */}
        <div className='space-y-2'>
          <Label>Email Address</Label>

          <div className='relative'>
            <Mail className='absolute top-3.5 left-3 h-4 w-4 text-gray-400' />

            <Input type='email' placeholder='name@company.com' className='pl-10' />
          </div>
        </div>

        {/* PASSWORD */}
        <div className='space-y-2'>
          <Label>Password</Label>

          <div className='relative'>
            <Lock className='absolute top-3.5 left-3 h-4 w-4 text-gray-400' />

            <Input type='password' placeholder='Min. 8 characters' className='pr-10 pl-10' />

            <Eye className='absolute top-3.5 right-3 h-4 w-4 cursor-pointer text-gray-400' />
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className='space-y-2'>
          <Label>Confirm Password</Label>

          <div className='relative'>
            <Lock className='absolute top-3.5 left-3 h-4 w-4 text-gray-400' />

            <Input type='password' placeholder='Repeat password' className='pl-10' />
          </div>
        </div>

        {/* TERMS */}
        <div className='flex items-start gap-2 text-sm'>
          <Checkbox />

          <p className='text-gray-500'>
            I agree to the
            <span className='mx-1 cursor-pointer text-orange-500'>Terms of Service</span>
            and
            <span className='ml-1 cursor-pointer text-orange-500'>Privacy Policy</span>
          </p>
        </div>

        {/* SUBMIT BUTTON */}
        <Button type='submit' className='h-12 w-full rounded-full bg-orange-500 text-base text-white hover:bg-orange-600'>
          Create Account
        </Button>
      </form>

      {/* SIGN IN */}
      <p className='mt-6 text-center text-sm text-gray-500'>
        Already have an account?
        <span className='ml-1 cursor-pointer text-orange-500'>Sign in</span>
      </p>
    </div>
  );
}
