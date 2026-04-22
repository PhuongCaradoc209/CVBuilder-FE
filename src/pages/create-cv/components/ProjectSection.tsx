import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { AppDatePicker } from '@/components/app-datepicker';
import { Input } from '@/components/ui/input';
import type { CV } from '@/services/types';
import { AutoResizeTextarea, EntryCard, FormLabel, SectionToolbar } from './shared';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';
const textareaClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground min-h-28 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function ProjectSection() {
  const { register, control, watch } = useFormContext<CV>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  return (
    <div className='space-y-6'>
      <SectionToolbar
        title='Project entries'
        onAdd={() => append({ projectName: '', description: '', url: '', startDate: '', endDate: '' })}
      />

      <div className='space-y-4'>
        {fields.map((field, index) => (
          <EntryCard key={field.id} title='Project' index={index} onRemove={() => remove(index)} canRemove={fields.length > 1}>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <FormLabel>Project Name</FormLabel>
                <Input
                  {...register(`projects.${index}.projectName`)}
                  placeholder='Portfolio Website'
                  className={inputClassName}
                />
              </div>

              <div className='space-y-2'>
                <FormLabel>Project URL</FormLabel>
                <Input {...register(`projects.${index}.url`)} placeholder='https://...' className={inputClassName} />
              </div>

              <div className='space-y-2'>
                <FormLabel>Start Date</FormLabel>
                <Controller
                  control={control}
                  name={`projects.${index}.startDate`}
                  render={({ field }) => (
                    <AppDatePicker value={field.value} onChange={field.onChange} placeholder='Select start date' />
                  )}
                />
              </div>

              <div className='space-y-2'>
                <FormLabel>End Date</FormLabel>
                <Controller
                  control={control}
                  name={`projects.${index}.endDate`}
                  render={({ field }) => (
                    <AppDatePicker value={field.value} onChange={field.onChange} placeholder='Select end date' />
                  )}
                />
              </div>

              <div className='space-y-2 md:col-span-2'>
                <FormLabel>Description</FormLabel>
                <AutoResizeTextarea
                  {...register(`projects.${index}.description`)}
                  value={watch(`projects.${index}.description`)}
                  placeholder='Briefly describe the project...'
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
