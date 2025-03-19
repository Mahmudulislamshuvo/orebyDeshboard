import React, { useEffect, useState } from "react";
import Fileinput from "../CommonComponents/Fileinput";
import { Button, Input } from "@material-tailwind/react";
import TableWithActions from "../CommonComponents/TableWIthAction";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import {
  useDeleteBannerMutation,
  useGetAllBannerQuery,
  useUpdateBannerMutation,
  useUploadBannerMutation,
} from "../../Features/Api/exclusiveApi";
import { useForm } from "react-hook-form";
import { SuccessToast } from "../../utils/Toastify";
import { isCheckValue } from "../../librarry/valueChecker";

const Banner = () => {
  // todo: modal thing start
  const [open, setOpen] = React.useState(false);
  const [tempBannerData, settempBannerData] = useState({});
  const [updateData, setupdateData] = useState({
    _id: "",
    name: "",
    image: "",
  });

  // React form hook for mainForm
  const {
    register: registerMain,
    handleSubmit: handleSubmitMain,
    formState: { errors: errorsMain },
    setValue: setValueMain,
  } = useForm();

  // React form hook for bannerForm (Dialog Form)
  const {
    register: registerBanner,
    handleSubmit: handleSubmitBanner,
    formState: { errors: errorsBanner },
    setValue: setValueBanner,
  } = useForm();

  // handle modal open
  const handleOpen = (item) => {
    if (item) {
      settempBannerData(item);
      // this how set Id to setupdateData
      setupdateData({
        ...updateData,
        _id: item._id,
      });
    }
    setOpen((prev) => !prev);
  };
  // todo: modal thing end
  const [uploadBanner, { isLoading, isError }] = useUploadBannerMutation();
  const {
    data: bannerData,
    isLoading: isGettingBannersLoading,
    isError: getBannersError,
  } = useGetAllBannerQuery();
  const [UpdateBanner, { isLoading: isUpdatingBanner }] =
    useUpdateBannerMutation();
  const [DeleteBanner, { isLoading: isDeletingBanner }] =
    useDeleteBannerMutation();

  // handle main form
  const handlebanner = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data?.image[0]);
      formData.append("name", data?.name);
      const response = await uploadBanner(formData);
      if (response?.data) {
        SuccessToast("Banner uploaded successfully");
      }
    } catch (error) {
      console.log("error from banner.jsx upload banner", error);
    }
  };

  // handle Dialoge form for udate/edit the banner
  const handleUpdatedbanner = async (data) => {
    try {
      const CheckedUpdateData = isCheckValue(updateData);

      if (CheckedUpdateData == false) {
        console.log("please fill the form properly");
        return;
      }
      const lestestUpdatedData = {};
      for (let key in CheckedUpdateData) {
        if (key == "_id") {
          continue;
        } else {
          lestestUpdatedData[key] = CheckedUpdateData[key];
        }
      }
      // if lestestUpdatedData empty then no need to update
      if (Object.keys(lestestUpdatedData).length === 0) {
        console.log("No changes to update");
        return;
      }

      const response = await UpdateBanner({
        data: lestestUpdatedData,
        id: CheckedUpdateData._id,
      });

      if (response?.data) {
        SuccessToast("Banner updated successfully");
      }

      console.log(response);
    } catch (error) {
      console.log("Error from banner.jsx upload banner:", error);
    } finally {
      setOpen(false);
    }
  };

  // handle Delete banner
  const handleDeleteBanner = async (id) => {
    try {
      console.log(id);
    } catch (error) {
      console.log("Error from banner.jsx handleDeleteBanner:", error);
    }
  };

  return (
    <>
      <div className="pt-5">
        <form onSubmit={handleSubmitMain(handlebanner)} id="mainForm">
          <Input
            label="Banner title"
            {...registerMain("name", { required: true, maxLength: 25 })}
          />
          {errorsMain.name && (
            <p className="text-red-400 pt-2">Banner name is required.</p>
          )}
          <div className="pt-5">
            <Fileinput
              setValue={setValueMain}
              Uoloadingimg={errorsMain.image}
              register={registerMain}
            />
          </div>
          <div className="pt-5">
            <Button
              variant="filled"
              loading={isLoading}
              className="w-[15%] text-sm"
              type="submit"
              color="green"
            >
              Upload
            </Button>
          </div>
        </form>
        <div>
          <TableWithActions
            hightforTable={"350px"}
            handleOpen={handleOpen}
            data={bannerData?.data}
            loading={isGettingBannersLoading}
            handleDete={handleDeleteBanner}
          />
        </div>
        <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
          <DialogHeader className="relative block">
            <Typography variant="h4" color="blue-gray">
              Manage Banner
            </Typography>
          </DialogHeader>
          <DialogBody className="space-y-4 pb-2">
            <form onSubmit={(e) => e.preventDefault()} id="bannerForm">
              <Input
                label="Banner title"
                defaultValue={tempBannerData.name}
                onChange={(e) =>
                  setupdateData({ ...updateData, name: e.target.value })
                }
                onClick={(e) => (e.target.value = "")}
                onBlur={(e) => (e.target.value = tempBannerData.name)}
              />
              <div className="pt-5">
                {/* Image upload design */}
                <div className="w-full relative">
                  <img
                    src={tempBannerData.image}
                    alt={tempBannerData.image}
                    className="w-full h-auto object-cover"
                  />

                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dialog-dropzone-file"
                        className={
                          tempBannerData
                            ? "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  hover:bg-transparent hover:border-transparent  opacity-0 hover:opacity-100"
                            : "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        }
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-green-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-lg text-gray-700 dark:text-gray-600">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dialog-dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            setupdateData({
                              ...updateData,
                              image: e.target.files[0],
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Image upload design end*/}
              <div className="pt-5">
                <DialogFooter>
                  <div className="flex gap-x-5">
                    <Button variant="filled" onClick={handleOpen} color="red">
                      Cancel
                    </Button>
                    <Button onClick={handleUpdatedbanner}>Update</Button>
                  </div>
                </DialogFooter>
              </div>
            </form>
          </DialogBody>
        </Dialog>
      </div>
    </>
  );
};

export default Banner;
