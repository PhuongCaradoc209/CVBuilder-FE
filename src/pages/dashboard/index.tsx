import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, FileText, Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ResumeCard from '@/components/common/ResumeCard';
import { AppConfirmModal } from '@/components/common/AppConfirmModal';
import { cvService } from '@/services/cv.service';
import { NAV_PATH } from '@/router/router.constant';
import { TEMPLATE_OPTIONS } from '@/components/templates/template-registry';

// Import template thumbnails
import atsStandardImg from '@/assets/templates/ATS-standard.png';
import classicProfessionImg from '@/assets/templates/classic-profession.png';
import corporateMinimalImg from '@/assets/templates/corporate-minimal.png';
import creativeBeigeImg from '@/assets/templates/creative-beige.png';
import editorialCreativeImg from '@/assets/templates/editorial-creative.png';
import modernSidebarImg from '@/assets/templates/modern-sidebar.png';

const TEMPLATE_THUMBNAILS: Record<string, string> = {
  'ats-standard': atsStandardImg,
  'classic-professional-template': classicProfessionImg,
  'corporate_minimal': corporateMinimalImg,
  'cv_creative_beige': creativeBeigeImg,
  'editorial-creative-template': editorialCreativeImg,
  'modern-sidebar': modernSidebarImg,
};

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
            <stop offset='0%' stopColor='var(--primary)' />
            <stop offset='100%' stopColor='var(--primary)' stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <circle
          className='text-secondary'
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
        <span className='text-3xl font-bold tracking-tighter text-neutral-900'>{value}%</span>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [cvIdToDelete, setCvIdToDelete] = useState<string | null>(null);

  const { data: cvResponse, isLoading } = useQuery({
    queryKey: ['cvs'],
    queryFn: () => cvService.getAll(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => cvService.delete(id),
    onSuccess: () => {
      toast.success('CV deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['cvs'] });
      setIsConfirmOpen(false);
      setCvIdToDelete(null);
    },
    onError: () => {
      toast.error('Failed to delete CV');
    },
  });

  const cvList = cvResponse?.data || [];
  const recentResumes = cvList.slice(0, 4);

  const handleCreateNew = () => {
    navigate(NAV_PATH.APP.CREATE_CV);
  };

  const handleEditCV = (id: string) => {
    navigate(NAV_PATH.APP.EDIT_CV.replace(':id', id));
  };

  const handleDeleteCV = (id: string) => {
    setCvIdToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (cvIdToDelete) {
      deleteMutation.mutate(cvIdToDelete);
    }
  };

  return (
    <div className='bg-background relative min-h-screen p-8 md:p-14'>
      <div className='mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-start'>
        <div className='flex-1'>
          <h1 className='text-[40px] leading-tight font-bold tracking-tight text-neutral-900'>Welcome back! 👋</h1>
          <p className='mt-4 max-w-2xl text-[18px] leading-relaxed font-normal text-gray-400'>
            You're making great progress. Your professional portfolio is currently ready for the next opportunity.
          </p>
        </div>

        <div className='relative w-full md:mt-4 md:w-[400px]'>
          <Search className='absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-gray-400' />
          <Input
            type='text'
            placeholder='Search resumes, templates...'
            className='focus-visible:ring-primary h-[56px] w-full rounded-full pr-6 pl-14 text-[16px] font-medium text-neutral-900 shadow-sm transition-all focus-visible:ring-1'
          />
        </div>
      </div>

      <div className='mb-16 grid grid-cols-1 gap-10 md:grid-cols-3'>
        <div
          onClick={handleCreateNew}
          className='group border-primary/20 bg-primary/5 hover:border-primary hover:bg-primary/10 flex h-[220px] cursor-pointer flex-col items-center justify-center rounded-[40px] border-[3px] border-dashed shadow-sm transition-all hover:shadow-md'>
          <div className='bg-primary/20 mb-4 rounded-[24px] p-4 transition-transform group-hover:scale-110'>
            <Plus className='text-primary h-8 w-8' strokeWidth={3} />
          </div>
          <p className='text-[22px] font-bold text-neutral-900'>Create New CV</p>
          <p className='mt-1 px-8 text-center text-[15px] font-normal text-gray-400'>
            Start from scratch or pick a designer template
          </p>
        </div>

        <Card className='bg-card h-[220px] rounded-[40px] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]'>
          <CardContent className='flex h-full items-center justify-between p-12'>
            <div className='space-y-3'>
              <p className='text-[14px] font-semibold tracking-[0.15em] text-gray-400 uppercase'>Total Resumes</p>
              <h2 className='text-[64px] leading-none font-bold tracking-tighter text-neutral-900'>
                {isLoading ? (
                  <Loader2 className='h-10 w-10 animate-spin text-gray-200' />
                ) : (
                  cvList.length.toString().padStart(2, '0')
                )}
              </h2>
            </div>
            <div className='bg-primary/10 rounded-[28px] p-6'>
              <FileText className='text-primary h-10 w-10' strokeWidth={2.5} />
            </div>
          </CardContent>
        </Card>

        <Card className='bg-card h-[220px] rounded-[40px] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]'>
          <CardContent className='flex h-full items-center justify-between gap-4 p-8'>
            <CircularProgress value={80} size={100} strokeWidth={10} />
            <div className='flex-1 space-y-1'>
              <p className='text-[13px] leading-tight font-semibold tracking-[0.15em] text-gray-400 uppercase'>
                Profile Completion
              </p>
              <p className='text-[13px] leading-tight font-bold text-neutral-900'>Almost there!</p>
              <p className='text-primary cursor-pointer text-[12px] font-semibold uppercase transition-all hover:underline'>
                Complete Now
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-10 pb-24'>
        <div className='flex items-center justify-between px-2'>
          <h2 className='text-[28px] font-bold tracking-tight text-neutral-900'>Recent Resumes</h2>
          <button
            onClick={() => navigate(NAV_PATH.APP.MY_CVS)}
            className='text-primary cursor-pointer text-[17px] font-semibold transition-opacity hover:opacity-80'>
            View All &gt;
          </button>
        </div>

        {isLoading ? (
          <div className='flex h-40 items-center justify-center'>
            <Loader2 className='text-primary h-10 w-10 animate-spin' />
          </div>
        ) : recentResumes.length > 0 ? (
          <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
            {recentResumes.map((resume) => (
              <ResumeCard
                key={resume._id}
                id={resume._id}
                title={resume.cvTitle}
                updated={`Updated ${new Date(resume.updatedAt).toLocaleDateString()}`}
                template={TEMPLATE_OPTIONS.find(t => t.id === resume.templateId)?.name || 'Modern Sidebar'}
                image={TEMPLATE_THUMBNAILS[resume.templateId] || modernSidebarImg}
                isStarred={false}
                onClick={() => handleEditCV(resume._id)}
                onDelete={() => handleDeleteCV(resume._id)}
              />
            ))}
          </div>
        ) : (
          <div className='bg-muted/50 flex flex-col items-center justify-center rounded-[40px] py-20'>
            <FileText className='mb-4 h-12 w-12 text-gray-300' />
            <p className='text-gray-400'>No resumes found yet. Create your first one!</p>
            <button onClick={handleCreateNew} className='text-primary mt-2 font-semibold hover:underline'>
              Create New CV
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleCreateNew}
        className='bg-primary text-primary-foreground hover:bg-primary/90 fixed bottom-8 left-8 z-50 flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-bold shadow-lg transition-all active:scale-95'>
        <Plus size={18} strokeWidth={3} />
        Create New CV
      </button>

      <AppConfirmModal
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title='Delete CV'
        description='Are you sure you want to delete this CV? This action cannot be undone.'
        onConfirm={confirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default DashboardPage;
