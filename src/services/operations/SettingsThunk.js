import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";

import { settingsEndPoint } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { setLoading } from "../../slices/authSlice";

const { UPDATE_DISPLAY_PICTURE_API } = settingsEndPoint;

export function updateDisplayPicture(token,formData) {
  return async function (dispatch) {
    const toastId = toast.loading("Loading...")
    setLoading(true)
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
            Authorisation: `Bearer ${token}`
        }
      );
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data))
    } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
        toast.error("Could Not Update Display Picture")        
    }
    setLoading(false)
    toast.dismiss(toastId)
  };
}
