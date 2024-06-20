import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { VscDashboard } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import {logout} from "../../../services/operations/authThunk";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile);
  const { signupData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ref = useRef(null)


  useOnClickOutside(ref, () => setOpen(false))

  if(!user) return null

  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-1">
          <img src={user?.image} className="rounded-full object-cover" />
          <AiOutlineCaretDown className="text-sm text-richblack-100" />
        </div>
      </button>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-richblack-800 border-richblack-700 rounded-lg border-[1px]"
          ref = {ref}
        >
          <Link to="" onClick={() => setOpen(false)}>
            <div className="text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 flex gap-x-1">
              <VscDashboard />
              Dashboard
            </div>
          </Link>

          <div
            onClick={() => {
              dispatchEvent(logout(navigate));
              setOpen(false);
            }}
            className=" flex gap-x-1 text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
