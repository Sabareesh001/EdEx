import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({label}) {
  const [college, setCollege] = React.useState('');

  const handleChange = (event) => {
    setCollege(event.target.value);
  };

  return (

      <FormControl   sx={{
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
          value={college}
          label="College"
          onChange={handleChange}
        >
          <MenuItem value={10}>BIT</MenuItem>
          <MenuItem value={20}>PSG</MenuItem>
          <MenuItem value={30}>KCT</MenuItem>
        </Select>
      </FormControl>
  );
}