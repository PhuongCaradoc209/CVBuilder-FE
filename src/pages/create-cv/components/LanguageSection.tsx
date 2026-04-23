import { useFieldArray, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import type { CV } from '@/services/types';
import { EntryCard, FormField, SectionToolbar } from './shared';
import { validationMessages } from './shared/validation-messages';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';

export function LanguageSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CV>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages',
  });

  return (
    <div className='space-y-6'>
      <SectionToolbar title='Language entries' onAdd={() => append({ languageName: '', level: 'Native' })} />

      <div className='space-y-4'>
        {fields.map((field, index) => (
          <EntryCard key={field.id} title='Language' index={index} onRemove={() => remove(index)} canRemove={fields.length > 1}>
            <div className='grid gap-4 md:grid-cols-2'>
              <FormField label={validationMessages.languageName} error={errors.languages?.[index]?.languageName?.message}>
                <Input
                  {...register(`languages.${index}.languageName`, {
                    required: validationMessages.required(validationMessages.languageName),
                  })}
                  placeholder='English'
                  className={inputClassName}
                />
              </FormField>

              <FormField label={validationMessages.level} error={errors.languages?.[index]?.level?.message}>
                <Input {...register(`languages.${index}.level`)} placeholder='Intermediate' className={inputClassName} />
              </FormField>
            </div>
          </EntryCard>
        ))}
      </div>
    </div>
  );
}
