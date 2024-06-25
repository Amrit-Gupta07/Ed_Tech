import React from "react";

const IconBtn = ({ text, onClick, children ,disabled, type}) => {
  return (
    <button
      onClick={onClick}
      disabled = {disabled}
      type = {type}
      className={
        "flex items-center bg-yellow-50 rounded-md gap-x-2  py-2 px-5 "
      }
    >
      {
            children ? (
                <>
                    <p className='text-richblack-900'>{text}</p>
                    {children}
                </>
            ):(
                <p className='text-richblack-900'>{text}</p>

            )
        }


    </button>
  );
};

export default IconBtn;
