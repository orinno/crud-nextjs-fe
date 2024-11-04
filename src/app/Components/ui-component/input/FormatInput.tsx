import React, { forwardRef, ChangeEvent, Ref, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

interface TruckNumberFormatProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  initialValue?: string; // Optional initial value
}

const TruckNumberFormat = React.forwardRef(
  (props: TruckNumberFormatProps, ref: Ref<HTMLInputElement>) => {
    const { onChange, initialValue, ...other } = props;
    const [formattedValue, setFormattedValue] = useState('');

    useEffect(() => {
      if (initialValue) {
        const formattedInitialValue = formatTruckNumber(initialValue);
        setFormattedValue(formattedInitialValue);
      }
    }, [initialValue]);

    const formatTruckNumber = (value: string) => {
      // Apply specific format: AA 0000 AAA

      // Remove non-alphanumeric characters
      let formattedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');

      // Ensure at least one letter and one number
      const hasLetter = /[A-Z]/.test(formattedValue);
      const hasNumber = /[0-9]/.test(formattedValue);
      if (!hasLetter || !hasNumber) {
        return value; // Return original value if requirements are not met
      }

      // Split the value into parts (letters, numbers, and letters)
      let [lettersPart, numbersPart, lettersPart2] = [
        formattedValue.substring(0, 2),
        formattedValue.substring(2, 6),
        formattedValue.substring(6, 9),
      ];

      // Apply minimum and maximum length constraints
      lettersPart = lettersPart.slice(0, 2);
      numbersPart = numbersPart.slice(0, 4);
      lettersPart2 = lettersPart2.slice(0, 3);

      // Construct the formatted value
      formattedValue = `${lettersPart}${numbersPart}${lettersPart2}`;

      // Handle the case when deleting
      if (value.length < formattedValue.length) {
        formattedValue = formattedValue.slice(0, value.length);
      }

      return formattedValue;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const formattedValue = formatTruckNumber(inputValue);
      setFormattedValue(formattedValue); // Set the formatted value
      onChange({
        target: {
          name: props.name,
          value: formattedValue,
        },
      });
    };

    return (
      <input
        {...other}
        ref={ref}
        onChange={handleChange}
        value={formattedValue} // Set the value of TextField to the formatted value
      />
    );
  },
);

TruckNumberFormat.displayName = 'TruckNumberFormat';

export default TruckNumberFormat;
