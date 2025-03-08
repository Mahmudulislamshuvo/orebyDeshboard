import React from "react";
import Fileinput from "./Fileinput";
import { Button, Input } from "@material-tailwind/react";
import TableWithActions from "./TableWIthAction";

const Banner = () => {
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
            className="w-[20%] text-lg"
            type="submit"
            form="mainForm"
            color="green"
          >
            Upload
          </Button>
        </div>
        <div>
          <TableWithActions />
        </div>
      </div>
    </>
  );
};

export default Banner;
