// @ts-nocheck
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';
export class Endpoint{
    API = "http://localhost:5000";
    ErrorCode = "Error";
    socket;
    internalSocket;
     navigate = useNavigate();



    handleError(error){
        // this.navigate("/login");
        return this.ErrorCode;
    }
    async TableCheck(params){
        try{
            await axios.get(`${this.API}/api/table/${params.table}/check`)
        }catch(e){
            console.log(e.response);
            return this.handleError();
        }
    }
    async customerLogin(params,payload){
        try{
            let response = await axios.post(`${this.API}/api/table/${params.table}/customer/add`,payload);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("myData",JSON.stringify(response.data.userData));
        }catch(e){
            return this.handleError();
        }
    }
    async getCustomerScopeProducts(){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.get(`${this.API}/api/product/customer`,{headers:{Authorization:`Bearer ${token}`}});
            console.log(response);
            return response.data.data;
        }catch(e){
            return this.handleError();
        }
    }
    getSocketInstance(params){
        console.log(this.socket);
        if(this.socket){
            return this.socket;
        }
        else{
            return this.socket=io(this.API,{auth:{token:localStorage.getItem("token"),table:params.table}})
        }
    }

    getInternalSocketInstance(){
        if(this.internalSocket){
            return this.internalSocket;
        }
        else{
            return this.internalSocket=io(this.API,{auth:{token:localStorage.getItem("token")}})
        }
    }

    async createInternalUser(payload){
        try{
            await axios.post(`${this.API}/api/internal/user/create`,payload)
        }catch(e){
            return this.handleError();
        }
    }

    async getInternalUserFeatures(){
        try{
            let token = localStorage.getItem("token");
            let response =  await axios.get(`${this.API}/api/internal/user/features`,{headers:{Authorization:`Bearer ${token}`}})
            return response.data;
        }catch(e){
            return this.handleError(e);
        }
    }

    async loginInternalUser(payload){
        try{
            let response = await axios.post(`${this.API}/api/internal/user/login`,payload);
            localStorage.setItem("token",response.data.token);
        }catch(e){
            return this.handleError(e);
        }
    }

    async createCategory(payload){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.post(`${this.API}/api/category/create`,payload,{headers:{Authorization:`Bearer ${token}`}})
            return response.data.data;
        }catch(e){
            return this.handleError(e);
        }
    }

    async updateCategory(payload){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.patch(`${this.API}/api/category/update`,payload,{ headers: { Authorization: `Bearer ${token}` } })
        }catch(e){
            return this.handleError(e);
        }
    }

    async getCategories(){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.get(`${this.API}/api/category/`,{headers:{Authorization:`Bearer ${token}`}})
            return response.data.data;
        }catch(e){
            return this.handleError(e);
        }
    }

    async createBill(payload){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.post(`${this.API}/api/bill/create`,payload,{headers:{Authorization:`Bearer ${token}`}});

        }catch(e){
            return this.handleError(e);
        }
    }

    async getInternalScopeProducts(){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.get(`${this.API}/api/product/internal`,{headers:{Authorization:`Bearer ${token}`}})
            return response.data.data;
        }catch(e){
            return this.handleError(e);
        }
    }

    async createNewProduct(payload){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.post(`${this.API}/api/product/create`,payload,{headers:{Authorization:`Bearer ${token}`}})
            return response.data.data;
        }catch(e){
            return this.handleError(e);
        }
    }

    async updateProduct(payload){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.patch(`${this.API}/api/product/update`,payload,{headers:{Authorization:`Bearer ${token}`}})

        }catch(e){
            return this.handleError(e);
        }
    }

    async deleteProduct(params){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.delete(`${this.API}/api/product/delete/${params.id}`,{headers:{Authorization:`Bearer ${token}`}})
        }catch(e){
            return this.handleError(e);
        }
    }

    async setProductStatus(payload){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.patch(`${this.API}/api/product/update/status`,payload,{headers:{Authorization:`Bearer ${token}`}})
            
        }catch(e){
            return this.handleError(e);
        }
    }

    async getAllInternalUsers(){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.get(`${this.API}/api/internal/users/all`,{headers:{Authorization:`Bearer ${token}`}})
            console.log(response);
            return response.data.data;
        }catch(e){
            return this.handleError(e);
        }
    }

    async getInternalUserData(params){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.get(`${this.API}/api/internal/user/${params.userId}`,{headers:{Authorization:`Bearer ${token}`}})
            return response.data.data;

        }catch(e){
            return this.handleError(e);
        }
    }

    async updateInternalUserData(payload,params){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.patch(`${this.API}/api/internal/user/${params.userId}/update`,payload,{headers:{Authorization:`Bearer ${token}`}})

        }catch(e){
            return this.handleError(e);
        }
    }

    async deleteInternalUser(params){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.delete(`${this.API}/api/internal/user/${params.userId}/delete`,{headers:{Authorization:`Bearer ${token}`}})
        }catch(e){
            return this.handleError(e);
        }
    }

    async createTable(payload){
        try{
            let token = localStorage.getItem("token");
            let response = await axios.post(`${this.API}/api/table/create`,payload,{headers:{Authorization:`Bearer ${token}`}});
        }catch(e){
            return this.handleError(e);
        }
    }





    async dummyData(){
        try{
            let response = axios.get('https://dummyjson.com/products');
            return response;
        }catch(e){
            console.log(e);
            return this.handleError(e);
        }
    }
}