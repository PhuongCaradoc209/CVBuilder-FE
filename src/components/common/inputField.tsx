import { useState, forwardRef } from 'react';
import { Field, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

interface InputFieldProps extends React.ComponentProps<typeof Input> {
  id: string;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, label, subLabel, icon, className, type, ...props }, ref) => {
    const [showPassword, _setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <Field>
        <div className='flex justify-between'>
          <FieldLabel className='text-black/85' htmlFor={id}>
            {label}
          </FieldLabel>
          {subLabel && (
            <FieldLabel className='cursor-pointer font-semibold text-orange-500' htmlFor='f-password'>
              {subLabel}
            </FieldLabel>
          )}
        </div>
        <div className='relative flex items-center'>
          {icon}
          <Input
            id={id}
            ref={ref}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            className={`rounded-3xl py-5 ${icon ? 'pl-12' : 'pl-4'} outline-none focus:ring-1 focus:ring-orange-500 ${className || ''}`}
            {...props}
          />
        </div>
      </Field>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
