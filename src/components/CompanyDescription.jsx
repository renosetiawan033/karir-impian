import React, { useEffect } from "react"; 
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import Navbar from "./shared/navbar";

const CompanyDescription = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  
  // Fetch company data based on the companyId
  const { error } = useGetCompanyById(companyId);
  const singleCompany = useSelector((store) => store.company.singleCompany);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load company data.");
    }
  }, [error]);

  if (!singleCompany) {
    return <div>Tidak ada data perusahaan yang ditemukan.</div>; // Handle case where company data is not available
  }

  // Ensure the website URL is valid
  const websiteUrl = singleCompany.website.startsWith('http://') || singleCompany.website.startsWith('https://')
    ? singleCompany.website
    : `http://${singleCompany.website}`;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={() => navigate("/perusahaan")}
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali</span>
          </Button>
        </div>
        <div className="flex items-center mb-6">
          {singleCompany.logo && (
            <img 
              src={singleCompany.logo} 
              alt={`${singleCompany.name} Logo`} 
              className="h-12 w-12 mr-4 rounded-full border border-gray-300"
            />
          )}
          <h1 className="font-bold text-xl">{singleCompany.name}</h1>
        </div>
        <h2 className="border-b-2 border-b-gray-300 font-medium py-4">Deskripsi Perusahaan</h2>
        <div className="my-4">
          <h1 className="font-bold my-1">Deskripsi 
            <span className="pl-4 font-normal text-gray-800">{singleCompany.description}</span>
          </h1>
          <h1 className="font-bold my-1">Website 
            <a 
              href={websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="pl-4 font-normal text-gray-800 underline"
            >
              {singleCompany.website}
            </a>
          </h1>
          <h1 className="font-bold my-1">Lokasi 
            <span className="pl-4 font-normal text-gray-800">{singleCompany.location}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CompanyDescription;
