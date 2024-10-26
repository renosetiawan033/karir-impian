import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from '../../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from 'lucide-react';
import { Button } from "../ui/button";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      console.log('Login Response:', res.data); // Log the response
  
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        dispatch(setUser(res.data.user)); // Store user info in Redux
  
        // Cek role pengguna
        const userRole = res.data.user.role;
        if (userRole) {
          console.log('User Role:', userRole);
          // Navigasi berdasarkan role
          if (userRole.includes('business')) {
            navigate('/business/companies');
          } else if (userRole.includes('administrator')) {
            navigate('/admin/company'); // Arahkan ke dashboard administrator
          } else {
            navigate('/'); // Arahkan pengguna biasa ke beranda
          }
        } else {
          toast.error('User role not found.');
        }
  
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if(user){
      navigate("/");
    }
  }, [])
  
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">Masuk</h1>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="Masukan Email"
            className="mt-1"
          />
        </div>
        <div>
          <Label>Kata Sandi</Label>
          <Input
            type="password"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="Masukan Kata Sandi"
            className="mt-1"
          />
        </div>
        <div className="my-6">
        {loading ? (
          <Button className="w-full my-4" disabled>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Silakan Tunggu
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Masuk
          </Button>
        )}
        </div>
        <span className="text-sm text-center">
          Belum punya akun?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Daftar
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;


