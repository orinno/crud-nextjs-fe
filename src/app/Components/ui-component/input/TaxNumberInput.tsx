import React, { forwardRef, ChangeEvent, Ref } from 'react';

interface UppercaseInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const TaxNumberInput = forwardRef((props: UppercaseInputProps, ref: Ref<HTMLInputElement>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    // Remove non-digit characters
    value = value?.replace(/\D/g, '');

    // Apply the format pattern
    let formattedValue = '';
    for (let i = 0; i < value?.length; i++) {
      if (i === 2 || i === 5 || i === 8 || i === 12) {
        formattedValue += `.${value[i]}`;
      } else if (i === 9) {
        formattedValue += `-${value[i]}`;
      } else {
        formattedValue += value[i];
      }
    }

    //after length 15 cant input anymore
    if (value.length > 15) {
      //dont slice the value and cant input anymore
      formattedValue = formattedValue.slice(0, 20);
    }

    props.onChange({ ...event, target: { ...event.target, value: formattedValue } });
  };

  return <input {...props} ref={ref} onChange={handleChange} />;
});

TaxNumberInput.displayName = 'TaxNumberInput'; // Set display name

export default TaxNumberInput;
