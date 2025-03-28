import React from "react";
import { Button } from "@material-tailwind/react";

// Adding Shake Animation via Tailwind CSS
const ProductError = ({ errorMessage, onRetry }) => {
  return (
    <div
      className="relative flex flex-col justify-center items-center bg-red-50 p-8 rounded-lg shadow-lg border border-red-200 animate-shake"
      style={{
        animation: "shake 0.5s ease-in-out 3",
      }}
    >
      {/* Error Title */}
      <h2 className="text-4xl font-bold text-red-600">
        Oops! Something went wrong...
      </h2>

      {/* Error Message */}
      <p className="mt-4 text-lg text-red-500">
        {errorMessage || "We couldn't load the product data. Please try again."}
      </p>

      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-24 mt-6 text-red-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6l3 3M12 18v-6l-3-3M5.25 6A7.5 7.5 0 0112 1.5c3.044 0 5.72 1.82 7 4.469a7.43 7.43 0 011.25 2.831M12 1.5a7.43 7.43 0 011.25 2.831m2.75 5.469A7.5 7.5 0 0112 22.5c-3.044 0-5.72-1.82-7-4.469a7.43 7.43 0 01-1.25-2.831"
        />
      </svg>

      {/* Retry Button */}
      <div className="mt-6">
        <Button
          color="red"
          size="lg"
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white rounded-lg px-6 py-3 animate-bounce"
        >
          Retry
        </Button>
      </div>
    </div>
  );
};

export default ProductError;
