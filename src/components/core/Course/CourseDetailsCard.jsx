import React from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CourseDetailsCard = ({ course }) => {

    const {
        thumbnail: ThumbnailImage,

        price,
        _id:courseId,
    } = course

    const {user} = useSelector(state => state.profile)
    const navigate = useNavigate()
    const handleBuyCourse = () => {

    }

    const handleShare = () => {

    }
    const handleAddToCart = () => {

    }
  return (
    <div className="p-4 bg-richblack-700 rounded-lg">
      <div>
        <img
          src={ThumbnailImage}
          alt={course?.courseName}

          className=" rounded-lg overflow-hidden object-cover md:max-w-full "
        />
        <p className="text-white text-3xl font-semibold space-x-3 p-4">Rs {price}</p>
        <div className="flex flex-col gap-4">
          <button 
            className="yellowButton"
            onClick={user && course.studentsEnroled.includes(user?._id) 
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {
                user && course.studentsEnroled.includes(user?._id)
                ? "Go To Course" : "Buy Now"
            }
          </button>
          {
            (!user || !course?.studentsEnrolled.includes(user._id)) && (
                <button
                onClick={handleAddToCart} className="blackButton"             
                >
                    Add To Cart
                </button>
            )
          }
        </div>
        <div>
          <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
            30-Day Money-Back Guarantee
          </p>
        </div>

            <p className={`my-2 text-xl font-semibold `}>This Course Includes : </p>
        <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
            {
                course?.instructions?.map((item,index) => (
                    <p className="flex gap-2 items-center" key={index}>
                    <BsFillCaretRightFill/> 
                    <span>{item}</span>
                    </p>
                ))
            }
        </div>
        <div className="text-center">
            <button
            onClick={handleShare}
            className="text-yellow-25 flex items-center gap-x-2 mx-auto"
            >
              <FaShareSquare size={15} /> Share

            </button>
        </div>
      </div>



    </div>
  );
};

export default CourseDetailsCard;
