import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useMemo, useState } from 'react';

import { CVGrid, type CV } from '@/components/my-cvs/cv-grid';
import { type PreviewStyle } from '@/components/my-cvs/cv-card';
import { FilterBar } from '@/components/my-cvs/filter-bar';
import { FloatingCreateButton } from '@/components/my-cvs/floating-create-button';
import { PageHeader } from '@/components/my-cvs/page-header';
import { PaginationBar } from '@/components/my-cvs/pagination-bar';
import { Skeleton } from '@/components/ui/skeleton';
import { cvService } from '@/services/cv.service';

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

const PAGE_SIZE = 8;

const PREVIEW_STYLES: PreviewStyle[] = ['orange', 'paper', 'dark', 'beige', 'navy', 'slate'];
const TAGS: ('work' | 'freelance' | 'personal')[] = ['work', 'freelance', 'personal'];

export default function MyCvsPage() {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('all');
  const [template, setTemplate] = useState('all');
  const [sortBy, setSortBy] = useState('last-edited');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cvs'],
    queryFn: () => cvService.getAll(),
  });

  const cvs = useMemo(() => {
    if (!apiResponse?.success || !apiResponse.data) return [];

    return apiResponse.data.map((item, index): CV => {
      const updatedAt = parseISO(item.updatedAt);

      return {
        id: item._id,
        title: item.cvTitle || 'Untitled CV',
        status: (item.status?.toUpperCase() as 'DRAFT' | 'FINAL' | 'COMPLETED') || 'DRAFT',
        lastEdited: formatDistanceToNow(updatedAt, { addSuffix: true }),
        rating: 5,
        tag: TAGS[index % TAGS.length],
        template: 'modern',
        updatedAtOrder: updatedAt.getTime(),
        previewStyle: PREVIEW_STYLES[index % PREVIEW_STYLES.length],
        image: TEMPLATE_THUMBNAILS[item.templateId || ''] || modernSidebarImg,
      };
    });
  }, [apiResponse]);

  const filteredCvs = useMemo(() => {
    let result = [...cvs];

    if (search.trim()) {
      const keyword = search.trim().toLowerCase();
      result = result.filter((cv) => cv.title.toLowerCase().includes(keyword));
    }

    if (tag !== 'all') {
      result = result.filter((cv) => cv.tag === tag);
    }

    if (template !== 'all') {
      result = result.filter((cv) => cv.template === template);
    }

    if (sortBy === 'last-edited') {
      result.sort((a, b) => b.updatedAtOrder - a.updatedAtOrder);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [cvs, search, tag, template, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredCvs.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const currentItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
    return filteredCvs.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredCvs, safeCurrentPage]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleTagChange = (value: string) => {
    setTag(value);
    setCurrentPage(1);
  };

  const handleTemplateChange = (value: string) => {
    setTemplate(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  if (isError) {
    return (
      <div className='mx-auto w-full max-w-[1440px] px-4 py-12 text-center'>
        <h2 className='text-2xl font-bold text-red-600'>Something went wrong</h2>
        <p className='mt-2 text-slate-600'>Failed to load your CVs. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className='mx-auto w-full max-w-[1440px]'>
      <PageHeader />

      <FilterBar
        totalCount={filteredCvs.length}
        currentCount={currentItems.length}
        onSearchChange={handleSearchChange}
        onTagChange={handleTagChange}
        onTemplateChange={handleTemplateChange}
        onSortChange={handleSortChange}
      />

      {isLoading ? (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='h-[400px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
              <Skeleton className='h-56 w-full rounded-xl' />
              <Skeleton className='mt-4 h-6 w-3/4' />
              <Skeleton className='mt-2 h-4 w-1/2' />
              <div className='mt-auto flex justify-between pt-6'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='size-8 rounded-full' />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CVGrid cvs={currentItems} />
      )}

      <PaginationBar currentPage={safeCurrentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <FloatingCreateButton />
    </div>
  );
}
