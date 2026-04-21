import type { ReactNode } from 'react';

import type { Certificate, Education, Experience, Info, Language, Skill } from '@/components/types/type';

export interface ClassicProfessionalTemplateProps {
  info: Info;
  experiences?: Experience[];
  educations?: Education[];
  skills?: Skill[];
  certificates?: Certificate[];
  languages?: Language[];
  className?: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className='mb-4'>
      <h2 className='text-[1rem] font-bold tracking-[0.25em] text-[#444] uppercase'>{children}</h2>
      <div className='mt-2 h-px w-full bg-[#bbb]' />
    </div>
  );
}

function getProfileUrl(info: Info) {
  if (info.url?.trim()) return info.url;
  return info.socialLinks?.[0]?.url;
}

// ─── Template ─────────────────────────────────────────────────────────────────

export default function ClassicProfessionalTemplate({
  info,
  experiences = [],
  educations = [],
  skills = [],
  certificates = [],
  languages = [],
  className,
}: ClassicProfessionalTemplateProps) {
  const profileUrl = getProfileUrl(info);

  const nameParts = info.fullName.trim().split(/\s+/).filter(Boolean);
  const lastName = nameParts.slice(-1)[0] ?? '';
  const firstName = nameParts.slice(0, -1).join(' ');

  const hasSummary = Boolean(info.summary?.trim());
  const hasExperiences = experiences.length > 0;
  const hasEducations = educations.length > 0;
  const hasSkills = skills.length > 0;
  const hasCertificates = certificates.length > 0;
  const hasLanguages = languages.length > 0;

  return (
    <div className={['mx-auto w-full max-w-[900px] rounded-lg bg-white px-10 py-8 shadow-xl', className].join(' ')}>
      {/* TOP LINE */}
      <div className='mb-8 h-[2px] w-full bg-[#888]' />

      {/* HEADER */}
      <header className='relative pb-8 text-center'>
        {/* WATERMARK SCRIPT */}
        <span
          className='pointer-events-none absolute inset-0 flex items-center justify-center text-[6rem] italic opacity-10 select-none'
          style={{ fontFamily: "'Great Vibes', cursive" }}>
          {firstName}
        </span>

        {/* NAME */}
        <h1 className='text-[2.4rem] font-bold tracking-[0.2em] text-[#333] uppercase'>{info.fullName}</h1>

        {/* JOB */}
        {info.jobTitle && <p className='mt-2 text-[1rem] tracking-[0.25em] text-[#666] uppercase'>{info.jobTitle}</p>}
      </header>

      {/* BOTTOM LINE HEADER */}
      <div className='mb-8 h-[2px] w-full bg-[#888]' />

      {/* BODY */}
      <div className='grid grid-cols-[1fr_2fr] gap-10'>
        {/* LEFT */}
        <aside className='space-y-8 border-r border-[#ccc] pr-8'>
          {/* CONTACT */}
          <section>
            <SectionHeading>Contact</SectionHeading>
            <div className='space-y-3 text-[0.95rem] text-[#444]'>
              {info.phone && <SideRow label='📞' value={info.phone} />}
              {info.email && <SideRow label='✉' value={info.email} />}
              {info.address && <SideRow label='📍' value={info.address} />}
              {profileUrl && <SideRow label='🌐' value={profileUrl} />}
            </div>
          </section>

          {hasEducations && (
            <section>
              <SectionHeading>Education</SectionHeading>
              <div className='space-y-4 text-[0.95rem]'>
                {educations.map((edu, i) => (
                  <div key={i}>
                    <p className='font-semibold text-[#333]'>
                      {edu.startDate} - {edu.endDate}
                    </p>
                    <p className='font-bold text-[#333] uppercase'>{edu.schoolName}</p>
                    <p className='text-[#666]'>{edu.major}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasSkills && (
            <section>
              <SectionHeading>Skills</SectionHeading>
              <ul className='space-y-2 text-[0.95rem] text-[#444]'>
                {skills.map((skill, i) => (
                  <li key={i}>• {skill.skillName}</li>
                ))}
              </ul>
            </section>
          )}

          {hasLanguages && (
            <section>
              <SectionHeading>Languages</SectionHeading>
              <ul className='space-y-2 text-[0.95rem] text-[#444]'>
                {languages.map((lang, i) => (
                  <li key={i}>
                    {lang.languageName} ({lang.level})
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* RIGHT */}
        <main className='space-y-8 pl-6'>
          {hasSummary && (
            <section>
              <SectionHeading>Profile Summary</SectionHeading>
              <p className='text-[0.95rem] leading-relaxed text-[#555]'>{info.summary}</p>
            </section>
          )}

          {hasExperiences && (
            <section>
              <SectionHeading>Work Experience</SectionHeading>

              <div className='space-y-6 text-[0.95rem]'>
                {experiences.map((exp, i) => (
                  <div key={i}>
                    <div className='flex items-start justify-between gap-4'>
                      <div>
                        <p className='text-[1rem] font-bold text-[#333]'>{exp.companyName}</p>
                        <p className='text-[#555]'>{exp.position}</p>
                      </div>
                      <span className='whitespace-nowrap text-[#777]'>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>

                    <ul className='mt-3 space-y-2 text-[#555]'>
                      {exp.description?.split('\n').map((line, idx) => (
                        <li key={idx}>• {line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasCertificates && (
            <section>
              <SectionHeading>Certifications</SectionHeading>
              <div className='space-y-3 text-[0.95rem]'>
                {certificates.map((cert, i) => (
                  <div key={i}>
                    <p className='font-bold text-[#333]'>{cert.name}</p>
                    <p className='text-[#666]'>
                      {cert.issuer} · {cert.issueDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SideRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex items-start gap-2'>
      <span>{label}</span>
      <span className='break-all'>{value}</span>
    </div>
  );
}
