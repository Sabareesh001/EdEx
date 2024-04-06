import React from "react";
import TextField from '@mui/material/TextField';
export default function Input(){
    return(
        <TextField
  id="text-search"
  label="UserId"
  variant="outlined"
  sx={{
    margin:0,
    width:"100%",
    backgroundColor: 'transparent', // Background color of the TextField
    '& .MuiOutlinedInput-root': { // Styling the OutlinedInput component
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
  }}
/>
    )
}
