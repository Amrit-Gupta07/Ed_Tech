import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFullCourseDetails } from "../services/operations/CourseDetailsThunk";
import { BiInfoCircle } from "react-icons/bi";
import { formatDate } from "../services/formatDate";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import CourseAccordianBar from "../components/core/Course/CourseAccordianBar";
// import { ReactMarkdown } from "react-markdown/lib/react-markdown"

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  const [isActive, setIsActive] = useState([]);

  const handleActive = (id) => {
    setIsActive(
      isActive.includes(id)
        ? isActive.filter((e) => e != id)
        : isActive.concat([id])
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getFullCourseDetails(courseId, token);
        setCourse(response);
        console.log("Respone", response.data);
      } catch (error) {
        console.log("Could not fetch Course Details");
      }
    })();
    let lectures = 0;
    course?.data?.courseDetails?.courseContent?.forEach((section) => {
      lectures += section.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [courseId]);

  if (!course) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div>Loading...</div>
      </div>
    );
  }
  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnroled,
    createdAt,
  } = course?.data?.courseDetails;


  return (
    <>
      <div className=" relative w-full bg-richblack-800">
        <div className="mx-auto  px-4 lg:w-[1260px]  b-yellow-200 ">
          <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5 b-pink-600 ">
            <p className="text-richblack-5 font-bold text-4xl">{courseName}</p>
            <p className="text-richblack-5 ">{courseDescription}</p>
            <div className="text-richblack-25">
              {studentsEnroled.length} Students Enrolled
            </div>
            <div className="text-richblack-100">
              Created By {`${instructor.firstName} ${instructor.lastName}`}
            </div>
            <div className="flex items-center gap-x-2">
              <BiInfoCircle className="text-richblack-25" />
              <p className="text-richblack-50">
                Created at {formatDate(createdAt)}
              </p>
            </div>

            <div className="z-30 right-[2rem] top-[60px] mx-auto hidden min-h-[600px] w-[410px] lg:absolute  lg:block">
              <CourseDetailsCard course={course?.data?.courseDetails} />
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-auto  px-4 lg:w-[1260px]  b-yellow-400 ">
        <div className="w-[800px]">
          <p className="text-[28px] font-semibold">Course Content</p>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div>
                {courseContent.length} {`section(s)`}
              </div>
              <div>
                {totalNoOfLectures} {`lecture(s)`}
              </div>
              <div>{course.data?.totalDuration} total length</div>
            </div>
            <button onClick={() => setIsActive([])}>
              Collapse all Sections
            </button>
          </div>

          <CourseAccordianBar
            course={course}
            isActive={isActive}
            handleActive={handleActive}
          />

          <div>
            <p className="text-richblack-25 font-bold mt-5 text-3xl mb-2">
              Author
            </p>
            <div className="flex items-center gap-3">
              <img
                src={instructor.image}
                alt=""
                className="rounded-full h-[50px] w-[50px]"
              />
              <p className="text-richblack-25 text-xl">
                {instructor.firstName}
                {` `}
                {instructor.lastName}
              </p>
            </div>
            <p className="text-richblack-25 text-md mt-2">
              {instructor.additionalDetails?.about}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
