import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { AppDatePicker } from '@/components/app-datepicker';
import { Input } from '@/components/ui/input';
import type { CV } from '@/services/types';
import { AIGenerateButton, AutoResizeTextarea, EntryCard, FormLabel, SectionToolbar } from './shared';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';
const textareaClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground min-h-28 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function ExperienceSection() {
  const { register, control, watch, setValue } = useFormContext<CV>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences',
  });

  const cvId = watch('_id');

  return (
    <div className='space-y-6'>
      <SectionToolbar
        title='Experience entries'
        onAdd={() => append({ companyName: '', position: '', startDate: '', endDate: '', description: '' })}
      />

      <div className='space-y-4'>
        {fields.map((field, index) => (
          <EntryCard key={field.id} title='Experience' index={index} onRemove={() => remove(index)} canRemove={fields.length > 1}>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <FormLabel>Company Name</FormLabel>
                <Input {...register(`experiences.${index}.companyName`)} placeholder='Tech Company' className={inputClassName} />
              </div>

              <div className='space-y-2'>
                <FormLabel>Position</FormLabel>
                <Input
                  {...register(`experiences.${index}.position`)}
                  placeholder='Frontend Developer'
                  className={inputClassName}
                />
              </div>

              <div className='space-y-2'>
                <FormLabel>Start Date</FormLabel>
                <Controller
                  control={control}
                  name={`experiences.${index}.startDate`}
                  render={({ field }) => (
                    <AppDatePicker value={field.value} onChange={field.onChange} placeholder='Select start date' />
                  )}
                />
              </div>

              <div className='space-y-2'>
                <FormLabel>End Date</FormLabel>
                <Controller
                  control={control}
                  name={`experiences.${index}.endDate`}
                  render={({ field }) => (
                    <AppDatePicker value={field.value} onChange={field.onChange} placeholder='Select end date (or current)' />
                  )}
                />
              </div>

              <div className='space-y-2 md:col-span-2'>
                <div className='flex items-center justify-between'>
                  <FormLabel>Description</FormLabel>
                  <AIGenerateButton
                    section='experiences'
                    cvId={cvId}
                    draftText={watch(`experiences.${index}.description`)}
                    onSuggest={(suggestion) => setValue(`experiences.${index}.description`, suggestion)}
                  />
                </div>
                <AutoResizeTextarea
                  {...register(`experiences.${index}.description`)}
                  value={watch(`experiences.${index}.description`)}
                  placeholder='Describe your responsibilities and achievements...'
                  className={textareaClassName}
                />
              </div>
            </div>
          </EntryCard>
        ))}
      </div>
    </div>
  );
}
