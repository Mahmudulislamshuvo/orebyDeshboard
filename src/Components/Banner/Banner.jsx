import React from "react";
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
import SkeletonLoader from "../Skelitons/TableSkelitons";

const Banner = () => {
  // todo: modal thing start
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
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
    try {
      const formData = new FormData();
      formData.append("image", data?.image[0]);
      formData.append("name", data?.name);
      const response = await uploadBanner(formData);
      if (response?.data?.success) {
        SuccessToast("Banner uploaded succesfully");
      }
    } catch (error) {
      console.log("error from banner.jsx upload banner", error);
    }
  };

  return (
    <>
      <div className="pt-5">
        <form onSubmit={handleSubmit(handlebanner)} id="mainForm">
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
          <DialogHeader className="relative m-0 block">
            <Typography variant="h4" color="blue-gray">
              Manage Item
            </Typography>
            <Typography className="mt-1 font-normal text-gray-600">
              Keep your records up-to-date and organized.
            </Typography>
          </DialogHeader>
          <DialogBody className="space-y-4 pb-6">
            <Fileinput />
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
    </>
  );
};

export default Banner;
