import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { coursesEndPoint } from "../apis";

const {
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    ADD_SECTION_API,
    UPDATE_SECTION_API,
    FULL_COURSE_DETAILS,
    DELETE_SECTION,
    DELETE_SUB_SECTION,
    CREATE_SUB_SECTION,
    UPDATE_SUB_SECTION
} = coursesEndPoint;

export const addCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading");

    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            Authorisation: `Bearer ${token}`,
        });

        console.log("CREATE COURSE API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details");
        }
        toast.success("Course Details Added Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
     console.log("DATA......",data);
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            Authorisation: `Bearer ${token}`,
        });

        console.log("EDIT COURSE API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not edit Course Details");
        }
        toast.success("Course Details Added Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", ADD_SECTION_API, data, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("CREATE SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not edit Course Details");
        }
        toast.success("Course Details Added Successfully");
        result = response?.data?.updatedCourse;
    } catch (error) {
        console.log("CREATE SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};
export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("UPDATE SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not edit Course Details");
        }
        toast.success("Section Name Updated Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("CREATE_SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    console.log("Printing result from thunk...",result)
    return result;
};
export const getFullCourseDetails = async(courseId, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", FULL_COURSE_DETAILS,{ courseId}, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not edit Course Details");
        }
        
        result = response?.data?.data;
    } catch (error) {
        console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
        result = error.response.data
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteSection = async(sectionId,courseId,token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", DELETE_SECTION,{ sectionId,courseId}, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("SECTION_DELETE API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not edit Course Details");
        }
        
        result = response?.data?.data;
    } catch (error) {
        console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
        result = error.response.data
    }
    toast.dismiss(toastId);
    return result;
}
export const deleteSubSection = async(sectionId,subSectionId,token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", DELETE_SUB_SECTION,{ sectionId,subSectionId}, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("SECTION_DELETE API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not edit Course Details");
        }
        
        result = response?.data?.data;
    } catch (error) {
        console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
        result = error.response.data
    }
    toast.dismiss(toastId);
    return result;
}
export const createSubSection = async(data,token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", CREATE_SUB_SECTION,data, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("CREATE_SUB_SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not edit Course Details");
        }
        toast.success("Lecture added Successfully")
        result = response?.data?.data;
        console.log("Result",result);
    } catch (error) {
        console.log("CREATE_SUB_SECTION API ERROR............", error);
        result = error.response.data
    }
    toast.dismiss(toastId);
    return result;
}

export const updateSubSection = async(data,token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", UPDATE_SUB_SECTION,data, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("UPDATE_SUB_SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not edit Course Details");
        }
        toast.success("Lecture Updated Successfully")
        result = response?.data?.data;
        console.log("Result",result);
    } catch (error) {
        console.log("UPDATE_SUB_SECTION API ERROR............", error);
        result = error.response.data
    }
    toast.dismiss(toastId);
    return result;
}