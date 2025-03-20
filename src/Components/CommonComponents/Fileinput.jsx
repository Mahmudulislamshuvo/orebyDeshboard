import React from "react";

const Fileinput = ({
  setValue,
  tempBannerData = false,
  Uoloadingimg = false,
  register = false,
}) => {
  return (
    <div>
      <div className="flex justify-center w-full items-center">
        <label
          htmlFor="dropzone-file"
          className={
            tempBannerData
              ? "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  hover:bg-transparent hover:border-transparent  opacity-0 hover:opacity-100"
              : "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          }
        >
          <div className="flex flex-col justify-center items-center pb-6 pt-5">
            <svg
              className="h-8 text-green-500 w-8 dark:text-gray-400 mb-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="text-gray-700 text-lg dark:text-gray-600 mb-2">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-gray-500 text-xs dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setValue("image", [file]);
              }
            }}
            {...(register ? register("image", { required: true }) : {})}
          />
          {Uoloadingimg && (
            <p className="text-red-400 pt-2">Image is required.</p>
          )}
        </label>
      </div>
    </div>
  );
};

export default Fileinput;
