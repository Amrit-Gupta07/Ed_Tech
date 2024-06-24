import React, { useState } from "react";
import { sidebarLinks } from "../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../Common/ConfirmationModal";
import {  useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authThunk";

const Sidebar = () => {
  const { user } = useSelector((state) => state.profile);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <>
    <div className=" flex h-[calc(100vh -3.5rem)] min-w-[220px] py-10 bg-richblack-800  flex-col border-r-[1px] border-r-richblack-400 ">
      <div className="flex flex-col  ">
        {sidebarLinks.map((link) => {
          if (link.type && link.type !== user?.accountType) return null;

          return <SidebarLink link={link} iconName={link.icon} />;
        })}
      </div>
      <div className="bg-richblack-700 h-[1px] mt-6 mb-6 mx-auto w-10/12"></div>
      <div className="bg-blue- flex flex-col    ">
        <SidebarLink
          link={{
            name: "Settings",
            path: "/dashboard/settings",
          }}
          iconName="VscSettingsGear"
        />
        <button
        onClick={() => setConfirmationModal({
            text1 : "Are you sure?",
            text2 : "You will be logged out of your account.",
            btn1Text: "Cancel",
            btn2Text: "Logout",
            btn1Handler: () => (setConfirmationModal(null)),
            btn2Handler: () => dispatch(logout(navigate)),
        })}
        className="font-medium px-8 py-2 text-sm text-richblack-300"
        >
          <div className="flex items-center gap-x-2">
            <VscSignOut className="text-lg" />
            <p>Logout</p>
          </div>
        </button>
      </div>
    </div>
    {
        confirmationModal && <ConfirmationModal modeldata={confirmationModal} />
    }
    </>
    
  );
};

export default Sidebar;
