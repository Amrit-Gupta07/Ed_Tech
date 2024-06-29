import React from "react";
import IconBtn from "../../../Common/IconBtn";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setEditCourse, setStep } from "../../../../slices/courseSlice";
const CourseBuilderForm = () => {
  const dispatch = useDispatch();
  return (
    <form>
      <div className="rounded-lg border-[1px] border-richblack-700 bg-richblack-800 p-6  mt-12 flex flex-col gap-y-4 ">
        <h1 className="text-richblack-5 text-2xl font-semibold">
          Course Builder
        </h1>

        <div className="flex gap-x-2 justify-end">
          <button
            type="button"
            onClick={() => {
              dispatch(setStep(1));
              dispatch(setEditCourse(true));
            }}
            className="rounded-lg bg-richblack-400 text-richblack-900 p-2"
          >
            Back
          </button>

          <IconBtn text={`Next`}>
            <MdNavigateNext />
          </IconBtn>
        </div>
      </div>
    </form>
  );
};

export default CourseBuilderForm;
