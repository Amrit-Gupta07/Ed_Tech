import React from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import frameImg from "../../../assets/Images/frame.png";

const Template = ({ title, description1, description2, image, formType }) => {
  return (
    <div className="grid md:grid-cols-2 place-items-center grid-cols-1 ">
      <div className="w-11/12  flex flex-col  max-w-[450px] justify-center mt-[15%]">
        <div className="">
          <h1 className="text-white text-3xl font-bold">{title}</h1>
          <p className="text-richblack-300">{description1}</p>

          <p className="font-edu-sa font-bold text-blue-100 italic">
            {description2}
          </p>
          
          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
      </div>

      <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0 bg-richblack-500">
        <img
          src={frameImg}
          alt="Pattern"
          width={500}
          height={500}
          loading="lazy"
        />
        <img 
          src={image} 
          alt="Students" 
          width={400} 
          height={400} 
          loading="lazy"
          className="absolute -top-1 right-15 z-15"
        />
      </div>
    </div>
  );
};

export default Template;
