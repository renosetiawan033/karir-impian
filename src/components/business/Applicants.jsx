import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        console.log("Fetching applicants for ID:", params.id); // Log the ID

        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicant`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error("Error fetching applicants:", error); // Log the error
        toast.error("Failed to fetch applicants. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllApplicants();
  }, [params.id]);

  return (
    <div>
      <Navbar />
        {/* Decorative wave shape directly below the navbar */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="absolute top-0 left-0 w-full -z-10" // Make sure z-index is lower
        >
          <path 
            fill="#60A5FA" 
            fillOpacity="1" 
            d="M0,160L24,165.3C48,171,96,181,144,208C192,235,240,277,288,277.3C336,277,384,235,432,192C480,149,528,107,576,112C624,117,672,171,720,186.7C768,203,816,181,864,165.3C912,149,960,139,1008,154.7C1056,171,1104,213,1152,213.3C1200,213,1248,171,1296,170.7C1344,171,1392,213,1416,234.7L1440,256L1440,0L0,0Z"
          />
        </svg>
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={() => navigate("/business/jobs")}
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali</span>
          </Button>
        </div>
        {/* <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1> */}
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
