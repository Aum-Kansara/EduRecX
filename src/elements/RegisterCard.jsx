import React, { useEffect, useState } from "react";
import FBicon from "../svgs/fbIcon.jsx";
import AppleIcon from "../svgs/appleIcon.jsx";
import GoogleIcon from "../svgs/GoogleIcon.jsx";
import Check from "../svgs/check.jsx";
import { useFormik } from "formik";
import RoleSwitch from "./roleSwitch.jsx";
import { uselocalStore, useUserData } from "../store/store.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Snackbar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { validateEmail } from "../helper/Validate.js";
import { jwtDecode } from "jwt-decode";

const RegisterCard = ({ id, ref }) => {
  const { setShowLoginPage, role, setLoginStatus } = uselocalStore();
  const { token, setToken, decodedData, userRole } = useUserData();
  const [msg, setMsg] = useState();
  const BASEURL = "http://localhost:8080";

  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    formik.setValues({ ...formik.values, role: role });
  }, [role]);

  const navigate = useNavigate();

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male");

  const handleAgeChange = (e) => {
    setAge(parseInt(e.target.value));
    formik.setValues({ ...formik.values, age: e.target.value });
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    formik.setValues({ ...formik.values, gender: gender });
  }, [gender]);

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      role: role,
      password: "",
      age: "",
      gender: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.fname) {
        errors.fname = "Firstname is required";
      }
      if (!values.lname) {
        errors.fname = "Lastname is required";
      }

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
      setMsg(errors.fname || errors.lname || errors.email || errors.password);
      if (errors.email || errors.password) {
        handleClick();
      }
      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      await axios
        .post(`${BASEURL}/api/signup`, values)
        .then(async (res) => {
          if (res.status === 200) {
            const { token } = res.data;
            setToken(token);
            const { role } = decodedData(token);
            setLoginStatus();
            navigate(`/${role ? "student" : "teacher"}`);
          }
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
      className="w-[95vw] md:w-[80%] lg:w-[40%] min-w-[300px] z-[2]  rounded-2xl bg-transparent backdrop-blur-lg px-3 mx-auto mt-0 md:flex-0 shrink-0"
    >
      <div className="relative text-white z-0 flex flex-col py-4 gap-2 min-w-0 break-words  border-0 shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="text-center  border-b-0 rounded-t-2xl">
          <h5>Register with</h5>
        </div>
        <div className="flex flex-wrap gap-2 justify-center ">
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
            <hr className=" text-slate-500 w-[30%] opacity-20" />
            <p className="z-20 inline  font-semibold leading-normal  text-sm text-slate-400">
              or
            </p>
            <hr className=" text-slate-500 w-[30%] opacity-20" />
          </div>
        </div>
        <div className="flex-auto">
          <form
            className="flex flex-col items-center gap-2"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col  items-center gap-2  w-full  mb-4">
              <RoleSwitch />
              <div className="flex flex-wrap justify-between w-[80%] gap-2">
                <div className="relative ">
                  <input
                    {...formik.getFieldProps("fname")}
                    type="text"
                    className="input"
                    placeholder="Firstname"
                  />
                  <span className="input_border"></span>
                </div>
                <div className="relative">
                  <input
                    {...formik.getFieldProps("lname")}
                    type="text"
                    className="input"
                    placeholder="Lastname"
                  />
                  <span className="input_border"></span>
                </div>
              </div>

              <div className="relative w-[80%]">
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  className="input"
                  placeholder="Enter email"
                />
                <span className="input_border"></span>
              </div>
              <div className="relative w-[80%]">
                <input
                  {...formik.getFieldProps("password")}
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <span className="input_border"></span>
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block text-gray-400 font-semibold mb-2"
                >
                  Select Age:
                </label>
                <select
                  {...formik.getFieldProps("age")}
                  id="age"
                  name="age"
                  value={age}
                  onChange={handleAgeChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 input"
                  
                >
                  {[...Array(101)].map((_, index) => (
                    <option key={index} value={index} className="bg-black">
                      {index}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <span className="block text-gray-400 font-semibold mb-2">
                  Select Gender:
                </span>
                <div className="flex items-center">
                  <input
                    {...formik.getFieldProps("gender")}
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleGenderChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label htmlFor="male" className="ml-2 text-gray-400">
                    Male
                  </label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    {...formik.getFieldProps("gender")}
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleGenderChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label htmlFor="female" className="ml-2 text-gray-400">
                    Female
                  </label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    {...formik.getFieldProps("gender")}
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    checked={gender === "other"}
                    onChange={handleGenderChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label htmlFor="other" className="ml-2 text-gray-400">
                    Other
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-0.5 w-full flex  justify-center ">
              <Check />
            </div>

            <div className="text-center">
              <button
                className="inline-block bg-[#8C6A5D] px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-110 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                type="submit"
              >
                Sign up
              </button>
            </div>
            <p className="mt-4 mb-0 leading-normal text-sm">
              Already have an account?{" "}
              <span
                className="font-bold text-blue-500 hover:cursor-pointer hover:text-blue-300"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLoginPage(true);
                }}
              >
                Sign in
              </span>
            </p>
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

export default RegisterCard;
