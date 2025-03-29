import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import {
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useGetSingleProductQuery,
} from "../../Features/Api/exclusiveApi";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import Fileinput from "../CommonComponents/Fileinput";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { isCheckValue } from "../../librarry/valueChecker";

const EditProduct = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, control, getValues } = useForm();
  const { quill, quillRef } = useQuill();
  const [categoryId, setCategoryId] = useState(null);
  const [tempProductData, settempProductData] = useState(null);

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
  const handleSubmitForm = (values) => {
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

    console.log("Final payload:", filteredChanges);
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
              <div className="bg-white rounded-lg shadow-xl">
                <Fileinput />
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
            <Button type="submit" color="green" className="w-[20%] text-lg">
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
