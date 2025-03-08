import { Button, Input } from "@material-tailwind/react";
import React from "react";
import Fileinput from "../Banner/Fileinput";
import TableWithActions from "../Banner/TableWIthAction";

const Category = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-5">
        <Input label="Category Name" />
        <Fileinput />
        <Button
          variant="filled"
          loading={false}
          className="w-[20%] text-lg"
          type="submit"
          form="mainForm"
          color="green"
        >
          Upload
        </Button>
      </div>
      <TableWithActions />
    </div>
  );
};

export default Category;
