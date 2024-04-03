import axios from "axios";
import {baseURL} from "../../consts/baseURL.js";

export const putEditProfile = async (data) => {
    try {
        const response = await axios.put(`${baseURL}/profile`, data ,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log('Data:', response.data);
        return response.data;
    } catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
    }
}