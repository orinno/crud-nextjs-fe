// import { Autocomplete, Chip, CircularProgress, TextField } from '@mui/material';
// import { debounce, uniqueId } from 'lodash';
// import React, { useCallback, useEffect } from 'react';
// import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';
// import { loadMaster, MasterType } from '@/utils/services/master/Master';
// import { Controller, useFormContext } from 'react-hook-form';

// type MasterSelectProps = {
//   placeholder: string;
//   type: MasterType;
//   value?: any;
//   id?: string;
//   name?: string;
//   labelName?: string;
//   params?: object;
//   filterCriteria?: any;
//   multiple?: boolean;
//   required?: boolean;
//   limit?: number;
//   nameInput?: string;
//   disabled?: boolean;
//   onChange?: (value: any) => void;
//   labelField?: string;
//   onClose?: () => void;
//   requiredMultiple?: boolean;
// };

// const getNestedValue = (obj: any, path: string) => {
//   return path.split('.').reduce((acc: any, part: string) => acc && acc[part], obj);
// };

// const MasterSelectForm = (props: MasterSelectProps) => {
//   const [options, setOptions] = React.useState<any[]>([]);
//   const [loadingInput, setLoadingInput] = React.useState<boolean>(false);
//   const methods = useFormContext();
//   const [value, setValue] = React.useState<any | null>(null);

//   const handleMasterSearch = useCallback(
//     async (type: MasterType, query?: string) => {
//       setLoadingInput(() => true);

//       // Use the filterCriteria prop as the third argument to loadMaster
//       const { data } = await loadMaster(
//         type,
//         { ...props.params, search: query ?? '' },
//         props.filterCriteria,
//       );

//       setOptions(() => data);
//       setLoadingInput(() => false);
//     },
//     [props.params, props.filterCriteria],
//   );

//   useEffect(() => {
//     const isMultiple = props.multiple ?? false;

//     if (isMultiple) {
//       setValue(Array.isArray(props.value) ? props.value : [props.value]);
//     } else {
//       setValue(props.value);
//     }
//   }, [props.value, props.multiple]);

//   return (
//     <Controller
//       control={methods.control}
//       name={props.name ?? 'masterSelect'}
//       render={({ field }) => {
//         return (
//           <Autocomplete
//             id={props.id ?? uniqueId()}
//             options={options}
//             freeSolo
//             size="small"
//             getOptionLabel={(option: any) => getNestedValue(option, props.labelName ?? 'name')}
//             onKeyUp={debounce(
//               (event: React.KeyboardEvent<HTMLInputElement>) =>
//                 handleMasterSearch(props.type, (event.target as HTMLInputElement).value),
//               300,
//             )}
//             onOpen={() => handleMasterSearch(props.type)}
//             loadingText="Loading..."
//             loading={loadingInput}
//             isOptionEqualToValue={(option: any, value: any) =>
//               getNestedValue(option, props.labelName ?? 'name') ===
//               getNestedValue(value, props.labelName ?? 'name')
//             }
//             multiple={props.multiple ?? false}
//             disabled={props.disabled ?? false}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 variant="outlined"
//                 label={props?.labelField ?? ''}
//                 name={props.nameInput ?? 'masterSelect'}
//                 placeholder={props.placeholder ?? 'Please select'}
//                 required={props.required ?? false}
//                 value={props.value ?? ''} // Add value prop here
//                 InputProps={{
//                   ...params.InputProps,
//                   endAdornment: (
//                     <React.Fragment>
//                       {loadingInput ? <CircularProgress color="inherit" size={20} /> : null}
//                       {params.InputProps.endAdornment}
//                     </React.Fragment>
//                   ),
//                 }}
//               />
//             )}
//             disableCloseOnSelect={props.multiple ?? false}
//             limitTags={props.multiple ? props.limit ?? 3 : undefined}
//             renderOption={
//               props.multiple
//                 ? (propsOpt, option, { selected }) => (
//                     <li {...propsOpt} key={option.id}>
//                       <CustomCheckbox
//                         style={{ marginRight: 8 }}
//                         name={`${props.id ?? uniqueId()}`}
//                         key={propsOpt.id}
//                         value={getNestedValue(option, props.labelName ?? 'name')}
//                         checked={selected}
//                       />
//                       {`${getNestedValue(option, props.labelName ?? 'name')}`}
//                     </li>
//                   )
//                 : undefined
//             }
//             renderTags={
//               props.multiple
//                 ? (value, getTagProps) =>
//                     value.map((option, index) => (
//                       <Chip
//                         size="small"
//                         variant="outlined"
//                         label={getNestedValue(option, props.labelName ?? 'name')}
//                         {...getTagProps({ index })}
//                         key={index}
//                       />
//                     ))
//                 : undefined
//             }
//             onChange={(event, newValue) => {
//               field.onChange(newValue);
//               setValue(newValue); // Set the value here
//               if (props.onChange) {
//                 props.onChange(newValue);
//               }
//             }}
//             onClose={props.onClose}
//             onBlur={field.onBlur}
//             value={field.value ?? (props.multiple ? [] : null)}
//           />
//         );
//       }}
//     />
//   );
// };

// export default React.memo(MasterSelectForm);
