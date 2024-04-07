import React, { useState } from "react";
import Input from "../components/input";
import Button from "../components/button";
import "./checkAvailability.css";

function CheckAvailability() {
 const [availability, setAvailability] = useState("Not Available");
 const [value, setValue] = useState("");
 const [messageStyle, setMessageStyle] = useState({});

 const checkResult = (event) => {
    event.preventDefault(); // Prevents default form submission

    if (value === "200") {
      setAvailability("Available");
      setMessageStyle({ backgroundColor: "green" ,boxShadow: "0 0 50px 15px green",display:"block"});
    } else {
      setAvailability("Not Available");
      setMessageStyle({boxShadow: "0 0 50px 15px red",display:"block"});
    }

 };

 const handleInputChange = (event) => {
    setValue(event.target.value);
   
 };

 return (
    <div className="checkAvail">
      <form className="checkForm" onSubmit={checkResult}>
        <Input
          label="Enter College Code"
          id={"collegeCode"}
          onChange={handleInputChange}
          value={value}
        />
        <Button type="submit" action="Check" />
        
      </form>
      <br></br>
      <p id="availability" style={messageStyle}>{availability}</p>
      <br></br>
      <br></br>
      <a href="/"><Button action={"Go Back"}></Button></a>
    </div>
 );
}

export default CheckAvailability;
