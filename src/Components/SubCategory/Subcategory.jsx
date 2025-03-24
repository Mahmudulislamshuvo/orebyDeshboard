import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import {
  useCreateSubcategoryMutation,
  useGetAllCategoryQuery,
  useGetAllSubCategoryQuery,
  useSubCategoryDeleteMutation,
} from "../../Features/Api/exclusiveApi";
import { useNavigate } from "react-router-dom";
import ListItems from "../CommonComponents/ListItems";
import { InfoToast, SuccessToast } from "../../utils/Toastify";
import { useForm, Controller } from "react-hook-form";

const Subcategory = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const navigate = useNavigate();
  const { isLoading, data, isError } = useGetAllSubCategoryQuery();
  const {
    isLoading: loadingAllcategory,
    data: DataAllcategory,
    isError: ErrorAllcategory,
  } = useGetAllCategoryQuery();

  const [SubCategoryDelete, { isLoading: isDeleteSubcategory }] =
    useSubCategoryDeleteMutation();

  const [CreateSubcategory, { isLoading: isSubcategoryCreating }] =
    useCreateSubcategoryMutation();

  const [open, setOpen] = React.useState(false);
  const [tempData, settempData] = useState({});
  const [updateData, setupdateData] = useState({
    name: "",
    description: "",
    category: "",
  });
  const TABLE_HEAD = [
    "Name",
    "Category Name",
    "Description",
    "Date",
    "Actions",
  ];

  const handleOpen = (id) => {
    navigate(`/view/${id?._id}`);
  };

  const handleOpentwo = (id) => {
    settempData(id);
    setOpen((prev) => !prev);
  };

  const handleDeleteSubCategory = async (id) => {
    try {
      const DeletingId = id._id;
      const response = await SubCategoryDelete(DeletingId);
      if (response?.data) {
        InfoToast("Banner deleted successfully");
      }
    } catch (error) {
      console.log("Error from banner.jsx handleDeleteBanner:", error);
    } finally {
      // Optional: close the dialog or reset state as needed
    }
  };

  const handleCreateSubCategory = async (data) => {
    try {
      const response = await CreateSubcategory(data).unwrap();
      if (response?.data) {
        SuccessToast("Subcategory created successfully!");
      }
    } catch (error) {
      console.log("Error while creating subcategory:", error);
    } finally {
      setupdateData({
        name: "",
        description: "",
        category: "",
      });
      reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateSubCategory)}>
        <div className="flex flex-col gap-y-5">
          <Input
            label="Category Name"
            onChange={(e) =>
              setupdateData({
                ...updateData,
                name: e.target.value,
              })
            }
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && (
            <span className="text-red-500">Category Name is required</span>
          )}
          <Textarea
            color="green"
            label="Description"
            className="h-[40px] p-5"
            onChange={(e) =>
              setupdateData({
                ...updateData,
                description: e.target.value,
              })
            }
            {...register("description", {
              required: true,
            })}
          />
          {errors.description && (
            <span className="text-red-500">Category Name is required</span>
          )}
          <div className="w-full text-lg">
            {loadingAllcategory ? (
              <div>Loading categories...</div>
            ) : DataAllcategory?.data ? (
              <Controller
                control={control}
                name="category"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    label="Select Category"
                    onChange={(e) => {
                      setValue("category", e.target.value);
                      trigger("category");
                    }}
                    {...field}
                  >
                    {DataAllcategory?.data?.map((items) => (
                      <Option key={items._id} value={items._id}>
                        {items.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            ) : (
              <div>Error: No categories available</div>
            )}
          </div>
          {errors.category && (
            <span className="text-red-500">Category Name is required</span>
          )}
          <Button
            variant="filled"
            loading={false}
            className="w-[15%] text-sm"
            color="green"
            type="submit"
          >
            Upload
          </Button>
        </div>
      </form>
      <ListItems
        hightforTable={"550px"}
        handleOpen={handleOpen}
        data={data?.data}
        loading={isLoading}
        handleDete={handleDeleteSubCategory}
        TABLE_HEAD={TABLE_HEAD}
      />

      {/* Detele Dialog */}
      <Dialog size="sm" open={open} handler={handleOpentwo} className="p-4">
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
              onClick={handleDeleteSubCategory}
              color="red"
              loading={isDeleteSubcategory}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Subcategory;
