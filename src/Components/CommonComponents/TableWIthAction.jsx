import React from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import moment from "moment/moment";

const TABLE_HEAD = ["Title", "Banner", "Date", "Actions"];

const TableWithActions = ({
  hightforTable = "500px",
  handleOpen,
  data,
  loading,
  handleDete,
}) => {
  const banners = Array.isArray(data) ? [...data].reverse() : [];

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
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : banners.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    No banners found
                  </td>
                </tr>
              ) : (
                banners?.map(({ name, image, createdAt, _id }, index) => {
                  const isLast = index === banners?.length - 1;
                  const classes = isLast
                    ? "p-4 text-center"
                    : "p-4 border-b border-blue-gray-50 text-center";

                  return (
                    <tr key={_id}>
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
                        <div className="flex justify-center">
                          <img
                            src={image}
                            alt={image}
                            className="h-[100px] w-[200px] object-cover rounded-xl"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="lg"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {moment(createdAt).fromNow()}
                        </Typography>
                      </td>
                      {/* Last column with action */}
                      <td className="p-4 text-center flex gap-x-5 justify-center">
                        <Button color="red">Delete</Button>
                        <Button
                          onClick={() => handleOpen({ name, image, _id })}
                          color="green"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TableWithActions;
