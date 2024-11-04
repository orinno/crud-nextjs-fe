import React, { forwardRef, ChangeEvent, Ref } from 'react';

interface UppercaseInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const UppercaseInput = forwardRef((props: UppercaseInputProps, ref: Ref<HTMLInputElement>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const uppercaseValue = value.toUpperCase(); // Convert input value to uppercase
    props.onChange({ ...event, target: { ...event.target, value: uppercaseValue } });
  };

  return <input {...props} ref={ref} onChange={handleChange} />;
});

UppercaseInput.displayName = 'UppercaseInput'; // Set display name

export default UppercaseInput;
