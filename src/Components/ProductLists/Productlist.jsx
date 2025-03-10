import React from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import Fileinput from "../Banner/Fileinput";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Select,
  Typography,
  Input,
} from "@material-tailwind/react";

const Productlist = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const { quill, quillRef } = useQuill();
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
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">Silver</td>
                <td class="px-6 py-4">Laptop</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4 text-center">
                  <div className=" flex gap-x-5 justify-center text-center">
                    <Button color="red">Delete</Button>
                    <Button onClick={handleOpen} color="green">
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Manage Category
          </Typography>
          {/* <Typography className="mt-1 font-normal text-gray-600">
            Keep your records up-to-date and organized.
          </Typography> */}
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6 max-h-[600px] overflow-y-auto">
          <div className="flex flex-col gap-y-5 p-5 max-w-7xl mx-auto">
            {/* Product Name */}
            <div>
              <Input color="blue" label="Product Name" className="w-full" />
            </div>

            {/* Quill Editor */}
            <div className="overflow-hidden">
              <div className="w-full h-[200px] border rounded-md shadow-sm ">
                <div ref={quillRef} />
              </div>
            </div>

            {/* Form Section */}
            <div className="flex flex-col gap-x-10">
              {/* File Input Section */}
              <div className="w-full">
                <div className=" bg-white rounded-lg shadow-xl">
                  <Fileinput />
                </div>
              </div>

              <div className="flex justify-between w-[80%] mt-5">
                {/* Input Fields Section */}
                <div className="flex flex-col w-1/3 gap-y-6">
                  <div className="w-full">
                    <Input color="blue" label="Discount" className="w-full" />
                  </div>
                  <div className="w-full">
                    <Input color="blue" label="Stock" className="w-full" />
                  </div>
                  <div className="w-full">
                    <Input color="blue" label="Rating" className="w-full" />
                  </div>
                </div>

                {/* Select and Price Section */}
                <div className="flex flex-col w-1/3 gap-y-6">
                  <div className="w-full">
                    <Input
                      color="blue"
                      label="Price"
                      type="number"
                      placeholder="Price"
                      className="w-full"
                    />
                  </div>

                  <div className="w-full">
                    <Select label="Select Category" className="w-full">
                      <Option>Material Tailwind HTML</Option>
                      <Option>Material Tailwind React</Option>
                      <Option>Material Tailwind Vue</Option>
                      <Option>Material Tailwind Angular</Option>
                      <Option>Material Tailwind Svelte</Option>
                    </Select>
                  </div>

                  <div className="w-full">
                    <Select label="Select SubCategory" className="w-full">
                      <Option>Material Tailwind HTML</Option>
                      <Option>Material Tailwind React</Option>
                      <Option>Material Tailwind Vue</Option>
                      <Option>Material Tailwind Angular</Option>
                      <Option>Material Tailwind Svelte</Option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <div className="flex gap-x-5">
            <Button variant="filled" onClick={handleOpen} color="red">
              Cancel
            </Button>
            <Button onClick={handleOpen}>Update</Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Productlist;
