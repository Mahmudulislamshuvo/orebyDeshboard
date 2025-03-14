import React from "react";
import { Skeleton } from "@material-tailwind/react";

const TableSkelitons = () => {
  return (
    <div>
      <tr>
        <td className="p-4 text-center">
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </td>
        <td className="p-4 text-center">
          <Skeleton className="h-24 w-48 mx-auto" />
        </td>
        <td className="p-4 text-center">
          <Skeleton className="h-6 w-1/4 mx-auto" />
        </td>
        <td className="p-4 text-center flex justify-center gap-x-5">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </td>
      </tr>
    </div>
  );
};

export default TableSkelitons;
