import React, { useEffect } from "react";
import IconBtn from "../../../Common/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setStep } from "../../../../slices/courseSlice";
import { useForm } from "react-hook-form";
import { COURSE_STATUS } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../services/operations/CourseDetailsThunk";
const PublishCourse = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("publishCourse", true);
    }
  }, []);
  const OnSubmit = async () => {
    console.log("save");
    const currentValues = getValues();
    console.log(currentValues);

    let courseStatus;
    if (currentValues.publishCourse) {
      courseStatus = COURSE_STATUS.PUBLISHED;
    } else {
      courseStatus = COURSE_STATUS.DRAFT;
    }
    console.log(courseStatus);
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        courseStatus === COURSE_STATUS.PUBLISHED) ||
      (course?.status === COURSE_STATUS.DRAFT &&
        courseStatus === COURSE_STATUS.DRAFT)
    ) {
      dispatch(resetCourseState())
      navigate("/dashboard/my-courses")
      return;
    }
    const formData = new FormData();

    formData.append("courseId", course._id);

    formData.append("status", courseStatus);

    console.log("wvfc", currentValues.pusblishCourse);

    const result = await editCourseDetails(formData, token);
    if (result) {
      dispatch(resetCourseState())
      navigate("/dashboard/my-courses")
      return;
    }
  };
  return (
    <div className="rounded-lg bg-richblack-800  border-[1px] border-richblack-700 mt-12 p-6">
      <h1 className="text-richblack-5 text-2xl font-semibold  mb-8 ">
        Publish Settings
      </h1>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <div className="flex items-center">
          <label htmlFor="publishCourse" className="lable-style text-lg">
            <input
              type="checkbox"
              id="publishCourse"
              name="publishCourse"
              {...register("publishCourse")}
            />
            Make this course public
          </label>
        </div>
        {errors.publishCourse && (
          <span className="text-pink-200">Something Went wrong</span>
        )}

        <div className="flex justify-end gap-x-2">
          <button
            onClick={() => dispatch(setStep(2))}
            type="button"

            className="bg-richblack-300 text-richblack-900 rounded-lg px-5 "
          >
            Back
          </button>
          <IconBtn text={"Save"} />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
