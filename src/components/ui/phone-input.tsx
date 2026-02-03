import { Input } from "./input";

const PhoneInput = ({
  placeholder,
  id,
  className,
  value,
  onChange,
  disabled,
}: {
  placeholder: string;
  id: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) => {
  return (
    <Input
      //placeholder={placeholder}

      placeholder="00963997699458"
      id={id}
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
};

export { PhoneInput };
