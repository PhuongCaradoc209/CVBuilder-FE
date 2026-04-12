import { useMemo, useState } from 'react';

import { CVGrid, type CV } from '@/components/my-cvs/cv-grid';
import { FilterBar } from '@/components/my-cvs/filter-bar';
import { FloatingCreateButton } from '@/components/my-cvs/floating-create-button';
import { PageHeader } from '@/components/my-cvs/page-header';
import { PaginationBar } from '@/components/my-cvs/pagination-bar';

const PAGE_SIZE = 8;

const mockCvs: CV[] = [
  {
    id: '1',
    title: 'Product Designer CV',
    status: 'DRAFT',
    lastEdited: '2 hours ago',
    rating: 5,
    tag: 'work',
    template: 'modern',
    updatedAtOrder: 2,
    previewStyle: 'orange',
  },
  {
    id: '2',
    title: 'Backend Engineer CV',
    status: 'FINAL',
    lastEdited: '1 day ago',
    rating: 5,
    tag: 'work',
    template: 'classic',
    updatedAtOrder: 24,
    previewStyle: 'paper',
  },
  {
    id: '3',
    title: 'Project Manager CV',
    status: 'FINAL',
    lastEdited: '3 days ago',
    rating: 4,
    tag: 'work',
    template: 'classic',
    updatedAtOrder: 72,
    previewStyle: 'dark',
  },
  {
    id: '4',
    title: 'Marketing Lead CV',
    status: 'DRAFT',
    lastEdited: '1 week ago',
    rating: 5,
    tag: 'freelance',
    template: 'creative',
    updatedAtOrder: 168,
    previewStyle: 'orange',
  },
  {
    id: '5',
    title: 'CEO Executive CV',
    status: 'FINAL',
    lastEdited: '2 weeks ago',
    rating: 5,
    tag: 'work',
    template: 'classic',
    updatedAtOrder: 336,
    previewStyle: 'beige',
  },
  {
    id: '6',
    title: 'Fullstack Developer',
    status: 'DRAFT',
    lastEdited: '1 month ago',
    rating: 4,
    tag: 'personal',
    template: 'modern',
    updatedAtOrder: 720,
    previewStyle: 'dark',
  },
  {
    id: '7',
    title: 'Data Scientist CV',
    status: 'FINAL',
    lastEdited: '2 months ago',
    rating: 5,
    tag: 'work',
    template: 'modern',
    updatedAtOrder: 1440,
    previewStyle: 'navy',
  },
  {
    id: '8',
    title: 'Content Strategist',
    status: 'DRAFT',
    lastEdited: '3 months ago',
    rating: 4,
    tag: 'freelance',
    template: 'classic',
    updatedAtOrder: 2160,
    previewStyle: 'slate',
  },
  {
    id: '9',
    title: 'UI Designer Portfolio CV',
    status: 'FINAL',
    lastEdited: '4 months ago',
    rating: 5,
    tag: 'personal',
    template: 'creative',
    updatedAtOrder: 2880,
    previewStyle: 'orange',
  },
  {
    id: '10',
    title: 'Junior Frontend Resume',
    status: 'DRAFT',
    lastEdited: '5 months ago',
    rating: 4,
    tag: 'work',
    template: 'modern',
    updatedAtOrder: 3600,
    previewStyle: 'paper',
  },
];

export default function MyCvsPage() {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('all');
  const [template, setTemplate] = useState('all');
  const [sortBy, setSortBy] = useState('last-edited');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCvs = useMemo(() => {
    let result = [...mockCvs];

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
      result.sort((a, b) => a.updatedAtOrder - b.updatedAtOrder);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, tag, template, sortBy]);

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

      <CVGrid cvs={currentItems} />

      <PaginationBar currentPage={safeCurrentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <FloatingCreateButton />
    </div>
  );
}
