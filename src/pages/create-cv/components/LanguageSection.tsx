import { useFieldArray, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import type { CV } from '@/services/types';
import { EntryCard, FormLabel, SectionToolbar } from './shared';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';

export function LanguageSection() {
  const { register, control } = useFormContext<CV>();
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
              <div className='space-y-2'>
                <FormLabel>Language Name</FormLabel>
                <Input {...register(`languages.${index}.languageName`)} placeholder='English' className={inputClassName} />
              </div>

              <div className='space-y-2'>
                <FormLabel>Level</FormLabel>
                <Input {...register(`languages.${index}.level`)} placeholder='Intermediate' className={inputClassName} />
              </div>
            </div>
          </EntryCard>
        ))}
      </div>
    </div>
  );
}
