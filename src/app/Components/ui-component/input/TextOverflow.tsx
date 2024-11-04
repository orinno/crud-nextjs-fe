import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';

const TextOverflow = ({
  text,
  width,
  fontSize,
}: {
  text: string;
  width?: string;
  fontSize?: string;
}) => {
  const containerStyle = {
    whiteSpace: 'nowrap',
    width: width || '11em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const textStyle = {
    fontSize: fontSize || '14px',
  };

  return (
    <Tooltip title={text} placement="top-start">
      <div style={containerStyle}>
        <span style={textStyle}>{text ?? ''}</span>
      </div>
    </Tooltip>
  );
};

TextOverflow.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  fontSize: PropTypes.string,
};

export default TextOverflow;
