import React, { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import router from "next/router";
import Head from "next/head.js";
import styles from "../../styles/form.module.css";
import Button from "../../components/UI/Button/Button";
import EventLogin from "../../components/eventLogin/EventLogin";
import Image from "next/image";
import ForgotLogo from "../../public/FutureForge2.jpg";
import Logo from "../../public/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Loader from "../../components/UI/Loader";

const ResetPassword = () => {
  // initial state
  const initialState = {
    newPassword: "",
    confirmPassword: "",
  };

  // states
  const { entityType, resetToken } = router.query;
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { newPassword, confirmPassword } = formData;

  // onChange function
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onsubmit function
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoader(true);
      const data = {
        resetToken: resetToken,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resetPassword?entityType=${entityType}`,
        data,
      );
      setLoader(false);
      toast.success(response.data.message);
      // redirect to login page after successful passwp=ord reset
      toast.info("Redirecting to login page");
      setTimeout(() => {
        router.push(`/auth/login?entityType=${entityType}`);
      }, 5000);
    } catch (error) {
      setLoader(false);
      console.log({ error });
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Internal server error");
      }
      console.error("Error in reseting password ", error);
    }
  };

  // toggle visisbilty of password and confirm password inputs
  const [showPassword, setVisibility] = useState(false);
  const togglePasswordisibility = () => {
    setVisibility((prevShowPassword) => !prevShowPassword);
  };

  const [viewPassword, setVisible] = useState(false);
  const togglePassword = () => {
    setVisible((prevViewPassword) => !prevViewPassword);
  };

  return (
    <>
      <Head>
        <title>FutureForge | Reset Password</title>
      </Head>
      <div className="tw-flex tw-text-base-500  tw-items-center tw-pt-2">
        <Image className="" src={Logo} alt="icon" width={50} height={50} />
        <div className="tw-font-inter tw-font-bold tw-text-xl ">FutureForge</div>
      </div>
      <main className="tw-flex tw-justify-center tw-text-base-500 tw-items-center">
        <form onSubmit={handleResetPassword} className={styles.resetForm}>
          <div className="">
            <div className="tw-pb-12 tw-font-inter tw-font-semibold tw-text-5xl tw-leading-relaxed">
              Set your password
            </div>
            <div className="tw-pb-7 tw-font-inter tw-text-base-400 tw-font-medium tw-text-base">
              Please enter a new password for your FutureForge account.
            </div>
            <div className="">
              <label
                htmlFor="password"
                className=" tw-font-inter tw-font-medium tw-text-base"
              >
                New Password
              </label>
              <br />
              <input
                type={viewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Password"
                required
                value={newPassword}
                onChange={onChange}
                className="tw-rounded-md tw-border-2 tw-bg-base-300 tw-text-base-500 tw-border-base-300 tw-px-3 tw-py-2 tw-pr-20 tw-w-full"
              />
              {viewPassword ? (
                <FiEye
                  className="tw-absolute tw-right-3 tw-top-1/3 tw-text-gray-500 tw-cursor-pointer"
                  onClick={togglePassword}
                />
              ) : (
                <FiEyeOff
                  className="tw-absolute tw-right-3 tw-top-1/3 tw-text-gray-500 tw-cursor-pointer"
                  onClick={togglePassword}
                />
              )}
            </div>
            <div className="tw-pt-5">
              <label
                htmlFor="confirmPassword"
                className=" tw-font-inter tw-font-medium tw-text-base"
              >
                Confirm Password
              </label>
              <br />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Password"
                required
                value={confirmPassword}
                onChange={onChange}
                className="tw-rounded-md  tw-bg-base-300 tw-text-base-500 tw-border-2 tw-border-base-300 tw-px-3 tw-py-2 tw-pr-20 tw-w-full"
              />
              {viewPassword ? (
                <FiEye
                  className="tw-absolute tw-right-3 tw-top-1/3 tw-text-gray-500 tw-cursor-pointer"
                  onClick={togglePassword}
                />
              ) : (
                <FiEyeOff
                  className="tw-absolute tw-right-3 tw-top-1/3 tw-text-gray-500 tw-cursor-pointer"
                  onClick={togglePassword}
                />
              )}
            </div>
            {!loader ? (
              <div className="tw-flex tw-justify-center my-3 tw-h-11">
                <Button
                  className=" tw-w-[450px]"
                  onClick={handleResetPassword}
                  text="Set Password"
                />
              </div>
            ) : (
              <Loader width="25px" className="my-3" />
            )}
          </div>

          <ToastContainer />
          <hr />
          <div className="tw-pt-5 tw-font-inter tw-font-bold tw-text-xl tw-text-[#4E9F3D]">
            <a href="#">Contact Us</a>
          </div>
        </form>
        <div className="logout-login">
          <div className="image-container">
            <Image src={ForgotLogo} alt="logout" width={700} height={700} />
          </div>
        </div>
      </main>

      <style jsx>{`
        /* CSS for hiding the image on small screens */
        @media (max-width: 1450px) {
          .image-container {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default ResetPassword;
