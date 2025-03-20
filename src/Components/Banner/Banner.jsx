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
import { InfoToast, SuccessToast } from "../../utils/Toastify";
import { isCheckValue } from "../../librarry/valueChecker";

const Banner = () => {
  // todo: modal thing start
  const [open, setOpen] = React.useState(false);
  const [openTwo, setOpenTwo] = React.useState(false);
  const [tempBannerData, settempBannerData] = useState({});
  const [updateData, setupdateData] = useState({
    _id: "",
    name: "",
    image: "",
  });
  const [deleteBannerTempData, setdeleteBannerTempData] = useState({});

  // React form hook for mainForm
  const {
    register: registerMain,
    handleSubmit: handleSubmitMain,
    formState: { errors: errorsMain },
    setValue: setValueMain,
  } = useForm();

  // React form hook for bannerForm (Dialog Form)
  // const {
  //   register: registerBanner,
  //   handleSubmit: handleSubmitBanner,
  //   formState: { errors: errorsBanner },
  //   setValue: setValueBanner,
  // } = useForm();

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
  // const handleUpdatedbanner = async (data) => {
  //   try {
  //     const CheckedUpdateData = isCheckValue(updateData);

  //     if (CheckedUpdateData == false) {
  //       console.log("please fill the form properly");
  //       return;
  //     }
  //     const lestestUpdatedData = {};
  //     for (let key in CheckedUpdateData) {
  //       if (key == "_id") {
  //         continue;
  //       } else {
  //         lestestUpdatedData[key] = CheckedUpdateData[key];
  //       }
  //     }

  //     // if lestestUpdatedData empty then no need to update
  //     if (Object.keys(lestestUpdatedData).length === 0) {
  //       console.log("No changes to update");
  //       return;
  //     }

  //     const response = await UpdateBanner({
  //       data: lestestUpdatedData,
  //       id: CheckedUpdateData._id,
  //     });

  //     if (response?.data) {
  //       SuccessToast("Banner updated successfully");
  //     }
  //   } catch (error) {
  //     console.log("Error from banner.jsx upload banner:", error);
  //   } finally {
  //     setOpen(true);
  //   }
  // };

  const handleUpdatedbanner = async () => {
    try {
      const CheckedUpdateData = isCheckValue(updateData);

      if (!CheckedUpdateData) {
        console.log("Please fill the form properly");
        return;
      }

      const formData = new FormData();
      let hasChanges = false;

      // Append all fields except _id to FormData
      for (const key in CheckedUpdateData) {
        if (key === "_id") continue;

        const value = CheckedUpdateData[key];
        if (value !== undefined && value !== null) {
          // Handle both files and regular data
          formData.append(key, value);
          hasChanges = true;
        }
      }

      // Log FormData contents for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      if (!hasChanges) {
        console.log("No changes to update");
        return;
      }

      // Add the ID as a regular form field if needed
      formData.append("id", CheckedUpdateData._id);

      const response = await UpdateBanner({
        data: formData,
        id: CheckedUpdateData._id,
      });
      console.log(response);

      if (response?.data) {
        SuccessToast("Banner updated successfully");
      }
    } catch (error) {
      console.log("Error from banner.jsx upload banner:", error);
    } finally {
      setOpen(false);
    }
  };

  // handle Delete banner
  const handleDeleteBanner = async (id) => {
    try {
      const DeletingId = deleteBannerTempData?._id;

      const response = await DeleteBanner(DeletingId);
      if (response?.data) {
        InfoToast("Banner deleted successfully");
      }
    } catch (error) {
      console.log("Error from banner.jsx handleDeleteBanner:", error);
    } finally {
      setOpenTwo(false);
    }
  };

  const handleOpentwo = (id) => {
    setdeleteBannerTempData(id);
    setOpenTwo((prev) => !prev);
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
              className="text-sm w-[15%]"
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
            handleDete={handleOpentwo}
          />
        </div>
        <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
          <DialogHeader className="block relative">
            <Typography variant="h4" color="blue-gray">
              Manage Banner
            </Typography>
          </DialogHeader>
          <DialogBody className="pb-2 space-y-4">
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
                    className="h-auto w-full object-cover"
                  />

                  <div className="h-full w-full absolute left-0 top-0">
                    <div className="flex justify-center w-full items-center">
                      <label
                        htmlFor="dialog-dropzone-file"
                        className={
                          tempBannerData
                            ? "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  hover:bg-transparent hover:border-transparent  opacity-0 hover:opacity-100"
                            : "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        }
                      >
                        <div className="flex flex-col justify-center items-center pb-6 pt-5">
                          <svg
                            className="h-8 text-green-500 w-8 dark:text-gray-400 mb-4"
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
                          <p className="text-gray-700 text-lg dark:text-gray-600 mb-2">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-gray-500 text-xs dark:text-gray-400">
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
                    <Button
                      onClick={handleUpdatedbanner}
                      loading={isUpdatingBanner}
                    >
                      Update
                    </Button>
                  </div>
                </DialogFooter>
              </div>
            </form>
          </DialogBody>
        </Dialog>
        {/* dialog for Delete confirmation popup */}
        <Dialog
          size="sm"
          open={openTwo}
          handler={handleOpentwo}
          className="p-4"
        >
          <DialogBody className="pb-2 space-y-4">
            <div className="text-black-500 text-xl">
              You are confirm to delete that banner
            </div>
          </DialogBody>
          <DialogFooter>
            <div className="flex gap-x-5">
              <Button variant="filled" onClick={handleOpentwo} color="green">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteBanner}
                color="red"
                loading={isDeletingBanner}
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
};

export default Banner;
