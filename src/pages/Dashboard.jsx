import React from 'react'
import Sidebar from '../components/Dasboard/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className=' relative flex min-h-[calc(100vh-3.5rem)] '>
        <Sidebar />
        <div className='flex-1 overflow-auto h-[calc(100vh-3.5rem)]'>
            <div className='w-11/12 mx-auto max-w-[1000px] py-10'> 
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard