import React from 'react';
import type { CVData } from '../types/type';

interface Props {
  data: CVData;
}

const ModernSidebarTemplate: React.FC<Props> = ({ data }) => {
  return (
    <div className='flex aspect-3/4 max-w-5xl bg-white font-sans text-gray-800'>
      {/* SIDEBAR */}
      <div className='flex w-1/3 flex-col gap-5.5 bg-gray-100 p-7'>
        {/* Profile Image */}
        <div className='mb-8 flex justify-center pt-14'>
          <div className='h-48 w-48 overflow-hidden rounded-full border-white shadow-sm'>
            <img src={data.info.imgUrl} alt='Profile' className='h-full w-full object-cover' />
          </div>
        </div>

        {/* About Me */}
        <section>
          <h2 className='mb-4 border-b-2 border-gray-400 py-2 text-2xl font-bold'>About Me</h2>
          <p className='text-justify text-base text-gray-700'>{data.info.summary}</p>
        </section>

        {/* Skills */}
        <section>
          <h2 className='mb-4 border-b-2 border-gray-400 py-2 text-2xl font-bold'>Skills</h2>
          <ul className='ml-5 list-disc text-base text-gray-700'>
            {data.skills.map((skill, index) => (
              <li key={index}>{skill.skillName}</li>
            ))}
          </ul>
        </section>

        {/* Certificates */}
        <section>
          <h2 className='mb-4 border-b-2 border-gray-400 py-2 text-2xl font-bold'>Rewards</h2>
          <div className='space-y-2'>
            {data.certificates.map((cert, index) => (
              <div key={index}>
                <p className='text-base text-gray-700'>
                  {cert.issueDate} | {cert.issuer}
                </p>
                <p className='font-semibold'>{cert.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section>
          <h2 className='mb-4 border-b-2 border-gray-400 py-2 text-2xl font-bold'>Languages</h2>
          <div className='flex flex-col space-y-2 text-base text-gray-700'>
            {data.languages.map((language, index) => (
              <p key={index}>{language.languageName}</p>
            ))}
          </div>
        </section>
      </div>

      {/* MAIN */}
      <div className='flex w-2/3 flex-col gap-2 px-12 pt-25'>
        {/* Header */}
        <header className='mb-8'>
          <h1 className='text-5xl font-bold tracking-widest text-gray-800 uppercase'>{data.info.fullName}</h1>
          <p className='mt-2 text-xl font-semibold tracking-wide text-gray-700'>{data.info.jobTitle}</p>

          <div className='text-md mt-10 flex flex-wrap gap-x-10 gap-y-4'>
            <div>
              <p className='font-bold text-gray-800'>Phone</p>
              <p className='text-gray-600'>{data.info.phone}</p>
            </div>
            <div>
              <p className='font-bold text-gray-800'>Email</p>
              <p className='text-gray-600'>{data.info.email}</p>
            </div>
            <div>
              <p className='font-bold text-gray-800'>Address</p>
              <p className='text-gray-600'>{data.info.address}</p>
            </div>
          </div>
        </header>

        {/* Experience */}
        <section>
          <h2 className='mb-4 border-b py-2 text-2xl font-bold'>Experience</h2>

          {data.experiences.map((exp, index) => (
            <div key={index} className='mb-5'>
              <div className='flex justify-between text-lg font-bold text-black/85'>
                <h3>{exp.position}</h3>
                <span>
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className='text-md mb-1.5 font-bold text-black/85'>{exp.companyName}</p>
              <p className='text-base text-gray-700'>{exp.description}</p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h2 className='mb-4 border-b py-2 text-2xl font-bold'>Education</h2>

          {data.educations.map((edu, index) => (
            <div key={index} className='mb-5'>
              <div className='flex justify-between text-lg font-bold text-black/85'>
                <h3>{edu.major}</h3>
                <span>
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className='text-md mb-1.5 font-bold text-black/85'>{edu.schoolName}</p>
              <p className='text-base text-gray-700'>{edu.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

// export default ModernSidebarTemplate;

// export const mockCVData: CVData = {
//   info: {
//     fullName: 'Lorna Alvarado',
//     jobTitle: 'Digital Marketing Specialist',
//     email: 'hello@reallygreatsite.com',
//     phone: '+123-456-7890',
//     address: '123 Anywhere St., Any City',
//     imgUrl: 'https://www.shareicon.net/data/512x512/2016/07/26/802043_man_512x512.png',
//     summary:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat. Mauris convallis, mi at mattis malesuada, neque nulla volutpat dolor, hendrerit faucibus eros nibh ut nunc. Proin luctus urna id nunc sagittis dignissim. Sed in libero sed libero dictum dapibus. Vivamus fermentum est eget lorem aliquet, vel tempus metus dignissim. Donec risus arcu',
//   },

//   skills: [
//     { skillName: 'Web Design' },
//     { skillName: 'Branding' },
//     { skillName: 'Graphic Design' },
//     { skillName: 'SEO' },
//     { skillName: 'Marketing' },
//     { skillName: 'Copywriting & Story writing' },
//   ],

//   experiences: [
//     {
//       companyName: 'Larana Inc, Branding',
//       position: 'Social Media Manager',
//       startDate: '2019',
//       endDate: '2022',
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat. Mauris convallis, mi at mattis malesuada, neque nulla volutpat dolor, hendrerit faucibus eros nibh ut nunc.',
//     },
//     {
//       companyName: 'Larana Inc, Branding',
//       position: 'Digital Marketing Manager',
//       startDate: '2017',
//       endDate: '2019',
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat. Mauris convallis, mi at mattis malesuada, neque nulla volutpat dolor, hendrerit faucibus eros nibh ut nunc.',
//     },
//     {
//       companyName: 'Larana Inc, Branding',
//       position: 'Digital Marketing Manager',
//       startDate: '2015',
//       endDate: '2017',
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat. Mauris convallis, mi at mattis malesuada, neque nulla volutpat dolor, hendrerit faucibus eros nibh ut nunc.',
//     },
//   ],

//   educations: [
//     {
//       schoolName: 'Fauget University',
//       major: 'Master Of Marketing and Business',
//       startDate: '2011',
//       endDate: '2014',
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat. Mauris convallis, mi at mattis malesuada, neque nulla volutpat dolor, hendrerit faucibus eros nibh ut nunc. Proin luctus urna i',
//     },
//     {
//       schoolName: 'Fauget University',
//       major: 'Master Of Marketing and Business',
//       startDate: '2011',
//       endDate: '2014',
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat. Mauris convallis, mi at mattis malesuada, neque nulla volutpat dolor, hendrerit faucibus eros nibh ut nunc. Proin luctus urna i',
//     },
//   ],

//   certificates: [
//     {
//       name: 'Best Employee of the Year',
//       issuer: 'Liceria & Co.',
//       issueDate: 'Oct 2019',
//     },
//     {
//       name: 'Best Employee of the Year',
//       issuer: 'Liceria & Co.',
//       issueDate: 'Oct 2017',
//     },
//   ],

//   languages: [{ languageName: 'English' }, { languageName: 'Vietnamese' }],
// };
