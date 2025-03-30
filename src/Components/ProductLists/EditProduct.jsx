import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import {
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../Features/Api/exclusiveApi";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import Fileinput from "../CommonComponents/Fileinput";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { isCheckValue } from "../../librarry/valueChecker";
import { axiosInstance } from "../../Features/Api/axiosInstance";
import { SuccessToast } from "../../utils/Toastify";

const EditProduct = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, control, getValues } = useForm();
  const { quill, quillRef } = useQuill();
  const [categoryId, setCategoryId] = useState(null);
  const [tempProductData, settempProductData] = useState(null);
  const [updatingLoading, setupdatingLoading] = useState(false);

  const {
    isLoading: isAllCatLoading,
    data: AllCatData,
    isError: AllCatError,
  } = useGetAllCategoryQuery();
  const {
    isLoading: isSingleCatLoading,
    data: singleCatData,
    isError: singleCatError,
  } = useGetSingleCategoryQuery(categoryId);

  const {
    isLoading: SingleProductLoading,
    data: singleProductData,
    isError: singleProductError,
  } = useGetSingleProductQuery(id);

  // Update your product data effect
  useEffect(() => {
    if (singleProductData?.data) {
      settempProductData(singleProductData.data);
      setValue("category", singleProductData.data.category._id);
      setValue("subCategory", singleProductData.data.subCategory._id);
      setCategoryId(singleProductData.data.category._id);
    }
  }, [singleProductData, setValue]);

  // to show default value on quill
  useEffect(() => {
    if (quill && tempProductData?.description) {
      quill.root.innerHTML = tempProductData.description;
    }
  }, [quill, tempProductData?.description]);

  // Handle Quill editor content change
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const newDescription = quill.root.innerHTML;
        setValue("description", newDescription);
      });
    }
  }, [quill, setValue]);

  // Handle form submission
  const handleSubmitForm = async (values) => {
    try {
      setupdatingLoading(true);
      if (!tempProductData) return;

      const initialValues = {
        name: tempProductData.name,
        description: tempProductData.description,
        price: tempProductData.price,
        category: tempProductData.category?._id,
        subCategory: tempProductData.subCategory?._id,
        discount: tempProductData.discount,
        stock: tempProductData.stock,
        review: tempProductData.review,
        rating: tempProductData.rating,
      };

      // 1. Find changed values
      const changedValues = {};
      for (const key in values) {
        if (values[key] !== initialValues[key]) {
          changedValues[key] = values[key];
        }
      }

      // 2. Filter out empty values using your utility
      const filteredChanges = isCheckValue(changedValues);

      const response = await axiosInstance.put(
        `product/${id}`,
        filteredChanges
      );
      console.log(response);

      if (response.statusText == "Created") {
        SuccessToast("Product updating successfull");
      }
    } catch (error) {
      console.log("error from EditProduct.jsx updating", error);
    } finally {
      setupdatingLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="flex flex-col gap-y-5 p-5 max-w-7xl mx-auto">
          {/* Product Name */}
          <div>
            <Input
              color="blue"
              label="Product Name"
              className="w-full"
              defaultValue={tempProductData?.name}
              {...register("name")}
            />
          </div>

          <div className="flex justify-between">
            {/* Quill Editor */}
            <div className="w-[48%]">
              <div className="w-full h-[200px] border rounded-md shadow-sm">
                <div ref={quillRef} />
              </div>
            </div>

            {/* File Input Section */}
            <div className="w-[48%]">
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
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
                      onChange={(e) => {
                        setValue("image", e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex flex-col gap-x-10">
            <div className="flex w-full mt-5 justify-between">
              {/* Input Fields Section */}
              <div className="flex flex-col w-[48%] gap-y-6">
                <div className="w-full">
                  <Input
                    color="blue"
                    label="Discount"
                    className="w-full"
                    type="number"
                    min={0}
                    defaultValue={tempProductData?.discount}
                    {...register("discount")}
                  />
                </div>
                <div className="w-full">
                  <Input
                    color="blue"
                    label="Stock"
                    className="w-full"
                    type="number"
                    min={0}
                    defaultValue={tempProductData?.stock}
                    {...register("stock")}
                  />
                </div>
                <div className="w-full">
                  <Input
                    color="blue"
                    label="Rating"
                    className="w-full"
                    type="number"
                    min={0}
                    max={5}
                    defaultValue={tempProductData?.rating}
                    {...register("rating")}
                  />
                </div>
              </div>

              {/* Select and Price Section */}
              <div className="flex flex-col w-[48%] gap-y-6">
                <div className="w-full">
                  <Input
                    color="blue"
                    label="Price"
                    type="number"
                    className="w-full"
                    min={0}
                    defaultValue={tempProductData?.price}
                    {...register("price")}
                  />
                </div>

                {/* Category Select */}
                <div className="w-full">
                  {isAllCatLoading ? (
                    <Select disabled label="Select Category" className="w-full">
                      <Option>Category Loading...</Option>
                    </Select>
                  ) : (
                    <Controller
                      control={control}
                      name="category"
                      render={({ field }) => (
                        <Select
                          label="Select Category"
                          className="w-full"
                          {...field}
                          onChange={(selectedCategory) => {
                            field.onChange(selectedCategory); // Use field.onChange
                            setCategoryId(selectedCategory);
                            setValue("subCategory", "");
                          }}
                          value={field.value || ""} // Add fallback empty string
                        >
                          {AllCatData?.data?.map((items) => (
                            <Option key={items._id} value={items._id}>
                              {items.name}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                  )}
                </div>

                {/* Subcategory Select */}
                <div className="w-full">
                  {!categoryId ? (
                    <Select
                      disabled
                      label="Select Sub Category"
                      className="w-full"
                    >
                      <Option>Select a category first</Option>
                    </Select>
                  ) : isSingleCatLoading ? (
                    <Select
                      disabled
                      label="Loading subcategories..."
                      className="w-full"
                    >
                      <Option>Loading...</Option>
                    </Select>
                  ) : singleCatData?.data?.subCategory?.length > 0 ? (
                    <Controller
                      control={control}
                      name="subCategory"
                      render={({ field }) => (
                        <Select
                          label="Select Sub Category"
                          className="w-full"
                          {...field}
                          disabled={!categoryId || isSingleCatLoading}
                          value={field.value || ""} // Add fallback empty string
                          key={`${categoryId}-${field.value}`}
                          onChange={(selectedSubCategory) => {
                            field.onChange(selectedSubCategory); // Use field.onChange directly
                          }}
                        >
                          {isSingleCatLoading ? (
                            <Option disabled>Loading subcategories...</Option>
                          ) : singleCatData?.data?.subCategory?.length > 0 ? (
                            singleCatData.data.subCategory.map((items) => (
                              <Option key={items._id} value={items._id}>
                                {items.name}
                              </Option>
                            ))
                          ) : (
                            <Option disabled>No subcategories available</Option>
                          )}
                        </Select>
                      )}
                    />
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

            <div className="w-full mt-4">
              <Input
                color="blue"
                label="Review"
                className="w-full"
                defaultValue={tempProductData?.review}
                {...register("review")}
              />
            </div>
          </div>

          <div className="flex justify-end gap-x-10">
            <Button type="reset" color="red" className="w-[20%] text-lg">
              Cancel
            </Button>
            <Button
              type="submit"
              color="green"
              className="w-[20%] text-lg"
              loading={updatingLoading}
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
