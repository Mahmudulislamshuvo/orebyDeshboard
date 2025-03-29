import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
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
import { useNavigate } from "react-router-dom";

const Productlist = () => {
  const navigate = useNavigate();

  const [opentwo, setopentwo] = React.useState(false);
  const [tempId, settempId] = useState("");
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

  const handleEditProduct = (id) => {
    navigate(`/editproduct/${id}`);
  };

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
                    <Button
                      onClick={() => handleEditProduct(items._id)}
                      color="green"
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
