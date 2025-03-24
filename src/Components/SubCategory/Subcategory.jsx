import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";
import { Select, Option } from "@material-tailwind/react";
import {
  useGetAllCategoryQuery,
  useGetAllSubCategoryQuery,
} from "../../Features/Api/exclusiveApi";
import { useNavigate } from "react-router-dom";
import ListItems from "../CommonComponents/ListItems";

const Subcategory = () => {
  const navigate = useNavigate();
  const { isLoading, data, isError } = useGetAllSubCategoryQuery();
  const {
    isLoading: loadingAllcategory,
    data: DataAllcategory,
    isError: ErrorAllcategory,
  } = useGetAllCategoryQuery();
  // const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    navigate(`/view/${id?._id}`);
  };
  const TABLE_HEAD = [
    "Name",
    "Category Name",
    "Description",
    "Date",
    "Actions",
  ];

  const handleOpentwo = (id) => {
    settempCategoryData(id);
    setOpen((prev) => !prev);
  };

  console.log(DataAllcategory);

  return (
    <div>
      <div className="flex flex-col gap-y-5">
        <Input label="Category Name" />
        <Textarea
          color="green"
          label="Description"
          className="h-[40px] p-5"
          // onChange={(e) =>
          //   setupdateData({
          //     ...updateData,
          //     description: e.target.value,
          //   })
          // }
        />
        <div className="w-full text-lg">
          {/* <Select label="Select Category">
            {DataAllcategory?.data?.map((items) => (
              <Option key={items._id} value={items._id}>
                {items.name}
              </Option>
            ))}
          </Select> */}

          <Select label="Select Category">
            <Option>Material Tailwind Svelte</Option>
          </Select>
        </div>
        <Button
          variant="filled"
          loading={false}
          className="w-[15%] text-sm"
          type="submit"
          form="mainForm"
          color="green"
        >
          Upload
        </Button>
      </div>
      <ListItems
        hightforTable={"550px"}
        handleOpen={handleOpen}
        data={data?.data}
        loading={isLoading}
        handleDete={handleOpentwo}
        TABLE_HEAD={TABLE_HEAD}
      />
      {/* Dialog for managing item */}
      {/* <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Manage SubCategory
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Keep your records up-to-date and organized.
          </Typography>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <Input label="SubCategory Name" />
          <div className="w-full text-lg">
            <Select label="Select Category">
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
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
      </Dialog> */}
    </div>
  );
};

export default Subcategory;
