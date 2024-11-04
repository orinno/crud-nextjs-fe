import React, { forwardRef, ChangeEvent, Ref, useEffect, useState } from 'react';

interface ContainerNumberInputProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  initialValue: string;
}

const SealNumberFormat = forwardRef(
  (props: ContainerNumberInputProps, ref: Ref<HTMLInputElement>) => {
    const { onChange, initialValue, ...other } = props;
    const [formattedValue, setFormattedValue] = useState(initialValue?.toUpperCase());

    useEffect(() => {
      if (initialValue) {
        setFormattedValue(formatContainerNumber(initialValue));
      }
    }, [initialValue]);

    const formatContainerNumber = (value: string) => {
      let formattedValue = '';
      for (let i = 0; i < value.length && formattedValue.length < 9; i++) {
        //can use lowercase or uppercase, or number
        if (/^[a-zA-Z0-9]$/.test(value[i])) {
          formattedValue += value[i];
        }
      }
      // Ensure the length is exactly 9 characters
      return formattedValue.slice(0, 9);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value.toUpperCase(); // Convert to uppercase
      const formattedValue = formatContainerNumber(inputValue);
      setFormattedValue(formattedValue);
      onChange({
        target: {
          name: props.name,
          value: formattedValue,
        },
      });
    };

    return <input {...other} ref={ref} onChange={handleChange} value={formattedValue} />;
  },
);

SealNumberFormat.displayName = 'SealNumberFormat';

export default SealNumberFormat;
