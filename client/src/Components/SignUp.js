import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {
  Button,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from "axios";

const SignUp = () => {
  const [val, setVal] = React.useState({
    userName: "",
    email: "",
    contact: "",
    password: "",
  });
  const [icon, setIcon] = React.useState(false);
  const alert = useAlert();

  const handleClickShowPassword = () => {
    setIcon(!icon);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setVal((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const registerHandler=()=>{
    const email = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const pass= /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    if(!email.test(val.email)){
      alert.error('Enter Valid Email');
      return ;
    } 
    if(!pass.test(val.password)){
      alert.error('Password must be 8-16 char long with a upper,lower and special char');
      return ;
    }
    if(val.contact.length!==10){
      alert.error('Enter valid Contact');
      return;
    }
    if(val.userName.length<=1){
      alert.error('Enter username');
      return;
    }

    axios.post('http://localhost:5000/api/user/register',{userName:val.userName,email:val.email,contact:val.contact,password:val.password})
    .then((res)=>{
      // console.log(res);
      alert.success(res.data.message);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <div className="Registercontainer">
      <div className="registerform">
      <h1>
        Create Account
      </h1>
        <TextField
          fullWidth
          size="small"
          onChange={handleChange}
          value={val.userName}
          name="userName"
          required
          id="outlined-required"
          label="Name"
        />
        <TextField
          fullWidth
          size="small"
          onChange={handleChange}
          value={val.email}
          name="email"
          required
          id="outlined-required"
          label="Email"
        />
        <TextField
          fullWidth
          size="small"
          onChange={handleChange}
          value={val.contact}
          name="contact"
          type="number"
          required
          id="outlined-required"
          label="Contact Number"
        />
        <FormControl size="small" fullWidth={true} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            type={icon ? "text" : "password"}
            name="password"
            value={val.password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {icon ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>{" "}
        <Button onClick={registerHandler} style={{maxWidth:'200px',background:'green'}} variant="contained">Sign Up</Button>
        <div>
          Already have account,<Link to="/login"><span style={{color:'green'}}>SignIn</span></Link>
        </div>
      </div>
      <div>
        <img
        alt="img"
          width="100%"
          style={{height:'100vh'}}
          src="https://thumbs.dreamstime.com/b/food-cold-snacks-top-view-setting-dark-background-variety-food-plates-cold-snacks-top-view-black-background-assortment-115128993.jpg"
        />
      </div>

    </div>
  );
};

export default SignUp;
