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
  const [tempBannerData, settempBannerData] = useState({});

  // todo: modal thing start
  const [open, setOpen] = React.useState(false);
  const handleOpen = (item) => {
    settempBannerData(item);
    setOpen(true);
  };
  // todo: modal thing end
  const [uploadBanner, { isLoading, isError }] = useUploadBannerMutation();
  const {
    data: bannerData,
    isLoading: isGettingBannersLoading,
    isError: getBannersError,
  } = useGetAllBannerQuery();

  // React form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handlebanner = async (data) => {
    console.log(data);
    return;
    try {
      const formData = new FormData();
      formData.append("image", data?.image[0]);
      formData.append("name", data?.name);
      const response = await uploadBanner(formData);
      if (response?.data) {
        SuccessToast("Banner uploaded succesfully");
      }
    } catch (error) {
      console.log("error from banner.jsx upload banner", error);
    }
  };

  const handleDialogSubmit = (e) => {
    e.preventDefault();
    handlebanner();
  };

  return (
    <>
      <div className="pt-5">
        <form onSubmit={handleDialogSubmit} id="mainForm">
          <Input
            label="Banner title"
            {...register("name", { required: true, maxLength: 25 })}
          />
          {errors.name && (
            <p className="text-red-400 pt-2">Banner name is required.</p>
          )}
          <div className="pt-5">
            <Fileinput setValue={setValue} />
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
            <form onSubmit={handleSubmit(handlebanner)} id="bannerForm">
              <Input
                label="Banner title"
                {...register("EditName", { required: true, maxLength: 25 })}
                defaultValue={tempBannerData.name}
              />
              {errors.name && (
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
                      setValue={setValue}
                      tempBannerData={tempBannerData}
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
                    <Button onClick={handleDialogSubmit} type="submit">
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
