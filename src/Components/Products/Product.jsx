import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import Fileinput from "../CommonComponents/Fileinput";
import {
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
} from "../../Features/Api/exclusiveApi";
import { axiosInstance } from "../../Features/Api/axiosInstance";
import { SuccessToast } from "../../utils/Toastify";

const Product = () => {
  const { quill, quillRef } = useQuill();
  const {
    isLoading: CategoryLoading,
    data: categoryData,
    isError: SubcategoryError,
  } = useGetAllCategoryQuery();

  const [categoryId, setcategoryId] = useState(null);
  const [productData, setproductData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    subCategory: "",
    discount: 0,
    stock: 0,
    review: "",
    rating: 0,
    image: "",
  });
  const {
    isLoading: isSinglrCatLoading,
    data: singleCatData,
    isError: singleCatError,
  } = useGetSingleCategoryQuery(categoryId, {
    skip: !categoryId,
  });
  const [uploadLoading, setuploadLoading] = useState(false);

  // quil things
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const newDescription = quill.root.innerHTML;
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
    if (
      name == "price" ||
      name == "discount" ||
      name == "stock" ||
      name == "rating"
    ) {
      setproductData({ ...productData, [name]: parseInt(value) });
    } else {
      setproductData({ ...productData, [name]: value });
    }
  };

  // Handle create product
  const handleCreateProduct = async () => {
    try {
      setuploadLoading(true);
      const response = await axiosInstance.post("product", productData);
      console.log(response);
      if (response.statusText == "Created") {
        SuccessToast("Product Created succesfull");
      }
    } catch (error) {
      console.log("from Product.jsx Create product", error);
    } finally {
      setuploadLoading(false);
      setcategoryId("");
      setproductData({
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
      if (quill) {
        quill.setContents([]);
      }
    }
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
                  productData.image
                    ? "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-green-200  dark:bg-gray-700 hover:bg-green-400 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-gray-500 text-xs dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  multiple
                  accept="image/*"
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
              type="number"
              min="0"
              value={productData.discount}
            />
          </div>
          <div className="w-full">
            <Input
              color="blue"
              label="Stock"
              className="w-full"
              name="stock"
              onChange={handleChange}
              type="number"
              min="0"
              value={productData.stock}
            />
          </div>
          <div className="w-full">
            <Input
              color="blue"
              label="Rating"
              className="w-full"
              name="rating"
              onChange={handleChange}
              type="number"
              min="0"
              max="5"
              value={productData.rating}
            />
          </div>
          <div className="w-full">
            <Input
              color="blue"
              label="Reviews"
              className="w-full"
              name="review"
              onChange={handleChange}
              value={productData.review}
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
              min="0"
              value={productData.price}
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
                onChange={(e) => {
                  setcategoryId(e);
                  setproductData((prev) => ({
                    ...prev,
                    category: e,
                    subCategory: "",
                  }));
                }}
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
          {/*=== my poor way ===*/}
          {/* <div className="w-full">
            {singleCatData == null ? (
              <Select disabled label="Select Sub Category" className="w-full">
                <Option>No Subcategory available here</Option>
              </Select>
            ) : (
              <Select
                key={categoryId}
                label="Select Sub Category"
                className="w-full"
                name="subCategory"
                onChange={handleSubcategory}
                value={productData.subCategory}
              >
                {singleCatData?.data?.subCategory?.map((items) => (
                  <Option value={items?._id} key={items?._id}>
                    {items?.name}
                  </Option>
                ))}
              </Select>
            )}
          </div> */}
          {/* =======================good way to manege this=================== */}
          <div className="w-full">
            {!categoryId ? (
              <Select disabled label="Select Sub Category" className="w-full">
                <Option>Select a category first</Option>
              </Select>
            ) : isSinglrCatLoading ? (
              <Select
                disabled
                label="Loading subcategories..."
                className="w-full"
              >
                <Option>Loading...</Option>
              </Select>
            ) : singleCatData?.data?.subCategory?.length > 0 ? (
              <Select
                key={categoryId + productData.subCategory}
                label="Select Sub Category"
                className="w-full"
                name="subCategory"
                onChange={(e) =>
                  setproductData((prev) => ({
                    ...prev,
                    subCategory: e,
                  }))
                }
                value={productData.subCategory}
              >
                {singleCatData.data.subCategory.map((items) => (
                  <Option value={items._id} key={items._id}>
                    {items.name}
                  </Option>
                ))}
              </Select>
            ) : (
              <Select
                disabled
                label="No subcategories available"
                className="w-full"
              >
                <Option>No subcategories found</Option>
              </Select>
            )}
          </div>
        </div>
      </div>

      {/* Save/Submit Button */}
      <div className="flex justify-center">
        <Button
          loading={uploadLoading}
          onClick={handleCreateProduct}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Create Product
        </Button>
      </div>
    </div>
  );
};

export default Product;
