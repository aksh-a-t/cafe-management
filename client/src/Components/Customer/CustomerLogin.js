// @ts-nocheck
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
} from "@mui/material";
import { Endpoint } from "../../Services/endpoints";

const CustomerLogin = () => {
  const [val,setVal] = useState({
    name:"",
    contact:"",
    otp:""
  })
  const [isTileOne, setTile] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const endpoints = new Endpoint();

  const handleChange = (event)=>{
    setVal(pre=>{
      return{
        ...pre,[event.target.name]:event.target.value
      }
    })
  }
  const submitDetails = ()=>{
    if(val.contact.length===10 && val.name.length>1){
      setTile(true);
    }
  }
  const submitOtp = async()=>{
    if(val.otp.length===6){
      let payload = {name:val.name,contact:val.contact,otp:val.otp};
      let response=await endpoints.customerLogin(params,payload);
      if(response !== "Error"){
        navigate(`/table/${params.table}`);
      }
    }
  }

  return (
    <>
      <div className="logincontainer">
        <div>
          <img
            alt="img"
            width="100%"
            style={{ height: "100vh" }}
            src="https://images.squarespace-cdn.com/content/v1/58989c1b5016e1eeef68cfbe/1558375119918-TL3ATOXWAD21219PKL50/scallops-peapuree.jpg"
          />
        </div>
        <div className="loginform">
          <div>
            <h1>Welcome To CAFE</h1>
            <h3>Table no. {params.table}</h3>
          </div>

          {!isTileOne ? (
            <>
              <TextField
                fullWidth
                size="small"
                onChange={handleChange}
                value={val.name}
                name="name"
                required
                id="outlined-required"
                label="Name"
                color="neutral"
              />
              <TextField
                fullWidth
                size="small"
                onChange={handleChange}
                value={val.contact}
                name="contact"
                required
                id="outlined-required"
                label="Contact"
                color="neutral"
              />
              <Button
                style={{ maxWidth: "200px", background: "limegreen" }}
                variant="contained"
                onClick={submitDetails}
              >
                Submit
              </Button>
            </>
          ) : (
            <>
              <label>Ask Staff for OTP</label>
              <TextField
                fullWidth
                size="small"
                onChange={handleChange}
                value={val.otp}
                name="otp"
                required
                id="outlined-required"
                label="OTP"
                type="number"
                color="neutral"
              />
              <Button
                style={{ maxWidth: "200px", background: "limegreen" }}
                variant="contained"
                onClick={submitOtp}
              >
                Submit
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerLogin;
