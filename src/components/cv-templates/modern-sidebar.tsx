import React from 'react';

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  description: string;
}

export interface Reward {
  date: string;
  company: string;
  title: string;
}

export interface CVData {
  avatar: string;
  name: string;
  jobTitle: string;
  phone: string;
  email: string;
  address: string;
  aboutMe: string;
  skills: string[];
  rewards: Reward[];
  languages: string[];
  experiences: Experience[];
  education: Education[];
}

interface Props {
  data: CVData;
}

const ModernSidebarTemplate: React.FC<Props> = ({ data }) => {
  return (
    <div className='mx-auto flex min-h-[1120px] max-w-4xl bg-white font-sans text-gray-800 shadow-2xl'>
      {/* SIDEBAR */}
      <div className='flex w-1/3 flex-col gap-8 bg-gray-100 p-8'>
        {/* Profile Image */}
        <div className='mb-4 flex justify-center pt-8'>
          <div className='h-48 w-48 overflow-hidden rounded-full border-white shadow-sm'>
            <img src={data.avatar} alt='Profile' className='h-full w-full object-cover' />
          </div>
        </div>

        {/* About Me */}
        <section>
          <h2 className='mb-3 border-b-2 border-gray-400 pb-1 text-xl font-bold tracking-wider uppercase'>About Me</h2>
          <p className='text-justify text-sm leading-relaxed text-gray-600'>{data.aboutMe}</p>
        </section>

        {/* Skills */}
        <section>
          <h2 className='mb-3 border-b-2 border-gray-400 pb-1 text-xl font-bold tracking-wider uppercase'>Skills</h2>
          <ul className='ml-5 list-disc space-y-1 text-sm text-gray-600'>
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        {/* Reward */}
        <section>
          <h2 className='mb-3 border-b-2 border-gray-400 pb-1 text-xl font-bold tracking-wider uppercase'>Reward</h2>
          <div className='space-y-4'>
            {data.rewards.map((reward, index) => (
              <div key={index} className='text-sm'>
                <p className='text-xs text-gray-500'>
                  {reward.date} | {reward.company}
                </p>
                <p className='font-bold'>{reward.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section>
          <h2 className='mb-3 border-b-2 border-gray-400 pb-1 text-xl font-bold tracking-wider uppercase'>Languages</h2>
          <ul className='space-y-1 text-sm text-gray-600'>
            {data.languages.map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* MAIN CONTENT */}
      <div className='flex w-2/3 flex-col gap-10 bg-white p-12'>
        {/* Header Section */}
        <header className='pt-8'>
          <h1 className='mb-1 text-5xl font-black tracking-tighter text-gray-900 uppercase'>{data.name}</h1>
          <p className='mb-8 text-lg font-medium tracking-[0.2em] text-gray-600 uppercase'>{data.jobTitle}</p>

          <div className='grid grid-cols-3 gap-4 text-xs font-semibold uppercase'>
            <div>
              <p className='text-gray-900'>Phone</p>
              <p className='font-normal text-gray-500 normal-case'>{data.phone}</p>
            </div>
            <div>
              <p className='text-gray-900'>Email</p>
              <p className='font-normal text-gray-500 normal-case'>{data.email}</p>
            </div>
            <div>
              <p className='text-gray-900'>Address</p>
              <p className='font-normal text-gray-500 normal-case'>{data.address}</p>
            </div>
          </div>
        </header>

        {/* Experience Section */}
        <section>
          <h2 className='mb-6 border-b-2 border-gray-300 pb-1 text-2xl font-bold tracking-widest uppercase'>Experience</h2>
          <div className='flex flex-col gap-8'>
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className='mb-1 flex items-baseline justify-between'>
                  <h3 className='font-extrabold text-gray-900'>{exp.title}</h3>
                  <span className='font-bold text-gray-900'>{exp.period}</span>
                </div>
                <h4 className='mb-2 font-bold text-gray-700 underline decoration-gray-300 underline-offset-4'>{exp.company}</h4>
                <p className='text-justify text-sm leading-relaxed text-gray-600'>{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className='mb-6 border-b-2 border-gray-300 pb-1 text-2xl font-bold tracking-widest uppercase'>Education</h2>
          <div className='flex flex-col gap-8'>
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className='mb-1 flex items-baseline justify-between'>
                  <h3 className='font-extrabold text-gray-900'>{edu.degree}</h3>
                  <span className='font-bold text-gray-900'>{edu.period}</span>
                </div>
                <h4 className='mb-2 font-bold text-gray-700'>{edu.school}</h4>
                <p className='text-justify text-sm leading-relaxed text-gray-600'>{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModernSidebarTemplate;

export const mockCVData: CVData = {
  avatar: 'https://www.shareicon.net/data/512x512/2016/07/26/802043_man_512x512.png',
  name: 'Lorna Alvarado',
  jobTitle: 'Digital Marketing Specialist',
  phone: '+123-456-7890',
  email: 'hello@reallygreatsite.com',
  address: '123 Anywhere St., Any City',
  aboutMe:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum.',
  skills: ['Web Design', 'Branding', 'Graphic Design', 'SEO', 'Marketing'],
  rewards: [{ date: 'Oct 2019', company: 'Liceria & Co.', title: 'The Best Employee of the Year' }],
  languages: ['English', 'French'],
  experiences: [
    {
      id: '1',
      title: 'Social Media Manager',
      company: 'Larana Inc, Branding',
      period: '2019 - 2022',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet.',
    },
  ],
  education: [
    {
      id: '1',
      degree: 'Master Of Marketing and Business',
      school: 'Fauget University',
      period: '2011 - 2014',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet.',
    },
  ],
};
