import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CaretDownIcon, CommandIcon } from '@phosphor-icons/react';

const templates = [
  {
    title: 'Modern Minimalist',
    tags: ['ATS-friendly', '1 column'],
    image: 'https://tse4.mm.bing.net/th/id/OIP.pU0aNhi8bY5nJWvPtxBmzgHaKe?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    title: 'Executive Pro',
    tags: ['Corporate', 'Multi-page'],
    image: 'img2.png',
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
  {
    title: 'Student Starter',
    tags: ['Entry level', '1 column'],
    image: 'img7.png',
  },
  {
    title: 'The Editorial',
    tags: ['Premium', 'Serif'],
    image: 'img8.png',
  },
];

export default function TemplatesPage() {
  return (
    <div className='space-y-10 px-8 pb-8'>
      {/* HERO */}
      <div>
        <p className='mb-2 font-medium text-orange-400'>CURATED COLLECTION</p>
        <h1 className='text-4xl font-semibold'>Explore CV Templates</h1>
        <p className='text-muted-foreground mt-2 max-w-xl'>
          Find the perfect design for your dream job. Each template is meticulously crafted to pass ATS filters and impress hiring
          managers.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className='flex flex-col gap-4 md:flex-row'>
        <Input placeholder='Search by job title or keyword...' />

        <Select>
          <SelectTrigger className='font-semibold data-[placeholder]:text-black/80'>
            <SelectValue placeholder='Industry' />
          </SelectTrigger>
          <SelectContent className='border border-gray-300'>
            <SelectItem value='tech'>Tech</SelectItem>
            <SelectItem value='business'>Business</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className='font-semibold data-[placeholder]:text-black/80'>
            <SelectValue placeholder='Style' />
          </SelectTrigger>
          <SelectContent className='border border-gray-300'>
            <SelectItem value='modern'>Modern</SelectItem>
            <SelectItem value='classic'>Classic</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className='font-semibold data-[placeholder]:text-black/80'>
            <SelectValue placeholder='Color Theme' />
          </SelectTrigger>
          <SelectContent className='border border-gray-300'>
            <SelectItem value='dark'>Dark</SelectItem>
            <SelectItem value='light'>Light</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {templates.map((item, index) => (
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

      {/* LOAD MORE */}
      {/* LOAD MORE */}
      <div className='flex flex-col items-center justify-center space-y-2 pt-4'>
        <Button className='h-auto bg-gray-200 !px-10 py-3 text-base font-semibold text-black/80 shadow-none hover:bg-gray-300'>
          Load More Templates
          <CaretDownIcon size={32} weight='bold' />
        </Button>
        <p className='text-sm text-gray-400'>Showing 8 of 124 curated templates</p>
      </div>

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
