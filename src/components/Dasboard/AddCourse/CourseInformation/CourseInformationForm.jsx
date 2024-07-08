import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { categories } from "../../../../services/apis";
import { apiConnector } from "../../../../services/apiConnector";
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import { useDispatch, useSelector } from "react-redux";
import RequirementsFields from "./RequirementsFields";
import IconBtn from "../../../Common/IconBtn";
import { MdNavigateNext } from "react-icons/md";
import { COURSE_STATUS } from "../../../../utils/constants";
import {
  addCourseDetails,
  editCourseDetails,
} from "../../../../services/operations/CourseDetailsThunk";
const { CATAGORIES_API } = categories;
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../slices/courseSlice";
import toast from "react-hot-toast";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [courseCategories, setCourseCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { editCourse, course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    
    (async () => {
      setLoading(true);

      try {
        const response = await apiConnector("GET", CATAGORIES_API);
        setCourseCategories(response.data.data);
      } catch (error) {
        console.log("ERROR FETCHING COURSE CATEGORIES", error);
      }

      setLoading(false);
    })();
    
    if (editCourse) {
      setValue("courseName", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
      setValue("courseCategory", course.category);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseName !== course.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseTags !== course.tag.toString() || 
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    console.log(data);

    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);

        if (currentValues.courseName !== course.courseName) {
          formData.append("courseName", data.courseName);
        }
        if (currentValues.courseDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }
        setLoading(true);

        const result = await editCourseDetails(formData, token);

        if (result) {
          dispatch(setCourse(result));
          dispatch(setStep(2));
        }
      } else {
        toast.error("NO Changes Made");
      }
      return;
    }

    const formData = new FormData();

    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    setLoading(false);
    if (result) {
      dispatch(setCourse(result));
      dispatch(setStep(2));
    }
  };



    // const {
    //   register,
    //   handleSubmit,
    //   setValue,
    //   getValues,
    //   formState: { errors },
    // } = useForm();

    // const dispatch = useDispatch();
    // const { token } = useSelector((state) => state.auth);
    // const { course, editCourse } = useSelector((state) => state.course);
    // const [loading, setLoading] = useState(false);
    // const [courseCategories, setCourseCategories] = useState([]);

    // useEffect(() => {
    //   ;(async () => {

    //     try {
    //       const response = await apiConnector("GET", CATAGORIES_API);
    //       setCourseCategories(response.data.data);
    //     } catch (error) {
    //           console.log("COURSE CATEGORY ERROR....",error)
    //     }

    //   })();
    //   // if form is in edit mode
    //   if (editCourse) {
    //     // console.log("data populated", editCourse)
    //     setValue("courseTitle", course.courseName);
    //     setValue("courseShortDesc", course.courseDescription);
    //     setValue("coursePrice", course.price);
    //     setValue("courseTags", course.tag);
    //     setValue("courseBenefits", course.whatYouWillLearn);
    //     setValue("courseCategory", course.category);
    //     setValue("courseRequirements", course.instructions);
    //     setValue("courseImage", course.thumbnail);
    //   }
    //   // getCategories();

    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // const isFormUpdated = () => {
    //   const currentValues = getValues();
    //   // console.log("changes after editing form values:", currentValues)
    //   if (
    //     currentValues.courseTitle !== course.courseName ||
    //     currentValues.courseShortDesc !== course.courseDescription ||
    //     currentValues.coursePrice !== course.price ||
    //     currentValues.courseTags.toString() !== course.tag.toString() ||
    //     currentValues.courseBenefits !== course.whatYouWillLearn ||
    //     currentValues.courseCategory._id !== course.category._id ||
    //     currentValues.courseRequirements.toString() !==
    //     course.instructions.toString() ||
    //     currentValues.courseImage !== course.thumbnail
    //   ) {
    //     return true;
    //   }
    //   return false;
    // };

    // //   handle next button click
    // const onSubmit = async (data) => {
    //   // console.log(data)

    //   console.log(data);

    //   if (editCourse) {
    //     // const currentValues = getValues()
    //     // console.log("changes after editing form values:", currentValues)
    //     // console.log("now course:", course)
    //     // console.log("Has Form Changed:", isFormUpdated())
    //     if (isFormUpdated()) {
    //       const currentValues = getValues();
    //       const formData = new FormData();
    //       // console.log(data)
    //       formData.append("courseId", course._id);
    //       if (currentValues.courseTitle !== course.courseName) {
    //         formData.append("courseName", data.courseTitle);
    //       }
    //       if (currentValues.courseShortDesc !== course.courseDescription) {
    //         formData.append("courseDescription", data.courseShortDesc);
    //       }
    //       if (currentValues.coursePrice !== course.price) {
    //         formData.append("price", data.coursePrice);
    //       }
    //       if (currentValues.courseTags.toString() !== course.tag.toString()) {
    //         formData.append("tag", JSON.stringify(data.courseTags));
    //       }
    //       if (currentValues.courseBenefits !== course.whatYouWillLearn) {
    //         formData.append("whatYouWillLearn", data.courseBenefits);
    //       }
    //       if (currentValues.courseCategory._id !== course.category._id) {
    //         formData.append("category", data.courseCategory);
    //       }
    //       if (
    //         currentValues.courseRequirements.toString() !==
    //         course.instructions.toString()
    //       ) {
    //         formData.append(
    //           "instructions",
    //           JSON.stringify(data.courseRequirements)
    //         );
    //       }
    //       if (currentValues.courseImage !== course.thumbnail) {
    //         formData.append("thumbnailImage", data.courseImage);
    //       }
    //       // console.log("Edit Form data: ", formData)
    //       setLoading(true);
    //       const result = await editCourseDetails(formData, token);
    //       setLoading(false);
    //       if (result) {
    //         dispatch(setStep(2));
    //         dispatch(setCourse(result));
    //       }
    //     } else {
    //       toast.error("No changes made to the form");
    //     }
    //     return;
    //   }

    //   const formData = new FormData();
    //   formData.append("courseName", data.courseTitle);
    //   formData.append("courseDescription", data.courseShortDesc);
    //   formData.append("price", data.coursePrice);
    //   formData.append("tag", JSON.stringify(data.courseTags));
    //   formData.append("whatYouWillLearn", data.courseBenefits);
    //   formData.append("category", data.courseCategory);
    //   formData.append("status", COURSE_STATUS.DRAFT);
    //   formData.append("instructions", JSON.stringify(data.courseRequirements));
    //   formData.append("thumbnailImage", data.courseImage);
    //   setLoading(true);
    //   const result = await addCourseDetails(formData, token);
    //   if (result) {
    //     dispatch(setStep(2));
    //     dispatch(setCourse(result));
    //   }
    //   setLoading(false);
    // };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // className="rounded-lg border-[1px] border-richblack-700 bg-richblack-800 p-6  mt-8 flex flex-col gap-y-4"
    >
      <div className="rounded-lg border-[1px] border-richblack-700 bg-richblack-800 p-6  mt-8 flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="courseName" className="lable-style">
            Course Title
          </label>
          <input
            name="courseName"
            id="courseName"
            placeholder="Enter Course Name"
            className="form-style"
            {...register("courseName", { required: true })}
          />
          {errors.courseName && (
            <span className="text-xs text-pink-200">
              Course Title is Required
            </span>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="courseDescription" className="lable-style">
            Course Description
          </label>
          <textarea
            name="courseDescription"
            id="courseDescription"
            placeholder="Enter Course Description"
            className="form-style min-h-[130px]"
            {...register("courseDescription", { required: true })}
          />
          {errors.courseDescription && (
            <span className="text-xs text-pink-200">
              Course Description is Required
            </span>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="coursePrice" className="lable-style">
            Course Price
          </label>
          <input
            name="coursePrice"
            id="coursePrice"
            placeholder="Enter Course Price"
            className="form-style"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
          />
          {errors.coursePrice && (
            <span className="text-xs text-pink-200">
              Course Price is Required
            </span>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="courseCategory" className="lable-style">
            Course Category
          </label>
          <select
            name="courseCategory"
            id="courseCategory"
            placeholder="Choose Course Category"
            className="form-style"
            {...register("courseCategory", { required: true })}
          >
            <option value="" disabled selected hidden>
              Choose a Category
            </option>

            {!loading &&
              courseCategories?.map((item) => {
                return (
                  <option  value={item._id} key={item._id}>
                    {
                    console.log(item._id)
              }
                    {item.name}
                  </option>
                );
              })}
          </select>
          {errors.courseCategories && (
            <span className="text-xs text-pink-200">
              Course Category is Required
            </span>
          )}
        </div>

        <ChipInput
          name={`courseTags`}
          label={`Tags`}
          placeholder={"Enter Tags and Press Enter"}
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <Upload
          name={`courseImage`}
          label={`Course Thumbnail`}
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          editData={editCourse ? course?.thumbnail : null}
        />

        <div className="flex flex-col gap-y-2">
          <label htmlFor="courseBenefits" className="lable-style">
            Course Benefits
          </label>
          <textarea
            name="courseBenefits"
            id="courseBenefits"
            placeholder="Enter Course Benefits"
            className="form-style min-h-[130px]"
            {...register("courseBenefits", { required: true })}
          />
          {errors.courseBenefits && (
            <span className="text-xs text-pink-200">
              Course Benefits is Required
            </span>
          )}
        </div>

        <RequirementsFields
          name={`courseRequirements`}
          label={`Course Requirements`}
          placeholder={"Add Course Requirements"}
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
        <div className="flex gap-x-2 justify-end">
          {editCourse && (
            <button
              className="rounded-lg bg-richblack-400 text-richblack-900 p-2"
              onClick={() => {
                dispatch(setStep(2));
              }}
            >
              Continue Without Saving
            </button>
          )}

          <IconBtn text={editCourse ? "Save Changes" : "Next"}>
            <MdNavigateNext />
          </IconBtn>
        </div>
      </div>
    </form>
  );
};

export default CourseInformationForm;
