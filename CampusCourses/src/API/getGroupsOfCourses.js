import axios from "axios";

export const getGroupsOfCourses = async () =>{
    try{
        let response = await axios.get('https://camp-courses.api.kreosoft.space/groups',
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        console.log(response.data)
        return response.data;
    }
    catch (error){
        console.log(error)
    }
}