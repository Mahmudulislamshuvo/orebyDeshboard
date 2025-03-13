// SkeletonLoader.js (Component file)
import React from "react";
import { Skeleton } from "@material-tailwind/react"; // Import Skeleton component from Material Tailwind

const SkeletonLoader = ({ type, count = 1, className = "" }) => {
  const skeletonTypeClasses = {
    text: "h-6 w-32", // For loading text
    image: "h-32 w-64", // For loading image (example 100px by 200px)
    button: "h-8 w-32", // For loading button
    tableRow: "h-8 w-full", // For table rows
  };

  const skeletonElements = Array.from({ length: count }).map((_, index) => (
    <div key={index} className={`flex items-center gap-4 ${className}`}>
      <Skeleton
        className={skeletonTypeClasses[type] || skeletonTypeClasses.text}
      />
    </div>
  ));

  return <>{skeletonElements}</>;
};

export default SkeletonLoader;
