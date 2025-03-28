import React from "react";

const ProductListSkeliton = () => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Sub Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {[...new Array(10)].map((_, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 animate-pulse"
              >
                <td className="px-6 py-4">
                  <div className="bg-gray-200 w-48 h-5 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="bg-gray-200 w-24 h-24 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="bg-gray-200 w-32 h-5 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="bg-gray-200 w-32 h-5 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="bg-gray-200 w-24 h-5 rounded"></div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-x-4">
                    <div className="bg-gray-200 w-24 h-8 rounded"></div>
                    <div className="bg-gray-200 w-24 h-8 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListSkeliton;
