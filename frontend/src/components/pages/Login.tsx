import { authenticateUser } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const navigate = useNavigate();

  const { mutate: logIn } = useMutation({
    mutationKey: ["user"],
    mutationFn: () => authenticateUser(userData),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      console.log(data);
      navigate("/");
    },
    onError: (err: AxiosError) => {
      toast(err.response?.data as string);
    },
  });
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-white shadow p-10 rounded-2xl w-[500px]">
        <h1 className="text-center text-3xl font-bold">Welcome back</h1>
        <h4 className="text-gray-700 text-lg text-center mt-3">
          Sign in to your account
        </h4>
        <form
          className="mt-10"
          onSubmit={(e) => {
            e.preventDefault();
            logIn();
          }}
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg border border-gray-400 outline-none w-full"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="px-4 py-2 rounded-lg border border-gray-400 outline-none w-full"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
          <button className="text-white font-semibold w-full rounded-lg py-2 bg-[#2563EB] mt-5 cursor-pointer hover:bg-gray-200 hover:text-[#2563EB]">
            Log In
          </button>
        </form>
        <p className="mt-7 text-center">
          Don't have an account ?{" "}
          <Link to="/signup" className="text-[#2563EB] font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
