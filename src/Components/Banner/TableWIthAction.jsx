import React from "react";
import { Button, Card, Typography } from "@material-tailwind/react";

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

const TableWithActions = ({ hightforTable = "500px", handleOpen }) => {
  return (
    <div
      style={{ height: hightforTable }}
      className={`overflow-y-auto bg-white p-4 rounded-lg shadow-lg`}
    >
      <Card className="h-full w-full overflow-hidden">
        <div className="overflow-y-auto max-h-full">
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
    </div>
  );
};

export default TableWithActions;
