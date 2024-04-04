import axios from "axios";
import {baseURL} from "../../consts/baseURL.js";
import {config} from "../../consts/config.js";

export const postLogout =async () =>{
    try{
        let response = await axios.post(`${baseURL}/logout`, [], config);
        console.log(response.data)
        return response.data;
    }
    catch (error){
        console.log(error)
    }
}