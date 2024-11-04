import { Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { IconDots, IconDotsVertical } from '@tabler/icons-react';
import { useState } from 'react';

const DropdownAction = ({ options }: { options: any[] }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (action: any, parameter: any) => {
    handleClose();
    action(parameter);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
      >
        <Tooltip title="Action" placement="top">
          <IconDotsVertical width={18} style={{ color: 'inherit' }} />
        </Tooltip>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleOptionClick(option.action, option.parameter)}>
            <IconButton size="small">{option.icon}</IconButton> {option.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownAction;
