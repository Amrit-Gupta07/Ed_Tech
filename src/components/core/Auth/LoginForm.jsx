import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authThunk';
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const[formdata,setFormdata] = useState({
    email:"",
    password:"",
  })

  const {email, password} = formdata;

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login(email,password,navigate));

  }
  const handleOnChange = (e) => {
    setFormdata((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
    <form onSubmit={handleLogin}>
      <div className="mt-4 flex flex-col gap-y-3">
        
        <label>
            <p className="text-richblack-5 mb-1 text-[0.875rem]">Email</p>
            <input 
                required
                type="email"
                value={email}
                name ="email"
                placeholder="Enter Email"
                onChange={handleOnChange}
                className="form-style p-2 w-full"
            />
            </label>
        
        
        <label>
            <p className="text-richblack-5 mb-1 text-[0.875rem]">Password</p>
            <input 
                required
                type="password"
                value={password}
                name ="password"
                placeholder="Enter Password again"
                onChange={handleOnChange}
                className="form-style p-2 w-full"
            />
            </label>
        
      </div>

      <button 
        type='submit'
        className=" bg-yellow-50 rounded-lg w-full p-3 mt-4">
        Login
      </button>
    </form>
    </div>
  )
}

export default LoginForm