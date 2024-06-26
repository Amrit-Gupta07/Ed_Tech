import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { categories } from '../../../../services/apis'
import { apiConnector } from '../../../../services/apiConnector'
import ChipInput from './ChipInput'
import Upload from '../Upload'
import { useSelector } from 'react-redux'
import RequirementsFields from './RequirementsFields'
const {CATAGORIES_API} = categories
const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,

    } = useForm()

    const[courseCategories,setCourseCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const{editCourse, course} = useSelector(state => state.course)

    useEffect( () => {

        ;(async () => {
            setLoading(true)            
            try{
                const response = await apiConnector("GET",CATAGORIES_API)
                setCourseCategories(response.data.data);
            }
            catch(error){
                console.log("ERROR FETCHING COURSE CATEGORIES",error)
            }
            setLoading(false)
        })();
    },[])
  return (
    <form >
        <div className='rounded-lg border-[1px] border-richblack-700 bg-richblack-800 p-6  mt-8 flex flex-col gap-y-4'>
            <div className='flex flex-col gap-y-2'>
                <label htmlFor="courseName" className='lable-style'>Course Title</label>
                <input
                    type='text'
                    name='courseName'
                    id='courseName'
                    placeholder='Enter Course Name'
                    className='form-style'
                    {...register("courseName",{required:true})}
                />
                {
                    errors.courseName && (
                        <span className='text-xs text-pink-200'>
                            Course Title is Required
                        </span>
                    )
                }
            </div>
            <div className='flex flex-col gap-y-2'>
                <label htmlFor="courseDescription" className='lable-style'>Course Description</label>
                <textarea
                    
                    name='courseDescription'
                    id='courseDescription'
                    placeholder='Enter Course Description'
                    className='form-style min-h-[130px]'
                    {...register("courseDescription",{required:true})}
                />
                {
                    errors.courseDescription && (
                        <span className='text-xs text-pink-200'>
                            Course Description is Required
                        </span>
                    )
                }
            </div>
            <div className='flex flex-col gap-y-2'>
                <label htmlFor="coursePrice" className='lable-style'>Course Price</label>
                <input
                    
                    name='coursePrice'
                    id='coursePrice'
                    placeholder='Enter Course Price'
                    className='form-style'
                    {...register("coursePrice",{
                    required:true,
                    valueAsNumber:true,
                    pattern:{
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    }
                })}
                />
                {
                    errors.coursePrice && (
                        <span className='text-xs text-pink-200'>
                            Course Price is Required
                        </span>
                    )
                }
            </div>
            <div className='flex flex-col gap-y-2'>
                <label htmlFor="courseCategory" className='lable-style'>Course Category</label>
                <select
                    type='text'
                    name='courseCategory'
                    id='courseCategory'
                    placeholder='Choose Course Category'
                    className='form-style'
                    {...register("courseCategory",{required:true})}
                >
                    <option  value ="" disabled>Choose a Category</option>
                    
                        {
                            !loading && courseCategories?.map((item) => {
                                return(
                                    <option
                                    value = {item.id}
                                    key  = {item.id}

                                    >
                                        {item.name}

                                    </option>
                                )
                            })
                        }
                    

                </select>
                {
                    errors.courseCategories && (
                        <span className='text-xs text-pink-200'>
                            Course Category is Required
                        </span>
                    )
                }
            </div>
            <ChipInput 
             name = {`coureseTags`}
             label = {`Tags`}
             placeholder = {'Enter Tags and Press Enter'}
             register ={register}
             errors ={errors}
             setValue ={setValue}
             getValues={getValues}
            />
            <Upload
             name = {`courseImage`}
             label = {`Course Thumbnail`}
             
             register ={register}
             errors ={errors}
             setValue ={setValue}
             getValues={getValues}            
             editData={editCourse ? course?.thumbnail:null}
            />
            <RequirementsFields
             name = {`courseRequirements`}
             label = {`Course Requirements`}
             placeholder = {'Add Course Requirements'}
             register ={register}
             errors ={errors}
             setValue ={setValue}
             getValues={getValues}            
            />
            
        </div>
    </form>
  )
}

export default CourseInformationForm