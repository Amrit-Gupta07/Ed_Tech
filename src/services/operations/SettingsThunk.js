import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";

import { settingsEndPoint } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { setLoading } from "../../slices/authSlice";

const { UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE, CHANGE_PASSWORD } =
  settingsEndPoint;

export function updateDisplayPicture(token, formData) {
  return async function (dispatch) {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          Authorisation: `Bearer ${token}`,
        }
      );
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    }
    setLoading(false);
    toast.dismiss(toastId);
  };
}
export function updateprofile(token, data) {
  return async function (dispatch) {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE, data, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("UPDATE_PROFILE API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Updated Successfully");
      dispatch(setUser(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile");
    }
    setLoading(true);
    toast.dismiss(toastId);
  };
}

export function updatePassword(token, data) {
  return async function (dispatch) {
    setLoading(true);
    const toastId = toast.loading("Loading...");    
    try {
      const response = await apiConnector(
        "POST",
        CHANGE_PASSWORD,
        {
          oldPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        {
          Authorisation: `Bearer ${token}`,
        }
      );
      console.log("CHANGE_PASSWORD API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password Changed Successfully")


    } catch (error) {
      console.log("CHANGE_PASSWORD API ERROR............", error);
      toast.error("Could Not Change Password");
    }
    setLoading(true);
    toast.dismiss(toastId);
  };
}
