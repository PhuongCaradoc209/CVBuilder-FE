import React from 'react';
import { Plus, FileText, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ResumeCard from '@/components/common/ResumeCard';

const RECENT_RESUMES = [
  {
    id: 1,
    title: 'Senior Product Designer',
    updated: 'Edited 2 days ago',
    template: 'Modern Template',
    image: 'src/assets/Background.png',
    isStarred: true,
  },
  {
    id: 2,
    title: 'Full Stack Engineer',
    updated: 'Edited 5 hours ago',
    template: 'Technical Template',
    image: 'src/assets/Background (1).png',
    isStarred: false,
  },
  {
    id: 3,
    title: 'Marketing Director',
    updated: 'Edited 1 week ago',
    template: 'Creative Template',
    image: 'src/assets/Background (2).png',
    isStarred: true,
  },
];

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, size = 110, strokeWidth = 12 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  const center = size / 2;
  const gradientId = `orangeGradient-${value}`;

  return (
    <div className='relative flex items-center justify-center' style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className='-rotate-90 transform'>
        <defs>
          <linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#FF6B00' />
            <stop offset='100%' stopColor='#FF8C00' />
          </linearGradient>
        </defs>
        <circle
          className='text-[#F1F5F9]'
          strokeWidth={strokeWidth}
          stroke='currentColor'
          fill='transparent'
          r={radius}
          cx={center}
          cy={center}
        />
        <circle
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
          fill='transparent'
          r={radius}
          cx={center}
          cy={center}
          className='transition-all duration-700 ease-in-out'
        />
      </svg>
      <div className='absolute flex flex-col items-center justify-center'>
        <span className='text-3xl font-black tracking-tighter text-[#0F172A]'>{value}%</span>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div className='relative min-h-screen bg-[#F8FAFC] p-8 md:p-14'>
      <div className='mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-start'>
        <div className='flex-1'>
          <h1 className='text-[40px] leading-tight font-black tracking-tight text-[#0F172A]'>Welcome back, Alex! 👋</h1>
          <p className='mt-4 max-w-2xl text-[18px] leading-relaxed font-medium text-[#64748B]'>
            You're making great progress. Your professional portfolio is currently 80% complete and ready for the next
            opportunity.
          </p>
        </div>

        <div className='relative w-full md:mt-4 md:w-[400px]'>
          <Search className='absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-[#94A3B8]' />
          <input
            type='text'
            placeholder='Search resumes, templates...'
            className='h-[56px] w-full rounded-full border border-[#E2E8F0] bg-white pr-6 pl-14 text-[16px] font-medium text-[#0F172A] shadow-sm outline-none transition-all focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]'
          />
        </div>
      </div>

      <div className='mb-16 grid grid-cols-1 gap-10 md:grid-cols-3'>
        <div className='group flex h-[220px] cursor-pointer flex-col items-center justify-center rounded-[40px] border-[3px] border-dashed border-[#FED7AA] bg-[#FFFBF8] shadow-sm transition-all hover:border-[#FF6B00] hover:bg-[#FFF7ED] hover:shadow-md'>
          <div className='mb-4 rounded-[24px] bg-[#FFEDD5] p-4 transition-transform group-hover:scale-110'>
            <Plus className='h-8 w-8 text-[#FF6B00]' strokeWidth={3} />
          </div>
          <p className='text-[22px] font-black text-[#0F172A]'>Create New CV</p>
          <p className='mt-1 px-8 text-center text-[15px] font-semibold text-[#64748B]'>
            Start from scratch or pick a designer template
          </p>
        </div>

        <Card className='h-[220px] rounded-[40px] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]'>
          <CardContent className='flex h-full items-center justify-between p-12'>
            <div className='space-y-3'>
              <p className='text-[14px] font-black tracking-[0.15em] text-[#94A3B8] uppercase'>Total Resumes</p>
              <h2 className='text-[64px] leading-none font-black tracking-tighter text-[#0F172A]'>03</h2>
            </div>
            <div className='rounded-[28px] bg-[#FFF7ED] p-6'>
              <FileText className='h-10 w-10 text-[#FF6B00]' strokeWidth={2.5} />
            </div>
          </CardContent>
        </Card>

        <Card className='h-[220px] rounded-[40px] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]'>
          <CardContent className='flex h-full items-center justify-between gap-4 p-8'>
            <CircularProgress value={80} size={100} strokeWidth={10} />
            <div className='flex-1 space-y-1'>
              <p className='text-[13px] leading-tight font-black tracking-[0.15em] text-[#94A3B8] uppercase'>
                Profile Completion
              </p>
              <p className='text-[13px] leading-tight font-bold text-[#475569]'>Almost there!</p>
              <p className='cursor-pointer text-[12px] font-black text-[#FF6B00] uppercase transition-all hover:underline'>
                Complete Now
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-10 pb-24'>
        <div className='flex items-center justify-between px-2'>
          <h2 className='text-[28px] font-black tracking-tight text-[#0F172A]'>Recent Resumes</h2>
          <button className='text-[17px] font-black text-[#FF6B00] transition-opacity hover:opacity-80'>
            View All &gt;
          </button>
        </div>

        <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
          {RECENT_RESUMES.map((resume) => (
            <ResumeCard
              key={resume.id}
              title={resume.title}
              updated={resume.updated}
              template={resume.template}
              image={resume.image}
              isStarred={resume.isStarred}
            />
          ))}
        </div>
      </div>

      <button className='fixed bottom-8 left-8 z-50 flex items-center gap-2 rounded-full bg-[#FF6B00] px-5 py-2.5 text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#FF8C00] active:scale-95'>
        <Plus size={18} strokeWidth={3} />
        Create New CV
      </button>
    </div>
  );
};

export default DashboardPage;