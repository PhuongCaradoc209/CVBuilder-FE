import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { formatDateForInput } from '@/utils/date';
import { Button } from '@/components/ui/button';
import InputField from '@/components/common/inputField';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldLabel } from '@/components/ui/field';
import { Plus, Trash2 } from 'lucide-react';

interface ProfileUpdateFormProps {
  data: any;
  onSuccess: () => void;
}

export function ProfileUpdateForm({ data, onSuccess }: ProfileUpdateFormProps) {
  const queryClient = useQueryClient();

  const methods = useForm({
    defaultValues: {
      fullName: data.fullName || '',
      jobTitle: data.jobTitle !== 'Not provided' ? data.jobTitle : '',
      email: data.email || '',
      phone: data.phone !== 'Not provided' ? data.phone : '',
      birthday: formatDateForInput(data.birthday),
      gender: data.gender !== 'Not provided' ? data.gender : '',
      website: data.website !== 'Not provided' ? data.website : '',
      experiences: data.experiences?.length > 0 
        ? data.experiences.map((exp: any) => ({ ...exp, startDate: formatDateForInput(exp.startDate), endDate: formatDateForInput(exp.endDate) }))
        : [{ position: '', companyName: '', startDate: '', endDate: '' }],
      educations: data.educations?.length > 0 
        ? data.educations.map((edu: any) => ({ 
            ...edu, 
            startDate: formatDateForInput(edu.startDate), 
            endDate: formatDateForInput(edu.endDate) 
          }))
        : [{ schoolName: '', major: '', startDate: '', endDate: '' }],
    }
  });

  const { register, control, handleSubmit, setValue, watch } = methods;
  const genderValue = watch('gender');

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control,
    name: 'experiences'
  });

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
    control,
    name: 'educations'
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (payload: any) => {
      const apiCalls = [];

      const basicProfileData = {
        fullName: payload.fullName,
        jobTitle: payload.jobTitle,
        email: payload.email,
        phone: payload.phone,
        birthday: formatDateForInput(payload.birthday),
        gender: payload.gender,
        website: payload.website,
      };
      apiCalls.push(userService.updateBasicProfile(basicProfileData));

      payload.experiences.forEach((exp: any) => {
        const formattedExp = {
          ...exp,
          startDate: formatDateForInput(exp.startDate),
          endDate: formatDateForInput(exp.endDate),
        };

        if (!formattedExp._id || String(formattedExp._id).startsWith('temp_')) {
          const { _id, ...rest } = formattedExp;
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
          startDate: formatDateForInput(edu.startDate),
          endDate: formatDateForInput(edu.endDate),
        };

        if (!formattedEdu._id || String(formattedEdu._id).startsWith('temp_')) {
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
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      toast.success('Profile updated successfully!');
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update profile!');
    },
  });

  const onSubmit = (formData: any) => {
    updateProfileMutation.mutate(formData);
  };

  const handleDelete = async (fieldName: 'experiences' | 'educations', index: number, id: string) => {
    if (!id || String(id).startsWith('temp_')) {
      fieldName === 'experiences' ? removeExp(index) : removeEdu(index);
      return;
    }

    try {
      if (fieldName === 'experiences') {
        await userService.deleteExperience(id);
      } else {
        await userService.deleteEducation(id);
      }
      toast.success('Deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to delete');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-2 gap-x-10 gap-y-4'>
        <InputField
          id='name'
          label='Name'
          placeholder='Enter your full name'
          {...register('fullName')}
          className='rounded-lg focus:ring-orange-400'
        />
        <InputField
          id='position'
          label='Position'
          placeholder='Enter your position'
          {...register('jobTitle')}
          className='rounded-lg focus:ring-orange-400'
        />
        <InputField
          id='email'
          label='Email'
          placeholder='Enter your email'
          type='email'
          disabled
          {...register('email')}
          className='rounded-lg focus:ring-orange-400'
        />
        <InputField
          id='contact'
          label='Contact'
          placeholder='Enter your contact information'
          {...register('phone')}
          className='rounded-lg focus:ring-orange-400'
        />
        <InputField
          id='birthday'
          label='Birthday'
          type='date'
          {...register('birthday')}
          className='rounded-lg focus:ring-orange-400'
        />
        <div>
          <FieldLabel className='text-black/85'>Gender</FieldLabel>
          <Select
            value={genderValue}
            onValueChange={(value) => setValue('gender', value)}>
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
        {...register('website')}
        className='rounded-lg focus:ring-orange-400'
      />

      <Separator />

      {/* EXPERIENCES */}
      <div className='flex items-center gap-2'>
        <div className='text-lg font-semibold'>Experiences</div>
        <Button
          type='button'
          variant='outline'
          className='h-6 w-6'
          onClick={() => appendExp({ position: '', companyName: '', startDate: '', endDate: '' })}>
          <Plus className='h-4 w-4' />
        </Button>
      </div>
      <div className='space-y-4'>
        {expFields.map((field: any, index) => (
          <div key={field.id} className='relative flex items-start gap-4 rounded-lg bg-gray-50 p-2'>
            <div className='grid w-full grid-cols-6 gap-4'>
              <div className='col-span-2'>
                <InputField
                  id={`exp-pos-${field.id}`}
                  className='rounded-lg focus:ring-orange-400'
                  label='Position'
                  {...register(`experiences.${index}.position`)}
                />
              </div>
              <div className='col-span-2'>
                <InputField
                  id={`exp-company-${field.id}`}
                  className='rounded-lg focus:ring-orange-400'
                  label='Company'
                  {...register(`experiences.${index}.companyName`)}
                />
              </div>
              <div className='col-span-1'>
                <InputField
                  id={`exp-start-${field.id}`}
                  className='rounded-lg focus:ring-orange-400'
                  type='date'
                  label='Start Date'
                  {...register(`experiences.${index}.startDate`)}
                />
              </div>
              <div className='col-span-1'>
                <InputField
                  id={`exp-end-${field.id}`}
                  className='rounded-lg focus:ring-orange-400'
                  type='date'
                  label='End Date'
                  {...register(`experiences.${index}.endDate`)}
                />
              </div>
            </div>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='mt-8 text-red-500'
              onClick={() => handleDelete('experiences', index, field._id)}>
              <Trash2 className='h-5 w-5' />
            </Button>
          </div>
        ))}
      </div>

      <Separator />

      {/* EDUCATIONS */}
      <div className='flex items-center gap-2'>
        <div className='text-lg font-semibold'>Educations</div>
        <Button
          type='button'
          variant='outline'
          className='h-6 w-6'
          onClick={() => appendEdu({ schoolName: '', major: '', startDate: '', endDate: '' })}>
          <Plus className='h-4 w-4' />
        </Button>
      </div>
      <div className='space-y-4'>
        {eduFields.map((field: any, index) => (
          <div key={field.id} className='relative flex items-start gap-4 rounded-lg bg-gray-50 p-2'>
            <div className='grid w-full grid-cols-6 gap-4'>
              <div className='col-span-2'>
                <InputField
                  id={`edu-school-${field.id}`}
                  className='rounded-lg focus:ring-orange-400'
                  label='School Name'
                  {...register(`educations.${index}.schoolName`)}
                />
              </div>
              <div className='col-span-2'>
                <InputField
                  id={`edu-major-${field.id}`}
                  className='rounded-lg focus:ring-orange-400'
                  label='Major'
                  {...register(`educations.${index}.major`)}
                />
              </div>
              <div className='col-span-1'>
                <InputField
                  id={`edu-start-${field.id}`}
                  className='rounded-lg focus:ring-orange-400'
                  type='date'
                  label='Start Date'
                  {...register(`educations.${index}.startDate`)}
                />
              </div>
              <div className='col-span-1'>
                <InputField
                  id={`edu-end-${field.id}`}
                  className='rounded-lg focus:ring-orange-400'
                  type='date'
                  label='End Date'
                  {...register(`educations.${index}.endDate`)}
                />
              </div>
            </div>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='mt-8 text-red-500'
              onClick={() => handleDelete('educations', index, field._id)}>
              <Trash2 className='h-5 w-5' />
            </Button>
          </div>
        ))}
      </div>

      <div className='sticky bottom-0 z-10 flex justify-center bg-[#f8fafe] py-4'>
        <Button
          type='submit'
          disabled={updateProfileMutation.isPending}
          variant='outline'
          className='w-fit border-orange-500 bg-orange-50 font-semibold text-orange-400 hover:bg-orange-200'>
          {updateProfileMutation.isPending ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </form>
  );
}
