import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";
import Fileinput from "../Banner/Fileinput";
import TableWithActions from "../Banner/TableWIthAction";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";

const Category = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <div className="flex flex-col gap-y-5">
        <Input label="Category Name" />
        <Textarea color="green" label="Description" />
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
      <TableWithActions hightforTable={"470px"} handleOpen={handleOpen} />
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Manage Category
          </Typography>
          {/* <Typography className="mt-1 font-normal text-gray-600">
            Keep your records up-to-date and organized.
          </Typography> */}
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <Input label="Category Name" />
          <Textarea color="green" label="Description" />
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

export default Category;
