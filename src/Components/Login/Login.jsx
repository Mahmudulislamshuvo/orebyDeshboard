import React, { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../Features/Api/axiosInstance";
import { SuccessToast } from "../../utils/Toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // handle form submission
  const handleLogin = async (data) => {
    try {
      console.log(data);
      const loginData = await axiosInstance.post(
        "/admin/login",
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (loginData.statusText === "OK") {
        SuccessToast(loginData.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("error from Deshboard Login", error);
    }
  };
  return (
    <div>
      <div className="grid text-center h-screen items-center p-8">
        <div>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            Admin Login
          </Typography>
          <form
            className="mx-auto max-w-[24rem] text-left"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="mb-6">
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Username
                </Typography>
              </label>
              <Input
                id="username"
                color="gray"
                size="lg"
                type="text"
                name="username"
                placeholder="User name"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
                {...register("username", {
                  required: true,
                })}
              />
              {errors.username && (
                <p className="text-red-400 pt-2">Username required.</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Password
                </Typography>
              </label>
              <Input
                size="lg"
                placeholder="********"
                labelProps={{
                  className: "hidden",
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                type={passwordShown ? "text" : "password"}
                icon={
                  <i onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </i>
                }
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && (
                <p className="text-red-400 pt-2">Password required.</p>
              )}
            </div>
            <Button
              color="gray"
              size="lg"
              className="mt-6"
              fullWidth
              type="sybmit"
            >
              sign in
            </Button>
            {/* Google Login */}
            {/* <Button
              variant="outlined"
              size="lg"
              className="mt-6 flex h-12 items-center justify-center gap-2"
              fullWidth
            >
              <img
                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                alt="google"
                className="h-6 w-6"
              />
              sign in with google
            </Button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
