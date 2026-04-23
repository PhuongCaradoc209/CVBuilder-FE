import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { AppDatePicker } from '@/components/app-datepicker';
import { Input } from '@/components/ui/input';
import type { CV } from '@/services/types';
import { AIGenerateButton, AutoResizeTextarea, EntryCard, FormField, SectionToolbar } from './shared';
import { validationMessages } from './shared/validation-messages';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';
const textareaClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground min-h-28 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function EducationSection() {
  const {
    register,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<CV>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations',
  });

  const cvId = watch('_id');

  return (
    <div className='space-y-6'>
      <SectionToolbar
        title='Education entries'
        onAdd={() => append({ schoolName: '', major: '', startDate: '', endDate: '', description: '' })}
      />

      <div className='space-y-4'>
        {fields.map((field, index) => (
          <EntryCard key={field.id} title='Education' index={index} onRemove={() => remove(index)} canRemove={fields.length > 1}>
            <div className='grid gap-4 md:grid-cols-2'>
              <FormField label={validationMessages.schoolName} error={errors.educations?.[index]?.schoolName?.message}>
                <Input
                  {...register(`educations.${index}.schoolName`, {
                    required: validationMessages.required(validationMessages.schoolName),
                  })}
                  placeholder='ABC University'
                  className={inputClassName}
                />
              </FormField>

              <FormField label={validationMessages.major} error={errors.educations?.[index]?.major?.message}>
                <Input
                  {...register(`educations.${index}.major`, { required: validationMessages.required(validationMessages.major) })}
                  placeholder='Information Technology'
                  className={inputClassName}
                />
              </FormField>

              <FormField label='Start Date' error={errors.educations?.[index]?.startDate?.message}>
                <Controller
                  control={control}
                  name={`educations.${index}.startDate`}
                  render={({ field }) => (
                    <AppDatePicker
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                        trigger(`educations.${index}.endDate`);
                      }}
                      placeholder='Select start date'
                    />
                  )}
                />
              </FormField>

              <FormField label='End Date' error={errors.educations?.[index]?.endDate?.message}>
                <Controller
                  control={control}
                  name={`educations.${index}.endDate`}
                  rules={{
                    validate: (value) => {
                      const startDate = watch(`educations.${index}.startDate`);
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
                <div className='flex items-center justify-between'>
                  <FormField label='Description' error={errors.educations?.[index]?.description?.message} className='w-full'>
                    <AutoResizeTextarea
                      {...register(`educations.${index}.description`)}
                      value={watch(`educations.${index}.description`)}
                      placeholder='Relevant coursework, honors, achievements...'
                      className={textareaClassName}
                    />
                  </FormField>
                  <div className='pb-8 pl-2'>
                    <AIGenerateButton
                      section='educations'
                      cvId={cvId}
                      draftText={watch(`educations.${index}.description`)}
                      onSuggest={(suggestion) => setValue(`educations.${index}.description`, suggestion)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </EntryCard>
        ))}
      </div>
    </div>
  );
}
