import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PasswordField(){
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

   return(
    <FormControl sx={{ m: 0, width: '100%', '& .MuiOutlinedInput-root': { // Styling the OutlinedInput component
      '& fieldset': { // Styling the fieldset of the OutlinedInput
        borderColor:"white", // Border color of the fieldset
      },
      '&:hover fieldset': { // Styling the fieldset on hover
        borderColor: 'white', // Border color on hover
      },
      '&.Mui-focused fieldset': { // Styling the fieldset when focused
        borderColor: 'white', // Border color when focused
      },
    },
    '& .MuiInputBase-input': { // Styling the input element
      color: 'white', // Text color
    },
    "& .MuiInputLabel-outlined": {
        color: "white", // Changes the label color
         // Changes the label font weight
      },
      "& .MuiInputLabel-outlined-focused": {
        color: "white", // Changes the label color
         // Changes the label font weight
      },
      "& .MuiInputLabel-outlined-focused": {
        color: "white", // Changes the label color // Changes the label font weight
    }
    ,}} variant="outlined">
    <InputLabel  sx={{color:"white"}} htmlFor="outlined-adornment-password">Password</InputLabel>
    <OutlinedInput
      id="outlined-adornment-password"
     
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment  position="end">
          <IconButton sx={{color:"white"}}
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      label="Password"
    />
  </FormControl>
   )
}