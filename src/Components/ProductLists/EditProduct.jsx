import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import {
  useGetAllCategoryQuery,
  useGetAllProductsQuery,
  useGetSingleCategoryQuery,
} from "../../Features/Api/exclusiveApi";
import { Input, Option, Select } from "@material-tailwind/react";
import Fileinput from "../CommonComponents/Fileinput";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditProduct = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, getValues, control } = useForm();
  const { quill, quillRef } = useQuill();
  const [categoryId, setcategoryId] = useState(null);

  const {
    isLoading: isAllCatLoading,
    data: AllCatData,
    isError: AllCatError,
  } = useGetAllCategoryQuery();
  const {
    isLoading: isSinglrCatLoading,
    data: singleCatData,
    isError: singleCatError,
  } = useGetSingleCategoryQuery(id);
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
        setValue("description", newDescription);
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

  //   handle submit
  const handlesubmit = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit(handlesubmit)}>
        <div className="flex flex-col gap-y-5 p-5 max-w-7xl mx-auto">
          {/* Product Name */}
          <div>
            <Input
              color="blue"
              label="Product Name"
              className="w-full"
              onChange={handleChange}
              name="name"
              value={productData.name}
            />
          </div>
          <div className="flex justify-between">
            {/* Quill Editor */}
            <div className=" w-[48%]">
              <div className="w-full h-[200px]">
                <div ref={quillRef} />
              </div>
            </div>

            {/* File Input Section */}
            <div className="w-[48%]">
              <div className=" bg-white rounded-lg shadow-xl">
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
                    onChange={handleChange}
                    name="discount"
                    value={productData.discount}
                  />
                </div>
                <div className="w-full">
                  <Input
                    color="blue"
                    label="Stock"
                    className="w-full"
                    onChange={handleChange}
                    name="stock"
                    value={productData.stock}
                  />
                </div>
                <div className="w-full">
                  <Input
                    color="blue"
                    label="Rating"
                    onChange={handleChange}
                    className="w-full"
                    name="rating"
                    value={productData.rating}
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
                    placeholder="Price"
                    name="price"
                    className="w-full"
                    onChange={handleChange}
                    value={productData.price}
                  />
                </div>

                <div className="w-full">
                  {isAllCatLoading ? (
                    <Select disabled label="Select Category" className="w-full">
                      <Option>Category Loading...</Option>
                    </Select>
                  ) : (
                    <Select
                      name="category"
                      label="Select Category"
                      className="w-full"
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
                      {AllCatData?.data?.map((items) => (
                        <Option key={items._id} value={items._id}>
                          {items.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </div>

                <div className="w-full">
                  {!categoryId ? (
                    <Select
                      disabled
                      label="Select Sub Category"
                      className="w-full"
                    >
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
                      {singleCatData?.data?.subCategory?.map((items) => (
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
            <div className="w-full mt-4">
              <Input
                color="blue"
                label="Review"
                onChange={handleChange}
                className="w-full"
                name="review"
                value={productData.review}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
