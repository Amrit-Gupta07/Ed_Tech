import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RequirementsFields = ({
  name,
  label,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const { course, editCourse } = useSelector((state) => state.course);

  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setRequirementList(course?.instructions)
    }
    register(name, { required: true });
  }, []);


  useEffect(() => {
    setValue(name, requirementList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementList]);
  const handleOnChange = (e) => {
    setRequirement(e.target.value);
  };
  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleDeleteRequirement = (reqIndex) => {
    const newReq = requirementList.filter((_, index) => index !== reqIndex);

    setRequirementList(newReq);
  };

  return (
    <div className="flex flex-col gap-y-2 items-start">
      <label htmlFor={name} className="lable-style">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={requirement}
        placeholder={placeholder}
        className={`form-style w-full`}
        onChange={handleOnChange}
      />
      <button
        type="button"
        className="text-yellow-50"
        onClick={handleAddRequirement}
      >
        Add
      </button>
      {requirementList.length > 0 && (
        <ul className="list-disc">
          {requirementList.map((item, index) => (
            <li
              key={index}
              className="flex items-center text-richblack-5 gap-x-2"
            >
              <p>{item}</p>
              <button
                type="button"
                className="text-richblack-300 text-xs mt-1"
                onClick={() => handleDeleteRequirement(index)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequirementsFields;
