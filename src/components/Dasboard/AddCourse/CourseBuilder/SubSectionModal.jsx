import React from 'react'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import Upload from '../Upload'
import IconBtn from '../../../Common/IconBtn'
import { createSubSection } from '../../../../services/operations/CourseDetailsThunk'
import { setCourse } from '../../../../slices/courseSlice'

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,

}) => {
    const{
        register,setValue,getValues,handleSubmit, formState:{errors}
    } = useForm()
    
    const[loading,setLoading] = useState(false)
    const {token} = useSelector(state => state.auth)
    const {course} = useSelector(state => state.course)
    const dispatch = useDispatch();
    // console.log("Modal Data........", modalData)

    useEffect(() => {

        if(view ){
            // console.log("View Testing",modalData)
            setValue("lectureTitle",modalData.title)
            setValue("lectureDescription",modalData.description)
            setValue("lectureVideo",modalData.videoUrl)
        }

    },[])

    const onSubmit = async (data) => {

        const formData = new FormData()

        formData.append("sectionId",modalData.sectionId)
        formData.append("title",data.lectureTitle)
        formData.append("description",data.lectureDescription)
        formData.append("video",data.lectureVideo)


        const result = await createSubSection(formData,token)

        if(result){
            const updatedSection= course?.courseContent?.map((section) => section._id === modalData.sectionId ? result : section)

            const updatedCourse = {...course,courseContent:updatedSection}
            console.log("Printing Updated",updatedCourse);
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)

    }

  return (

    <div className='grid place-items-center  fixed inset-0 z-[1000] bg-opacity-10 backdrop-blur-sm overflow-auto'>
    <div className='my-10  rounded-lg border border-richblack-400 bg-richblack-800 max-w-[700px] w-full  '>
        <div className='flex justify-between items-center bg-richblack-700 w-full p-5 rounded-t-lg '>
        <h1 className='text-richblack-5 text-xl font-bold'>
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
        </h1>
        <button
        onClick={() => setModalData(null)}
        >
            <RxCross2 className="text-2xl text-richblack-5" />
        </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 mt-6 p-6'>
            <Upload
              name={`lectureVideo`}
              label={`Lecture Video`}
              register={register}
              setValue ={setValue}
              getValues = {getValues}
              errors = {errors}
              video ={true}
              viewData={view ? modalData.videoUrl:null}
              editData={edit ? modalData.videoUrl:null}
            />

            <div className='flex flex-col gap-y-2'>
                <label htmlFor='lectureTitle' className='lable-style'>Lecture Title</label>
                <input
                disabled={view || loading}
                type='text'
                 name={`lectureTitle`}
                 id='lectureTitle'
                 placeholder='Enter Lecture Title'
                 {...register("lectureTitle",{required:true})}
                 className='form-style'
                />
                {
                    errors.lectureTitle && (
                        <span className='text-pink-200 text-xs ml-2'>Lecture Title is Required</span>
                    )
                }
            </div>

            <div className='flex flex-col gap-y-2'>
                <label htmlFor='lectureDescription' className='lable-style'>Lecture Description</label>
                <textarea

                 name={`lectureDescription`}
                 id='lectureDescription'
                 placeholder='Enter Lecture Description'
                 {...register("lectureDescription",{required:true})}
                 className='form-style'
                />
                {
                    errors.lectureDescription && (
                        <span className='text-pink-200 text-xs ml-2'>Lecture Description is Required</span>
                    )
                }
            </div>
            {
                !view && (
                    <div>
                        <IconBtn
                            disabled={loading}
                           text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                           
                        />
                    </div>
                )
            }
        </form>
    </div>
    </div>
  )
}

export default SubSectionModal