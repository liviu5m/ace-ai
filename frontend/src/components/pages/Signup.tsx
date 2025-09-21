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
  const navigate = useNavigate();

  const { mutate: signUp } = useMutation({
    mutationKey: ["user"],
    mutationFn: () => createUser(userData),
    onSuccess: (data) => {
      console.log(data);
      navigate("/auth/verify/" + data.id, {
        state: { fromSignup: true },
      });
    },
    onError: (err: AxiosError) => {
      const responseData = err.response?.data;

      let errorMessage: string = "An unexpected error occurred";
      if (typeof responseData === "string") {
        errorMessage = responseData;
      } else if (typeof responseData === "object" && responseData !== null) {
        const values = Object.values(responseData);
        if (values.length > 0 && typeof values[0] === "string") {
          errorMessage = values[0];
        } else if (values.length > 0) {
          errorMessage = String(values[0]);
        }
      }
      toast(errorMessage);
    },
  });

  const logInWithGoogle = () => {
    window.location.href =
      import.meta.env.VITE_API_URL + "/oauth2/authorization/google";
  };

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
        <div className="relative my-5">
          <hr />
          <span className="absolute top-1/2 left-1/2 -translate-1/2 bg-white px-4 font-semibold">
            Or
          </span>
        </div>
        <button
          className="text-black font-semibold w-full border border-gray-200 rounded-lg py-3 bg-white mt-5 cursor-pointer hover:bg-black hover:text-white flex items-center justify-center gap-5"
          onClick={() => logInWithGoogle()}
        >
          <img src="/imgs/google.png" className="w-7" />
          <span className="text-lg">Google</span>
        </button>
        <p className="mt-7 text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-[#2563EB] font-semibold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
