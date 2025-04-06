import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {/* <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-200 dark:bg-gray-700">
                Order ID
              </th>
              <th className="px-6 py-3 bg-gray-200 dark:bg-gray-700">Date</th>
              <th className="px-6 py-3 bg-gray-200 dark:bg-gray-700">Price</th>
              <th className="px-6 py-3 bg-gray-200 dark:bg-gray-700">Status</th>
              <th className="px-6 py-3 bg-gray-200 dark:bg-gray-700">
                Actions
              </th>
            </tr>
          </thead> */}
          <tbody>
            {[...new Array(10)].map((_, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 "
              >
                {/* Order ID Skeleton */}
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </td>

                {/* Date Skeleton */}
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </td>

                {/* Price Skeleton */}
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </td>

                {/* Status Skeleton */}
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  <div className="w-20 h-4 bg-gray-300 rounded"></div>
                </td>

                {/* Actions Skeleton */}
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 flex gap-x-4 items-center">
                  <div className="w-24 h-8 bg-gray-300 rounded"></div>
                  <div className="w-24 h-8 bg-gray-300 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonLoader;
