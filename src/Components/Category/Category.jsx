import { Button, Input, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
import Fileinput from "../CommonComponents/Fileinput";
import TableWithActions from "../CommonComponents/TableWIthAction";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useGetCreateCategoryMutation,
  useGetUpdateCategoryMutation,
} from "../../Features/Api/exclusiveApi.js";
import { useForm } from "react-hook-form";
import { InfoToast, SuccessToast } from "../../utils/Toastify";
import { isCheckValue } from "../../librarry/valueChecker.js";

const TABLE_HEAD = ["Title", "Banner", "Description", "Date", "Actions"];

const Category = () => {
  const {
    register: registerMain,
    handleSubmit: handleSubmitMain,
    formState: { errors: errorsMain },
    setValue: setValueMain,
    reset,
  } = useForm();
  const [open, setOpen] = React.useState(false);
  const [openTwo, setOpenTwo] = React.useState(false);

  const [tempCategoryData, settempCategoryData] = useState({});
  const [updateData, setupdateData] = useState({
    _id: "",
    name: "",
    description: "",
    image: "",
  });

  const {
    isLoading: GetCategoryLoading,
    data: categoryData,
    isError,
  } = useGetAllCategoryQuery();
  const [GetCreateCategory, { isLoading: isCategoryCreating }] =
    useGetCreateCategoryMutation();
  const [GetUpdateCategory, { isLoading: isUpading }] =
    useGetUpdateCategoryMutation();
  const [DeleteCategory, { isLoading: isDeletingCategory }] =
    useDeleteCategoryMutation();
  // handle dialog open
  const handleOpen = (item) => {
    if (item) {
      settempCategoryData(item);
      setupdateData({
        ...updateData,
        _id: item._id,
      });
    }

    // setOpen((prev) => !prev);
    setOpen(true);
  };

  // handle create category
  const handleUploadCategory = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data?.image[0]);
      formData.append("description", data?.description);
      formData.append("name", data?.name);
      const response = await GetCreateCategory(formData);
      if (response?.data) {
        SuccessToast("Banner uploaded successfully");
      }
    } catch (error) {
      console.log("error from banner.jsx upload Categry", error);
    } finally {
      setupdateData({ _id: "", name: "", image: "", description: "" });
      reset();
    }
  };

  // handle Upadate category
  const handleUpdatedbanner = async () => {
    try {
      const CheckedUpdateData = isCheckValue(updateData);
      if (!CheckedUpdateData) {
        console.log("Please fill the form properly");
        return;
      }
      // Create an object to store the updated data, excluding the _id
      const updatedData = {};
      // Add all the data to the updatedData object, except _id
      for (const key in CheckedUpdateData) {
        if (key !== "_id") {
          updatedData[key] = CheckedUpdateData[key];
        }
      }
      // no need to chnage anthing if Nothing to update
      if (Object.keys(updatedData).length === 0) {
        console.log("No changes to update");
        return;
      }

      // Create FormData only if there are changes
      const formData = new FormData();

      // Append fields to FormData
      for (const key in updatedData) {
        const value = updatedData[key];
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      }

      // Add the ID to the FormData (this is required for the backend)
      formData.append("id", CheckedUpdateData._id);

      // Make the API call to update the banner
      const response = await GetUpdateCategory({
        data: formData,
        id: CheckedUpdateData._id,
      });

      // If the update is successful, show success message
      if (response?.data) {
        SuccessToast("Banner updated successfully");
      }
    } catch (error) {
      console.log("Error from banner.jsx upload banner:", error);
    } finally {
      // Close the dialog or reset the form as needed
      setOpen(false);
      setupdateData("");
    }
  };

  const handleOpentwo = (id) => {
    settempCategoryData(id);
    setOpenTwo((prev) => !prev);
  };

  const handleDeleteCategory = async (id) => {
    try {
      const DeletingId = tempCategoryData?._id;

      const response = await DeleteCategory(DeletingId);
      if (response?.data) {
        InfoToast("Banner deleted successfully");
      }
    } catch (error) {
      console.log("Error from banner.jsx handleDeleteBanner:", error);
    } finally {
      setOpenTwo(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-y-5">
        <form onSubmit={handleSubmitMain(handleUploadCategory)} id="mainForm">
          <Input
            label="Category Name"
            {...registerMain("name", { required: true, maxLength: 25 })}
          />
          {errorsMain.name && (
            <p className="text-red-400 pt-2">Category name is required.</p>
          )}
          <div className="flex w-full gap-x-5 pt-5">
            <div className="flex w-[49%]">
              <Textarea
                color="green"
                label="Description"
                {...registerMain("description", {
                  required: true,
                })}
              />
            </div>

            <div className="w-[49%]">
              <Fileinput
                className="bg-red-300"
                setValue={setValueMain}
                Uoloadingimg={errorsMain.image}
                register={registerMain}
              />
            </div>
          </div>
          {errorsMain.description && (
            <p className="text-red-400 pt-2">
              Category description is required.
            </p>
          )}
          <Button
            variant="filled"
            loading={isCategoryCreating}
            className="text-sm w-[15%] mt-5"
            type="submit"
            form="mainForm"
            color="green"
          >
            Upload
          </Button>
        </form>
      </div>
      <TableWithActions
        hightforTable={"350px"}
        handleOpen={handleOpen}
        data={categoryData?.data}
        loading={GetCategoryLoading}
        handleDete={handleOpentwo}
        TABLE_HEAD={TABLE_HEAD}
      />
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="m-0 block relative">
          <Typography variant="h4" color="blue-gray">
            Manage Category
          </Typography>
          {/* <Typography className="text-gray-600 font-normal mt-1">
            Keep your records up-to-date and organized.
          </Typography> */}
        </DialogHeader>
        <DialogBody className="pb-6 space-y-4">
          <form onSubmit={(e) => e.preventDefault()} id="secondform">
            <Input
              label="Category Name"
              defaultValue={tempCategoryData.name}
              onChange={(e) =>
                setupdateData({ ...updateData, name: e.target.value })
              }
            />
            <div className="w-full gap-x-5 pt-5">
              <div className="flex ">
                <Textarea
                  color="green"
                  label="Description"
                  defaultValue={tempCategoryData.description}
                  className="h-[40px] p-5"
                  onChange={(e) =>
                    setupdateData({
                      ...updateData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mt-2">
                {/* Img design start */}
                <div className="w-full relative ">
                  <img
                    src={tempCategoryData.image}
                    alt={tempCategoryData.image}
                    className="max-h-[300px] w-full object-cover overflow-hidden"
                  />

                  <div className="h-full w-full absolute left-0 top-0">
                    <div className="flex justify-center w-full items-center">
                      <label
                        htmlFor="dialog-dropzone-file"
                        className={
                          tempCategoryData
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
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-gray-500 text-xs dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dialog-dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            setupdateData({
                              ...updateData,
                              image: e.target.files[0],
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {/* Img design end */}
              </div>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <div className="flex gap-x-5">
            <Button variant="filled" onClick={handleOpen} color="red">
              Cancel
            </Button>
            <Button onClick={handleUpdatedbanner} loading={isUpading}>
              Update
            </Button>
          </div>
        </DialogFooter>
      </Dialog>

      {/* dialog for Delete confirmation popup */}
      <Dialog size="sm" open={openTwo} handler={handleOpentwo} className="p-4">
        <DialogBody className="pb-2 space-y-4">
          <div className="text-black-500 text-xl">
            You are confirm to delete that banner
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="flex gap-x-5">
            <Button variant="filled" onClick={handleOpentwo} color="green">
              Cancel
            </Button>
            <Button
              onClick={handleDeleteCategory}
              color="red"
              loading={isDeletingCategory}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Category;
