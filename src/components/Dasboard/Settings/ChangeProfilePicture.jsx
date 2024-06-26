import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../Common/IconBtn";
import { FiUpload } from "react-icons/fi";
import { updateDisplayPicture } from "../../../services/operations/SettingsThunk";

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleSelectButtonClick = () => {
    fileInputRef.current.click();
  };

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    //   console.log("LOGGING PREVIEW", reader.result);
    };
  };

  const handleImageUpload = () => {
    if(!imageFile){
        toast.error("Select an image")
        return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("displayPicture", imageFile);

      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
      setImageFileimageFile(null)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);
  return (
    <div className="bg-richblack-800 px-12 py-8 rounded-lg  border-[1px] border-richblack-700 text-richblack-5">
      <div className="flex gap-x-4 items-center">
        <img
          src={previewSource || user?.image}
          alt=""
          className="rounded-full aspect-square w-[78px]"
        />
        <div className="flex flex-col gap-y-3">
          <p className="">Change Profile Picture</p>
          <div className="flex gap-x-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={handleSelectButtonClick}
              className="rounded-lg  bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 "
            >
              Select
            </button>
            <IconBtn
              text={`${loading ? "Uploading..." : "Upload"}`}
              onClick={handleImageUpload}
              disabled={!imageFile}
            >
              {!loading && <FiUpload className="text-lg text-richblack-900"/>}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
