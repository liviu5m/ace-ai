import { authenticateUser } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");

  const { mutate: logIn } = useMutation({
    mutationKey: ["user"],
    mutationFn: () => authenticateUser(userData),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      console.log(data);
      navigate("/");
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

  useEffect(() => {
    setError(searchParams.get("error") || "");
    searchParams.delete("error");
    setSearchParams(searchParams);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-white shadow p-10 rounded-2xl w-[500px]">
        <h1 className="text-center text-3xl font-bold">Welcome back</h1>
        <h4 className="text-gray-700 text-lg text-center mt-3">
          Sign in to your account
        </h4>
        {error == "credentials" && (
          <p className="text-red-500 text-center my-2">
            You created the account using credentials, you can only log in using
            credentials.
          </p>
        )}
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
          Don't have an account ?{" "}
          <Link to="/auth/signup" className="text-[#2563EB] font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
