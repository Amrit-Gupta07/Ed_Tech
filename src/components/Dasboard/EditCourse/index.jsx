import React, { useEffect, useState } from "react";
import RenderSteps from "../AddCourse/RenderSteps";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiConnector } from "../../../services/apiConnector";
import { getFullCourseDetails } from "../../../services/operations/CourseDetailsThunk";
import { setCourse, setEditCourse } from "../../../slices/courseSlice";

const EditCourse = () => {
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { courseId } = useParams();
  console.log(courseId);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    (async function () {
      setLoading(true)
      const result = await getFullCourseDetails(courseId, token);
      // console.log("Hello again")

      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result.courseDetails));
        console.log(result);
      }
      setLoading(false)
    })();
  }, []);

  if(loading){
    return (
      <div className="grid place-items-center text-richblack-25 bg-richblack-500 h-[calc(100vh -3.5rem)]">
        Loading...
      </div>
    )
  }

  return (
    <>
      <p className="text-richblack-5 text-3xl font-medium mb-8">Edit Course</p>
      <div className="flex flex-col max-w-[600px] justify-center mx-auto">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="text-richblack-25">Course not found</p>
        )}
      </div>
    </>
  );
};

export default EditCourse;
