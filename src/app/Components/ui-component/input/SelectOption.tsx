import { Autocomplete, Checkbox, Chip, CircularProgress, TextField } from '@mui/material';
import { debounce, uniqueId } from 'lodash';
import React, { useEffect, useState } from 'react';
import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';
import { useFormContext } from 'react-hook-form';
interface MasterOption {
  name: string;
  value: any;
  [key: string]: any; // Index signature to accept any string parameter
}

type MasterSelectProps = {
  options: MasterOption[]; // Manual options array
  placeholder: string;
  value?: any;
  onChange?: (value: any) => void;
  id?: string;
  name?: string;
  labelName?: string;
  multiple?: boolean;
  required?: boolean;
  limit?: number;
  nameInput?: string;
  disabled?: boolean;
  secondLabel?: string;
  titleSecondLabel?: string;
  requiredOptions?: boolean;
};

const SelectOption = (props: MasterSelectProps) => {
  const [loadingInput, setLoadingInput] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<any | null>(null);
  const methods = useFormContext();
  const [options, setOptions] = React.useState<MasterOption[]>([]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <>
      <Autocomplete
        id={props.id ?? uniqueId()}
        options={props.options}
        freeSolo
        {...methods?.register(props.name ?? 'masterSelect')}
        size="small"
        // getOptionLabel={(option: string | MasterOption) =>
        //   (option as MasterOption)[props.labelName ?? 'name'] +
        //   (props.secondLabel
        //     ? ` - ${props.titleSecondLabel ?? ''} ${(option as MasterOption)[props.secondLabel]}`
        //     : props.requiredOptions
        //     ? ' *'
        //     : '')
        // }
        getOptionLabel={(option: string | MasterOption) => {
          const optionLabel = (option as MasterOption)[props.labelName ?? 'name'];
          const secondLabel = props.secondLabel
            ? ` - ${props.titleSecondLabel ?? ''} ${(option as MasterOption)[props.secondLabel]}`
            : '';
          const requiredMark = (option as MasterOption).required ? ' *' : '';
          return `${optionLabel}${secondLabel}${requiredMark}`;
        }}
        onChange={(event: any, newValue: any | null) => {
          methods?.setValue(props.name ?? 'masterSelect', newValue);
          if (props?.onChange) {
            props.onChange(newValue);
          }
        }}
        loadingText="Loading..."
        loading={loadingInput}
        isOptionEqualToValue={(option: MasterOption, value: any) => option.value === value}
        value={value ?? (props.multiple ? [] : null)}
        multiple={props.multiple ?? false}
        disabled={props.disabled ?? false}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.nameInput ?? ''}
            variant="outlined"
            placeholder={props.placeholder ?? 'Please select'}
            required={props.required ?? false}
            value={props.value ?? ''}
            InputProps={{
              ...params.InputProps,
              autoComplete: 'off',
              endAdornment: (
                <React.Fragment>
                  {loadingInput ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        disableCloseOnSelect={props.multiple ?? false}
        limitTags={props.multiple ? props.limit ?? 3 : undefined}
        // renderOption={(props, option: MasterOption, state) => {
        //   if (props.multiple) {
        //     const selected = state.selected;
        //     return (
        //       <li {...props}>
        //         <CustomCheckbox
        //           style={{ marginRight: 8 }}
        //           name={`${props.id ?? uniqueId()}`}
        //           key={option.id}
        //           value={option.id}
        //           checked={selected}
        //         />
        //         {`${option[props.labelName ?? 'name']}`}
        //       </li>
        //     );
        //   } else {
        //     return null; // Return null if not rendering for multiple options
        //   }
        // }}
        renderTags={
          props.multiple
            ? (value: MasterOption[], getTagProps) =>
                value.map((option: MasterOption, index: number) => (
                  <Chip
                    variant="outlined"
                    label={props.options.find((opt) => opt.value === option.value)?.name}
                    {...getTagProps({ index })}
                    key={index}
                  />
                ))
            : undefined
        }
      />
    </>
  );
};

export default React.memo(SelectOption);
