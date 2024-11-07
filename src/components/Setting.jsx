import React, { useState } from "react";
import { Button } from "./ui/button";
import { Pen } from "lucide-react"; 
import Navbar from "./shared/navbar";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant"; 
import UpdatePassword from "./UpdatePassword";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/authSlice"; // Import the setUser action
import { toast } from "sonner";

const Setting = () => {
    const [open, setOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            if (res.data.success) {
                localStorage.removeItem('token');
                dispatch(setUser(null));
                navigate('/'); // Navigate to the desired page
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    const handleDeleteUser = async () => {
        if (!user) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${USER_API_END_POINT}/delete/${user._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // Clear the token and dispatch logout action
                localStorage.removeItem('token');
                dispatch(setUser(null)); // Clear user state
                toast.success("Akun Anda berhasil dihapus."); // Show success message
                navigate('/'); // Navigate to the desired page after deletion
            }
        } catch (error) {
            console.error(`Error deleting user: ${error.response ? error.response.data : error.message}`);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 min-h-screen flex  justify-center">
                  {/* Decorative wave shape directly below the navbar */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="absolute left-0 w-full z-0" // Make sure z-index is lower
        >
          <path 
            fill="#60A5FA" 
            fillOpacity="1" 
            d="M0,160L24,165.3C48,171,96,181,144,208C192,235,240,277,288,277.3C336,277,384,235,432,192C480,149,528,107,576,112C624,117,672,171,720,186.7C768,203,816,181,864,165.3C912,149,960,139,1008,154.7C1056,171,1104,213,1152,213.3C1200,213,1248,171,1296,170.7C1344,171,1392,213,1416,234.7L1440,256L1440,0L0,0Z"
          />
        </svg>
                <div className="max-w-4xl w-full mx-auto rounded-2xl max-h-[2xl] h-full z-10 shadow-lg my-5 p-8 bg-white mt-10">
                    <h1 className="font-bold text-2xl mb-5 text-gray-800">Pengaturan</h1>

                    <div className="my-5 p-4 border border-gray-300 rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow duration-200">
                        <h2 className="font-medium text-md text-gray-700">Update Akun</h2>
                        <Button onClick={() => setOpen(true)} variant="outline" className="flex items-center">
                            <Pen className="mr-2" />
                            <span>Ubah</span>
                        </Button>
                    </div>

                    <div className="my-5 p-4 border border-gray-300 rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow duration-200">
                        <h2 className="font-medium text-md text-gray-700">Hapus Akun</h2>
                        <Button 
                            variant='outline' 
                            onClick={() => setConfirmDelete(true)} 
                            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white flex items-center transition-all duration-200"
                        >
                            <FaRegTrashAlt className="mr-3" />
                            Hapus Akun
                        </Button>
                    </div>

                    {confirmDelete && (
                        <div className="mt-4 p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
                            <p className="text-gray-800">Apakah Anda yakin ingin menghapus akun ini?</p>
                            <div className="flex justify-between mt-2">
                                <Button onClick={handleDeleteUser} variant="outline" className="text-red-500">
                                    Ya, Hapus
                                </Button>
                                <Button onClick={() => setConfirmDelete(false)} variant="outline">
                                    Batal
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <UpdatePassword open={open} setOpen={setOpen} />
        </div>
    );
};

export default Setting;
