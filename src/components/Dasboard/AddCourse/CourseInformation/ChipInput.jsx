import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MdClose } from "react-icons/md"


const ChipInput = ({name, label, placeholder, register, errors, setValue, getValues}) => {
    const {editCourse, course} = useSelector(state => state.course)

    const[chips,setChips] = useState([]);

    useEffect(() => {
        if(editCourse){
            setChips(course?.tag)
        }
        register(name,{required:true, Validite: (value) => value.length > 0})
    },[])
    useEffect( () => {
        setValue(name,chips)
    },[chips])


    const handleKeyDown = (event) => {

        if(event.key === 'Enter' || event.key ===','){
            event.preventDefault();
            const chipValue = event.target.value.trim();
            if(chipValue && !chips.includes(chipValue)){
                const newChips = [...chips,chipValue]
                setChips(newChips)
                event.target.value = ""
            }
        }
    }

    const handleDeleteChip = (chipIndex) => {
        const newChips = chips.filter((chip,index)=> index !== chipIndex )
        setChips(newChips)
    }
  return (
    <div className='flex flex-col gap-y-2'>
        <label htmlFor={name} className='lable-style'>{label}</label>
        <div className='flex gap-2 flex-wrap'>
            {
                chips.map((chip,index) =>(
                    <div className='flex bg-yellow-100 rounded-full px-2'>
                        {chip}
                        <button
                            onClick={() => handleDeleteChip(index)}
                            type='button'
                        >
                            <MdClose className="text-sm" />
                            
                        </button>
                    </div>
                ))
            }
        </div>
        <input
            type='text'
            name = {name}
            id = {name}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className='form-style'

        />
        {
            errors[name] && (
                <span className='text-xs text-pink-200'>
                    {label} is Required
                </span>
            )
        }
    </div>
  )
}

export default ChipInput