import React, { useEffect, useState } from "react";
import {
  Button,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { isCheckValue } from "../../librarry/valueChecker.js";
import { InfoToast, SuccessToast } from "../../utils/Toastify.js";
import { useParams } from "react-router-dom";
import {
  useGetSingleSubCategoryQuery,
  useUpdatingSubCategoryMutation,
} from "../../Features/Api/exclusiveApi.js";

const View = () => {
  const { id } = useParams();
  const {
    register: registerMain,
    handleSubmit: handleSubmitMain,
    formState: { errors: errorsMain },
    setValue: setValueMain,
  } = useForm();

  const { isLoading, data, isError } = useGetSingleSubCategoryQuery(id);
  const [UpdatingSubCategory, { isLoading: isUpdating }] =
    useUpdatingSubCategoryMutation();
  const [updatingData, setupdatingData] = useState({});
  const [updateData, setupdateData] = useState({
    _id: "",
    name: "",
    description: "",
  });

  // This useEffect will set the initial data into the updateData state
  useEffect(() => {
    if (data?.data) {
      setupdatingData(data?.data);
      setupdateData({
        _id: data?.data?._id,
      });
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading categories</div>;

  // handle submit button
  const handleEdit = async (data) => {
    try {
      const CheckedUpdateData = isCheckValue(updateData);
      if (!CheckedUpdateData) {
        console.log("Please fill the form properly or data not found");
        return;
      }

      const updatedData = {};
      // Add all the data to the updatedData object, except _id
      for (const key in CheckedUpdateData) {
        if (key !== "_id") {
          updatedData[key] = CheckedUpdateData[key];
        }
      }
      if (Object.keys(updatedData).length === 0) {
        console.log("No fields updated");
        return;
      }
      const response = await UpdatingSubCategory({
        data: updatedData,
        id: updateData._id,
      });
      if (response?.data) {
        SuccessToast("Category updated successfully");
      }
    } catch (error) {
      console.log("Error from View.jsx handleEdit:", error);
    }
  };

  return (
    <div>
      <form className="space-y-4 pb-6" onSubmit={handleSubmitMain(handleEdit)}>
        <Input
          label="SubCategory Name"
          defaultValue={updatingData?.name}
          {...registerMain("name")}
          onChange={(e) =>
            setupdateData({ ...updateData, name: e.target.value })
          }
        />
        <Textarea
          color="green"
          label="Description"
          className="h-[40px] p-5"
          defaultValue={updatingData?.description}
          {...registerMain("description")}
          onChange={(e) =>
            setupdateData({ ...updateData, description: e.target.value })
          }
        />

        <DialogFooter>
          <div className="flex gap-x-5">
            <Button variant="filled" color="red">
              Back
            </Button>
            <Button type="submit" loading={isUpdating}>
              Update
            </Button>
          </div>
        </DialogFooter>
      </form>
    </div>
  );
};

export default View;
