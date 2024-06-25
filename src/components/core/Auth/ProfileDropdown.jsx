import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { VscDashboard } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authThunk";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null;

  const [open, setOpen] = useState(false);

  return (
    <div className="w-[50px] flex relative">
      <button onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-1">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[28px] rounded-full object-cover"
          />

          <AiOutlineCaretDown className="text-sm text-richblack-100" />
        </div>
      </button>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-richblack-800 border-richblack-700 rounded-lg border-[1px] absolute top-[120%] right-0 divide-y-[1px] divider-richblack-700 overflow-hidden z-[1000] "
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 flex gap-x-1 items-center">
              <VscDashboard />
              Dashboard
            </div>
          </Link>

          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className=" flex gap-x-1 text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 items-center"
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

// import { useRef, useState } from "react"
// import { AiOutlineCaretDown } from "react-icons/ai"
// import { VscDashboard, VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"

// import useOnClickOutside from "../../../hooks/useOnClickOutside"
// import { logout } from "../../../services/operations/authThunk"

// export default function ProfileDropdown() {
//   const { user } = useSelector((state) => state.profile)
//   console.log("LOGGING USER......",user)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [open, setOpen] = useState(false)
//   const ref = useRef(null)

//   useOnClickOutside(ref, () => setOpen(false))

//   if (!user) return null

//   return (
//     <button className="relative" onClick={() => setOpen(true)}>
//       <div className="flex items-center gap-x-1">
//         <img
//           src={user?.image}
//           alt={`profile-${user?.firstName}`}
//           className="aspect-square w-[30px] rounded-full object-cover"
//         />
//         <AiOutlineCaretDown className="text-sm text-richblack-100" />
//       </div>
//       {open && (
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
//           ref={ref}
//         >
//           <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
//             <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
//               <VscDashboard className="text-lg" />
//               Dashboard
//             </div>
//           </Link>
//           <div
//             onClick={() => {
//               dispatch(logout(navigate))
//               setOpen(false)
//             }}
//             className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
//           >
//             <VscSignOut className="text-lg" />
//             Logout
//           </div>
//         </div>
//       )}
//     </button>
//   )
// }
