import { Autocomplete, Chip, CircularProgress, TextField } from '@mui/material';
import { debounce, uniqueId } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';
import { loadMaster, MasterType } from '@/utils/services/master/Master';
import { Controller, useFormContext } from 'react-hook-form';
import { IconCaretUpFilled, IconCaretDownFilled } from '@tabler/icons-react';

type MasterSelectProps = {
  placeholder: string;
  type: MasterType;
  value?: any;
  id?: string;
  name?: string;
  labelName?: string;
  params?: object;
  filterCriteria?: any;
  filterByServiceId?: any; // New prop for filtering activity by serviceId
  multiple?: boolean;
  required?: boolean;
  limit?: number;
  nameInput?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  labelField?: string;
  onClose?: () => void;
  requiredMultiple?: boolean;
  handlingData?: (data: any) => any;
  multiline?: boolean;
  rows?: number;
};

const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc: any, part: string) => acc && acc[part], obj);
};

const MasterSelectForm = (props: MasterSelectProps) => {
  const { handlingData, filterByServiceId } = props;
  const [options, setOptions] = useState<any[]>([]);
  const [loadingInput, setLoadingInput] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false); // State to control dropdown open/close
  const methods = useFormContext();
  const [value, setValue] = useState<any | null>(null);

  const reCreateValue = useCallback(
    (value: any) => {
      if (handlingData) {
        return handlingData(value);
      }
      return value;
    },
    [handlingData],
  );

  const handleMasterSearch = useCallback(
    async (type: MasterType, query?: string) => {
      setLoadingInput(() => true);

      const criteria = filterByServiceId ? { filter: filterByServiceId } : props.filterCriteria;
      const { data } = await loadMaster(type, { ...props.params, search: query ?? '' }, criteria);

      const result = reCreateValue(data);
      setOptions(() => result);
      setLoadingInput(() => false);
    },
    [props.params, props.filterCriteria, filterByServiceId, reCreateValue],
  );

  useEffect(() => {
    const isMultiple = props.multiple ?? false;

    if (isMultiple) {
      setValue(Array.isArray(props.value) ? props.value : [props.value]);
    } else {
      setValue(props.value);
    }
  }, [props.value, props.multiple]);

  useEffect(() => {
    if (filterByServiceId) {
      handleMasterSearch(props.type);
    }
  }, [filterByServiceId, handleMasterSearch, props.type]);

  return (
    <Controller
      control={methods.control}
      name={props.name ?? 'masterSelect'}
      render={({ field }) => {
        return (
          <Autocomplete
            id={props.id ?? uniqueId()}
            options={options}
            freeSolo={false} // Prevent manual typing
            size="small"
            getOptionLabel={(option: any) => getNestedValue(option, props.labelName ?? 'name')}
            onKeyUp={debounce(
              (event: React.KeyboardEvent<HTMLInputElement>) =>
                handleMasterSearch(props.type, (event.target as HTMLInputElement).value),
              300,
            )}
            onOpen={() => {
              handleMasterSearch(props.type);
              setIsOpen(true); // Open dropdown
            }}
            onClose={() => {
              setIsOpen(false); // Close dropdown
            }}
            loadingText="Loading..."
            loading={loadingInput}
            isOptionEqualToValue={(option: any, value: any) =>
              getNestedValue(option, props.labelName ?? 'name') ===
              getNestedValue(value, props.labelName ?? 'name')
            }
            multiple={props.multiple ?? false}
            disabled={props.disabled ?? false}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={props?.labelField ?? ''}
                name={props.nameInput ?? 'masterSelect'}
                placeholder={props.placeholder ?? 'Please select'}
                required={props.required ?? false}
                value={props.value ?? ''} // Add value prop here
                multiline={props.multiline ?? false}
                rows={props.rows ?? 1}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingInput ? <CircularProgress color="inherit" size={20} /> : null}
                      {/* {!loadingInput && // Show arrow based on open state
                        (isOpen ? <IconCaretUpFilled /> : <IconCaretDownFilled />)} */}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            disableCloseOnSelect={props.multiple ?? false}
            limitTags={props.multiple ? props.limit ?? 3 : undefined}
            renderOption={
              props.multiple
                ? (propsOpt, option, { selected }) => (
                    <li {...propsOpt} key={option.id}>
                      <CustomCheckbox
                        style={{ marginRight: 8 }}
                        name={`${props.id ?? uniqueId()}`}
                        key={propsOpt.id}
                        value={getNestedValue(option, props.labelName ?? 'name')}
                        checked={selected}
                      />
                      {`${getNestedValue(option, props.labelName ?? 'name')}`}
                    </li>
                  )
                : undefined
            }
            renderTags={
              props.multiple
                ? (value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        size="small"
                        variant="outlined"
                        label={getNestedValue(option, props.labelName ?? 'name')}
                        {...getTagProps({ index })}
                        key={index}
                      />
                    ))
                : undefined
            }
            onChange={(event, newValue) => {
              // Ensure value exists in options
              const isValidSelection = Array.isArray(newValue)
                ? newValue.every((val) => options.some((option) => option.id === val.id))
                : options.some((option) => option.id === newValue?.id);

              if (isValidSelection) {
                field.onChange(newValue);
                setValue(newValue);
                if (props.onChange) {
                  props.onChange(newValue);
                }
              } else {
                // Handle invalid input (e.g., when the value doesn't exist in options)
                field.onChange(null);
                setValue(null);
              }
            }}
            value={field.value ?? (props.multiple ? [] : null)}
            onBlur={field.onBlur}
          />
        );
      }}
    />
  );
};

export default React.memo(MasterSelectForm);
