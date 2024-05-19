import React, { useEffect, useState } from "react";
import SidebarList from "../elements/sidebarList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCirclePlus,
  faCopy,
  faPlus,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { useClassData, uselocalStore } from "../store/store";
import CopyToClipboard from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { addClassCode } from "../helper/helper";

function getTimeDifferenceString(time) {
  const currentTime = new Date();
  const givenTime = new Date(time);

  const timeDifference = currentTime - givenTime;

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
  const minutesDifference = Math.floor(timeDifference / (1000 * 60)) % 60;

  if (daysDifference >= 1) {
    return `${daysDifference} day${daysDifference !== 1 ? "s" : ""} ago`;
  } else if (hoursDifference >= 1) {
    return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
  } else {
    return `${minutesDifference} minute${minutesDifference !== 1 ? "s" : ""} ago`;
  }
}

const generateClassCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

const TeacherClassListPage = () => {
  const { classlist, classData } = useClassData();
  const { showSidebar } = uselocalStore();
  const [copied, setCopied] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const { classCode, setClassCode, setClassCodeShare } = useClassData();

  const navigate = useNavigate();

  const [generatedCode, setGeneratedCode] = useState({});

  const handleGenerateCode = (classID) => {
    const code = generateClassCode();
    setGeneratedCode((prevState) => ({
      ...prevState,
      [classID]: code,
    }));
    setClassCode(classID, code);
  };

  const handleShareCode = (classID) => {
    const code = generatedCode[classID];
    addClassCode(classID, code);
    setClassCodeShare(classID);
  };

  return (
    <div
      className={`classlist relative  grid grid-cols-1 sm:grid-cols-2 ${showSidebar ? "grid-cols-3" : "xl:grid-cols-4"} md:grid-cols-3  2xl::grid-cols-5 gap-[2rem] text-white p-[2rem]`}
    >
      {classlist.map((cls) => {
        const classID = cls.classID;
        const declaredCode = classCode[classID]["code"];
        let code;

        return (
          <motion.div
            key={classID}
            className={`h-[40vh] flex flex-col justify-between lg:h-[300px] md:w-[300px] 2xl:w-[400px] bc rounded-2xl py-2 px-4 hover:-translate-y-1 cursor-pointer`}
            onClick={() => {
              setSelectedId(classID);
            }}
          >
            <div className="flex flex-col gap-2 ">
              <div
                className="text-lg md:text-md lg:text-2xl font-bold "
                onClick={() => {
                  navigate(`/teachers/classes/${classID}`);
                }}
              >
                <span className="transition-all duration-200 border-b-2 border-transparent py-1 hover:border-white h-full">
                  {cls.title}
                </span>
              </div>
              <div className="desc">{cls.desc}</div>
              <div className="time text-gray-400">
                {getTimeDifferenceString(cls.createdAt)}
              </div>
            </div>
            <div className=" classCode h-[10%] w-[100%] flex justify-between items-center">
              <div className=" w-[80%] h-[100%]">
                <span className="text-sm text-teal-300 p-[0.5rem] ">
                  {declaredCode[0] || ""}
                </span>
                <span>-</span>
                <span className="text-sm text-teal-300 p-[0.5rem] ">
                  {declaredCode[1] || ""}
                </span>
                <span>-</span>
                <span className="text-sm text-teal-300 p-[0.5rem] ">
                  {declaredCode[2] || ""}
                </span>
                <span>-</span>
                <span className="text-sm text-teal-300 p-[0.5rem] ">
                  {declaredCode[3] || ""}
                </span>
                <span>-</span>
                <span className="text-sm text-teal-300 p-[0.5rem] ">
                  {declaredCode[4] || ""}
                </span>
                <span>-</span>
                <span className="text-sm text-teal-300 p-[0.5rem] ">
                  {declaredCode[5] || ""}
                </span>
              </div>
              {classCode[classID]["generate"] && (
                <div className="flex gap-4 h-[100%]">
                  <CopyToClipboard
                    text={classCode[classID]["code"]}
                    onCopy={() => setCopied(true)}
                  >
                    <FontAwesomeIcon
                      id="icon"
                      icon={faCopy}
                      size="lg"
                      className="cursor-pointer hover:scale-110 transition-all duration-300"
                    />
                  </CopyToClipboard>
                  {classCode[classID]["shared"] ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon
                      id="icon"
                      icon={faShare}
                      className="cursor-pointer hover:scale-105 transition-all duration-300"
                      onClick={() => {
                        handleShareCode(classID);
                      }}
                    />
                  )}
                </div>
              )}
              {!classCode[classID]["generate"] && (
                <FontAwesomeIcon
                  id="icon"
                  className="cursor-pointer hover:scale-105 transition-all duration-300"
                  icon={faCirclePlus}
                  onClick={() => {
                    handleGenerateCode(classID);
                  }}
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TeacherClassListPage;
