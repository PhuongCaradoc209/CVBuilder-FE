import { Camera, GraduationCapIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { InfoResponse } from '@/services/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '../ui/input';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { storeService } from '@/services/store.service';
import { userService } from '@/services/user.service';
import { toast } from 'sonner';

interface ProfileCardProps {
  user: InfoResponse;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const queriesClient = useQueryClient();

  const createImageUrl = useMutation({
    mutationFn: ({ url, publicId }: any) => userService.createImageUrl({ url, publicId }),
    onSuccess: () => {
      queriesClient.invalidateQueries({ queryKey: ['userProfile'] });
      toast.success('Avatar updated successfully!');
    },
    onError: (error) => {
      console.error('Error creating image URL:', error);
      toast.error('Failed to update avatar.');
    },
  });

  const uploadImage = useMutation({
    mutationFn: (image: any) => storeService.uploadImage(image),
    onSuccess: (data) => {
      createImageUrl.mutate({ url: data.url, publicId: data.publicId });
    },
    onError: (error) => {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image.');
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage.mutate(file);
    }
  };
  return (
    <Card className='border-none text-center shadow-md'>
      <div className='relative'>
        <CardHeader>
          <Avatar className='relative mx-auto h-28 w-28 rounded-xl border-2 border-white shadow-md'>
            <AvatarImage src={user.avatarUrl !== 'Not provided' ? user.avatarUrl : undefined} className='object-cover' />

            {/* Fallback sẽ hiện khi: Đang load ảnh, Ảnh lỗi, hoặc không có src */}
            <AvatarFallback className='rounded-xl bg-orange-100 text-2xl font-bold text-orange-600'>
              {user.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'U'}
            </AvatarFallback>
            <div className='absolute top-0 left-0 h-28 w-28 bg-black/0 p-1 text-transparent hover:bg-black/60 hover:text-orange-600'>
              <label htmlFor='avatarUpload' className='cursor-pointer'>
                <Input type='file' accept='image/*' className='hidden' id='avatarUpload' onChange={handleFileUpload} />
                <Camera size={20} className='mx-auto mt-9' />
              </label>
            </div>
          </Avatar>

          <CardTitle className='text-2xl font-bold'>{user.fullName}</CardTitle>
          <p className='text-primary mx-auto -mt-1.5 w-fit rounded-lg bg-orange-50 p-0.5 px-4 text-center font-semibold'>
            {user.jobTitle}
          </p>
        </CardHeader>
      </div>

      <CardContent className='space-y-4 text-left'>
        <div>
          <p className='text-muted-foreground text-xs font-semibold'>EXPERIENCE</p>
          {user.experiences.map((exp, i) => {
            const colors = ['bg-exp-slate', 'bg-exp-blue', 'bg-exp-violet', 'bg-exp-emerald', 'bg-exp-orange', 'bg-exp-rose'];
            const bg = colors[i % colors.length];
            const startYear = exp.startDate ? exp.startDate.split('-')[0] : '';
            const endYear = exp.endDate ? exp.endDate.split('-')[0] : '';

            return (
              <div key={i} className='flex gap-3'>
                <div className={`mt-3.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${bg}`}>
                  <span className='text-sm font-bold text-white'>{exp.companyName.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className='mt-2 font-medium'>{exp.position}</p>
                  <p className='text-muted-foreground text-sm'>
                    {exp.companyName} • {startYear} - {endYear}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <p className='text-muted-foreground text-xs font-semibold'>EDUCATION</p>
          {user.educations.map((edu, i) => (
            <div key={i} className='flex gap-2'>
              <GraduationCapIcon size={38} color='#F5824A' className='mt-3.5 rounded-md border border-none bg-orange-100 p-2' />
              <div>
                <p className='mt-2.5 font-medium'>{edu.major}</p>
                <p className='text-muted-foreground text-sm'>{edu.schoolName}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
