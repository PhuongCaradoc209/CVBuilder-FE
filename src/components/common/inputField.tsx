import { Field, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

interface ifp {
  label: string;
  subLabel?: string;
  icon: React.ReactNode;
  placeholder?: string;
  typeInput: string;
}

const InputField = ({ label, subLabel, icon, placeholder, typeInput }: ifp) => {
  return (
    <Field>
      <div className='flex justify-between'>
        <FieldLabel htmlFor='password'>{label}</FieldLabel>
        <FieldLabel className='cursor-pointer font-semibold text-orange-500' htmlFor='f-password'>
          {subLabel}
        </FieldLabel>
      </div>
      <div className='relative flex items-center'>
        {icon}
        <Input
          className='rounded-3xl px-12 py-5 outline-none focus:ring-1 focus:ring-orange-500'
          type={typeInput}
          placeholder={placeholder}
        />
      </div>
    </Field>
  );
};

export default InputField;
