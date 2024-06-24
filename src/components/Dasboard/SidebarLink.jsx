import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink, matchPath, useLocation } from 'react-router-dom'

const SidebarLink = ({link,iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path : route}, location.pathname)
    }

  return (

        <NavLink
         to = {link.path}
         className ={`${matchRoute(link.path) ?
             'bg-yellow-800 text-yellow-50' : 
             "bg-opacity-0 text-richblack-300"} 
             transition-all duration-200 px-8 py-2 text-sm font-medium `}
        >
            <div className='flex items-center gap-x-2'>
                <Icon className="text-lg" />
                <p>{link.name}</p>
            </div>
            
        </NavLink>

  )
}

export default SidebarLink