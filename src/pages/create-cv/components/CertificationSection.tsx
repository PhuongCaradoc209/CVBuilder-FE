import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { AppDatePicker } from '@/components/app-datepicker';
import { Input } from '@/components/ui/input';
import type { CV } from '@/services/types';
import { EntryCard, FormLabel, SectionToolbar } from './shared/FormHelpers';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';

export function CertificationSection() {
  const { register, control } = useFormContext<CV>();
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
              <div className='space-y-2'>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register(`certifications.${index}.name`)}
                  placeholder='Front-End Developer'
                  className={inputClassName}
                />
              </div>

              <div className='space-y-2'>
                <FormLabel>Issuer</FormLabel>
                <Input {...register(`certifications.${index}.issuer`)} placeholder='Coursera' className={inputClassName} />
              </div>

              <div className='space-y-2'>
                <FormLabel>Issue Date</FormLabel>
                <Controller
                  control={control}
                  name={`certifications.${index}.issueDate`}
                  render={({ field }) => (
                    <AppDatePicker value={field.value} onChange={field.onChange} placeholder='Select issue date' />
                  )}
                />
              </div>

              <div className='space-y-2'>
                <FormLabel>Expiry Date</FormLabel>
                <Controller
                  control={control}
                  name={`certifications.${index}.expiryDate`}
                  render={({ field }) => (
                    <AppDatePicker value={field.value} onChange={field.onChange} placeholder='Select expiry date' />
                  )}
                />
              </div>

              <div className='space-y-2 md:col-span-2'>
                <FormLabel>Certificate URL</FormLabel>
                <Input {...register(`certifications.${index}.url`)} placeholder='https://...' className={inputClassName} />
              </div>
            </div>
          </EntryCard>
        ))}
      </div>
    </div>
  );
}
