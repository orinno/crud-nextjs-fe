// import { Autocomplete, Checkbox, Chip, CircularProgress, TextField } from '@mui/material';
// import { debounce, uniqueId } from 'lodash';
// import React, { useCallback, useEffect } from 'react';
// import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';
// import { loadMaster, MasterType } from '@/utils/services/master/Master';
// import { useFormContext } from 'react-hook-form';

// type MasterSelectProps = {
//   placeholder: string;
//   type: MasterType;
//   value?: any;
//   onChange?: (value: any) => void;
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
// };

// const MasterSelect = (props: MasterSelectProps) => {
//   const [options, setOptions] = React.useState<any[]>([]);
//   const [loadingInput, setLoadingInput] = React.useState<boolean>(false);
//   const [value, setValue] = React.useState<any | null>(null);
//   const methods = useFormContext();

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
//     <>
//       <Autocomplete
//         id={props.id ?? uniqueId()}
//         options={options}
//         freeSolo
//         {...methods?.register(props.name ?? 'masterSelect')}
//         size="small"
//         getOptionLabel={(option: any) => option[props.labelName ?? 'name']}
//         onChange={(event: any, newValue: any | null) => {
//           methods?.setValue(props.name ?? 'masterSelect', newValue);
//           if (props?.onChange) {
//             props.onChange(newValue);
//           }
//         }}
//         onKeyUp={debounce(
//           (event: React.KeyboardEvent<HTMLInputElement>) =>
//             handleMasterSearch(props.type, (event.target as HTMLInputElement).value),
//           300,
//         )}
//         onOpen={() => handleMasterSearch(props.type)}
//         loadingText="Loading..."
//         loading={loadingInput}
//         isOptionEqualToValue={(option: any, value: any) => option?.id === value?.id}
//         value={value ?? (props.multiple ? [] : null)}
//         multiple={props.multiple ?? false}
//         disabled={props.disabled ?? false}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label={props.nameInput ?? ''}
//             variant="outlined"
//             placeholder={props.placeholder ?? 'Please select'}
//             required={props.required ?? false}
//             InputProps={{
//               ...params.InputProps,
//               autoComplete: 'off',
//               endAdornment: (
//                 <React.Fragment>
//                   {loadingInput ? <CircularProgress color="inherit" size={20} /> : null}
//                   {params.InputProps.endAdornment}
//                 </React.Fragment>
//               ),
//             }}
//           />
//         )}
//         disableCloseOnSelect={props.multiple ?? false}
//         limitTags={props.multiple ? props.limit ?? 3 : undefined}
//         // renderOption={
//         //   props.multiple
//         //     ? (propsOpt, option, { selected }) => (
//         //         <li {...propsOpt} key={option.id}>
//         //           <CustomCheckbox
//         //             style={{ marginRight: 8 }}
//         //             name={`${props.id ?? uniqueId()}`}
//         //             key={propsOpt.id}
//         //             value={option[props.labelName ?? 'name']}
//         //             checked={selected}
//         //           />
//         //           {`${option[props.labelName ?? 'name']}`}
//         //         </li>
//         //       )
//         //     : undefined
//         // }
//         renderOption={
//           props.multiple
//             ? (propsOpt, option, { selected }) => (
//                 <li {...propsOpt} key={option.id}>
//                   <CustomCheckbox
//                     style={{ marginRight: 8 }}
//                     name={`${props.id ?? uniqueId()}`}
//                     key={option.id} // Use option.id as the key
//                     value={option.id} // Use option.id as the value
//                     checked={selected}
//                   />
//                   {`${option[props.labelName ?? 'name']}`} {/* Display the label properly */}
//                 </li>
//               )
//             : undefined
//         }
//         renderTags={
//           props.multiple
//             ? (value: readonly string[], getTagProps) =>
//                 value.map((option: string, index: number) => (
//                   <Chip
//                     variant="outlined"
//                     // label={option[props.labelName ?? 'name']}
//                     {...getTagProps({ index })}
//                     key={index}
//                   />
//                 ))
//             : undefined
//         }
//       />
//     </>
//   );
// };

// export default React.memo(MasterSelect);
