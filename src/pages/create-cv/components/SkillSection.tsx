import { useFieldArray, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import type { CV } from '@/services/types';
import { EntryCard, FormLabel, SectionToolbar } from './shared';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';

export function SkillSection() {
  const { register, control } = useFormContext<CV>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  return (
    <div className='space-y-6'>
      <SectionToolbar title='Skill entries' onAdd={() => append({ skillName: '', level: '' })} />

      <div className='space-y-4'>
        {fields.map((field, index) => (
          <EntryCard key={field.id} title='Skill' index={index} onRemove={() => remove(index)} canRemove={fields.length > 1}>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <FormLabel>Skill Name</FormLabel>
                <Input {...register(`skills.${index}.skillName`)} placeholder='React' className={inputClassName} />
              </div>

              <div className='space-y-2'>
                <FormLabel>Level</FormLabel>
                <Input {...register(`skills.${index}.level`)} placeholder='Advanced' className={inputClassName} />
              </div>
            </div>
          </EntryCard>
        ))}
      </div>
    </div>
  );
}
