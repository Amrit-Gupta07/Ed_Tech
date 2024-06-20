import toast from "react-hot-toast";
import { resetCart } from "../../slices/cartSlice";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiConnector";
const { LOGIN_API, SIGNUP_API, SEND_OTP } = endpoints;

export function sendOtp(email, navigate) {
  return async function (dispatch) {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SEND_OTP, { email });
      console.log("SEND OTP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP Sent");
      navigate("/verify-email");
    } catch (error) {
        console.log("Could not send OTP",error);
        toast.error(error.response?.data?.message || "Could not send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)

  };
}

export function signup(
  accoutType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async function (dispatch) {
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accoutType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });
      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
  };
}

export function logout() {
  return function (dispatch) {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    // localStorage.removeItem("user")
    toast.success("Logged Out");
    Navigate("/");
  };
}
