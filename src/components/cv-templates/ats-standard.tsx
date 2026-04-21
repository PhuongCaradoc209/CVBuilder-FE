// import type { CVData, Certificate, Education, Experience, Info, Language, Skill } from '@/components/types/type';
import type { Certificate, Education, Experience, Info, Language, Skill } from '@/components/types/type';

export interface ATSStandardTemplateProps {
  info: Info;
  experiences?: Experience[];
  educations?: Education[];
  skills?: Skill[];
  certificates?: Certificate[];
  languages?: Language[];
  className?: string;
}

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className='mb-3 text-2xl font-bold tracking-wider uppercase'>{title}</h2>
);

const Divider = () => <hr className='my-7 border-t-2 border-black/80' />;

export default function ATSStandardTemplate({
  info,
  experiences = [],
  educations = [],
  skills = [],
  certificates = [],
  className,
}: ATSStandardTemplateProps) {
  return (
    <div
      className={['mx-auto aspect-[3/4] w-full max-w-5xl bg-white p-24 font-sans text-black', className]
        .filter(Boolean)
        .join(' ')}>
      {/* Header */}
      <div>
        <h1 className='mb-4 text-6xl font-bold'>{info.fullName}</h1>
        <div className='text-lg'>
          <div className='flex flex-wrap items-center gap-2'>
            {info.phone && <span>{info.phone}</span>}
            {info.phone && (info.email || info.url) && <span>&middot;</span>}
            {info.email && <span>{info.email}</span>}
            {info.email && info.url && <span>&middot;</span>}
            {info.url && <span>{info.url}</span>}
          </div>
          {info.address && <div className='mt-0.5'>{info.address}</div>}
        </div>
      </div>

      {/* Summary / Business Management & Analysis */}
      {info.summary && (
        <>
          <Divider />
          <div>
            <SectionHeader title='Business Management & Analysis' />
            <p className='text-justify text-lg'>{info.summary}</p>
          </div>
        </>
      )}

      {/* Skills / Key Competencies */}
      {skills.length > 0 && (
        <>
          <Divider />
          <div>
            <SectionHeader title='Key Competencies' />
            <div className='grid grid-cols-3 gap-x-4 text-lg'>
              {skills.map((skill, idx) => (
                <div key={idx}>
                  {skill.skillName} {skill.level ? `- ${skill.level}` : ''}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Experience / Professional Experience */}
      {experiences.length > 0 && (
        <>
          <Divider />
          <div>
            <SectionHeader title='Professional Experience' />
            <div className='flex flex-col gap-5'>
              {experiences.map((exp, idx) => (
                <div key={idx} className='text-lg'>
                  <div className='flex justify-between font-bold'>
                    <span>{exp.companyName}</span>
                    <span>
                      {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}
                    </span>
                  </div>
                  <div className='mb-1 font-bold'>{exp.position}</div>
                  <p className='text-justify'>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Education & Certifications */}
      {(educations.length > 0 || certificates.length > 0) && (
        <>
          <Divider />
          <div className='grid grid-cols-[1fr_1px_1fr] gap-6 text-[13px]'>
            {/* Education Column */}
            <div className='flex flex-col'>
              <SectionHeader title='Education' />
              <div className='flex flex-col gap-4 text-lg'>
                {educations.map((edu, idx) => (
                  <div key={idx}>
                    <div className='font-bold'>{edu.major || edu.schoolName}</div>
                    {edu.major && <div>{edu.schoolName}</div>}
                    {(edu.startDate || edu.endDate) && (
                      <div className='mt-0.5'>
                        {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}
                      </div>
                    )}
                    {edu.description && <p className='mt-1 leading-relaxed whitespace-pre-line'>{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Divider */}
            <div className='h-full w-full bg-black/85'></div>

            {/* Certifications Column */}
            <div className='ml-4 flex flex-col'>
              <SectionHeader title='Certifications' />
              <div className='flex flex-col gap-4 text-lg'>
                {certificates.map((cert, idx) => (
                  <div key={idx}>
                    <div className='font-bold'>{cert.name}</div>
                    <div>{cert.issuer}</div>
                    {(cert.issueDate || cert.expiryDate) && (
                      <div className='mt-0.5'>
                        {cert.issueDate} {cert.expiryDate ? `- ${cert.expiryDate}` : ''}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// export const mockATSData: CVData = {
//   info: {
//     fullName: 'Henrietta Mitchell',
//     jobTitle: '',
//     email: 'hello@reallygreatsite.com',
//     phone: '+123-456-7890',
//     address: '123 Anywhere St., Any City, ST 12345',
//     url: '@reallygreatsite',
//     summary:
//       'Motivated and results-driven Business School graduate seeking a challenging position within a large organisation as a Business Analyst or Project Manager. Offering a strong foundation in business strategy, data analysis, and project management, with a proven ability to drive efficiency, deliver successful outcomes and collaborate within cross-functional teams.',
//   },
//   skills: [
//     { skillName: 'Process improvement' },
//     { skillName: 'Data-driven strategic planning' },
//     { skillName: 'Cost-benefit analysis' },
//     { skillName: 'Report writing and presenting' },
//     { skillName: 'Critical thinking skills' },
//     { skillName: 'Excellent communication skills' },
//     { skillName: 'Strong interpersonal skills' },
//     { skillName: 'Proactive and self-motivated' },
//     { skillName: 'Exceptional organisational skills' },
//   ],
//   experiences: [
//     {
//       companyName: 'Arowwai Industries',
//       position: 'Business Analyst Intern',
//       startDate: 'Oct 2023',
//       endDate: 'Present',
//       description:
//         'Developed and implemented a streamlined process for gathering business requirements, reducing project delivery time by 15%. Developed and implemented a standardised reporting framework, resulting in improved visibility of key performance metrics and enabling data-driven decision-making at all levels of the organisation.',
//     },
//     {
//       companyName: 'Hanover and Tyke',
//       position: 'Project Management Assistant',
//       startDate: 'Jan 2022',
//       endDate: 'Aug 2023',
//       description:
//         'Assisted project managers in planning and executing various projects, ensuring adherence to project timelines and deliverables. Monitored project budgets, tracked expenses, and prepared financial reports to ensure cost-effectiveness and adherence to financial guidelines.',
//     },
//     {
//       companyName: 'Giggling Platypus Co.',
//       position: 'Barista',
//       startDate: 'July 2020',
//       endDate: 'Jan 2022',
//       description:
//         'Prepared and served a variety of beverages with precision and creativity, consistently meeting or exceeding quality standards, and receiving compliments for latte art and presentation.',
//     },
//   ],
//   educations: [
//     {
//       schoolName: 'Ginyard International Co.',
//       major: 'Bachelor of Business Administration',
//       startDate: '',
//       endDate: '',
//       description: 'Majors: Analytics and Project Management',
//     },
//   ],
//   certificates: [
//     {
//       name: 'Graduate Project Management Certification',
//       issuer: 'Ginyard International Co.',
//       issueDate: '',
//     },
//     {
//       name: 'Impact Evaluation Methods 3-Day Short Course',
//       issuer: 'Liceria & Co.',
//       issueDate: '',
//     },
//   ],
// };
