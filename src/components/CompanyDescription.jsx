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
  const { error, loading } = useGetCompanyById(companyId);
  const singleCompany = useSelector((store) => store.company.singleCompany);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load company data.");
    }
  }, [error]);

  // Loading state
  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  // Handle missing company data
  if (!singleCompany) {
    return <div className="text-center">Tidak ada data perusahaan yang ditemukan.</div>;
  }

  // Ensure the website URL is valid
  const websiteUrl = singleCompany.website && (singleCompany.website.startsWith('http://') || singleCompany.website.startsWith('https://'))
    ? singleCompany.website
    : `http://${singleCompany.website || ''}`;

  return (
    <div>
      <Navbar />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute left-0 w-full -z-10"
      >
        <path
          fill="#60A5FA"
          fillOpacity="1"
          d="M0,160L24,165.3C48,171,96,181,144,208C192,235,240,277,288,277.3C336,277,384,235,432,192C480,149,528,107,576,112C624,117,672,171,720,186.7C768,203,816,181,864,165.3C912,149,960,139,1008,154.7C1056,171,1104,213,1152,213.3C1200,213,1248,171,1296,170.7C1344,171,1392,213,1416,234.7L1440,256L1440,0L0,0Z"
        />
      </svg>
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
          {/* Display default logo if not available */}
          <img
            src={singleCompany.logo || '/path/to/default/logo.png'} // Use a fallback image for the logo
            alt={`${singleCompany.name} Logo`}
            className="h-12 w-12 mr-4 rounded-full border border-gray-300"
          />
          <h1 className="font-bold text-xl">{singleCompany.name}</h1>
        </div>
        <h2 className="border-b-2 border-b-gray-300 font-medium py-4">Deskripsi Perusahaan</h2>
        <div className="my-4">
          <h1 className="font-bold my-1">Deskripsi
            <span className="pl-4 font-normal text-gray-800">{singleCompany.description || 'Tidak ada deskripsi tersedia'}</span>
          </h1>
          <h1 className="font-bold my-1">Website
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pl-4 font-normal text-gray-800 underline"
            >
              {singleCompany.website || 'Tidak ada website'}
            </a>
          </h1>
          <h1 className="font-bold my-1">Lokasi
            <span className="pl-4 font-normal text-gray-800">{singleCompany.location || 'Lokasi tidak tersedia'}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CompanyDescription;
