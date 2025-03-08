import React from "react";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import {
  Input,
  Option,
  Select,
  Dialog,
  Textarea,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import Fileinput from "./Fileinput";

const TABLE_HEAD = ["Title", "Banner", "Date", "Actions"];
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
];

const TableWithActions = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <div className="overflow-y-auto max-h-[400px] bg-white p-4 rounded-lg shadow-lg">
      <Card className="h-full w-full overflow-hidden">
        <div className="overflow-y-auto max-h-[350px]">
          <table className="w-full min-w-max text-left">
            {/* Table Header with sticky class */}
            <thead className="sticky top-0 z-10 bg-blue-gray-50">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 p-4 text-center"
                  >
                    <Typography
                      variant="h4"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ name, job, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4 text-center"
                  : "p-4 border-b border-blue-gray-50 text-center";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="lg"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="lg"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {job}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="lg"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    {/* Last column with action */}
                    <td className="p-4 text-center flex gap-x-5 justify-center">
                      <Button color="red">Delete</Button>
                      <Button onClick={handleOpen} color="green">
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Dialog for managing item */}
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
  );
};

export default TableWithActions;
