import React from 'react';
import { Field, FieldError } from '@/components/ui/field';
import { FormLabel } from './FormLabel';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactElement;
  className?: string;
  labelClassName?: string;
}

export function FormField({ label, error, children, className, labelClassName }: FormFieldProps) {
  return (
    <Field className={cn('space-y-2', className)} data-invalid={!!error}>
      <FormLabel className={labelClassName}>{label}</FormLabel>
      {React.cloneElement(children, {
        'aria-invalid': !!error,
      } as React.Attributes & { [key: string]: any })}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
