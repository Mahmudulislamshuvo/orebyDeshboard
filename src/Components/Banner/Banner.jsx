import React from "react";
import Fileinput from "./Fileinput";
import { Button, Input } from "@material-tailwind/react";
import TableWithActions from "./TableWIthAction";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";

const Banner = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <div className="pt-5">
        <Input label="Banner title" />
        <div className="pt-5">
          <Fileinput />
        </div>
        <div className="pt-5">
          <Button
            variant="filled"
            loading={false}
            className="w-[15%] text-lg"
            type="submit"
            form="mainForm"
            color="green"
          >
            Upload
          </Button>
        </div>
        <div>
          <TableWithActions hightforTable={"350px"} handleOpen={handleOpen} />
        </div>
        <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
          <DialogHeader className="relative m-0 block">
            <Typography variant="h4" color="blue-gray">
              Manage Item
            </Typography>
            <Typography className="mt-1 font-normal text-gray-600">
              Keep your records up-to-date and organized.
            </Typography>
          </DialogHeader>
          <DialogBody className="space-y-4 pb-6">
            <Fileinput />
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
    </>
  );
};

export default Banner;
