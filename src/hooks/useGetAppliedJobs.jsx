import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                // Retrieve the token from local storage or another source
                const token = localStorage.getItem("token"); // Adjust as necessary

                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in the headers
                    }
                });
                
                console.log(res.data);
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchAppliedJobs();
    }, []); 
};

export default useGetAppliedJobs;
