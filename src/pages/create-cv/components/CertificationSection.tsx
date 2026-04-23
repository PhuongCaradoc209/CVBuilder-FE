import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { AppDatePicker } from '@/components/app-datepicker';
import { Input } from '@/components/ui/input';
import type { CV } from '@/services/types';
import { EntryCard, FormField, SectionToolbar } from './shared';
import { validationMessages } from './shared/validation-messages';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';

export function CertificationSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CV>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications',
  });

  return (
    <div className='space-y-6'>
      <SectionToolbar
        title='Certification entries'
        onAdd={() => append({ name: '', issuer: '', issueDate: '', expiryDate: '', url: '' })}
      />

      <div className='space-y-4'>
        {fields.map((field, index) => (
          <EntryCard
            key={field.id}
            title='Certification'
            index={index}
            onRemove={() => remove(index)}
            canRemove={fields.length > 1}>
            <div className='grid gap-4 md:grid-cols-2'>
              <FormField label={validationMessages.name} error={errors.certifications?.[index]?.name?.message}>
                <Input
                  {...register(`certifications.${index}.name`, { required: validationMessages.required(validationMessages.name) })}
                  placeholder='Front-End Developer'
                  className={inputClassName}
                />
              </FormField>

              <FormField label={validationMessages.issuer} error={errors.certifications?.[index]?.issuer?.message}>
                <Input
                  {...register(`certifications.${index}.issuer`, {
                    required: validationMessages.required(validationMessages.issuer),
                  })}
                  placeholder='Coursera'
                  className={inputClassName}
                />
              </FormField>

              <FormField label={validationMessages.issueDate} error={errors.certifications?.[index]?.issueDate?.message}>
                <Controller
                  control={control}
                  name={`certifications.${index}.issueDate`}
                  render={({ field }) => (
                    <AppDatePicker value={field.value} onChange={field.onChange} placeholder='Select issue date' />
                  )}
                />
              </FormField>

              <FormField label='Expiry Date' error={errors.certifications?.[index]?.expiryDate?.message}>
                <Controller
                  control={control}
                  name={`certifications.${index}.expiryDate`}
                  render={({ field }) => (
                    <AppDatePicker value={field.value} onChange={field.onChange} placeholder='Select expiry date' />
                  )}
                />
              </FormField>

              <div className='md:col-span-2'>
                <FormField label='Certificate URL' error={errors.certifications?.[index]?.url?.message}>
                  <Input {...register(`certifications.${index}.url`)} placeholder='https://...' className={inputClassName} />
                </FormField>
              </div>
            </div>
          </EntryCard>
        ))}
      </div>
    </div>
  );
}
