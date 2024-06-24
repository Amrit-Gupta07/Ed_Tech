import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdFormatIndentDecrease } from "react-icons/md";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { sendOtp } from "../../../services/operations/authThunk";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../../../slices/authSlice";
import Tab from "../../Common/Tab";
import { useDispatch } from "react-redux";

const SignupForm = () => {
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const {firstName, lastName, email, password, confirmPassword} = formdata
  const handleOnChange = (e) => {
    setFormdata((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      toast.error("Passwords do not match");
    }

    const signupData = {
      ...formdata,
      accountType,
    };

    console.log(signupData)

    dispatch(setSignupData(signupData)); 
    // we are storing all the data , we will hit signup end point once we get the otp from the user, thats why we are keeping the signupdata stored in the state, we will hit signup endpoint from verify code page

    dispatch(sendOtp(formdata.email, navigate));

    setFormdata({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)

  };

  const tabdata = [
    {
      id:1,
      name: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id:2,
      name: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    }
  ]


  return (
    <div>
      <Tab tabdata ={tabdata} accountType={accountType} setAccountType= {setAccountType}/>
    <form onSubmit={handleOnSubmit}>
      <div className="flex w-full gap-x-8 mb-4">
        <div>
          <label>
            <p className="text-richblack-5 mb-1 text-[0.875rem]">First Name</p>
            <input 
                required
                type="text"
                value={firstName}
                name ="firstName"
                placeholder="Enter first name"
                onChange={handleOnChange}
                className="form-style p-2"
            />
            </label>
        </div>
        <div>
        <label>
            <p className="text-richblack-5 mb-1 text-[0.875rem]">Last Name</p>
            <input 
                required
                type="text"
                value={lastName}
                name ="lastName"
                placeholder="Enter last name"
                onChange={handleOnChange}
                className="form-style w-full p-2"
            />
            </label>
        </div>
      </div>

      <div className="mb-4 w-full">
      <label>
            <p className="text-richblack-5 mb-1 text-[0.875rem]">Email</p>
            <input 
                required
                type="email"
                value={email}
                name ="email"
                placeholder="Enter Email"
                onChange={handleOnChange}
                className="form-style w-full p-2"
            />
            </label>
      </div>

      <div className="flex gap-x-8">
        <div>
        <label>
            <p className="text-richblack-5 mb-1 text-[0.875rem]">Password</p>
            <input 
                required
                type="password"
                value={password}
                name ="password"
                placeholder="Enter Password"
                onChange={handleOnChange}
                className="form-style p-2"
            />
            </label>
        </div>
        <div>
        <label>
            <p className="text-richblack-5 mb-1 text-[0.875rem]">Confirm Password</p>
            <input 
                required
                type="password"
                value={confirmPassword}
                name ="confirmPassword"
                placeholder="Enter Password again"
                onChange={handleOnChange}
                className="form-style p-2"
            />
            </label>
        </div>
      </div>

      <button 
          className=" bg-yellow-50 rounded-lg w-full p-3 mt-4 "
          type="submit"
      >
        Create Account
      </button>
    </form>
    </div>
  );
};

export default SignupForm;
