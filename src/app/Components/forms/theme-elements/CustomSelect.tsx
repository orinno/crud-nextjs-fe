import React, { forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import { Select } from '@mui/material';

const CustomSelect = forwardRef((props: any, ref) => <Select {...props} ref={ref} />);
CustomSelect.displayName = 'CustomSelect';

const StyledCustomSelect = styled(CustomSelect)(({ }) => ({}));

export default StyledCustomSelect;
