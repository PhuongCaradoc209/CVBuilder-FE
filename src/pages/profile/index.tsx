import { Button } from '@/components/ui/button';
import { ProfileCard } from '@/components/common/profileCard';
import { ContactCard } from '@/components/common/contactCard';
import { BasicInfoCard } from '@/components/common/basicInfoCard';
import { SecurityCard } from '@/components/common/securityCard';
import { SignOutIcon } from '@phosphor-icons/react';
import { EditIcon, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import InputField from '@/components/common/inputField';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function ProfilePage() {
  const user = {
    name: 'Jeremy Rose',
    avatarUrl:
      'data:image/webp;base64,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',
    title: 'Senior HR Consultant',
    phone: '+1 234 567 890',
    email: 'jeremy.rose@architect.pro',
    birthday: 'June 12, 1988',
    gender: 'Male',
    passwordLastChanged: '3 months ago',
    experience: [
      { role: 'Senior HR Lead', company: 'Spotify', time: '2020-2023' },
      { role: 'Talent Strategist', company: 'Google', time: '2017-2020' },
    ],
    education: [
      { degree: 'M.A. Human Resources', school: 'Stanford University' },
      { degree: 'B.S. Psychology', school: 'UC Berkeley' },
    ],
  };

  const [formData, setFormData] = useState({
    experiences: [{ id: Date.now(), position: '', companyName: '', startDate: '', endDate: '' }],
    educations: [{ id: Date.now() + 1, schoolName: '', major: '', startDate: '', endDate: '' }],
  });

  const profileData = useQuery({
    mutationFn: authService.login,
    onSuccess: (data: any) => {
      localStorage.setItem('access_token', data.accessToken);
      navigate('/');
    },
    onError: (error: any) => {
      console.log(error);
      alert(error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!');
    },
  });

  // 2. HÀM THÊM DÙNG CHUNG
  // fieldName: tên mảng ('experiences' | 'educations' | 'websites')
  // emptyItem: cấu trúc object trống tương ứng với mảng đó
  const handleAdd = (fieldName: string, emptyItem: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: [...prev[fieldName], { id: Date.now(), ...emptyItem }],
    }));
  };

  // 3. HÀM XÓA DÙNG CHUNG
  const handleRemove = (fieldName: string, idToRemove: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((item: any) => item.id !== idToRemove),
    }));
  };

  // 4. HÀM SỬA (Cập nhật text khi gõ) DÙNG CHUNG
  const handleChange = (fieldName: string, id: number, keyToUpdate: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item: any) => (item.id === id ? { ...item, [keyToUpdate]: value } : item)),
    }));
  };

  return (
    <div className='space-y-8 px-6 pt-6 pb-6'>
      <div>
        <h1 className='text-4xl font-bold'>Profile & Settings</h1>
        <p className='text-muted-foreground'>Manage your professional presence and account security</p>
      </div>

      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-4'>
          <ProfileCard user={user} />
          <Dialog>
            {/* Nút để mở Dialog */}
            <DialogTrigger asChild>
              <Button
                variant='outline'
                className='text-md mt-4 w-full border-none bg-white p-6 font-semibold text-blue-500 shadow-md hover:bg-blue-50 hover:text-blue-600'>
                <EditIcon size={36} />
                Update Profile
              </Button>
            </DialogTrigger>

            {/* Nội dung bên trong Dialog */}
            <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-5xl pb-0 overscroll-none'>
              <DialogHeader>
                <DialogTitle className='text-xl font-bold text-orange-400'>Update Profile</DialogTitle>
                <DialogDescription>Change your personal information here. Click save when done.</DialogDescription>
              </DialogHeader>
              <div className='grid grid-cols-2 gap-x-10 gap-y-4'>
                <InputField
                  id='name'
                  label='Name'
                  placeholder='Enter your full name'
                  type='text'
                  className='rounded-lg focus:ring-orange-400'
                  // onChange={(e: any) => setPassword(e.target.value)}
                />
                <InputField
                  id='position'
                  label='Position'
                  placeholder='Enter your position'
                  type='text'
                  className='rounded-lg focus:ring-orange-400'
                  // onChange={(e: any) => setPassword(e.target.value)}
                />
                <InputField
                  id='email'
                  label='Email'
                  placeholder='Enter your email'
                  type='email'
                  className='rounded-lg focus:ring-orange-400'
                  // onChange={(e: any) => setPassword(e.target.value)}
                />
                <InputField
                  id='contact'
                  label='Contact'
                  placeholder='Enter your contact information'
                  type='text'
                  className='rounded-lg focus:ring-orange-400'
                  // onChange={(e: any) => setPassword(e.target.value)}
                />
                <InputField
                  id='birthday'
                  label='Birthday'
                  placeholder='Enter your birthday'
                  type='date'
                  className='rounded-lg focus:ring-orange-400'
                  // onChange={(e: any) => setPassword(e.target.value)}
                />
                <InputField
                  id='gender'
                  label='Gender'
                  placeholder='Enter your gender'
                  type='text'
                  className='rounded-lg focus:ring-orange-400'
                  // onChange={(e: any) => setPassword(e.target.value)}
                />
              </div>
              <InputField
                id='website'
                label='Website'
                placeholder='Enter your website'
                type='url'
                className='rounded-lg focus:ring-orange-400'
                // onChange={(e: any) => setPassword(e.target.value)}
              />
              <Separator />
              <div className='flex items-center gap-2'>
                <div className='text-lg font-semibold'>Experiences</div>
                <Button
                  type='button'
                  variant='outline'
                  className='h-6 w-6'
                  onClick={() => handleAdd('experiences', { position: '', companyName: '', startDate: '', endDate: '' })}>
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
              <div>
                <div className='space-y-2'>
                  {formData.experiences.map((item) => (
                    <div key={item.id} className='relative flex items-start gap-4 rounded-lg bg-gray-50'>
                      <div className='grid w-full grid-cols-6 gap-4'>
                        <div className='col-span-2'>
                          <InputField
                            className='rounded-lg focus:ring-orange-400'
                            id={`role-${item.id}`}
                            label='Position'
                            value={item.position}
                            onChange={(e) => handleChange('experiences', item.id, 'position', e.target.value)}
                          />
                        </div>
                        <div className='col-span-2'>
                          <InputField
                            className='rounded-lg focus:ring-orange-400'
                            id={`company-${item.id}`}
                            label='Company'
                            value={item.companyName}
                            onChange={(e) => handleChange('experiences', item.id, 'companyName', e.target.value)}
                          />
                        </div>
                        <div className='col-span-1'>
                          <InputField
                            className='rounded-lg focus:ring-orange-400'
                            type='date'
                            id={`start-${item.id}`}
                            label='Start Date'
                            value={item.startDate}
                            onChange={(e) => handleChange('experiences', item.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className='col-span-1'>
                          <InputField
                            className='rounded-lg focus:ring-orange-400'
                            type='date'
                            id={`end-${item.id}`}
                            label='End Date'
                            value={item.endDate}
                            onChange={(e) => handleChange('experiences', item.id, 'endDate', e.target.value)}
                          />
                        </div>
                      </div>
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='mt-8 text-red-500'
                        onClick={() => handleRemove('experiences', item.id)}>
                        <Trash2 className='h-5 w-5' />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />
              <div className='flex items-center gap-2'>
                <div className='text-lg font-semibold'>Educations</div>
                <Button
                  type='button'
                  variant='outline'
                  className='h-6 w-6'
                  onClick={() => handleAdd('educations', { schoolName: '', major: '', startDate: '', endDate: '' })}>
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
              <div>
                <div className='space-y-2'>
                  {formData.educations.map((item) => (
                    <div key={item.id} className='relative flex items-start gap-4 rounded-lg bg-gray-50'>
                      <div className='grid w-full grid-cols-6 gap-4'>
                        <div className='col-span-2'>
                          <InputField
                            className='rounded-lg focus:ring-orange-400'
                            id={`schoolName-${item.id}`}
                            label='School Name'
                            value={item.schoolName}
                            onChange={(e) => handleChange('educations', item.id, 'schoolName', e.target.value)}
                          />
                        </div>
                        <div className='col-span-2'>
                          <InputField
                            className='rounded-lg focus:ring-orange-400'
                            id={`major-${item.id}`}
                            label='Major'
                            value={item.major}
                            onChange={(e) => handleChange('educations', item.id, 'major', e.target.value)}
                          />
                        </div>
                        <div className='col-span-1'>
                          <InputField
                            className='rounded-lg focus:ring-orange-400'
                            type='date'
                            id={`start-${item.id}`}
                            label='Start Date'
                            value={item.startDate}
                            onChange={(e) => handleChange('educations', item.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className='col-span-1'>
                          <InputField
                            className='rounded-lg focus:ring-orange-400'
                            type='date'
                            id={`end-${item.id}`}
                            label='End Date'
                            value={item.endDate}
                            onChange={(e) => handleChange('educations', item.id, 'endDate', e.target.value)}
                          />
                        </div>
                      </div>
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='mt-8 text-red-500'
                        onClick={() => handleRemove('educations', item.id)}>
                        <Trash2 className='h-5 w-5' />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className='sticky bottom-0 py-4 w-full bg-[#f8fafe] z-1 flex justify-center'>
                <Button
                  type='button'
                  variant='outline'
                  className='w-fit border-orange-500 bg-orange-50 font-semibold text-orange-400 hover:bg-orange-200'>
                  Update
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant='outline'
            className='text-md mt-4 w-full border-none bg-white p-6 font-semibold text-red-700 shadow-md hover:bg-red-50 hover:text-red-800'>
            <SignOutIcon size={36} />
            Logout
          </Button>
        </div>

        <div className='col-span-8 space-y-6'>
          <div className='grid grid-cols-2 gap-6'>
            <ContactCard user={user} />
            <BasicInfoCard user={user} />
          </div>

          <SecurityCard user={user} />
        </div>
      </div>
    </div>
  );
}
