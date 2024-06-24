import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../Common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { Navigate, useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  console.log(user);
  return (
    <>
      <h1 className="text-3xl font-medium text-richblack-50 mb-14">
        My Profile
      </h1>

      <div className=" rounded-lg shadow-md flex justify-between items-center border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt=""
            className="rounded-full aspect-square w-[78px] object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user.firstName + " " + user.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>

        <IconBtn text={"Edit"} onClick={() => navigate("/dashboard/settings")}>
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="my-10 rounded-lg shadow-md flex flex-col justify-between gap-y-10  border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center  justify-between w-full">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text={"Edit"}
            onClick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ? (
            <>{user.additionalDetails.about}</>
          ) : (
            <>{"Write Something About Yourself"}</>
          )}
        </p>
      </div>

      <div className="my-10 rounded-lg shadow-md flex flex-col justify-between gap-y-10  border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center  justify-between w-full">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text={"Edit"}
            onClick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      <div className="flex w-[500px] justify-between">

        <div className="flex flex-col gap-y-5">
          <div>
            <p className="mb-2 text-sm text-richblack-600">First Name</p>
            <p className="text-sm font-medium text-richblack-5">{user.firstName}</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Email</p>
            <p className="text-sm font-medium text-richblack-5">{user.email}</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Gender</p>
            <p className="text-sm font-medium text-richblack-5">{user.additionalDetails.gender ?? "Add Your Gender"}</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-5">
          <div>
            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
            <p className="text-sm font-medium text-richblack-5">{user.lastName}</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
            <p className="text-sm font-medium text-richblack-5">{user.additionalDetails.contactNumber ?? "Add Contact Number"}</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Date of Birth</p>
            <p className="text-sm font-medium text-richblack-5">{user.additionalDetails.dateOfBirth ?? "Add Your date of Birth"}</p>
          </div>
        </div>    

      </div>

      </div>
    </>
  );
};

export default MyProfile;
