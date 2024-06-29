import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { coursesEndPoint } from "../apis"

const {CREATE_COURSE_API,EDIT_COURSE_API} = coursesEndPoint

export const addCourseDetails = async (data,token) => {
    let result = null
    const toastId = toast.loading("Loading")

    try {
        const response = await apiConnector("POST",CREATE_COURSE_API,data,{
            Authorisation: `Bearer ${token}`
        })

        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data


    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
        
    }
    toast.dismiss(toastId)
    return result
}

export const editCourseDetails = async (data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try {
        const response = await apiConnector("POST",EDIT_COURSE_API,data,{
            Authorisation: `Bearer ${token}`
        })

        console.log("EDIT COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not edit Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data


    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
        
    }
    toast.dismiss(toastId)
    return result

}