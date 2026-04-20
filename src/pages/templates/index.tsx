import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CommandIcon } from '@phosphor-icons/react';
import modernSidebarImg from '@/assets/templates/modern-sidebar.jpeg';
import atsStandardImg from '@/assets/templates/ats-standard.jpeg';

const templates = [
  {
    title: 'Modern Sidebar',
    tags: ['Professional', 'Two-column'],
    image: modernSidebarImg,
  },
  {
    title: 'ATS Standard',
    tags: ['Simple', 'Professional'],
    image: atsStandardImg,
  },
  {
    title: 'Creative Spark',
    tags: ['Designer', 'Portfolio'],
    image: 'img3.png',
  },
  {
    title: 'Academic Classic',
    tags: ['Traditional', 'Multi-page'],
    image: 'img4.png',
  },
  {
    title: 'Software Engineer',
    tags: ['Technical', 'ATS-optimized'],
    image: 'img5.png',
  },
  {
    title: 'Marketing Guru',
    tags: ['Visual', 'Modern'],
    image: 'img6.png',
  },
];

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter((t) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = t.title.toLowerCase().includes(query);
    const tagMatch = t.tags.some((tag) => tag.toLowerCase().includes(query));
    return titleMatch || tagMatch;
  });

  return (
    <div className='space-y-10 px-8 pb-8'>
      {/* HERO */}
      <div>
        <p className='mb-2 font-medium text-orange-400'>CURATED COLLECTION</p>
        <h1 className='text-4xl font-bold'>Explore CV Templates</h1>
        <p className='text-muted-foreground mt-2 max-w-xl'>
          Find the perfect design for your dream job. Each template is meticulously crafted to pass ATS filters and impress hiring
          managers.
        </p>
      </div>

      <Input
        placeholder='Search by job title or keyword...'
        className='w-[500px] border border-gray-300'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredTemplates.map((item, index) => (
          <div key={index} className='flex flex-col overflow-hidden rounded-xl border border-gray-400 transition hover:shadow-md'>
            {/* IMAGE */}
            <div className='h-55 w-full'>
              <img src={item.image} alt={item.title} className='h-full w-full object-cover' />
            </div>

            <div className='flex flex-1 flex-col space-y-2 p-4'>
              {/* TITLE */}
              <h3 className='-mt-1 font-semibold'>{item.title}</h3>
              {/* TAGS (BADGE) */}
              <div className='flex flex-wrap gap-2'>
                {item.tags.map((tag, i) => (
                  <span key={i} className='rounded-md bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-600'>
                    {tag}
                  </span>
                ))}
              </div>

              <div className='mt-auto pt-2'>
                <Button className='w-full'>Use Template</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className='text-center text-sm text-gray-500'>Showing {filteredTemplates.length} curated templates</p>

      {/* SMART MATCH (FLOATING) */}
      <div className='fixed right-6 bottom-6 w-72 space-y-3 rounded-xl bg-white p-4 shadow-lg'>
        <div className='flex items-center gap-3 font-semibold'>
          <CommandIcon className='rounded-lg bg-orange-100 p-1 text-orange-500' size={40} />
          <div>
            AI Smart Match
            <p className='text-muted-foreground text-sm'>Recommended for you</p>
          </div>
        </div>
        <p className='text-muted-foreground py-2 text-sm'>
          Based on your profile, the Software Engineer template has a 94% match rate for your target roles.
        </p>
        <Button className='w-full'>Apply Smart Filter</Button>
      </div>
    </div>
  );
}
