import React, { useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import Fileinput from "../CommonComponents/Fileinput";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Select,
  Typography,
  Input,
} from "@material-tailwind/react";
import {
  useGetAllCategoryQuery,
  useGetAllProductsQuery,
  useGetSingleCategoryQuery,
  useProductDeleteMutation,
} from "../../Features/Api/exclusiveApi.js";
import ProductListSkeliton from "../Skelitons/ProductListSkeliton.jsx";
import ProductError from "../Errors/ProductError.jsx";
import { InfoToast } from "../../utils/Toastify.js";

const Productlist = () => {
  const [open, setOpen] = React.useState(false);
  const [opentwo, setopentwo] = React.useState(false);
  const [tempId, settempId] = useState("");
  const [categoryId, setcategoryId] = useState(null);
  const { quill, quillRef } = useQuill();
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
    isLoading: GetAllproductLoading,
    data: getAllProductdata,
    isError: getAllProductError,
  } = useGetAllProductsQuery();

  const [productDelete, { isLoading: productdeletingLoading }] =
    useProductDeleteMutation();

  const {
    isLoading: isSinglrCatLoading,
    data: singleCatData,
    isError: singleCatError,
  } = useGetSingleCategoryQuery(categoryId, {
    skip: !categoryId,
  });

  const {
    isLoading: isAllCatLoading,
    data: AllCatData,
    isError: AllCatError,
  } = useGetAllCategoryQuery();

  // handle onRetry
  const onRetry = () => {
    console.log("hi");
    window.location.reload();
  };

  if (GetAllproductLoading) {
    return <ProductListSkeliton />;
  }

  if (getAllProductError) {
    return <ProductError onRetry={onRetry} />;
  }

  const handleOpen = () => setOpen(!open);
  const handleOpenTwo = (id) => {
    settempId(id);
    setopentwo(!opentwo);
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    try {
      const response = await productDelete(tempId);
      if (response?.data) {
        InfoToast("Product deleted successfully");
        settempId("");
      }
    } catch (error) {
      console.log("Error from Productlist.jsx handleDeleteProduct:", error);
    } finally {
      setopentwo(false);
    }
  };

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

  console.log(productData);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Sub Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {getAllProductdata?.data?.map((items) => (
              <tr
                key={items._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold"
                >
                  {items.name}
                </th>
                <td className="px-6 py-4">
                  <img
                    src={items.image}
                    alt={items.image}
                    className="h-[150px] rounded-[15px] object-fit-cover"
                  />
                </td>
                <td className="px-6 py-4">{items.category.name}</td>
                <td className="px-6 py-4">{items.subCategory.name}</td>
                <td className="px-6 py-4">{items.price}</td>
                <td className="px-6 py-4 text-center">
                  <div className=" flex gap-x-5 justify-center text-center">
                    <Button
                      color="red"
                      onClick={() => handleOpenTwo(items._id)}
                    >
                      Delete
                    </Button>
                    <Button onClick={handleOpen} color="green">
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="p-4 max-w-[40%]"
      >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Manage Product
          </Typography>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6 max-h-[600px] overflow-y-auto">
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

            {/* Quill Editor */}
            <div className="overflow-hidden">
              <div className="w-full h-[200px] border rounded-md shadow-sm ">
                <div ref={quillRef} />
              </div>
            </div>

            {/* Form Section */}
            <div className="flex flex-col gap-x-10">
              {/* File Input Section */}
              <div className="w-full">
                <div className=" bg-white rounded-lg shadow-xl">
                  <Fileinput />
                </div>
              </div>

              <div className="flex justify-between w-[80%] mt-5">
                {/* Input Fields Section */}
                <div className="flex flex-col w-1/3 gap-y-6">
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
                <div className="flex flex-col w-1/3 gap-y-6">
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
                      <Select
                        disabled
                        label="Select Category"
                        className="w-full"
                      >
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
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <div className="flex gap-x-5">
            <Button variant="filled" onClick={handleOpen} color="red">
              Cancel
            </Button>
            <Button onClick={handleOpen}>Update</Button>
          </div>
        </DialogFooter>
      </Dialog>

      {/* dialog for Delete confirmation popup */}
      <Dialog size="sm" open={opentwo} handler={handleOpenTwo} className="p-4">
        <DialogBody className="pb-2 space-y-4">
          <div className="text-black-500 text-xl">
            You are confirm to delete that Product
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="flex gap-x-5">
            <Button variant="filled" onClick={handleOpenTwo} color="green">
              Cancel
            </Button>
            <Button
              onClick={handleDeleteProduct}
              color="red"
              loading={productdeletingLoading}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Productlist;
