import React from "react";
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./Publish";

const RenderSteps = () => {
  const {step} = useSelector(state => state.course)
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return(
    <>
        <div className="flex w-full items-center justify-center">
            {
                steps.map((item) =>(
                  <>
                    <button
                    key={item.id}
                     className={`aspect-square rounded-full w-[34px] border-[1px] grid place-items-center
                      ${item.id === step ? 'bg-yellow-900 text-yellow-50 border-yellow-50' 
                        : "border-richblack-700 bg-richblack-800 text-richblack-300"} ${item.id < step && 'bg-yellow-50'}`}
                        >
                        {
                          item.id < step ? (
                               <FaCheck className="font-bold text-richblack-900" />

                          ):(
                            item.id
                          )
                        }
                    </button>
                    {
                      item.id != steps.length && (
                        <div  className={`border-dashed border-b-2 w-[33%] 
                        ${item.id < step ? 'border-yellow-50' : 'border-richblack-500'}`}>
                          
                        </div>
                      )
                    }
                  </>
                ))
            }
        </div>

        <div className="flex text-richblack-5 justify-between  w-full mt-2">
          {
            steps.map((item) => (
              <>
                 <div className={`text-sm font-medium  flex flex-col items-center min-w-[130px]
                  ${item.id<=step ? 'text-richblack-5' : 'text-richblack-500'}`} key={item.id}>
                  
                    {item.title}
                 </div>
              </>
            ))
          }
        </div>

        {step === 1 && <CourseInformationForm/>}
        {step === 2 && <CourseBuilderForm/>}
        {step === 3 && <PublishCourse />}

    </>
  )
};

export default RenderSteps;
