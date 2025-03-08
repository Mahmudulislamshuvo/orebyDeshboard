import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs } from "@material-tailwind/react";

const Breadcrumb = () => {
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  return (
    <div className="p-4">
      <Breadcrumbs>
        {/* Home breadcrumb */}
        <Link to="/" className="opacity-60">
          Home
        </Link>

        {/* Dynamically create breadcrumbs based on path segments */}
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

          return (
            <Link
              key={index}
              to={path}
              className={
                index === pathSegments.length - 1 ? "opacity-100" : "opacity-60"
              }
            >
              {segment.charAt(0).toUpperCase() + segment.slice(1)}{" "}
              {/* Capitalize the first letter */}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
