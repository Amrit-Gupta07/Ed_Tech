import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../services/operations/authThunk";
import { useNavigate } from "react-router-dom";

const ConfirmationModal = ({modeldata,setConfirm}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="fixed backdrop-blur-sm inset-0 bg-opacity-10 grid place-items-center z-[1000]">
      <div className="flex flex-col  justify-center bg-richblack-800 border-[1px] border-richblack-400 rounded-lg gap-y-3 max-w-[350px] w-11/12 p-4">
        <h1 className="text-richblack-50 text-2xl font-bold">{modeldata?.text1}</h1>
        <p className="text-richblack-300 font-semibold">
          {modeldata?.text2}
        </p>
        <div className="flex text-richblack-900 gap-x-4">
          <button
             onClick={modeldata?.btn1Handler}
             className="bg-richblack-400 rounded-lg py-[8px] px-[8px] font-bold"
          >
            {modeldata.btn1Text}
          </button>
          <button
            onClick={modeldata?.btn2Handler}
            className="bg-yellow-50 rounded-lg py-[8px] px-[8px] font-bold"
          >
            {modeldata.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
