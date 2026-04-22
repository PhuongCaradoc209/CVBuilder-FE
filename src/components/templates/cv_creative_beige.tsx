import type { Certificate, Education, Experience, Info, Language, Skill } from '@/components/types/type';
import { formatDate } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface EditorialCreativeTemplateProps {
  info: Info;
  experiences?: Experience[];
  educations?: Education[];
  skills?: Skill[];
  certificates?: Certificate[];
  languages?: Language[];
  className?: string;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className='mb-5'>
      <h2 className='text-[1.1rem] font-bold tracking-[0.25em] text-[#8B6B5C] uppercase'>{children}</h2>
      <div className='mt-2 h-px w-full bg-[#CBB8A8]' />
    </div>
  );
}

function ImageFallback({ fullName }: { fullName: string }) {
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

  return (
    <div className='flex aspect-[4/5] w-full items-center justify-center bg-[#D8C7B7] text-[3rem] font-bold text-[#6B5B53]'>
      {initials || 'CV'}
    </div>
  );
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { firstName: parts[0] ?? '', lastName: '' };
  return {
    firstName: parts.slice(0, -1).join(' '),
    lastName: parts[parts.length - 1],
  };
}

export default function CVCreativeBeigeTemplate({
  info,
  experiences = [],
  educations = [],
  skills = [],
  certificates = [],
  languages = [],
  className,
}: EditorialCreativeTemplateProps) {
  const { firstName, lastName } = splitName(info.fullName);

  return (
    <div className={['mx-auto w-full max-w-[1000px] rounded-xl bg-[#F4EDE7] p-10 shadow-2xl', className].join(' ')}>
      {/* HEADER */}
      <div className='grid grid-cols-[1fr_2fr] items-start gap-12'>
        {/* IMAGE */}
        <div>
          {info.imgUrl ? (
            <img src={info.imgUrl} alt={info.fullName} className='aspect-[4/5] w-full border-2 border-[#CBB8A8] object-cover' />
          ) : (
            <ImageFallback fullName={info.fullName} />
          )}
        </div>

        {/* RIGHT HEADER */}
        <div className='flex flex-col'>
          {/* NAME BLOCK */}
          <div className='relative h-[160px]'>
            {/* LAST NAME */}
            <h1 className='text-[5.5rem] leading-none font-extrabold tracking-wide text-[#8B6B5C] uppercase'>{lastName}</h1>

            {/* SCRIPT NAME */}
            <h2
              className='absolute top-[70px] left-[20px] text-[3.5rem] text-[#3A2E2A]'
              style={{ fontFamily: "'Great Vibes', cursive" }}>
              {firstName}
            </h2>
          </div>

          {/* JOB */}
          <p className='mt-2 text-[1rem] font-semibold tracking-[0.3em] text-[#6B5B53] uppercase'>{info.jobTitle}</p>

          {/* SUMMARY */}
          <p className='mt-5 text-[1rem] leading-relaxed text-[#4A3F3A]'>{info.summary}</p>

          {/* CONTACT */}
          <div className='mt-8 grid grid-cols-3 gap-10 text-[0.95rem]'>
            <div>
              <p className='font-bold italic'>Email</p>
              <p>{info.email}</p>
            </div>
            <div>
              <p className='font-bold italic'>Phone</p>
              <p>{info.phone}</p>
            </div>
            <div>
              <p className='font-bold italic'>Address</p>
              <p>{info.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className='mt-14 grid grid-cols-[1fr_1.6fr] gap-14'>
        {/* LEFT */}
        <div>
          <SectionLabel>Education</SectionLabel>
          <ul className='space-y-4 text-[1rem]'>
            {educations.map((edu, i) => (
              <li key={i}>
                <span className='font-bold'>• {edu.schoolName}</span>
                <div className='text-[#6B5B53]'>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)} | {edu.major}
                </div>
              </li>
            ))}
          </ul>

          <div className='mt-10'>
            <SectionLabel>Skills</SectionLabel>
            <ul className='space-y-2 text-[1rem]'>
              {skills.map((s, i) => (
                <li key={i}>• {s.skillName}</li>
              ))}
            </ul>
          </div>

          <div className='mt-10'>
            <SectionLabel>Languages</SectionLabel>
            <ul className='space-y-2 text-[1rem]'>
              {languages.map((l, i) => (
                <li key={i}>
                  {l.languageName} ({l.level})
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <SectionLabel>Experience</SectionLabel>

          <div className='relative pl-12'>
            {/* TIMELINE */}
            <div className='absolute top-0 bottom-0 left-5 w-px border-l border-dashed border-[#8B6B5C]' />

            <div className='space-y-12'>
              {experiences.map((exp, i) => (
                <div key={i} className='relative'>
                  {/* BADGE */}
                  <div className='absolute left-5 -translate-x-1/2 rounded-full bg-[#3A2E2A] px-4 py-1 text-[0.85rem] text-white'>
                    {formatDate(exp.startDate)}
                  </div>

                  <div className='ml-18'>
                    <p className='text-[1.1rem] font-bold'>{exp.companyName}</p>
                    <p className='font-semibold text-[#6B5B53]'>{exp.position}</p>

                    <ul className='mt-3 space-y-2 text-[0.95rem] text-[#4A3F3A]'>
                      {exp.description?.split('\n').map((line, idx) => (
                        <li key={idx}>• {line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-12'>
            <SectionLabel>Certifications</SectionLabel>
            {certificates.map((c, i) => (
              <div key={i} className='mb-4'>
                <p className='text-[1rem] font-bold'>{c.name}</p>
                <p className='text-[0.95rem] text-[#6B5B53]'>
                  {c.issuer} · {formatDate(c.issueDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className='mt-10 text-right text-[0.85rem] text-[#8B6B5C] italic'>@reallygreatsite</div>
    </div>
  );
}
