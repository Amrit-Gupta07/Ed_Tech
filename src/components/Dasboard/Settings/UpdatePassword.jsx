import React from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import IconBtn from '../../Common/IconBtn'
import { updatePassword } from '../../../services/operations/SettingsThunk'
import { useDispatch, useSelector } from 'react-redux'



const UpdatePassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const{token} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmitForm = (data) => {
        try{
            dispatch(updatePassword(token,data))
        }
        catch(error){
            console.log("ERROR CHANGING PASSWORD", error)
        }
    }
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className='bg-richblack-800 px-12 py-8 rounded-lg  border-[1px] border-richblack-700 text-richblack-5 mt-10'>
            <div className='flex flex-col gap-y-4'>
                <h1 className="text-lg font-bold">Password</h1>

                <div className='flex gap-x-5'>

                    <div className='flex flex-col w-[48%] gap-y-2'>
                        <label htmlFor='currentPassword' className="lable-style">Current Password</label>
                        <input
                            type='password'
                            name ='currentPassword'
                            id='currentPassword'
                            placeholder='Enter Current Password'
                            className='form-style'
                            {...register("currentPassword",{required: true})}
                        />
                        {
                            errors.currentPassword && (
                                <span className='text-yellow-50'>
                                    {errors.currentPassword.message}
                                </span>
                            )
                        }
                    </div>

                    
                    <div className='flex flex-col w-[48%] gap-y-2'>
                        <label htmlFor='newPassword' className="lable-style">New Password</label>
                        <input
                            type='password'
                            name ='newPassword'
                            id='newPassword'
                            placeholder='Enter New Password'
                            className='form-style'
                            {...register("newPassword",{required: true})}
                        />
                        {
                            errors.currentPassword && (
                                <span className='text-yellow-50'>
                                    {errors.newPassword.message}
                                </span>
                            )
                        }
                    </div>

                </div>

            </div>
        </div>
        <div className='flex justify-end mt-6 gap-x-4'>
            <button
                onClick={() => navigate('/dashboard/my-profile')}
                className='bg-richblack-700  text-richblack-50 rounded-md py-2 px-5 font-semibold'
            >
                Cancel
            </button>
            <IconBtn type='submit' text={'Save'}/>
        </div>
    </form>
  
  )
}

export default UpdatePassword