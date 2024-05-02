import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({label ,options, onChange,required}) {
  const [option, setoption] = React.useState('');

  const handleChange = (event) => {
    setoption(event.target.value);
    onChange(event)
    
  };

  return (

      <FormControl  sx={{
        backgroundColor: 'transparent', // Background color of the TextField
        '& .MuiOutlinedInput-root': { 
            '.MuiSvgIcon-root': {
                color:"white"
            },// Styling the OutlinedInput component
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
        ,
      }} fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label="option"
          onChange={handleChange}
          required={required}
        >
          {options.map((data)=>(<MenuItem value={data.value}>{data.label}</MenuItem>) )}
        </Select>
      </FormControl>
  );
}