import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { AppDatePicker } from '@/components/app-datepicker';
import { Input } from '@/components/ui/input';
import type { CV } from '@/services/types';
import { AutoResizeTextarea, EntryCard, FormField, SectionToolbar } from './shared';
import { validationMessages } from './shared/validation-messages';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';
const textareaClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground min-h-28 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function ProjectSection() {
  const {
    register,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<CV>();
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
              <FormField label={validationMessages.projectName} error={errors.projects?.[index]?.projectName?.message}>
                <Input
                  {...register(`projects.${index}.projectName`, {
                    required: validationMessages.required(validationMessages.projectName),
                  })}
                  placeholder='Portfolio Website'
                  className={inputClassName}
                />
              </FormField>

              <FormField label='Project URL' error={errors.projects?.[index]?.url?.message}>
                <Input {...register(`projects.${index}.url`)} placeholder='https://...' className={inputClassName} />
              </FormField>

              <FormField label='Start Date' error={errors.projects?.[index]?.startDate?.message}>
                <Controller
                  control={control}
                  name={`projects.${index}.startDate`}
                  render={({ field }) => (
                    <AppDatePicker
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                        trigger(`projects.${index}.endDate`);
                      }}
                      placeholder='Select start date'
                    />
                  )}
                />
              </FormField>

              <FormField label='End Date' error={errors.projects?.[index]?.endDate?.message}>
                <Controller
                  control={control}
                  name={`projects.${index}.endDate`}
                  rules={{
                    validate: (value) => {
                      const startDate = watch(`projects.${index}.startDate`);
                      if (startDate && value && new Date(startDate) > new Date(value)) {
                        return validationMessages.dateOrderError;
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <AppDatePicker value={field.value} onChange={field.onChange} placeholder='Select end date' />
                  )}
                />
              </FormField>

              <div className='md:col-span-2'>
                <FormField label='Description' error={errors.projects?.[index]?.description?.message}>
                  <AutoResizeTextarea
                    {...register(`projects.${index}.description`)}
                    value={watch(`projects.${index}.description`)}
                    placeholder='Briefly describe the project...'
                    className={textareaClassName}
                  />
                </FormField>
              </div>
            </div>
          </EntryCard>
        ))}
      </div>
    </div>
  );
}
