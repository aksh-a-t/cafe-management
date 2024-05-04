import { useNavigate } from 'react-router-dom';

const JwtExpire=(navigate,alert)=>{
    // const navigate = useNavigate();
    localStorage.removeItem("token");
    navigate("/login");
    alert.error("Session Expired. Login Again");
}
export default JwtExpire; 