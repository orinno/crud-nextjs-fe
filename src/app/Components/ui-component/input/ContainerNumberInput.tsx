import React, { forwardRef, ChangeEvent, Ref, useEffect, useState } from 'react';

interface ContainerNumberInputProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  initialValue: string; // Add initialValue prop
}

const ContainerNumberInput = forwardRef(
  (props: ContainerNumberInputProps, ref: Ref<HTMLInputElement>) => {
    const { onChange, initialValue, ...other } = props;
    const [formattedValue, setFormattedValue] = useState(initialValue?.toUpperCase()); // Convert initial value to uppercase

    useEffect(() => {
      // Format the initial value when it changes
      if (initialValue) {
        setFormattedValue(formatContainerNumber(initialValue));
      }
    }, [initialValue]);

    const formatContainerNumber = (value: string) => {
      let formattedValue = '';
      for (let i = 0; i < value.length; i++) {
        if (i < 4) {
          // Uppercase only the first 4 characters
          formattedValue += value[i].toUpperCase();
        } else if (i === 4) {
          // Add a hyphen after the 4th character if it's a number
          if (/^\d$/.test(value[i])) {
            formattedValue += value[i];
          }
        } else if (i > 4 && i < 11) {
          // Only allow digits for characters 5 to 11
          if (/^\d$/.test(value[i])) {
            formattedValue += value[i];
          }
        }
        // Break if formattedValue length is more than 11
        if (formattedValue.length >= 11) break;
      }

      return formattedValue;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const formattedValue = formatContainerNumber(inputValue);
      setFormattedValue(formattedValue); // Set the formatted value
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

ContainerNumberInput.displayName = 'ContainerNumberInput'; // Set display name

export default ContainerNumberInput;
