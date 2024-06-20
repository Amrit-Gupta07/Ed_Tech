import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { BsChevronDown } from "react-icons/bs";

const Navbar = () => {
  const location = useLocation();
  const [subLinks, setsubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  useEffect(() => {
    ;(async () => {
      setLoading(true);
      try {
        const response = await apiConnector("GET", categories.CATAGORIES_API);
        console.log(response);
        setsubLinks(response.data.data);
        console.log(subLinks);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="border-b-[1px] border-b-richblack-700 text-white h-14 flex justify-center items-center">
      <div className=" w-11/12 max-w-maxContent  flex justify-between items-center">
        <Link to="/">
          <img src={logo} width={160} height={32} loading="lazy" />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                      key={index}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <div className="text-center">Loading...</div>
                      ) : subLinks.length ? (
                        <>
                          {subLinks
                            ?.filter((subLink) => subLink?.courses?.length > 0)
                            ?.map((subLink, index) => (
                              <Link
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={index}
                                >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                      </div>
                  </>
                ) : (
                  <Link to={link?.path} key={index}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden gap-x-4 items-center md:flex">
          {user && user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Link to="" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && <span className="absolute">{totalItems}</span>}
            </Link>
          )}
          {token == null && (
            <Link to="/signup">
              <button className="bg-richblack-800 rounded-lg px-[12px] py-[8px] border-richblack-700 text-richblack-100">
                Signup
              </button>
            </Link>
          )}
          {token == null && (
            <Link to="/login">
              <button className="bg-richblack-800 rounded-lg px-[12px] py-[8px] border-richblack-700 text-richblack-100">
                Login
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown/>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
