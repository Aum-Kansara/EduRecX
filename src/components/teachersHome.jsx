import React, { useEffect, useState } from "react";
import SidebarList from "../elements/sidebarList";
import AddClassBox from "../elements/addClassbox";
import { uselocalStore } from "../store/store";
import LoginRole from "../elements/LoginRole";
import TeacherClassListPage from "../elements/TeacherClassListPage";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const TeacherHome = () => {
  const sendMsg = (msg) => {
    socket.emit("sendMsg", {
      message: msg,
    });
  };

  const {
    addClassOpen,
    setAddClassOpen,
    userLoggingIn,
    setUserLogginIn,
    role,
    addTopicOpen,
  } = uselocalStore();


  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserLogginIn(false);
    }, 5000);

    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [role]); // Empty dependency array ensures this effect runs only once




  if (userLoggingIn) return <LoginRole />;

  return (
    <div className="relative ">
      {addClassOpen && <AddClassBox />}
      <div
        className={`z-10  h-screen w-screen  py-[10vh] transition-all duration-300 ${addClassOpen || addTopicOpen ? "brightness-[30%]" : ""} bg-HomeBG-main `}
      >
        <div className="flex h-full gap-[2rem]">
          <SidebarList />
          <div
            className={`content absolute md:static w-[100vw] md:w-[100%] bg-HomeBG-content  h-[90vh]  overflow-auto`}
          >
            <TeacherClassListPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
