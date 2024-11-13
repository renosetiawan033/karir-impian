import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from '../../utils/constant';
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from 'lucide-react';
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null
  });
  
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/Login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center ">
      <form onSubmit={submitHandler} className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="font-bold text-2xl text-center mb-6">Daftar</h1>
        
        <div className="my-4">
          <Label htmlFor="fullname">Nama Lengkap</Label>
          <Input
            id="fullname"
            type="text"
            value={input.fullname}
            name="fullname"
            onChange={changeEventHandler}
            placeholder="Masukan Nama Lengkap"
            required
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="my-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="Masukan Email"
            required
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="my-4">
          <Label htmlFor="phoneNumber">No. Telepon</Label>
          <Input
            id="phoneNumber"
            type="number"
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={changeEventHandler}
            placeholder="Masukan No. Telepon"
            required
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="my-4">
          <Label htmlFor="password">Kata Sandi</Label>
          <Input
            id="password"
            type="password"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="Masukan Kata Sandi"
            required
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

          <div>
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              name="file"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between my-4">
          <RadioGroup className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="candidate"
                checked={input.role === "candidate"}
                onChange={changeEventHandler}
                className="cursor-pointer"
                required
              />
              <Label>Kandidat</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="business"
                checked={input.role === "business"}
                onChange={changeEventHandler}
                className="cursor-pointer"
                required
              />
              <Label>Pebisnis</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="my-4">
          {loading ? (
            <Button className="w-full flex justify-center items-center rounded-lg py-2 ">
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Silakan Tunggu
            </Button>
          ) : (
            <Button type="submit" className="w-full rounded-lg py-2 ">
              Daftar
            </Button>
          )}
        </div>

        <span className="text-sm text-center">
          Sudah punya akun?{" "}
          <Link to="/Login" className="text-blue-600 hover:underline">
            Masuk
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
