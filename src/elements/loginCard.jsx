import React, { useEffect, useState } from "react";
import FBicon from "../svgs/fbIcon.jsx";
import AppleIcon from "../svgs/appleIcon.jsx";
import GoogleIcon from "../svgs/GoogleIcon.jsx";
import Check from "../svgs/check.jsx";
import { Formik, useFormik } from "formik";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCancel,
  faCross,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { uselocalStore, useUserData } from "../store/store.js";
import RoleSwitch from "./roleSwitch.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as Yup from "yup";
import { validateEmail } from "../helper/Validate.js";

const LoginCard = ({ id, ref }) => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const { token, setToken, decodedData, userRole } = useUserData();
  const { setRole, userLoggingIn, setUserLogginIn } = uselocalStore();

  const BASEURL = "https://edurecx-backend-api-ugxdufb6ga-em.a.run.app";

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        close
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <FontAwesomeIcon icon={faCancel} />
      </IconButton>
    </React.Fragment>
  );

  const { toggleShowLoginPage, setLoginStatus, setAccountCard } =
    uselocalStore();

  const navigate = useNavigate();

  const closeAnimation = () => {
    gsap.to(".logincard", { scale: 0, duration: 0.3 });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      // Check if email is missing or not valid
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!validateEmail(values.email)) {
        errors.email = "Invalid email format";
      }

      // Check if password is missing or less than 8 characters
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      }
      setMsg(errors.email || errors.password);
      if (errors.email || errors.password) {
        handleClick();
      }
      return errors;
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      await axios
        .post(`${BASEURL}/api/login`, values)
        .then(async (res) => {
          const { token } = res.data;
          setToken(token);
          const { role } = decodedData(token);
          setRole(role);
          setLoginStatus();
          setUserLogginIn(true);
          navigate(`/${role ? "student" : "teacher"}`);
        })
        .catch((err) => {
          setMsg(err.response.data.msg);
          handleClick();
        });
    },
  });

  return (
    <div
      id={id}
      ref={ref}
      className="logincard w-[30%] min-w-[300px] z-[2] relative bg-transparent backdrop-blur-lg md:flex-0 shrink-0"
    >
      <div
        className="absolute top-0 right-5 text-white p-2 z-10  transition duration-150 hover:scale-150 hover:cursor-pointer"
        onClick={(e) => {
          closeAnimation();
          setTimeout(() => {
            setAccountCard(false);
          }, 300);
        }}
      >
        <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
      </div>
      <div className="relative text-white z-0 flex flex-col min-w-0 break-words  border-0 shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="p-3 text-center  border-b-0 rounded-t-2xl">
          <h5>Login with</h5>
        </div>
        <div className="flex flex-wrap gap-2 justify-center sm:px-6 xl:px-12">
          <div className="flex-0">
            <a className="inline-block w-full p-2 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent  rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
              <FBicon className={"transition duration-150 hover:scale-150"} />
            </a>
          </div>
          <div className=" flex-0">
            <a className="inline-block w-full p-2 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent  rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
              <AppleIcon
                className={"transition duration-150 hover:scale-150"}
              />
            </a>
          </div>
          <div className=" flex-0">
            <a className="inline-block w-full p-2 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent  rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
              <GoogleIcon
                className={"transition duration-150 hover:scale-150"}
              />
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 relative w-full max-w-full px-3  text-center shrink-0">
            <hr className=" text-slate-500   w-[30%] opacity-20" />
            <p className="z-20 inline  font-semibold leading-normal  text-sm text-slate-400">
              or
            </p>
            <hr className=" text-slate-500 w-[30%] opacity-20" />
          </div>
        </div>
        <div className="flex-auto p-6">
          <form
            role="form"
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex flex-col  gap-2 items-center w-full mb-4">
              <div className="relative">
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  className="input"
                  placeholder="email"
                />
                <span className="input_border"></span>
              </div>
              <div className="relative">
                <input
                  {...formik.getFieldProps("password")}
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <span className="input_border"></span>
              </div>
            </div>

            <div className="text-center">
              <button
                className="inline-block bg-[#8C6A5D] px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-[105%] hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                type="submit"
              >
                Sign in
              </button>
            </div>
            <div>
              register your account{" "}
              <span
                onClick={() => {
                  toggleShowLoginPage();
                }}
                className="text-blue-400 hover:text-blue-700 cursor-pointer transition-all duration-150"
              >
                Signup
              </span>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={700}
        onClose={handleClose}
        message={msg}
        action={action}
      />
    </div>
  );
};

export default LoginCard;
