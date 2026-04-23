import { useFieldArray, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import type { CV } from '@/services/types';
import { AIGenerateButton, AutoResizeTextarea, EntryCard, FormField, SectionToolbar } from './shared';
import { validationMessages } from './shared/validation-messages';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';
const textareaClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground min-h-28 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function PersonalInfoSection() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CV>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'personalInfo.socialLinks' as any, // Typed for easier structure
  });

  const cvId = watch('_id');

  return (
    <div className='space-y-6'>
      <div className='grid gap-4 md:grid-cols-2'>
        <FormField label={validationMessages.fullName} error={errors.personalInfo?.fullName?.message}>
          <Input
            {...register('personalInfo.fullName', { required: validationMessages.required(validationMessages.fullName) })}
            placeholder='Jane Doe'
            className={inputClassName}
          />
        </FormField>

        <FormField label={validationMessages.email} error={errors.personalInfo?.email?.message}>
          <Input
            {...register('personalInfo.email', {
              required: validationMessages.required(validationMessages.email),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: validationMessages.invalidEmail,
              },
            })}
            placeholder='jane.doe@example.com'
            className={inputClassName}
          />
        </FormField>

        <FormField label={validationMessages.phone} error={errors.personalInfo?.phone?.message}>
          <Input {...register('personalInfo.phone')} placeholder='0901234567' className={inputClassName} />
        </FormField>

        <FormField label={validationMessages.address} error={errors.personalInfo?.address?.message}>
          <Input
            {...register('personalInfo.address')}
            placeholder='123 Sample Street, Ho Chi Minh City'
            className={inputClassName}
          />
        </FormField>

        <FormField label={validationMessages.jobTitle} error={errors.personalInfo?.jobTitle?.message}>
          <Input {...register('personalInfo.jobTitle')} placeholder='Software Engineer' className={inputClassName} />
        </FormField>

        <div className='space-y-2 md:col-span-2'>
          <div className='flex items-center justify-between'>
            <FormField label={validationMessages.summary} error={errors.personalInfo?.summary?.message} className='w-full'>
              <AutoResizeTextarea
                {...register('personalInfo.summary')}
                value={watch('personalInfo.summary')}
                placeholder='Building modern web applications with JavaScript, React, and Node.js'
                className={textareaClassName}
              />
            </FormField>
            <div className='pb-8 pl-2'>
              <AIGenerateButton
                section='summary'
                cvId={cvId}
                draftText={watch('personalInfo.summary')}
                onSuggest={(suggestion) => setValue('personalInfo.summary', suggestion)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <SectionToolbar title='Social Links' onAdd={() => append({ platform: '', url: '' })} />

        <div className='space-y-4'>
          {fields.map((field, index) => (
            <EntryCard key={field.id} title='Link' index={index} onRemove={() => remove(index)} canRemove={fields.length > 1}>
              <div className='grid gap-4 md:grid-cols-2'>
                <FormField
                  label={validationMessages.languageName}
                  error={(errors as any)?.personalInfo?.socialLinks?.[index]?.platform?.message}>
                  <Input
                    {...register(`personalInfo.socialLinks.${index}.platform` as any)}
                    placeholder='LinkedIn'
                    className={inputClassName}
                  />
                </FormField>

                <FormField label='URL' error={(errors as any)?.personalInfo?.socialLinks?.[index]?.url?.message}>
                  <Input
                    {...register(`personalInfo.socialLinks.${index}.url` as any)}
                    placeholder='https://linkedin.com/in/janedoe'
                    className={inputClassName}
                  />
                </FormField>
              </div>
            </EntryCard>
          ))}
        </div>
      </div>
    </div>
  );
}
