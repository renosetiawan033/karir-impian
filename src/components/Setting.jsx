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
                <div className="max-w-4xl w-full mx-auto rounded-2xl max-h-[2xl] h-full shadow-lg my-5 p-8 bg-white mt-10">
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
