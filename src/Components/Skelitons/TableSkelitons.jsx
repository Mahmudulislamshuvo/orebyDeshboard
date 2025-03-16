import React from "react";
import { Typography } from "@material-tailwind/react";

const TableSkelitons = () => {
  return (
    <div>
      <tbody>
        <tr>
          {/* Skeleton for Title */}
          <td className="p-4 text-center">
            <div className="w-1/2 mx-auto">
              <Typography
                variant="h6"
                color="blue-gray"
                className="font-normal"
              >
                <div className="h-6 bg-gray-300 animate-pulse"></div>
              </Typography>
            </div>
          </td>

          {/* Skeleton for Banner Image */}
          <td className="p-4 text-center">
            <div className="flex justify-center">
              <div className="h-[100px] w-[200px] bg-gray-300 animate-pulse rounded-xl"></div>
            </div>
          </td>

          {/* Skeleton for Date */}
          <td className="p-4 text-center">
            <div className="h-6 w-32 mx-auto bg-gray-300 animate-pulse"></div>
          </td>

          {/* Skeleton for Action Buttons (Delete and Edit) */}
          <td className="p-4 text-center flex justify-center gap-x-5">
            <div className="h-10 w-20 bg-gray-300 animate-pulse"></div>
            <div className="h-10 w-20 bg-gray-300 animate-pulse"></div>
          </td>
        </tr>
      </tbody>
    </div>
  );
};

export default TableSkelitons;
