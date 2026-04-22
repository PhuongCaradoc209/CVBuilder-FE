import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { Button } from '@/components/ui/button';
import { ProfileCard } from '@/components/common/profileCard';
import { ContactCard } from '@/components/common/contactCard';
import { BasicInfoCard } from '@/components/common/basicInfoCard';
import { SecurityCard } from '@/components/common/securityCard';
import { SignOutIcon, Spinner } from '@phosphor-icons/react';
import { EditIcon, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import InputField from '@/components/common/inputField';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldLabel } from '@/components/ui/field';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    birthday: '',
    gender: '',
    website: '',
    experiences: [{ _id: `temp_exp_1`, position: '', companyName: '', startDate: '', endDate: '' }],
    educations: [{ _id: `temp_edu_1 }`, schoolName: '', major: '', startDate: '', endDate: '' }],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [loadedData, setLoadedData] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: userService.getProfile,
    select: (data: any) => data?.user,
  });

  // 1. Dời hàm formatDate lên đây để useEffect có thể xài được
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString || dateString === 'Not provided') return ''; // Xử lý luôn cả case BE trả về chữ Not provided
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
    try {
      const dateObj = new Date(dateString);
      return dateObj.toISOString().split('T')[0];
    } catch (e) {
      return '';
    }
  };

  if (data && data !== loadedData) {
    setLoadedData(data); // Đánh dấu là đã nạp cục data này rồi
    setFormData({
      fullName: data.fullName || '',
      jobTitle: data.jobTitle !== 'Not provided' ? data.jobTitle : '',
      email: data.email || '',
      phone: data.phone !== 'Not provided' ? data.phone : '',
      birthday: formatDate(data.birthday),
      gender: data.gender !== 'Not provided' ? data.gender : '',
      website: data.website !== 'Not provided' ? data.website : '',

      experiences:
        data.experiences?.length > 0
          ? data.experiences.map((exp: any) => ({
              ...exp,
              startDate: formatDate(exp.startDate),
              endDate: formatDate(exp.endDate),
            }))
          : [{ _id: 'temp_exp_1', position: '', companyName: '', startDate: '', endDate: '' }],

      educations:
        data.educations?.length > 0
          ? data.educations.map((edu: any) => ({
              ...edu,
              startDate: formatDate(edu.startDate),
              endDate: formatDate(edu.endDate),
            }))
          : [{ _id: 'temp_edu_1', schoolName: '', major: '', startDate: '', endDate: '' }],
    });
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    toast.success('Logged out successfully!');
    window.location.href = '/login';
  };

  const handleBasicChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = (fieldName: string, emptyItem: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: [...prev[fieldName], { _id: `temp_${Date.now()}`, ...emptyItem }],
    }));
  };

  const handleChange = (fieldName: string, id: string | number, keyToUpdate: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item: any) => (item._id === id ? { ...item, [keyToUpdate]: value } : item)),
    }));
  };

  const deleteMutation = useMutation({
    mutationFn: async ({ fieldName, id }: { fieldName: string; id: string | number }) => {
      const idStr = String(id);
      if (fieldName === 'experiences') return await userService.deleteExperience(idStr);
      if (fieldName === 'educations') return await userService.deleteEducation(idStr);
      throw new Error(`Unknown field name: ${fieldName}`);
    },
    onSuccess: () => {
      toast.success('Deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete. Please try again!');
    },
  });

  const handleRemove = (fieldName: string, idToRemove: string | number) => {
    if (String(idToRemove).startsWith('temp_')) {
      setFormData((prev: any) => ({
        ...prev,
        [fieldName]: prev[fieldName].filter((item: any) => item._id !== idToRemove),
      }));
      return;
    }
    deleteMutation.mutate({ fieldName, id: idToRemove });
  };

  const updateProfileMutation = useMutation({
    mutationFn: async (payload: any) => {
      const apiCalls = [];

      const basicProfileData = {
        fullName: payload.fullName,
        jobTitle: payload.jobTitle,
        email: payload.email,
        phone: payload.phone,
        birthday: formatDate(payload.birthday),
        gender: payload.gender,
        website: payload.website,
      };
      apiCalls.push(userService.updateBasicProfile(basicProfileData));

      payload.experiences.forEach((exp: any) => {
        const formattedExp = {
          ...exp,
          startDate: formatDate(exp.startDate),
          endDate: formatDate(exp.endDate),
        };

        if (String(formattedExp._id).startsWith('temp_')) {
          const { _id, ...rest } = formattedExp;
          // Chỉ tạo nếu người dùng có nhập liệu
          if (rest.companyName || rest.position) {
            apiCalls.push(userService.createExperience(rest));
          }
        } else {
          apiCalls.push(userService.updateExperience(formattedExp._id, formattedExp));
        }
      });

      payload.educations.forEach((edu: any) => {
        const formattedEdu = {
          ...edu,
          startDate: formatDate(edu.startDate),
          endDate: formatDate(edu.endDate),
        };

        if (String(formattedEdu._id).startsWith('temp_')) {
          const { _id, ...rest } = formattedEdu;
          if (rest.schoolName || rest.major) {
            apiCalls.push(userService.createEducation(rest));
          }
        } else {
          apiCalls.push(userService.updateEducation(formattedEdu._id, formattedEdu));
        }
      });

      return await Promise.all(apiCalls);
    },
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      toast.success('Profile updated successfully!');
    },
    onError: (error: any) => {
      console.error('Update Error:', error);
      toast.error(error?.response?.data?.message || 'Failed to update profile!');
    },
  });

  const handleUpdateSubmit = () => {
    updateProfileMutation.mutate(formData);
  };

  // 5. GIAO DIỆN (RENDER)
  return (
    <div>
      {isLoading ? (
        <div className='flex min-h-[50vh] items-center justify-center'>
          <Spinner className='animate-spin' size={48} color='#F5824A' />
        </div>
      ) : (
        <div className='space-y-8 px-6 pt-6 pb-6'>
          <div>
            <h1 className='text-4xl font-bold'>Profile & Settings</h1>
            <p className='text-muted-foreground'>Manage your professional presence and account security</p>
          </div>

          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-4'>
              <ProfileCard user={data} />
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant='outline'
                    className='text-md mt-4 w-full border-none bg-white p-6 font-semibold text-blue-500 shadow-md hover:bg-blue-50 hover:text-blue-600'>
                    <EditIcon size={36} />
                    Update Profile
                  </Button>
                </DialogTrigger>

                <DialogContent className='max-h-[90vh] overflow-y-auto overscroll-none pb-0 sm:max-w-5xl'>
                  <DialogHeader>
                    <DialogTitle className='text-xl font-bold text-orange-400'>Update Profile</DialogTitle>
                    <DialogDescription>Change your personal information here. Click save when done.</DialogDescription>
                  </DialogHeader>

                  {/* THÔNG TIN CƠ BẢN */}
                  <div className='grid grid-cols-2 gap-x-10 gap-y-4'>
                    <InputField
                      id='name'
                      label='Name'
                      placeholder='Enter your full name'
                      type='text'
                      className='rounded-lg focus:ring-orange-400'
                      value={formData.fullName}
                      onChange={(e: any) => handleBasicChange('fullName', e.target.value)}
                    />
                    <InputField
                      id='position'
                      label='Position'
                      placeholder='Enter your position'
                      type='text'
                      className='rounded-lg focus:ring-orange-400'
                      value={formData.jobTitle}
                      onChange={(e: any) => handleBasicChange('jobTitle', e.target.value)}
                    />
                    <InputField
                      id='email'
                      label='Email'
                      placeholder='Enter your email'
                      type='email'
                      className='rounded-lg focus:ring-orange-400'
                      value={formData.email}
                      onChange={(e: any) => handleBasicChange('email', e.target.value)}
                    />
                    <InputField
                      id='contact'
                      label='Contact'
                      placeholder='Enter your contact information'
                      type='text'
                      className='rounded-lg focus:ring-orange-400'
                      value={formData.phone}
                      onChange={(e: any) => handleBasicChange('phone', e.target.value)}
                    />
                    <InputField
                      id='birthday'
                      label='Birthday'
                      type='date'
                      className='rounded-lg focus:ring-orange-400'
                      value={formData.birthday}
                      onChange={(e: any) => handleBasicChange('birthday', e.target.value)}
                    />
                    <div>
                      <FieldLabel className='text-black/85'>Gender</FieldLabel>
                      <Select
                        value={formData.gender} // 1. Binding giá trị hiện tại từ state
                        onValueChange={(value) => handleBasicChange('gender', value)}>
                        <SelectTrigger className='mt-3 w-full'>
                          <SelectValue placeholder='Select gender' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value='Male'>Male</SelectItem>
                            <SelectItem value='Female'>Female</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <InputField
                    id='website'
                    label='Website'
                    placeholder='Enter your website'
                    type='url'
                    className='rounded-lg focus:ring-orange-400'
                    value={formData.website}
                    onChange={(e: any) => handleBasicChange('website', e.target.value)}
                  />

                  <Separator />

                  {/* EXPERIENCES */}
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
                        <div key={item._id} className='relative flex items-start gap-4 rounded-lg bg-gray-50'>
                          <div className='grid w-full grid-cols-6 gap-4'>
                            <div className='col-span-2'>
                              <InputField
                                className='rounded-lg focus:ring-orange-400'
                                id={`role-${item._id}`}
                                label='Position'
                                value={item.position}
                                onChange={(e) => handleChange('experiences', item._id, 'position', e.target.value)}
                              />
                            </div>
                            <div className='col-span-2'>
                              <InputField
                                className='rounded-lg focus:ring-orange-400'
                                id={`company-${item._id}`}
                                label='Company'
                                value={item.companyName}
                                onChange={(e) => handleChange('experiences', item._id, 'companyName', e.target.value)}
                              />
                            </div>
                            <div className='col-span-1'>
                              <InputField
                                className='rounded-lg focus:ring-orange-400'
                                type='date'
                                id={`start-${item._id}`}
                                label='Start Date'
                                value={item.startDate}
                                onChange={(e) => handleChange('experiences', item._id, 'startDate', e.target.value)}
                              />
                            </div>
                            <div className='col-span-1'>
                              <InputField
                                className='rounded-lg focus:ring-orange-400'
                                type='date'
                                id={`end-${item._id}`}
                                label='End Date'
                                value={item.endDate}
                                onChange={(e) => handleChange('experiences', item._id, 'endDate', e.target.value)}
                              />
                            </div>
                          </div>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='mt-8 text-red-500'
                            onClick={() => handleRemove('experiences', item._id)}>
                            <Trash2 className='h-5 w-5' />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* EDUCATIONS */}
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
                        <div key={item._id} className='relative flex items-start gap-4 rounded-lg bg-gray-50'>
                          <div className='grid w-full grid-cols-6 gap-4'>
                            <div className='col-span-2'>
                              <InputField
                                className='rounded-lg focus:ring-orange-400'
                                id={`schoolName-${item._id}`}
                                label='School Name'
                                value={item.schoolName}
                                onChange={(e) => handleChange('educations', item._id, 'schoolName', e.target.value)}
                              />
                            </div>
                            <div className='col-span-2'>
                              <InputField
                                className='rounded-lg focus:ring-orange-400'
                                id={`major-${item._id}`}
                                label='Major'
                                value={item.major}
                                onChange={(e) => handleChange('educations', item._id, 'major', e.target.value)}
                              />
                            </div>
                            <div className='col-span-1'>
                              <InputField
                                className='rounded-lg focus:ring-orange-400'
                                type='date'
                                id={`start-${item._id}`}
                                label='Start Date'
                                value={item.startDate}
                                onChange={(e) => handleChange('educations', item._id, 'startDate', e.target.value)}
                              />
                            </div>
                            <div className='col-span-1'>
                              <InputField
                                className='rounded-lg focus:ring-orange-400'
                                type='date'
                                id={`end-${item._id}`}
                                label='End Date'
                                value={item.endDate}
                                onChange={(e) => handleChange('educations', item._id, 'endDate', e.target.value)}
                              />
                            </div>
                          </div>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='mt-8 text-red-500'
                            onClick={() => handleRemove('educations', item._id)}>
                            <Trash2 className='h-5 w-5' />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='sticky bottom-0 z-10 flex justify-center bg-[#f8fafe] py-4'>
                    <Button
                      type='button'
                      onClick={handleUpdateSubmit}
                      variant='outline'
                      className='w-fit border-orange-500 bg-orange-50 font-semibold text-orange-400 hover:bg-orange-200'>
                      Update
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                variant='outline'
                onClick={handleLogout}
                className='text-md mt-4 w-full border-none bg-white p-6 font-semibold text-red-700 shadow-md hover:bg-red-50 hover:text-red-800'>
                <SignOutIcon size={36} />
                Logout
              </Button>
            </div>

            {/* CÁC COMPONENT BÊN PHẢI */}
            <div className='col-span-8 space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <ContactCard user={data} />
                <BasicInfoCard user={data} />
              </div>
              <SecurityCard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
