import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allBusinessJobs:[],
        singleJob:null,
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
    },
    reducers:{
        //actions
        setAllJob:(state,action) => {
            state.allJobs = action.payload;
        }, 
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllBusinessJobs:(state,action) => {
            state.allBusinessJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
});
export const {setAllJob, setSingleJob, setAllBusinessJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;