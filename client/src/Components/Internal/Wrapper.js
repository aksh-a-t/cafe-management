// @ts-nocheck
import React, { createContext, useEffect, useState } from "react";
import { Endpoint } from "../../Services/endpoints";
import CircularLoader from "../../SubComponents/CircularLoader";
import { Navigate } from "react-router-dom";

//if I use it like a normal function as below then I won't be able to add functionality like of a loader
//cz before await if I return loader then function would break there and won't execute api
//original wrapper is how it can be done which I guess can not be done in simple function

// const Wrapper = async({children}) => {
//     let data = await axios.get("http://localhost:5000/api/data");
//     if(data)
// }
export const InternalUserContext = createContext();
const Wrapper = ({children}) => {
    const [state,setState] = useState(0);
    const endpoint = new Endpoint();
    const [userInfo,setUserInfo] = useState([]);
    useEffect(()=>{
        const getUserInfo = async() =>{
            let response = await endpoint.getInternalUserFeatures();
            if(response!==endpoint.ErrorCode){
                setState(1);
                setUserInfo([...response.features]);
            }else{
                setState(2);
            }
        }
        getUserInfo();
    },[])
    switch(state){
        case 1:return (<InternalUserContext.Provider value={userInfo}>{children}</InternalUserContext.Provider>);
        case 2:return<Navigate to="/notfound"/>;
        default:return <CircularLoader/>;
    }
}

export default Wrapper;