import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className='flex min-h-screen'>
      {/* LEFT SIDE */}
      <div className='hidden w-1/2 flex-col justify-between bg-orange-500 p-12 text-white lg:flex'>
        <div className='text-lg font-semibold'>CV Builder Pro</div>

        <div>
          <h1 className='text-5xl leading-tight font-bold'>Launch your career with a professional resume.</h1>

          <p className='mt-6 text-lg opacity-90'>
            The smartest way for students and junior developers to build a standout CV in minutes and land your dream job.
          </p>
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
