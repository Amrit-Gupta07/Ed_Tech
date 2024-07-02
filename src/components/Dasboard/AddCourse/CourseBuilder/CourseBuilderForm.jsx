import React, { useState } from "react";
import IconBtn from "../../../Common/IconBtn";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse, setStep } from "../../../../slices/courseSlice";
import { IoAddCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { createSection,updateSection } from "../../../../services/operations/CourseDetailsThunk";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const dispatch = useDispatch();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cancelEdit = () => {
    setEditSectionName(false);
    setValue("sectionName", "");
  };

  const handleEditSectionName = (sectionId,sectionName) => {
    if(sectionId == editSectionName){
      setEditSectionName(null)
      setValue("sectionName","")
    }
    else{
      setEditSectionName(sectionId)
      setValue("sectionName",sectionName)

    }
  }

  const onSubmit = async (data) => {
    let result = null;
    if(editSectionName == null){
      result = await createSection(
        {
          courseId: course._id,
          sectionName:data.sectionName,
          //TODO
        },
        token
      )
    }
    else{
      console.log("Calling update section name ",result)

      result = await updateSection(
        {
          courseId: course._id,
          sectionName:data.sectionName, 
          sectionId:  editSectionName,
        },token
      )
    }

    console.log("Printing Result....",result)
    if(result){
      console.log("Printing Result....",result)
      dispatch(setCourse(result))
      setValue("sectionName","")
      setEditSectionName(null)
    }
  }
  return (
    <div className="rounded-lg border-[1px] border-richblack-700 bg-richblack-800 p-6  mt-12 flex flex-col gap-y-4 ">
      <h1 className="text-richblack-5 text-2xl font-semibold">
        Course Builder
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        
          <div className="flex flex-col gap-y-2">
            <label htmlFor="" className="lable-style">
              Section Name
            </label>
            <input
              type="text"
              name="sectionName"
              id="sectionName"
              className="form-style"
              placeholder="Enter Section Name"
              {...register("sectionName", { required: true })}
            />
            {errors.sectionName && <span>Section Name is Required</span>}
            <div className="mt-2 flex gap-x-4 items-baseline">
              <IconBtn
                type="submit"
                text={
                  editSectionName ? "Edit Section Name" : "Create Section Name"
                }
              >
                <IoAddCircleOutline size={20} className="" />
              </IconBtn>
              {editSectionName && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="text-sm text-richblack-300 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
      </form>
      <NestedView handleEditSectionName={handleEditSectionName}/>
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
  );
};

export default CourseBuilderForm;
