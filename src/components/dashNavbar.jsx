import {
  faAngleRight,
  faBars,
  faPlus,
  faRightFromBracket,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useClassData, useTopicData, uselocalStore } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import MuiDialogBox from "../elements/MuiDialogBox";

const DahsNavbar = () => {
  const { setLoginStatus, showSidebar, setShowSidebar, toggleSidebar } =
    uselocalStore();

  const { classID, topicID } = useParams();
  const navigate = useNavigate();
  const { classData } = useClassData();
  const { topicData } = useTopicData();
  const [activeClass, setActiveClass] = useState();

  const {
    addClassOpen,
    setAddClassOpen,
    role,
    setJoinClassOpen,
    setAddTopicOpen,
    setAddTopicSubId,
    setQuizOpen,
    setTranscriptOpen,
    setResourcesOpen,
  } = uselocalStore();
  const toggleaddClassOpen = () => {
    setAddClassOpen(!addClassOpen);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        // Update state when the "Escape" key is pressed
        setAddClassOpen(false);
        setJoinClassOpen(false);
        setAddTopicOpen(false);
        setAddTopicSubId(null);
        setQuizOpen(false);
        setTranscriptOpen(false);
        setResourcesOpen(false);
      }
    };

    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    setActiveClass(classData.title);
  }, [classData]);

  return (
    // <div></div>
    <div className="flex  absolute  w-full justify-between z-30 items-center p-4 h-[10vh] ">
      <div className="flex  items-center gap-4">
        <FontAwesomeIcon
          icon={faBars}
          size="lg"
          className="text-gray-400 hover:scale-[110%] cursor-pointer"
          onClick={() => {
            console.log(showSidebar);
            toggleSidebar();
          }}
        />
        <span className="flex gap-2 items-center  ">
          <FontAwesomeIcon
            icon={faSchool}
            size="lg"
            className="text-gray-400 hover:text-white transition-all duration-300 cursor-pointer"
            onClick={() => {
              role ? navigate("/student") : navigate("/Teacher");
            }}
          />
          <p
            className="text-gray-400 hidden md:flex  font-mono  self-stretch  items-center  font-bold  tracking-wider transition-all duration-150 hover:text-gray-300 cursor-pointer"
            onClick={() => {
              role ? navigate("/student") : navigate("/Teacher");
            }}
          >
            Classroom
          </p>
        </span>
        {(classID || topicID) && (
          <p className="flex  gap-3 items-center text-white resHeadText  ">
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <span
              className="bb-t"
              onClick={() => {
                navigate(
                  `${role ? "students" : "teachers"}/classes/${classData._id}`
                );
              }}
            >
              {activeClass}
            </span>
          </p>
        )}
        {topicID && (
          <p className=" gap-3 items-center text-white resHeadText md:flex hidden ">
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <span className="text-gray-500 ">{topicData.title}</span>
          </p>
        )}
      </div>
      <div className=" flex items-center gap-4 px-4">
        {!role && (
          <div className="title h-[10%] flex py-2 px-4 justify-end ">
            <div
              className="bg-blue-300 flex gap-2 items-center px-4 py-2 rounded-lg transition-all duration-150 hover:bg-blue-500 cursor-pointer"
              onClick={() => {
                toggleaddClassOpen();
              }}
            >
              create class
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        )}
        {role && (
          <div className="title overflow-visible h-[10%] flex py-2 px-4 justify-end relative">
            <MuiDialogBox />
          </div>
        )}
        <Avatar />
        <FontAwesomeIcon
          onClick={() => {
            localStorage.removeItem("token");
            setLoginStatus();
            navigate("/");
          }}
          icon={faRightFromBracket}
          className="h-[1.5rem] w-[1.5rem] text-white transition-all duration-300 hover:scale-110 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DahsNavbar;
