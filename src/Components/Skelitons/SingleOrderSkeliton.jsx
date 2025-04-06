import React from "react";

const OrderDetailsSkeleton = () => {
  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col">
        {/* Skeleton for Order ID */}
        <div className="h-6 w-40 bg-gray-300 rounded-md animate-pulse"></div>
        {/* Skeleton for Order Date */}
        <div className="h-4 w-32 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          {/* Skeleton for each product */}
          {[1].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full"
            >
              {/* Skeleton for product label */}
              <div className="h-5 w-32 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                {/* Skeleton for product image */}
                <div className="h-20 w-20 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    {/* Skeleton for product name */}
                    <div className="h-6 w-48 bg-gray-300 rounded-md animate-pulse"></div>
                    {/* Skeleton for product details */}
                    <div className="h-4 w-36 bg-gray-300 rounded-md animate-pulse"></div>
                    <div className="h-4 w-28 bg-gray-300 rounded-md animate-pulse"></div>
                    <div className="h-4 w-32 bg-gray-300 rounded-md animate-pulse"></div>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    {/* Skeleton for price */}
                    <div className="h-6 w-24 bg-gray-300 rounded-md animate-pulse"></div>
                    {/* Skeleton for quantity */}
                    <div className="h-6 w-12 bg-gray-300 rounded-md animate-pulse"></div>
                    {/* Skeleton for total price */}
                    <div className="h-6 w-24 bg-gray-300 rounded-md animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                {/* Skeleton for subtotal */}
                <div className="h-4 w-40 bg-gray-300 rounded-md animate-pulse"></div>
                {/* Skeleton for shipping */}
                <div className="h-4 w-40 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
              {/* Skeleton for total */}
              <div className="h-4 w-40 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Customer info skeleton */}
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl font-semibold text-gray-800">Customer</h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              {/* Skeleton for avatar and user name */}
              <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="flex justify-start items-start flex-col space-y-2">
                <div className="h-5 w-32 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
            </div>

            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                {/* Skeleton for Shipping Address */}
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <div className="h-4 w-48 bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="h-4 w-48 bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="h-4 w-36 bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="h-4 w-40 bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="h-4 w-44 bg-gray-300 rounded-md animate-pulse"></div>
                </div>

                {/* Skeleton for Billing Address */}
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  <div className="h-4 w-48 bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="h-4 w-48 bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="h-4 w-36 bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="h-4 w-40 bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="h-4 w-44 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
              </div>
              {/* Skeleton for Edit Button */}
              <div className="h-12 w-36 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
