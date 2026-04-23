import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CommandIcon } from 'lucide-react';

import atsStandardImg from '@/assets/templates/ATS-standard.png';
import classicProfessionalImg from '@/assets/templates/classic-profession.png';
import corporateMinimalImg from '@/assets/templates/corporate-minimal.png';
import creativeBeigeImg from '@/assets/templates/creative-beige.png';
import editorialCreativeImg from '@/assets/templates/editorial-creative.png';
import modernSidebarImg from '@/assets/templates/modern-sidebar.png';

import { CVTemplateKey, TEMPLATE_OPTIONS } from '@/components/templates/template-registry';
import { NAV_PATH } from '@/router/router.constant';

// Map template IDs to imported images
const templateImageMap: Record<string, string> = {
  [CVTemplateKey.ATS_STANDARD]: atsStandardImg,
  [CVTemplateKey.CLASSIC_PROFESSIONAL]: classicProfessionalImg,
  [CVTemplateKey.CORPORATE_MINIMAL]: corporateMinimalImg,
  [CVTemplateKey.CV_CREATIVE_BEIGE]: creativeBeigeImg,
  [CVTemplateKey.EDITORIAL_CREATIVE]: editorialCreativeImg,
  [CVTemplateKey.MODERN_SIDEBAR]: modernSidebarImg,
};

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = TEMPLATE_OPTIONS.filter((t) => {
    const query = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(query) ||
      t.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      t.category.toLowerCase().includes(query)
    );
  });

  const handleUseTemplate = (id: string) => {
    navigate(`${NAV_PATH.APP.CREATE_CV}?template=${id}`);
  };

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
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className='flex flex-col overflow-hidden rounded-xl border border-gray-400 transition hover:shadow-md'>
            {/* IMAGE */}
            <div className='h-55 w-full'>
              <img
                src={templateImageMap[template.id] || `https://placehold.co/600x800/f1f5f9/64748b?text=${template.name}`}
                alt={template.name}
                className='h-full w-full object-cover object-top'
              />
            </div>

            <div className='flex flex-1 flex-col space-y-2 p-4'>
              {/* TITLE */}
              <h3 className='-mt-1 font-semibold'>{template.name}</h3>
              {/* TAGS (BADGE) */}
              <div className='flex flex-wrap gap-2'>
                <span className='rounded-md bg-orange-100 px-2 py-1 text-sm font-semibold text-orange-600'>
                  {template.category}
                </span>
                {template.tags.map((tag, i) => (
                  <span key={i} className='rounded-md bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-600'>
                    {tag}
                  </span>
                ))}
              </div>

              <div className='mt-auto pt-2'>
                <Button onClick={() => handleUseTemplate(template.id)} className='w-full'>
                  Use Template
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className='text-center text-sm text-gray-500'>Showing {filteredTemplates.length} curated templates</p>

      {/* SMART MATCH (FLOATING) */}
      {/* <div className='fixed right-6 bottom-6 w-72 space-y-3 rounded-xl bg-white p-4 shadow-lg'>
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
      </div> */}
    </div>
  );
}
