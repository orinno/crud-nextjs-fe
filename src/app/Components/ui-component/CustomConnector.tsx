import React from 'react';
import { StepConnector, styled, StyledComponentProps } from '@mui/material';

// Define the type for CustomConnector
type CustomConnectorProps = {};

// Customize the connector's styles here
const CustomConnector: React.ComponentType<StyledComponentProps> = styled(StepConnector)(
  ({ theme }) => ({
    // Customize your connector styles here
    alternativeLabel: {
      top: 22,
    },
    [`&.${CustomConnector}-active .${CustomConnector}-line`]: {
      backgroundColor: '#007bff', // Change this color to your desired color for active step
    },
    [`&.${CustomConnector}-completed .${CustomConnector}-line`]: {
      backgroundColor: '#4caf50', // Change this color to your desired color for completed step (changed to green)
    },
    [`.${CustomConnector}-line`]: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0', // Change this color to your desired default color
      borderRadius: 1,
    },
  }),
);

export default CustomConnector;
