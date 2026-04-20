import type { ReactNode } from 'react';

import type { Education, Experience, Info, Skill } from '@/components/types/type';

export interface ClassicProfessionalTemplateProps {
  info: Info;
  experiences?: Experience[];
  educations?: Education[];
  skills?: Skill[];
  avatarUrl?: string;
  className?: string;
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className='mb-5 flex items-center gap-4'>
      <h2 className='text-foreground shrink-0 text-[15px] font-extrabold tracking-[0.18em] uppercase'>{children}</h2>
      <div className='bg-border h-px flex-1' />
    </div>
  );
}

function HeaderSeparator() {
  return <span className='text-background/35 hidden md:inline'>|</span>;
}

function DateRange({ startDate, endDate }: { startDate?: string; endDate?: string }) {
  const value = startDate || endDate ? `${startDate ?? ''}${startDate || endDate ? ' - ' : ''}${endDate ?? ''}` : '';

  if (!value.trim()) return null;

  return <div className='text-muted-foreground w-full shrink-0 text-sm font-semibold md:w-36'>{value}</div>;
}

function AvatarFallback({ fullName }: { fullName: string }) {
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <div className='border-background/25 bg-background/10 text-background flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[5px] text-2xl font-bold'>
      {initials || 'CV'}
    </div>
  );
}

export default function ClassicProfessionalTemplate({
  info,
  experiences = [],
  educations = [],
  skills = [],
  avatarUrl,
  className,
}: ClassicProfessionalTemplateProps) {
  const hasSummary = Boolean(info.summary?.trim());
  const hasEducations = educations.length > 0;
  const hasExperiences = experiences.length > 0;
  const hasSkills = skills.length > 0;

  return (
    <div
      className={['bg-card mx-auto aspect-3/4 w-full max-w-5xl overflow-hidden shadow-lg', className].filter(Boolean).join(' ')}>
      <header className='bg-foreground text-background px-8 py-10 sm:px-12'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center'>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={info.fullName}
              className='border-background/25 h-28 w-28 shrink-0 rounded-full border-[5px] object-cover'
            />
          ) : (
            <AvatarFallback fullName={info.fullName} />
          )}

          <div className='min-w-0 flex-1'>
            <h1 className='text-4xl font-extrabold tracking-wide sm:text-5xl'>{info.fullName}</h1>

            {info.jobTitle && <p className='text-background/85 mt-2 text-xl font-medium tracking-wide'>{info.jobTitle}</p>}

            <div className='bg-background/25 mt-4 h-px w-full' />

            <div className='text-background/80 mt-4 flex flex-col gap-2 text-sm md:flex-row md:flex-wrap md:items-center md:gap-x-4'>
              {info.phone && <span>{info.phone}</span>}
              {info.phone && info.email && <HeaderSeparator />}
              {info.email && <span className='break-all'>{info.email}</span>}
              {(info.phone || info.email) && info.address && <HeaderSeparator />}
              {info.address && <span>{info.address}</span>}
              {(info.phone || info.email || info.address) && info.url && <HeaderSeparator />}
              {info.url && <span className='break-all'>{info.url}</span>}
            </div>
          </div>
        </div>
      </header>

      <main className='space-y-12 px-8 py-10 sm:px-12'>
        {hasSummary && (
          <section>
            <SectionHeading>About Me</SectionHeading>
            <p className='text-muted-foreground text-lg leading-8'>{info.summary}</p>
          </section>
        )}

        {hasEducations && (
          <section>
            <SectionHeading>Education</SectionHeading>

            <div className='space-y-8'>
              {educations.map((education, index) => (
                <div
                  key={`${education.schoolName}-${education.major}-${index}`}
                  className='flex flex-col gap-3 md:flex-row md:gap-8'>
                  <DateRange startDate={education.startDate} endDate={education.endDate} />

                  <div className='flex-1'>
                    <h3 className='text-foreground text-[1.05rem] font-extrabold'>{education.schoolName}</h3>

                    <p className='text-foreground/85 mt-1 text-lg'>{education.major}</p>

                    {education.description && (
                      <p className='text-muted-foreground mt-3 text-base leading-7'>{education.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {hasExperiences && (
          <section>
            <SectionHeading>Work Experience</SectionHeading>

            <div className='space-y-8'>
              {experiences.map((experience, index) => (
                <div
                  key={`${experience.companyName}-${experience.position}-${index}`}
                  className='flex flex-col gap-3 md:flex-row md:gap-8'>
                  <DateRange startDate={experience.startDate} endDate={experience.endDate} />

                  <div className='flex-1'>
                    <h3 className='text-foreground text-[1.05rem] font-extrabold'>{experience.position}</h3>

                    <p className='text-foreground/85 mt-1 text-lg'>{experience.companyName}</p>

                    {experience.description && (
                      <p className='text-muted-foreground mt-3 text-base leading-7'>{experience.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {hasSkills && (
          <section>
            <SectionHeading>Skills</SectionHeading>

            <ul className='text-foreground columns-1 gap-x-10 text-base sm:columns-2 lg:columns-3'>
              {skills.map((skill, index) => (
                <li key={`${skill.skillName}-${index}`} className='mb-3 ml-5 list-disc break-inside-avoid'>
                  {skill.skillName}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
