import {
  faBars,
  faHamburger,
  faRightFromBracket,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, fabClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import SidebarList from "../elements/sidebarList";
import VideosList from "../elements/VideoList";
import { useUserData, uselocalStore } from "../store/store";
import LoginRole from "../elements/LoginRole";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import msgTune from "../assets/notification.mp3";
import Survey from "./Survey";

const socket = io.connect("http://localhost:4000");

const StudentHome = () => {
  const [msg, setMsg] = useState();

  useEffect(() => {
    socket.on("receiveMsg", (data) => {
      console.log(data);
      setMsg(data.message);
    });

    socket.on("studentAdded", (data) => {
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    if (msg) {
      const sound = new Audio(msgTune);
      sound.play();
      toast(msg);

      setMsg("");
    }
  }, [msg]);

  const {
    showSidebar,
    setShowSidebar,
    toggleSidebar,
    userLoggingIn,
    setUserLogginIn,
    joinClassOpen,
    surveyGiven,
    setSurveyGiven,
  } = uselocalStore();
  const { decodedData } = useUserData();
  useEffect(() => {
    setSurveyGiven(decodedData(localStorage.getItem("token")));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserLogginIn(false);
    }, 5000);

    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []); // Empty dependency array ensures this effect runs only once

  // return <Survey />;
  if (!surveyGiven) return <Survey />;

  if (userLoggingIn) return <LoginRole />;
  return (
    <div
      className={`h-screen w-screen py-[10vh]  bg-HomeBG-main transition-all duration-300 ${joinClassOpen ? "brightness-[20%]" : "brightness-100"} `}
    >
      <div className="flex h-full gap-[2rem]">
        <SidebarList />
        <div
          className={`content h-[90vh] bg-HomeBG-content absolute md:static w-[100vw] md:w-[100%] overflow-auto rounded-2xl`}
        >
          <VideosList />
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
