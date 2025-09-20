import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../api/user";
import { useState } from "react";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const navigate = useNavigate()

  const { mutate: signUp } = useMutation({
    mutationKey: ["user"],
    mutationFn: () => createUser(userData),
    onSuccess: (data) => {
      console.log(data);
      navigate("/verify/"+data.id);
    },
    onError: (err: AxiosError) => {
      toast(err.response?.data as string);
    },
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-white shadow p-10 rounded-2xl w-[500px]">
        <h1 className="text-center text-3xl font-bold">Create an account</h1>
        <h4 className="text-gray-700 text-lg text-center mt-3">
          Sign up to get started
        </h4>
        <form
          className="mt-10 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            signUp();
          }}
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="px-4 py-2 rounded-lg border border-gray-400 outline-none w-full"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
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
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="passwordConfirmation"
              className="text-sm font-semibold text-gray-700"
            >
              Password Confirmation
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              placeholder="Confirm your password"
              className="px-4 py-2 rounded-lg border border-gray-400 outline-none w-full"
              value={userData.passwordConfirmation}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  passwordConfirmation: e.target.value,
                })
              }
            />
          </div>
          <button className="text-white font-semibold w-full rounded-lg py-2 bg-[#2563EB] mt-5 cursor-pointer hover:bg-gray-200 hover:text-[#2563EB]">
            Sign Up
          </button>
        </form>
        <p className="mt-7 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2563EB] font-semibold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
