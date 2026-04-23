import { useFieldArray, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import type { CV } from '@/services/types';
import { EntryCard, FormField, SectionToolbar } from './shared';
import { validationMessages } from './shared/validation-messages';

const inputClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground h-12 rounded-xl border shadow-none';

export function SkillSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CV>();
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
              <FormField label={validationMessages.skillName} error={errors.skills?.[index]?.skillName?.message}>
                <Input
                  {...register(`skills.${index}.skillName`, { required: validationMessages.required(validationMessages.skillName) })}
                  placeholder='React'
                  className={inputClassName}
                />
              </FormField>

              <FormField label={validationMessages.level} error={errors.skills?.[index]?.level?.message}>
                <Input {...register(`skills.${index}.level`)} placeholder='Advanced' className={inputClassName} />
              </FormField>
            </div>
          </EntryCard>
        ))}
      </div>
    </div>
  );
}
