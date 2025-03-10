import { Input, Option, Select } from "@material-tailwind/react";
import React from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import Fileinput from "../Banner/Fileinput";

const Product = () => {
  const { quill, quillRef } = useQuill();

  return (
    <div className="flex flex-col gap-y-5 p-5 max-w-7xl mx-auto">
      {/* Product Name */}
      <div>
        <Input color="blue" label="Product Name" className="w-full" />
      </div>

      {/* Quill Editor */}
      <div className="overflow-hidden">
        <div className="w-full h-[200px] border rounded-md shadow-sm ">
          <div ref={quillRef} />
        </div>
      </div>

      {/* Form Section */}
      <div className="flex gap-x-10">
        {/* File Input Section */}
        <div className="w-1/3">
          <div className=" bg-white rounded-lg shadow-xl">
            <Fileinput />
          </div>
        </div>

        {/* Input Fields Section */}
        <div className="flex flex-col w-1/3 gap-y-6">
          <div className="w-full">
            <Input color="blue" label="Discount" className="w-full" />
          </div>
          <div className="w-full">
            <Input color="blue" label="Stock" className="w-full" />
          </div>
          <div className="w-full">
            <Input color="blue" label="Rating" className="w-full" />
          </div>
        </div>

        {/* Select and Price Section */}
        <div className="flex flex-col w-1/3 gap-y-6">
          <div className="w-full">
            <Input
              color="blue"
              label="Price"
              type="number"
              placeholder="Price"
              className="w-full"
            />
          </div>

          <div className="w-full">
            <Select label="Select Category" className="w-full">
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
          </div>

          <div className="w-full">
            <Select label="Select SubCategory" className="w-full">
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
          </div>
        </div>
      </div>

      {/* Save/Submit Button */}
      <div className="flex justify-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Save Product
        </button>
      </div>
    </div>
  );
};

export default Product;
