import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import TableWithActions from "../CommonComponents/TableWIthAction";
import { Select, Option } from "@material-tailwind/react";

const Subcategory = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <div className="flex flex-col gap-y-5">
        <Input label="Category Name" />
        <div className="w-full text-lg">
          <Select label="Select Category">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
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
      <TableWithActions hightforTable={"550px"} handleOpen={handleOpen} />
      {/* Dialog for managing item */}
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
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
      </Dialog>
    </div>
  );
};

export default Subcategory;
