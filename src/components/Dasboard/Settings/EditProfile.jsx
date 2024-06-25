import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Navigate, useNavigate } from "react-router-dom";
import { updateprofile } from "../../../services/operations/SettingsThunk";
import IconBtn from "../../Common/IconBtn";

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const genders = [
    "Male",
    "Female",
    "Non-Binary",
    "Prefer not to say",
    "Other",
  ];

  const { user } = useSelector((state) => state.profile);
  const {token} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = async (data) => {
    try{
      console.log(data)
      dispatch(updateprofile(token,data));
    }
    catch(error){
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="bg-richblack-800 px-12 py-8 rounded-lg  border-[1px] border-richblack-700 text-richblack-5 mt-10">
          <div className="flex flex-col gap-y-4">

            <p className="text-lg font-bold">Profile Information</p>

            <div className="flex gap-x-5 items-center">
              <div className="w-[48%] flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2 ">
                  <label htmlFor="firstName" className="lable-style">FirstName</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter First Name"
                    className="form-style"
                    {...register("firstName", { required: true })}
                    defaultValue={user?.firstName}
                  />
                  {errors.firstName && (
                    <span className="text-yellow-50">
                      Please enter your first Name
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <label htmlFor="dateOfBirth" className="lable-style">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    placeholder="dd-mm-yyy"
                    className="form-style"
                    {...register("dateOfBirth", { required: true })}
                    defaultValue={user?.additionalDetails?.dateOfBirth}
                  />
                  {errors.dateOfBirth && (
                    <span className="text-yellow-50">
                      {errors.dateOfBirth.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-y-2 ">
                  <label htmlFor="contactNumber" className="lable-style">Contact Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    id="contactNumber"
                    placeholder="Enter Contact Number"
                    className="form-style"
                    {...register("contactNumber", {
                      maxLength: {
                        value: 12,
                        message: "Invalid Contact Number",
                      },
                      minLength: {
                        value: 10,
                        message: "Invalid Contact Number",
                      },
                    })}
                    defaultValue={user?.additionalDetails?.contactNumber}
                  />
                  {errors.contactNumber && (
                    <span className="text-yellow-50">
                      {errors.contactNumber.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-[48%] flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2 ">
                  <label htmlFor="lastName" className="lable-style">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter Last Name"
                    className="form-style"
                    {...register("lastName", { required: true })}
                    defaultValue={user?.lastName}
                  />
                  {errors.firstName && (
                    <span className="text-yellow-50">
                      Please enter your last Name
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-y-2 ">
                  <label htmlFor="gender" className="lable-style">Gender</label>
                  <select
                    type="text"
                    name="gender"
                    id="gender"
                    className="form-style "
                    {...register("gender", { required: true })}
                    defaultValue={user?.additionalDetails?.gender}
                  >
                    {genders.map((gender, index) => {
                      return <option key={index} value={gender}>
                        {gender}
                      </option>;
                    })}
                  </select>

                  {errors.gender && (
                    <span className="text-yellow-50">
                      Please enter your Gender
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-y-2 ">
                    <label htmlFor="about" className="lable-style">About</label>
                    <input
                      type="text"
                      name="about"
                      id="about"
                      placeholder="Enter Bio"
                      className="form-style"
                      {...register("about", { required: true })}
                      defaultValue={user?.additionalDetails?.about}
                    />
                    {errors.firstName && (
                      <span className="text-yellow-50">
                        Please enter your Bio
                      </span>
                    )}
                  </div>
              </div>
            </div>

          </div>
        </div>
        <div className="flex mt-6 justify-end gap-x-4">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="bg-richblack-700 text-richblack-50 rounded-md py-2 px-5 font-semibold"
            
          >
            Cancel
          </button>
          <IconBtn type= "submit" text ="Save"/>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
