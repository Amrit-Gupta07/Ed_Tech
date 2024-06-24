import React from 'react'

const Tab = ({tabdata, accountType, setAccountType}) => {
  return (
    <div className='bg-richblack-800 rounded-full flex gap-x-4 p-2 max-w-[220px] mt-4 mb-4 justify-center items-center shadow-[0_1px_0_0] shadow-white/50 text-richblack-100'>
      {
        tabdata.map((tab) => {
          return (
            <button
                key={tab.id}
                className={`rounded-full p-1.5 w-[50%] text-md  ${tab.type === accountType? "bg-richblack-900 text-white shadow-[0_1px_0_0] shadow-white/50" : ""}`}
                onClick={() => setAccountType(tab.type)}
            >
              {tab.name}
            </button>
          )
        })
      }

    </div>
  )
}

export default Tab