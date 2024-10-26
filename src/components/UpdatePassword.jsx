import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";

const UpdatePassword = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    email: user?.email || "",
    currentPassword: user?.password,  // Tambahkan field untuk currentPassword
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (input.newPassword && input.newPassword !== input.confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok.");
      return;
    }

    const formData = new FormData();
    formData.append("email", input.email);
    // Hanya tambahkan newPassword jika ada isinya
    if (input.newPassword) {
      formData.append("newPassword", input.newPassword);
    }
    
    // Tambahkan currentPassword jika ada isinya
    if (input.currentPassword) {
      formData.append("currentPassword", input.currentPassword);
    }

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${USER_API_END_POINT}/update/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Response data:", res.data); // Log response
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      } else {
        toast.error(res.data.message || "Update gagal.");
      }
    } catch (error) {
      console.error("Error response:", error.response);
      toast.error(error.response?.data?.message || "Terjadi kesalahan saat memperbarui profil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Akun</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="Masukkan email"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currentPassword" className="text-right">Password Lama</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={input.currentPassword}
                onChange={changeEventHandler}
                placeholder="Masukkan password lama"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newPassword" className="text-right">Password Baru</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={input.newPassword}
                onChange={changeEventHandler}
                placeholder="Masukkan password baru"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmPassword" className="text-right">Konfirmasi Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={input.confirmPassword}
                onChange={changeEventHandler}
                placeholder="Konfirmasi password"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Silakan Tunggu
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">Perbarui</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePassword;
