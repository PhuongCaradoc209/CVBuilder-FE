import React from 'react';
import { Download, Trash2, Star } from 'lucide-react';

interface ResumeCardProps {
  title: string;
  updated: string;
  template: string;
  image: string;
  isStarred: boolean;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ title, updated, template, image, isStarred }) => {
  return (
    <div className='group flex flex-col overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl'>
      {/* Thumbnail Section */}
      <div className='relative aspect-[16/9] overflow-hidden bg-[#F1F5F9]'>
        <img
          src={image}
          alt={title}
          className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
        />
        <div className='absolute top-4 right-4'>
          <button className='flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-white active:scale-90'>
            <Star className={`h-5 w-5 ${isStarred ? 'fill-[#FF6B00] text-[#FF6B00]' : 'text-slate-300'}`} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className='flex flex-1 flex-col p-8'>
        <h3 className='text-[22px] font-black tracking-tight text-[#0F172A]'>{title}</h3>
        <div className='mb-8 flex items-center gap-2 text-[15px] font-bold text-[#94A3B8]'>
          <span>{updated}</span>
          <span className='text-slate-200'>•</span>
          <span>{template}</span>
        </div>

        {/* Action Buttons */}
        <div className='mt-auto grid grid-cols-2 gap-5'>
          <button className='flex h-[50px] items-center justify-center gap-2 rounded-xl border border-slate-200 text-[15px] font-black text-slate-600 transition-all hover:bg-slate-50 active:scale-95'>
            <Download size={18} strokeWidth={2.5} /> PDF
          </button>
          <button className='flex h-[50px] items-center justify-center gap-2 rounded-xl border border-slate-200 text-[15px] font-black text-slate-400 transition-all hover:border-red-100 hover:bg-red-50 hover:text-red-500 active:scale-95'>
            <Trash2 size={18} strokeWidth={2.5} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
