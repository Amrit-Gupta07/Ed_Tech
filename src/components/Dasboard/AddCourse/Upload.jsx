import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { Player } from "video-react";
import { FiUploadCloud } from "react-icons/fi";

const Upload = ({
  name,
  label,
  register,
  errors,
  setValue,
  video = false,
  viewData = null,
  editData = null,
}) => {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const inputRef = useRef(null);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "images/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={name} className="lable-style">
        {label}
      </label>
      <div className={`bg-richblack-700 p-6 rounded-lg border-2 border-dotted border-richblack-500 cursor-pointer min-h-[250px]`}>
      {previewSource ? (
        <div className="">
          {!video ? (
            <img src={previewSource} alt="preview" />
          ) : (
            <Player aspectRatio="16:9" playsInline src={previewSource} />
          )}
          {
            <div>
                {
                    !viewData &&(
                        <button
                         className="text-richblack-400 underline mt-3" 
                         onClick={() => {
                            setPreviewSource("")
                            setSelectedFile(null)
                            setValue(name,null)
                         }}
                        >
                            Cancel
                        </button>
                    )
                }
            </div> //TODO
          }
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} ref={inputRef} />

          <div className="rounded-full bg-pure-greys-800 w-14 grid place-content-center h-14 mt-6">
            <FiUploadCloud className="text-2xl text-yellow-50" />
          </div>
          <p className="text-richblack-200 max-w-[200px] text-sm text-center">
            Drag and drop an image, or click to{" "}
            <span className="text-yellow-50">Browse </span>a file
          </p>
          
            <ul className="flex mt-8 gap-x-10 text-xs text-richblack-200  list-disc">
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
            </ul>
          
        </div>
      )}
      </div>
    </div>
  );
};

export default Upload;
