import React from 'react'

const LoginForm = () => {

  const handleOnChange = (e) => {
    setFormdata((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
    <form>
      <div className="mt-4 flex flex-col gap-y-3">
        
        <label>
            <p className="text-richblack-5 mb-1 text-[0.875rem]">Password</p>
            <input 
                required
                type="password"
                // value={password}
                name ="password"
                placeholder="Enter Password"
                onChange={handleOnChange}
                className="form-style p-2 w-full"
            />
            </label>
        
        
        <label>
            <p className="text-richblack-5 mb-1 text-[0.875rem]">Confirm Password</p>
            <input 
                required
                type="password"
                // value={confirmPassword}
                name ="password"
                placeholder="Enter Password again"
                onChange={handleOnChange}
                className="form-style p-2 w-full"
            />
            </label>
        
      </div>

      <button className=" bg-yellow-50 rounded-lg w-full p-3 mt-4">
        Login
      </button>
    </form>
    </div>
  )
}

export default LoginForm