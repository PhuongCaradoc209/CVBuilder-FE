import { useFieldArray, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import type { CV } from '@/services/types';
import { AIGenerateButton, AutoResizeTextarea, EntryCard, FormLabel, SectionToolbar } from './shared';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';
const textareaClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground min-h-28 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function PersonalInfoSection() {
  const { register, control, watch, setValue } = useFormContext<CV>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'personalInfo.socialLinks' as any, // Typed for easier structure
  });

  const cvId = watch('_id');

  return (
    <div className='space-y-6'>
      <div className='grid gap-4 md:grid-cols-2'>
        <div className='space-y-2'>
          <FormLabel>Full Name</FormLabel>
          <Input {...register('personalInfo.fullName')} placeholder='Jane Doe' className={inputClassName} />
        </div>

        <div className='space-y-2'>
          <FormLabel>Email</FormLabel>
          <Input {...register('personalInfo.email')} placeholder='jane.doe@example.com' className={inputClassName} />
        </div>

        <div className='space-y-2'>
          <FormLabel>Phone</FormLabel>
          <Input {...register('personalInfo.phone')} placeholder='0901234567' className={inputClassName} />
        </div>

        <div className='space-y-2'>
          <FormLabel>Address</FormLabel>
          <Input
            {...register('personalInfo.address')}
            placeholder='123 Sample Street, Ho Chi Minh City'
            className={inputClassName}
          />
        </div>

        <div className='space-y-2'>
          <FormLabel>Job Title</FormLabel>
          <Input {...register('personalInfo.jobTitle')} placeholder='Software Engineer' className={inputClassName} />
        </div>

        <div className='space-y-2 md:col-span-2'>
          <div className='flex items-center justify-between'>
            <FormLabel>Summary</FormLabel>
            <AIGenerateButton
              section='summary'
              cvId={cvId}
              draftText={watch('personalInfo.summary')}
              onSuggest={(suggestion) => setValue('personalInfo.summary', suggestion)}
            />
          </div>
          <AutoResizeTextarea
            {...register('personalInfo.summary')}
            value={watch('personalInfo.summary')}
            placeholder='Building modern web applications with JavaScript, React, and Node.js'
            className={textareaClassName}
          />
        </div>
      </div>

      <div className='mt-6'>
        <SectionToolbar title='Social Links' onAdd={() => append({ platform: '', url: '' })} />

        <div className='space-y-4'>
          {fields.map((field, index) => (
            <EntryCard key={field.id} title='Link' index={index} onRemove={() => remove(index)} canRemove={fields.length > 1}>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <FormLabel>Platform</FormLabel>
                  <Input
                    {...register(`personalInfo.socialLinks.${index}.platform` as any)}
                    placeholder='LinkedIn'
                    className={inputClassName}
                  />
                </div>

                <div className='space-y-2'>
                  <FormLabel>URL</FormLabel>
                  <Input
                    {...register(`personalInfo.socialLinks.${index}.url` as any)}
                    placeholder='https://linkedin.com/in/janedoe'
                    className={inputClassName}
                  />
                </div>
              </div>
            </EntryCard>
          ))}
        </div>
      </div>
    </div>
  );
}
