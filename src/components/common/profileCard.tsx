import { GraduationCapIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Experience {
  role: string;
  company: string;
  time: string;
}

interface Education {
  degree: string;
  school: string;
}

interface User {
  avatarUrl: string;
  name: string;
  title: string;
  experience: Experience[];
  education: Education[];
}

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className='border-none text-center shadow-md'>
      <CardHeader>
        <img src={user.avatarUrl} className='mx-auto h-28 w-28 rounded-xl' />
        <CardTitle className='text-2xl font-bold'>{user.name}</CardTitle>
        <p className='text-primary mx-auto -mt-1.5 w-fit rounded-lg bg-orange-50 p-0.5 px-4 text-center font-semibold'>
          {user.title}
        </p>
      </CardHeader>

      <CardContent className='space-y-4 text-left'>
        <div>
          <p className='text-muted-foreground text-xs font-semibold'>EXPERIENCE</p>
          {user.experience.map((exp, i) => {
            const colors = ['bg-slate-800', 'bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-orange-500', 'bg-rose-500'];
            const bg = colors[i % colors.length];

            return (
              <div key={i} className='flex gap-3'>
                <div
                  className='mt-3.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md'
                  style={{
                    backgroundColor: {
                      'bg-slate-800': '#1e293b',
                      'bg-blue-500': '#3b82f6',
                      'bg-violet-500': '#8b5cf6',
                      'bg-emerald-500': '#10b981',
                      'bg-orange-500': '#f97316',
                      'bg-rose-500': '#f43f5e',
                    }[bg],
                  }}>
                  <span className='text-sm font-bold text-white'>{exp.company.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className='mt-2 font-medium'>{exp.role}</p>
                  <p className='text-muted-foreground text-sm'>
                    {exp.company} • {exp.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <p className='text-muted-foreground text-xs font-semibold'>EDUCATION</p>
          {user.education.map((edu, i) => (
            <div key={i} className='flex gap-2'>
              <GraduationCapIcon size={38} color='#F5824A' className='mt-3.5 rounded-md border border-none bg-orange-100 p-2' />
              <div>
                <p className='mt-2 font-medium'>{edu.degree}</p>
                <p className='text-muted-foreground text-sm'>{edu.school}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
