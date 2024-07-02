import { useState } from "react";

import "./App.css";
import { Routes, Route, useSearchParams } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Common/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import VerifyEmail from "./pages/VerifyEmail";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/Dasboard/MyProfile";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import Settings from "./components/Dasboard/Settings/Settings";
import MyCourses from "./components/Dasboard/MyCourses";
import EnrolledCourses from "./components/Dasboard/EnrolledCourses";
import Instructor from "./components/Dasboard/Instructor";
import AddCourse from "./components/Dasboard/AddCourse/index";
import EditCourse from "./components/Dasboard/EditCourse/index";
function App() {
  const {user} = useSelector(state => state.profile)
  return (
    <div className="min-h-screen bg-richblack-900 w-screen font-inter flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/login" element={<Signin />} /> */}
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Signin />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
        path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="/dashboard/instructor" element={<Instructor/>} />
              <Route path="/dashboard/my-courses" element={<MyCourses/>} />
              <Route path="/dashboard/add-course" element={<AddCourse/>} />
              <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>} />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              {/* <Route path="/dashboard/cart" element={<Cart />} /> */}
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
