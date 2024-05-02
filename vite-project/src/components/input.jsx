import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Autocomplete } from "@mui/material";

export default function Input({required, label, id,value,onChange,onKeyUp,bgImg,autoComplete,type}) {


  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      value={value}
      size="medium"
      onChange={onChange}
      onKeyUp={onKeyUp}
      required={required}
      autoComplete={autoComplete}
      type={type}
      sx={{
        margin: 0,
        width: "100%",
        backgroundImage:`url(${bgImg})`,
        backgroundSize:"20px",
        backgroundRepeat:"no-repeat",
        backgroundPositionX:"90%",
        backgroundPositionY:"50%",
        backgroundColor: 'transparent',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: "white",
            
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
        '& .MuiOutlinedInput-input':{
            '&:-webkit-autofill' :{ WebkitBoxShadow: '0 0 0 100px black inset',WebkitTextFillColor:"white"}
        },
        '& .MuiInputBase-input': {
          color: 'white',
        },
        "& .MuiInputLabel-outlined": {
          color: "white",
        },
        "& .MuiInputLabel-outlined-focused": {
          color: "white",
        },
      
        
      }}
      
    />
  );
}
