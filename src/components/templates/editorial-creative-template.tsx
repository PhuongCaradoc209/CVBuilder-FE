import type { ReactNode } from 'react';

import type { Certificate, Education, Experience, Info, Language, Skill } from '@/components/types/type';
import { formatDate } from '@/lib/utils';
import { TemplateAvatar } from './shared/TemplateAvatar';

export interface EditorialCreativeTemplateProps {
  info: Info;
  experiences?: Experience[];
  educations?: Education[];
  skills?: Skill[];
  certificates?: Certificate[];
  languages?: Language[];
  avatarUrl?: string;
  className?: string;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className='mb-4'>
      <h2 className='text-primary text-lg font-bold tracking-[0.18em] uppercase'>{children}</h2>
      <div className='bg-border mt-2 h-px w-full' />
    </div>
  );
}

function ContactRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className='text-muted-foreground flex items-start gap-2 text-sm leading-7'>
      <span className='text-foreground min-w-16 font-semibold'>{label}</span>
      <span className='break-all'>{value}</span>
    </div>
  );
}


function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length <= 1) {
    return {
      firstName: parts[0] ?? '',
      lastName: '',
    };
  }

  return {
    firstName: parts.slice(0, -1).join(' '),
    lastName: parts[parts.length - 1],
  };
}

function getProfileUrl(info: Info) {
  if (info.url?.trim()) return info.url;
  return info.socialLinks?.[0]?.url;
}

export default function EditorialCreativeTemplate({
  info,
  experiences = [],
  educations = [],
  skills = [],
  certificates = [],
  languages = [],
  avatarUrl,
  className,
}: EditorialCreativeTemplateProps) {
  const { firstName, lastName } = splitName(info.fullName);
  const profileUrl = getProfileUrl(info);

  const hasSummary = Boolean(info.summary?.trim());
  const hasExperiences = experiences.length > 0;
  const hasEducations = educations.length > 0;
  const hasSkills = skills.length > 0;
  const hasCertificates = certificates.length > 0;
  const hasLanguages = languages.length > 0;

  return (
    <div className={['mx-auto aspect-3/4 w-full max-w-6xl bg-zinc-100 shadow-lg', className].filter(Boolean).join(' ')}>
      <div className='grid gap-10 px-8 py-8 md:grid-cols-[1.15fr_0.85fr] md:px-12 md:py-10'>
        <div className='min-w-0'>
          <div className='border-border flex flex-col gap-8 border-b pb-8 lg:flex-col lg:items-start lg:justify-between'>
            <div className='min-w-0'>
              {firstName && <p className='text-foreground/85 text-2xl tracking-[0.32em] uppercase'>{firstName}</p>}

              <h1 className='text-foreground mt-2 text-6xl font-black tracking-tight uppercase sm:text-7xl'>
                {lastName || firstName}
              </h1>

              {info.jobTitle && (
                <p className='text-foreground mt-6 text-xl font-semibold tracking-[0.25em] uppercase'>{info.jobTitle}</p>
              )}
            </div>

            <div className='w-full max-w-xs'>
              <ContactRow label='Phone' value={info.phone} />
              <ContactRow label='Email' value={info.email} />
              <ContactRow label='Address' value={info.address} />
              <ContactRow label='URL' value={profileUrl} />
            </div>
          </div>

          <div className='space-y-8 pt-8'>
            {hasSummary && (
              <section>
                <SectionLabel>Profile</SectionLabel>
                <p className='text-muted-foreground text-lg leading-8 whitespace-pre-line'>{info.summary}</p>
              </section>
            )}

            {hasExperiences && (
              <section>
                <SectionLabel>Experience</SectionLabel>

                <div className='space-y-7'>
                  {experiences.map((experience, index) => (
                    <div
                      key={`${experience.companyName}-${experience.position}-${index}`}
                      className='border-primary/25 border-l-2 pl-5'>
                      <div className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
                        <div>
                          <h3 className='text-foreground text-[1.05rem] font-extrabold'>{experience.position}</h3>
                          <p className='text-foreground/85 text-xl'>{experience.companyName}</p>
                        </div>

                        <span className='text-muted-foreground text-lg font-medium'>
                          {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                        </span>
                      </div>

                      {experience.description && (
                        <p className='text-muted-foreground mt-3 text-base leading-7 whitespace-pre-line'>{experience.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {hasEducations && (
              <section>
                <SectionLabel>Education</SectionLabel>

                <div className='space-y-7'>
                  {educations.map((education, index) => (
                    <div
                      key={`${education.schoolName}-${education.major}-${index}`}
                      className='border-primary/25 border-l-2 pl-5'>
                      <div className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
                        <div>
                          <h3 className='text-foreground text-[1.05rem] font-extrabold'>{education.schoolName}</h3>
                          <p className='text-foreground/85 text-xl'>{education.major}</p>
                        </div>

                        <span className='text-muted-foreground text-lg font-medium'>
                          {formatDate(education.startDate)} - {formatDate(education.endDate)}
                        </span>
                      </div>

                      {education.description && (
                        <p className='text-muted-foreground mt-3 text-base leading-7 whitespace-pre-line'>{education.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {hasCertificates && (
              <section>
                <SectionLabel>Certifications</SectionLabel>

                <div className='space-y-5'>
                  {certificates.map((certificate, index) => (
                    <div
                      key={`${certificate.name}-${certificate.issuer}-${index}`}
                      className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
                      <div>
                        <h3 className='text-foreground text-[1.05rem] font-extrabold'>{certificate.name}</h3>
                        <p className='text-muted-foreground text-lg'>{certificate.issuer}</p>
                        {certificate.url && <p className='text-primary mt-1 text-sm break-all'>{certificate.url}</p>}
                      </div>

                      <span className='text-muted-foreground text-lg font-medium'>{formatDate(certificate.issueDate)}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <aside className='space-y-8'>
          <div className='bg-card overflow-hidden rounded-sm shadow-sm'>
            <TemplateAvatar
              src={avatarUrl}
              fullName={info.fullName}
              className='aspect-4/5 w-full object-cover'
              fallbackClassName='bg-muted text-foreground/55 flex aspect-4/5 w-full items-center justify-center text-3xl font-bold tracking-[0.25em] uppercase'
            />
          </div>

          {hasSkills && (
            <section>
              <SectionLabel>Skills</SectionLabel>

              <ul className='text-foreground space-y-2 text-lg'>
                {skills.map((skill, index) => (
                  <li key={`${skill.skillName}-${index}`} className='ml-5 list-disc'>
                    {skill.skillName}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasLanguages && (
            <section>
              <SectionLabel>Languages</SectionLabel>

              <ul className='text-foreground space-y-2 text-lg'>
                {languages.map((language, index) => (
                  <li key={`${language.languageName}-${index}`} className='ml-5 list-disc'>
                    <span>{language.languageName}</span>
                    {language.level && <span className='text-muted-foreground ml-2'>({language.level})</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
