import { Field, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

interface InputFieldProps {
  id: string;
  label: string;
  subLabel?: string;
  icon: React.ReactNode;
  placeholder?: string;
  typeInput: string;
}

const InputField = ({ id, label, subLabel, icon, placeholder, typeInput }: InputFieldProps) => {
  return (
    <Field>
      <div className='flex justify-between'>
        <FieldLabel className='text-black/85' htmlFor={id}>
          {label}
        </FieldLabel>
        <FieldLabel className='cursor-pointer font-semibold text-orange-500' htmlFor='f-password'>
          {subLabel}
        </FieldLabel>
      </div>
      <div className='relative flex items-center'>
        {icon}
        <Input
          id={id}
          className='rounded-3xl px-12 py-5 outline-none focus:ring-1 focus:ring-orange-500'
          type={typeInput}
          placeholder={placeholder}
        />
      </div>
    </Field>
  );
};

export default InputField;
