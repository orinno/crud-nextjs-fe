import {TextField, InputAdornment, IconButton} from '@mui/material';
import { Password, Visibility, VisibilityOff } from '@mui/icons-material';
import {useState} from 'react';

interface PassFieldProps {
    id?: string;
    name: string;
    type?: string;
}

const PassField: React.FC<PassFieldProps>=({id, name, type}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
        name={name} type={type === 'password' ? (showPassword ? 'text': 'password'): type}
        fullWidth required
        variant='outlined' margin='normal' InputProps={
            type === "password" ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }
            : undefined
        }
        />
    );
};

export default PassField
