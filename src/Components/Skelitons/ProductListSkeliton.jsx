import React from "react";

const ProductListSkeliton = () => {
  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Color
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {[...new Array(10)].map((_, index) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td class="px-6 py-4">
                  <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-4 bg-gray-200 rounded w-2/4 animate-pulse"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </td>
                <td class="px-6 py-4">
                  <div class="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                </td>
                <td class="px-6 py-4 text-center">
                  <div class="flex gap-x-5 justify-center text-center">
                    <div class="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
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
