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

export function ExperienceSection() {
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
              <FormField
                label={validationMessages.companyName}
                error={errors.experiences?.[index]?.companyName?.message}>
                <Input
                  {...register(`experiences.${index}.companyName`, {
                    required: validationMessages.required(validationMessages.companyName),
                  })}
                  placeholder='Tech Company'
                  className={inputClassName}
                />
              </FormField>

              <FormField
                label={validationMessages.position}
                error={errors.experiences?.[index]?.position?.message}>
                <Input
                  {...register(`experiences.${index}.position`, {
                    required: validationMessages.required(validationMessages.position),
                  })}
                  placeholder='Frontend Developer'
                  className={inputClassName}
                />
              </FormField>

              <FormField label='Start Date' error={errors.experiences?.[index]?.startDate?.message}>
                <Controller
                  control={control}
                  name={`experiences.${index}.startDate`}
                  render={({ field }) => (
                    <AppDatePicker
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                        trigger(`experiences.${index}.endDate`);
                      }}
                      placeholder='Select start date'
                    />
                  )}
                />
              </FormField>

              <FormField label='End Date' error={errors.experiences?.[index]?.endDate?.message}>
                <Controller
                  control={control}
                  name={`experiences.${index}.endDate`}
                  rules={{
                    validate: (value) => {
                      const startDate = watch(`experiences.${index}.startDate`);
                      if (startDate && value && new Date(startDate) > new Date(value)) {
                        return validationMessages.dateOrderError;
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <AppDatePicker value={field.value} onChange={field.onChange} placeholder='Select end date (or current)' />
                  )}
                />
              </FormField>

              <div className='md:col-span-2'>
                <div className='flex items-center justify-between'>
                  <FormField
                    label='Description'
                    error={errors.experiences?.[index]?.description?.message}
                    className='w-full'>
                    <AutoResizeTextarea
                      {...register(`experiences.${index}.description`)}
                      value={watch(`experiences.${index}.description`)}
                      placeholder='Describe your responsibilities and achievements...'
                      className={textareaClassName}
                    />
                  </FormField>
                  <div className='pb-8 pl-2'>
                    <AIGenerateButton
                      section='experiences'
                      cvId={cvId}
                      draftText={watch(`experiences.${index}.description`)}
                      onSuggest={(suggestion) => setValue(`experiences.${index}.description`, suggestion)}
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
