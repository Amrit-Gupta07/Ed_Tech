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
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async function (dispatch) {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {

      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
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
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  };
}
export function login(email,password,navigate){
  return async function(dispatch){
    setLoading(true)
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("POST",LOGIN_API,{
        email,password
      })
      console.log("SIGNIN API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signin Successful");

      setToken(dispatch(setToken(response.data.token)))

      localStorage.setItem("token",JSON.stringify(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user,image:userImage}))
      localStorage.setItem("user", JSON.stringify(response.data.user))

    } catch (error) {
      console.log("SIGNIN API ERROR............", error);
      toast.error("Signin Failed");
      navigate("/signin");
    }
    setLoading(false)
    toast.dismiss(toastId)


  }
}
export function logout(navigate) {
  return function (dispatch) {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    toast.success("Logged Out");
    navigate("/");
  };
}
