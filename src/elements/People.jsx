import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { acceptRequest, cancelRequest, getPeople } from "../helper/helper";
import { Avatar } from "@mui/material";
import RequestAvatar from "./requestAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCancel,
  faCheck,
  faClose,
  faCross,
} from "@fortawesome/free-solid-svg-icons";
import { useUserData } from "../store/store";
import io from "socket.io-client";

import msgTune from "../assets/notification.mp3";

// const socket = io.connect("http://localhost:4000");

const People = () => {
  const { classID } = useParams();
  const [people, setPeople] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  const { decodedData } = useUserData();
  const [socket, setSocket] = useState(null);

  const { role } = decodedData(localStorage.getItem("token"));

  useEffect(() => {
    const newSocket = io.connect("http://localhost:4000");
    setSocket(newSocket);

    // Clean up the socket connection when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const sound = new Audio(msgTune);

    const handleRequestCreate = (data) => {
      setRequests((prev) => [...prev, data]);
      sound.play();
    };

    const handleRequestDeleted = (data) => {
      setRequests((prev) => prev.filter((req) => data._id !== req._id));
    };

    // Attach event listeners
    if (socket) {
      socket.on("requestCreate", handleRequestCreate);
      socket.on("requestDeleted", handleRequestDeleted);
      return () => {
        // Clean up event listeners when the component unmounts

        socket.off("requestCreate", handleRequestCreate);
        socket.off("requestDeleted", handleRequestDeleted);
      };
    }
  }, [socket]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { people, requests, names } = await getPeople(classID);
        await setPeople(names);
        setRequests(requests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [classID]);

  const peopleLen = useMemo(() => {
    return people.length;
  }, [people]);
  const reqLen = useMemo(() => {
    return requests.length;
  }, [requests]);

  return (
    <div className="flex h-full w-full px-4  text-white">
      {!peopleLen ? (
        <div className="flex flex-col justify-center h-full w-full text-4xl items-center text-white">
          "No one's here yet"
        </div>
      ) : (
        <ul className="w-full flex flex-col gap-4 p-4 items-center">
          <span>{peopleLen} students joined</span>
          {people.map((person) => {
            return (
              <li
                key={person.id}
                className="h-[10%] flex justify-between items-center bg-gray-900 w-full rounded-2xl py-2 px-4"
              >
                <div className="flex gap-2 items-center">
                  <Avatar />
                  <div>{person.fullname}</div>
                </div>
                {/* {!role && ( */}
                <div>
                  <button className="text-red-600 transition-all duration-200 px-4 py-2 rounded-2xl cursor-pointer hover:text-red-800">
                    remove
                  </button>
                </div>
                {/* )} */}
              </li>
            );
          })}
        </ul>
      )}
      {!role && (
        <div
          className={`absolute z-10 top-[10vh]  right-10 requests  transition-all  duration-200 flex  justify-center  ${showRequests ? "w-[20vw] h-auto items-center rounded-2xl border-[0.3px] border-gray-500 " : "  w-[4rem] h-[4rem] rounded-full"}   `}
          onMouseEnter={() => {
            setShowRequests(true);
          }}
          onMouseLeave={() => {
            setShowRequests(false);
          }}
        >
          {!showRequests && <RequestAvatar msgCount={requests.length} />}
          {showRequests && (
            <ul className="p-4  w-full h-full">
              {!reqLen ? (
                <li>"0 requests found"</li>
              ) : (
                requests.map((req) => {
                  return (
                    <li className="flex border-[0.1px] border-white p-2 justify-between  items-center rounded-xl bg-black">
                      {req.studentData["name"]}{" "}
                      <span className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="hover:scale-110 bg-green-400 p-1 rounded-md cursor-pointer transition-all duration-300"
                          onClick={async () => {
                            const { status } = await acceptRequest(
                              req._id,
                              classID,
                              req.studentID
                            );
                            if (status === 200) {
                              const { people, requests } =
                                await getPeople(classID);
                              setPeople(people);
                              setRequests(requests);
                            }
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faClose}
                          className="hover:scale-110 bg-red-400 p-1 rounded-md cursor-pointer transition-all duration-300"
                          onClick={() => {
                            cancelRequest(req._id, classID, req.studentID);
                          }}
                        />
                      </span>
                    </li>
                  );
                })
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default People;
