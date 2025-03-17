import React, { useState } from "react";
import Fileinput from "./Fileinput";
import { Button, Input } from "@material-tailwind/react";
import TableWithActions from "./TableWIthAction";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import {
  useGetAllBannerQuery,
  useUploadBannerMutation,
} from "../../Features/Api/exclusiveApi";
import { useForm } from "react-hook-form";
import { SuccessToast } from "../../utils/Toastify";

const Banner = () => {
  // todo: modal thing start
  const [open, setOpen] = React.useState(false);
  const [tempBannerData, settempBannerData] = useState({});
  const handleOpen = (item) => {
    settempBannerData(item);
    setOpen(!open);
  };
  // todo: modal thing end
  const [uploadBanner, { isLoading, isError }] = useUploadBannerMutation();
  const {
    data: bannerData,
    isLoading: isGettingBannersLoading,
    isError: getBannersError,
    refetch,
  } = useGetAllBannerQuery();

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
  // handle Dialoge form
  const handleUpdatedbanner = async (data) => {
    console.log("Updated banner data:", data); // Check the data passed from the form
    try {
      const formData = new FormData();
      formData.append("image", data?.image[0]);
      formData.append("name", data?.name);
      const response = await uploadBanner(formData);

      // Log the response to verify the backend call
      console.log("Upload response:", response);

      if (response?.data) {
        SuccessToast("Banner uploaded successfully");
        // Close the dialog after successful update
        setOpen(false); // Close dialog on success
        refetch(); // Refetch the banner data to update the list
      } else {
        console.log("No data in response");
      }
    } catch (error) {
      console.log("Error from banner.jsx upload banner:", error);
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
          />
        </div>
        <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
          <DialogHeader className="relative block">
            <Typography variant="h4" color="blue-gray">
              Manage Banner
            </Typography>
          </DialogHeader>
          <DialogBody className="space-y-4 pb-2">
            <form
              onSubmit={handleSubmitBanner(handleUpdatedbanner)}
              id="bannerForm"
            >
              <Input
                label="Banner title"
                defaultValue={tempBannerData.name}
                {...registerBanner("name", {
                  required: true,
                  maxLength: 25,
                })}
              />
              {errorsBanner.name && (
                <p className="text-red-400 pt-2">Banner name is required.</p>
              )}
              <div className="pt-5">
                <div className="w-full relative">
                  {/* Image with relative position */}
                  <img
                    src={tempBannerData.image}
                    alt={tempBannerData.image}
                    className="w-full h-auto object-cover"
                  />

                  {/* Fileinput positioned absolutely on top of the image */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <Fileinput
                      setValue={setValueBanner}
                      tempBannerData={tempBannerData}
                      register={registerBanner}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <DialogFooter>
                  <div className="flex gap-x-5">
                    <Button variant="filled" onClick={handleOpen} color="red">
                      Cancel
                    </Button>
                    <Button onClick={handleOpen} type="submit">
                      Update
                    </Button>
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
