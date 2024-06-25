import React from "react";

const RenderSteps = () => {
    const step = 1;
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
        <div>
            {
                steps.map((item) =>(
                    <button
                     className={`aspect-square rounded-full w-[34px] border-[1px]
                        ${item.id === step ? 'bg-yellow-900 text-yellow-50 border-yellow-50' 
                         : "border-richblack-700 bg-richblack-800 text-richblack-300"}`}
                    >
                        {item.id}
                    </button>
                ))
            }
        </div>
    </>
  )
};

export default RenderSteps;
