import React, { forwardRef, ChangeEvent, Ref } from 'react';

interface DecimalInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value?: string;
}

const DecimalInput = forwardRef((props: DecimalInputProps, ref: Ref<HTMLInputElement>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Allow only numbers and one decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      props.onChange(event);
    }
  };

  return <input {...props} ref={ref} onChange={handleChange} />;
});

DecimalInput.displayName = 'DecimalInput';

export default DecimalInput;
