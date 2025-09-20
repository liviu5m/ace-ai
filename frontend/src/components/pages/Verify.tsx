import { Link, useNavigate, useParams } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { resendVerificationCode, verifyUser } from "@/api/user";
import { toast, ToastContainer } from "react-toastify";
import type { AxiosError } from "axios";

const Verify = () => {
  const [code, setCode] = useState("");
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { mutate: verifyCode } = useMutation({
    mutationKey: ["verifyUser"],
    mutationFn: () => verifyUser(code, id || ""),
    onSuccess: (data) => {
      console.log(data);
      navigate("/login");
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
      toast(err.response?.data as string || "Something went wrong.")
      setError(true);
    },
  });

  const { mutate: resend } = useMutation({
    mutationKey: ["verifyUser"],
    mutationFn: () => resendVerificationCode(id || ""),
    onSuccess: (data) => {
      console.log(data);
      toast("Code resend");
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
      toast(err.response?.data as string || "Something went wrong.")
    },
  });
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-white shadow p-10 rounded-2xl w-[500px]">
        <h1 className="text-center text-3xl font-bold">Verify your account</h1>
        <h4 className="text-gray-700 text-lg text-center mt-3">
          Enter the code you receive on email
        </h4>
        <form
          className="mt-10 flex items-center justify-center flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            verifyCode();
          }}
        >
          <InputOTP maxLength={6} value={code} onChange={(e) => setCode(e)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <button className="text-white font-semibold w-full rounded-lg py-2 bg-[#2563EB] mt-7 cursor-pointer hover:bg-gray-200 hover:text-[#2563EB]">
            Verify
          </button>
        </form>
        {error && (
          <p className="text-center mt-5">
            Code has expired ?{" "}
            <span
              className="text-[#2563EB] font-semibold cursor-pointer"
              onClick={() => {
                resend();
              }}
            >
              Resend Verification Code
            </span>
          </p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Verify;
