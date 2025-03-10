import { Input, Option, Select } from "@material-tailwind/react";
import React from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import Fileinput from "../Banner/Fileinput";

const Product = () => {
  const { quill, quillRef } = useQuill();

  return (
    <div className="flex flex-col gap-y-10">
      <Input color="blue" label="Product Name" />
      <div>
        <div className="w-full h-[200px]">
          <div ref={quillRef} />
        </div>
      </div>
      <div className="flex mt-11 justify-between">
        <div className="w-[30%]">
          <Fileinput />
        </div>
        <div className="flex flex-col w-[33%] gap-y-7">
          <Input color="blue" label="Discount" />
          <Input color="blue" label="Stock" />
          <Input color="blue" label="Rating" />
          <Input color="blue" label="Rating" />
        </div>
        <div className="flex flex-col w-[33%] gap-y-10">
          <Input color="blue" label="Price" type="number" placeholder="Price" />
          <div className="w-full text-lg">
            <Select label="Select Category">
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
          </div>
          <div className="w-full text-lg">
            <Select label="Select SubCategory">
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
