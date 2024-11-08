import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { User2, LogOut, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.removeItem("token");
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="bg-blue-400">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <div className="-ml-20">
          <img
            src={logo}
            alt="Logo"
            className="py-2 px-8"
            style={{ width: "300px", height: "auto" }}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user ? (
              <>
                {user.role === "administrator" && (
                  <>
                    <li>
                      <Link to="/admin/company" className={`link ${isActive("/admin/company")}`}>
                        Perusahaan
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/pengguna" className={`link ${isActive("/admin/pengguna")}`}>
                        Pengguna
                      </Link>
                    </li>
                  </>
                )}
                {user.role === "business" && (
                  <>
                    <li>
                      <Link to="/business/companies" className={`link ${isActive("/business/companies")}`}>
                        Perusahaan
                      </Link>
                    </li>
                    <li>
                      <Link to="/business/jobs" className={`link ${isActive("/business/jobs")}`}>
                        Pekerjaan
                      </Link>
                    </li>
                  </>
                )}
                {user.role === "candidate" && (
                  <>
                    <li>
                      <Link to="/" className={`link ${isActive("/")}`}>
                        Beranda
                      </Link>
                    </li>
                    <li>
                      <Link to="/jobs" className={`link ${isActive("/jobs")}`}>
                        Pekerjaan
                      </Link>
                    </li>
                    <li>
                      <Link to="/perusahaan" className={`link ${isActive("/perusahaan")}`}>
                        Perusahaan
                      </Link>
                    </li>
                    <li>
                      <Link to="/browse" className={`link ${isActive("/browse")}`}>
                        Jelajahi
                      </Link>
                    </li>
                    <li>
                      <Link to="/tentangKami" className={`link ${isActive("/tentangKami")}`}>
                        Tentang Kami
                      </Link>
                    </li>
                  </>
                )}
              </>
            ) : null}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <ul className="flex font-medium items-center gap-5">
                <li>
                  <Link to="/" className={`link ${isActive("/")}`}>
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className={`link ${isActive("/jobs")}`}>
                    Pekerjaan
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className={`link ${isActive("/browse")}`}>
                    Jelajahi
                  </Link>
                </li>
                <li>
                  <Link to="/perusahaan" className={`link ${isActive("/perusahaan")}`}>
                    Perusahaan
                  </Link>
                </li>
                <li>
                  <Link to="/tentangKami" className={`link ${isActive("/tentangKami")}`}>
                    Tentang Kami
                  </Link>
                </li>
              </ul>
              <Link to="/login">
                <Button variant="outline">Masuk</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-[#0026A3]">Daftar</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user.role === "candidate" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Link to="/profile">
                        <Button variant="Link" className="underline-on-click">Lihat Profile</Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <Settings />
                    <Link to="/setting">
                      <Button variant="Link" className="underline-on-click">Pengaturan</Button>
                    </Link>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="Link" className="underline-on-click">Keluar</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">    
          <button
            className="text-white"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {user ? (
           <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user.role === "candidate" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Link to="/profile">
                        <Button variant="Link" className="underline-on-click">Lihat Profile</Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <Settings />
                    <Link to="/setting">
                      <Button variant="Link" className="underline-on-click">Pengaturan</Button>
                    </Link>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="Link" className="underline-on-click">Keluar</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ): null}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-500 p-4">
          <ul className="flex flex-col items-center gap-4">
            {user ? (
              <>
                {user.role === "administrator" && (
                  <>
                    <li>
                      <Link to="/admin/company" className={`link ${isActive("/admin/company")}`}>
                        Perusahaan
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/pengguna" className={`link ${isActive("/admin/pengguna")}`}>
                        Pengguna
                      </Link>
                    </li>
                    <li>
                  <Link to="/setting" className="underline">Pengaturan</Link>
                </li>
                <li>
                  <span
                    onClick={logoutHandler}
                    className="underline cursor-pointer"
                  >
                    Keluar
                  </span>
                </li>
                  </>
                )}
                {user.role === "business" && (
                  <>
                    <li>
                      <Link to="/business/companies" className={`link ${isActive("/business/companies")}`}>
                        Perusahaan
                      </Link>
                    </li>
                    <li>
                      <Link to="/business/jobs" className={`link ${isActive("/business/jobs")}`}>
                        Pekerjaan
                      </Link>
                    </li>
                <li>
                  <Link to="/setting" className="underline">Pengaturan</Link>
                </li>
                <li>
                  <span
                    onClick={logoutHandler}
                    className="underline cursor-pointer"
                  >
                    Keluar
                  </span>
                </li>
                  </>
                )}
                {user.role === "candidate" && (
                  <>
                    <li>
                      <Link to="/" className={`link ${isActive("/")}`}>
                        Beranda
                      </Link>
                    </li>
                    <li>
                      <Link to="/jobs" className={`link ${isActive("/jobs")}`}>
                        Pekerjaan
                      </Link>
                    </li>
                    <li>
                      <Link to="/perusahaan" className={`link ${isActive("/perusahaan")}`}>
                        Perusahaan
                      </Link>
                    </li>
                    <li>
                      <Link to="/browse" className={`link ${isActive("/browse")}`}>
                        Jelajahi
                      </Link>
                    </li>
                    <li>
                      <Link to="/tentangKami" className={`link ${isActive("/tentangKami")}`}>
                        Tentang Kami
                      </Link>
                    </li>
                  </>
                )}
              </>
            )  : (
              <>
                <li>
                  <Link to="/" className={`link ${isActive("/")}`}>
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className={`link ${isActive("/jobs")}`}>
                    Pekerjaan
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className={`link ${isActive("/browse")}`}>
                    Jelajahi
                  </Link>
                </li>
                <li>
                  <Link to="/perusahaan" className={`link ${isActive("/perusahaan")}`}>
                    Perusahaan
                  </Link>
                </li>
                <li>
                  <Link to="/tentangKami" className={`link ${isActive("/tentangKami")}`}>
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <Button variant="outline">Masuk</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <Button className="bg-blue-600 hover:bg-[#0026A3]">Daftar</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
