import React, { forwardRef, ChangeEvent, Ref } from 'react';

interface DecimalInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value?: string;
}

const OnlyNumberInput = forwardRef((props: DecimalInputProps, ref: Ref<HTMLInputElement>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    //only inpuy number
    const numberValue = value.replace(/[^0-9]/g, '');
    props.onChange({ ...event, target: { ...event.target, value: numberValue } });
  };

  return <input {...props} ref={ref} onChange={handleChange} />;
});

OnlyNumberInput.displayName = 'OnlyNumberInput';

export default OnlyNumberInput;
