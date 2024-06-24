import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../services/operations/authThunk";
import { signup } from "../services/operations/authThunk";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signupData, loading } = useSelector((state) => state.auth);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
    } = signupData;

    // const dataWithOtp = {
    //     ...signupData,
    //     otp,
    //     navigate,
    // }

    dispatch(
      signup(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };
  return (
    <div className="flex items-center justify-center text-white h-screen ">
      <div className="flex flex-col gap-y-4 max-w-[500px] p-4 lg:p-8">
        <h1 className="text-3xl font-bold text-richblack-25">Verify Email</h1>
        <p className="text-lg">
          A verification code has been sent to you. Enter the code below.
        </p>
        <form onSubmit={handleVerifyAndSignup}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: " inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="bg-richblack-800 rounded-lg w-[48px] lg:w-[60px] aspect-square focus:border-0 focus:outline-2 focus:outline-yellow-50"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
            }}
          />

          <button
            type="submit"
            className="bg-yellow-50 w-full mt-6 rounded-lg p-3 text-richblack-900 font-medium "
          >
            {" "}
            Verify Email
          </button>
        </form>
        <div className="flex justify-between">
          <Link to={`/signup`}>
            <p className="flex items-center gap-x-2">
              <BiArrowBack />
              Back to Signup
            </p>
          </Link>

          <button
            className="flex items-center gap-x-2 text-blue-100"
            onClick={() => dispatch(sendOtp(signupData.email, navigate))}
          >
            <RxCountdownTimer />
            Resend it
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
