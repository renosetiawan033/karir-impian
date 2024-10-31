import React, { useState } from "react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";

const CompaniesCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      console.log("Retrieved Token:", token); // Debugging line
  
      if (!token) {
        toast.error('You must be logged in to create a company.');
        return;
      }
  
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/add`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include token in Authorization header
          },
          withCredentials: true,
        }
      );
  
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/business/companies/${companyId}`);
      }
    } catch (error) {
      console.log('Error response:', error.response);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Nama Perusahaan Anda</h1>
          <p className="text-gray-500">
            Apa yang ingin Anda berikan pada nama perusahaan Anda? Anda dapat
            mengubahnya nanti.
          </p>
        </div>

        <Label>Nama Perusahaan</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="Masukan nama perusahaan"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/business/companies")}
          >
            Batalkan
          </Button>
          <Button onClick={registerNewCompany}>Lanjutkan</Button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesCreate;
