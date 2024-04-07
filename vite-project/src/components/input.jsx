import React, { useState } from "react";
import TextField from '@mui/material/TextField';

export default function Input({ label, id,value,onChange }) {


  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      sx={{
        margin: 0,
        width: "100%",
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
        '& .MuiInputBase-input': {
          color: 'white',
        },
        "& .MuiInputLabel-outlined": {
          color: "white",
        },
        "& .MuiInputLabel-outlined-focused": {
          color: "white",
        }
      }}
    />
  );
}
