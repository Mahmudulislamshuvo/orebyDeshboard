import { Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import Fileinput from "../CommonComponents/Fileinput";
import {
  useGetAllCategoryQuery,
  useGetAllSubCategoryQuery,
} from "../../Features/Api/exclusiveApi";

const Product = () => {
  const { quill, quillRef } = useQuill();
  const [editorValue, setEditorValue] = useState("");

  const {
    isLoading: SubCategoryLoading,
    data: SubcategoryData,
    isError,
  } = useGetAllSubCategoryQuery();
  const {
    isLoading: CategoryLoading,
    data: categoryData,
    isError: SubcategoryError,
  } = useGetAllCategoryQuery();
  const [productData, setproductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    discount: "",
    stock: "",
    review: "",
    rating: "",
    image: "",
  });

  // quil things
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const newDescription = quill.root.innerHTML;
        setEditorValue(newDescription);
        // Update productData state with new description
        setproductData((prevState) => ({
          ...prevState,
          description: newDescription,
        }));
      });
    }
  }, [quill]);
  // quil things end

  //  Handle change all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setproductData({ ...productData, [name]: value });
  };

  console.log(productData);

  return (
    <div className="flex flex-col gap-y-5 p-5 max-w-7xl mx-auto">
      {/* Product Name */}
      <div>
        <Input
          color="blue"
          label="Product Name"
          className="w-full"
          name="name"
          onChange={handleChange}
          value={productData.name}
        />
      </div>

      {/* Quill Editor */}
      <div className="overflow-hidden">
        <div className="w-full h-[200px] border rounded-md shadow-sm ">
          <div ref={quillRef} />
        </div>
      </div>

      {/* Image Design */}
      <div className="flex gap-x-10">
        {/* File Input Section */}
        <div className="w-1/3">
          <div className=" bg-white rounded-lg shadow-xl">
            <div className="flex justify-center w-full items-center">
              <label
                htmlFor="dropzone-file"
                className={
                  "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-gray-500 text-xs dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  name="image"
                  onChange={(e) =>
                    setproductData({ ...productData, image: e.target.files[0] })
                  }
                />
              </label>
            </div>
          </div>
        </div>
        {/* File Input Section end*/}
        {/* Input Fields Section */}
        <div className="flex flex-col w-1/3 gap-y-6">
          <div className="w-full">
            <Input
              color="blue"
              label="Discount"
              className="w-full"
              name="discount"
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Input
              color="blue"
              label="Stock"
              className="w-full"
              name="stock"
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Input
              color="blue"
              label="Rating"
              className="w-full"
              name="rating"
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Input
              color="blue"
              label="Rating"
              className="w-full"
              name="review"
              onChange={handleChange}
            />
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
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="w-full text-lg">
            {CategoryLoading ? (
              <div>Category Data loading...</div>
            ) : categoryData == null ? (
              <div>No Category available here</div>
            ) : (
              <Select
                label="Select Category"
                className="w-full"
                name="category"
                onChange={(e) =>
                  setproductData({ ...productData, category: e })
                }
                value={productData.category}
              >
                {categoryData?.data?.map((items) => (
                  <Option value={items._id} key={items._id}>
                    {items.name}
                  </Option>
                ))}
              </Select>
            )}
          </div>

          <div className="w-full">
            {SubCategoryLoading ? (
              <div className="border border-p-3">
                Suv Category Data loading...
              </div>
            ) : SubcategoryData == null ? (
              <div>Sub No Category available here</div>
            ) : (
              <Select
                label="Select Sub Category"
                className="w-full"
                name="subCategory"
                onChange={(e) =>
                  setproductData({ ...productData, subCategory: e })
                }
                value={productData.subCategory}
              >
                {SubcategoryData?.data?.map((items) => (
                  <Option value={items._id} key={items._id}>
                    {items.name}
                  </Option>
                ))}
              </Select>
            )}
          </div>
        </div>
      </div>

      {/* Save/Submit Button */}
      <div className="flex justify-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Create Product
        </button>
      </div>
    </div>
  );
};

export default Product;
