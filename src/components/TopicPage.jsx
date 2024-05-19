import {
  faAngleUp,
  faArrowUp,
  faBars,
  faCode,
  faHamburger,
  faPlus,
  faSchool,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, List, fabClasses } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getLectures } from "../helper/helper";
import { uselocalStore } from "../store/store";
import ReactPlayer from "react-player/youtube";
import Quiz from "../elements/Quiz";
import axios from "axios";
import Transcript from "../elements/Transcript";
import Resources from "../elements/Resources";
import AddLectureBox from "../elements/addLectureBox";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AddQuizBox from "../elements/addQuizBox";
import QuizQuestions from "../elements/QuizQuestions";
import DragDrop from "../elements/DragDrop";

const TopicPage = () => {
  const [Lectures, setLectures] = useState([]);

  const quizContainer = useRef();

  const {
    setPopupMsg,
    setPopupOpen,
    QuizOpen,
    setQuizOpen,
    ResourcesOpen,
    TranscriptOpen,
    setResourcesOpen,
    setTranscriptOpen,
    role,
    addLectureOpen,
    setAddLectureOpen,
    setAddQuizBoxOpen,
    addQuizBoxOpen,
    setAddResources,
    addResourcesBox,
    topicPrompt,
    setTopicPrompt,
    lecPrompt,
    setLecPrompt,
  } = uselocalStore();

  const { topicID } = useParams();
  const [topicData, setTopicData] = useState({});
  const [watchedLectures, setWatchedLectures] = useState({});
  const [lectureCompleteStatus, setLecturesCompleteStatus] = useState(
    Lectures.length * 0.99
  );
  const [quizQuestion, setQuizQuestion] = useState(false);
  const [currentLec, setCurrentLec] = useState(Lectures[0]);
  const [tooltipon, setTooltipon] = useState(false);
  const [currLecT, setCurrLecT] = useState({});

  useEffect(() => {
    const getdata = async () => {
      const { data } = await getLectures(topicID);
      await setTopicData(data.data);

      await setLectures(data.data.lectures);
      let lecs = [];
      let lecdata = data.data.lectures;
      lecdata.map((lec) => {
        lecs.push(lec.title);
      });
      setLecPrompt(lecs);
    };
    getdata();
  }, []);

  useEffect(() => {
    setCurrentLec(Lectures[0]);
  }, [Lectures]);
  useEffect(() => {
    console.log(topicData);
    setTopicPrompt({ title: topicData.title, desc: topicData.description });
  }, [topicData]);

  useGSAP(() => {
    gsap.fromTo("#currentLecT", { x: 5000 }, { x: 0, duration: 0.2 });
  }, [currLecT]);

  useGSAP(
    () => {
      gsap.fromTo("#quizCont", { scale: 0 }, { scale: 1, duration: 0.2 });
    },
    { dependencies: [addQuizBoxOpen], scope: quizContainer }
  );

  useEffect(() => {
    if (!addQuizBoxOpen) {
      gsap.to("#quizCont", { scale: 0, duration: 0.3 });
    }
  }, [setAddQuizBoxOpen]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        // Update state when the "Escape" key is pressed
        setCurrLecT({});

        setAddQuizBoxOpen(false);
        setQuizQuestion(false);
        setAddResources(false);
      }
    };

    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // useEffect(() => {
  //   if (lectureCompleteStatus >= 0.99 * Lectures.length) {
  //     setPopupMsg(lectureCompleteStatus, "  Lectures completed successfully");
  //   } else {
  //     setPopupMsg(lectureCompleteStatus, "Lectures completed!!!");
  //   }
  //   setPopupOpen(true);
  // }, [lectureCompleteStatus]);

  useEffect(() => {
    const totalLectures = Lectures.length;
    const wlLen = Object.keys(watchedLectures).length;

    if (wlLen > 0) {
      let completedLectures = 0;

      for (const lectureId in watchedLectures) {
        const fractionWatched = watchedLectures[lectureId];

        if (fractionWatched === 1) {
          completedLectures += 1; // If the lecture is fully watched, count it as completed
        } else {
          completedLectures += fractionWatched; // Add the fraction watched to the total completed percentage
        }
      }

      const percentageComplete = (completedLectures / totalLectures) * 100;
      setLecturesCompleteStatus(
        Math.max(percentageComplete, lectureCompleteStatus)
      );
    }
  }, [watchedLectures]);

  const ProgressBar = ({ percentageComplete }) => {
    return (
      <div className="w-[95%] m-auto overflow-hidden h-1 -translate-y-1 mb-4 text-xs flex rounded bg-blue-200">
        <div
          style={{ width: `${percentageComplete}%` }}
          className={` none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500`}
        ></div>
      </div>
    );
  };

  const LectureProgress = ({ percentageComplete }) => {
    return (
      <div className="w-full">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-sm font-semibold  inline-block py-1 px-2 uppercase rounded-full text-white-600 bg-gray-800">
                Lecture Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {Math.round(percentageComplete)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${percentageComplete}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const LectureCard = ({ lecture }) => {
    const [percentageComplete, setPercentageComplete] = useState(0);

    useEffect(() => {
      const calculatePercentageComplete = () => {
        if (watchedLectures[lecture._id]) {
          const fractionWatched = watchedLectures[lecture._id];
          setPercentageComplete(fractionWatched * 100);
        } else {
          setPercentageComplete(0);
        }
      };

      calculatePercentageComplete();
    }, [watchedLectures, lecture._id]);

    // Function to truncate the description
    const truncateDescription = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "..."; // Truncate the text if it exceeds maxLength characters
      } else {
        return text; // Return the original text if it's within the maxLength
      }
    };

    return (
      <div>
        <div className=" relative flex items-center w-full rounded-2xl px-[1rem] overflow-hidden shadow-lg bg-slate-700">
          <img
            src={`https://img.youtube.com/vi/${lecture.lec_link.split("v=")[1]}/mqdefault.jpg`}
            alt="Video Thumbnail"
            className="w-full max-w-28 h-24 object-cover"
          />
          <div className="px-6 py-4">
            <div
              className="font-bold text-xl mb-2 "
              onClick={() => {
                console.log(watchedLectures[lecture._id]);
                setCurrentLec(lecture);
              }}
            >
              <span className="cursor-pointer border-b-2 border-transparent hover:border-white transition-all duration-200 pr-2">
                {lecture.title}
              </span>
            </div>
            <p className="text-gray-400 text-base">
              {truncateDescription(lecture.description, 150)}{" "}
              {/* Limiting description to 150 characters */}
            </p>
          </div>
        </div>
        <ProgressBar percentageComplete={percentageComplete} />
      </div>
    );
  };

  const LectureList = ({ lectures }) => {
    return (
      <div className="z-10 container mx-auto p-4">
        <div className="grid grid-cols-1 gap-4">
          {lectures.length &&
            lectures.map((lecture, index) => (
              <LectureCard key={index} lecture={lecture} />
            ))}
        </div>
      </div>
    );
  };

  if (role)
    return (
      <div className="relative">
        {QuizOpen && topicData.Quiz ? (
          <div className="absolute top-0 left-0 h-full w-full z-50 flex flex-col justify-center items-center ">
            <Quiz
              questionData={topicData.Quiz[0].questions}
              quizID={topicData.Quiz[0]._id}
            />
          </div>
        ) : (
          ""
        )}
        <div
          className={`h-screen w-screen flex py-[10vh] flex-col bg-HomeBG-main ${QuizOpen ? "brightness-[5%]" : "brightness-100"}`}
        >
          <div className="flex flex-col md:flex-row gap-4 h-full">
            <div className="overflow-scroll side h-[90vh] w-[40%] text-white px-2">
              <div className="sticky top-0 mb-5 py-2 bg-black z-20">
                <LectureProgress percentageComplete={lectureCompleteStatus} />
              </div>

              <div className="relative">
                {ResourcesOpen && (
                  <div className="absolute h-full w-full bg-gray-600 z-20">
                    <Resources />
                  </div>
                )}
                {TranscriptOpen && (
                  <div className="absolute h-full w-full bg-gray-600 z-20">
                    <Transcript />
                  </div>
                )}
                <LectureList lectures={Lectures} />
              </div>
            </div>
            <div className="content flex flex-col gap-2 items-center  h-[90vh] w-[60%] overflow-auto p-4">
              <div className="h-[60%] w-[100%] bg-gray-700 p-[1rem] rounded-xl">
                <ReactPlayer
                  url={currentLec?.lec_link}
                  playing
                  controls={true}
                  width={"100%"}
                  height={"100%"}
                  config={{
                    youtube: {
                      playerVars: {
                        start:
                          Math.floor(
                            (watchedLectures[currentLec?._id] || 0) * 100
                          ) + "%", // Set the start time to the fraction where it was last stopped
                      },
                    },
                  }}
                  onProgress={(e) => {
                    setWatchedLectures((prev) => ({
                      ...prev,
                      [currentLec._id]: e.played,
                    }));
                  }}
                />
              </div>
              <div className="w-full relative flex flex-col gap-2 min-h-[40%] bg-gray-700 p-[1rem] rounded-xl">
                <h1 className="text-white text-3xl ">{currentLec?.title}</h1>
                <h4 className="text-gray-400">{currentLec?.description}</h4>
                <div
                  className="self-center absolute bottom-0 p-2 cursor-pointer hover:-translate-y-2 transition-all duration-300  bg-white"
                  style={{
                    borderRadius: "150px 150px 0 0",
                  }}
                  onMouseEnter={() => {
                    setTooltipon(true);
                  }}
                  onMouseLeave={() => {
                    setTooltipon(false);
                  }}
                >
                  <div className="h-full w-full">
                    {tooltipon && (
                      <div className="flex gap-2  py-2 absolute left-1/2 transform -translate-x-1/2 bottom-full ">
                        <button
                          className="text-white px-4 py-2 bg-teal-700  rounded-2xl transition-all duration-200 hover:bg-teal-900"
                          onClick={async (e) => {
                            e.preventDefault();
                            setTranscriptOpen(false);
                            setResourcesOpen(true);
                          }}
                        >
                          Resources
                        </button>
                        <button
                          className="text-white px-4 py-2 bg-teal-700  rounded-2xl transition-all duration-200 hover:bg-teal-900"
                          onClick={async (e) => {
                            e.preventDefault();
                            setResourcesOpen(false);
                            await setTranscriptOpen(true);
                          }}
                        >
                          Transcript
                        </button>
                      </div>
                    )}
                  </div>
                  <FontAwesomeIcon icon={faAngleUp} />
                </div>
                <div className="absolute bottom-2 flex gap-4">
                  <button
                    className="text-white px-4 py-2 bg-blue-600  rounded-2xl transition-all duration-200 hover:bg-blue-700"
                    // disabled={lectureCompleteStatus !== 100}
                    onClick={() => {
                      setQuizOpen(true);
                    }}
                  >
                    Attempt quiz
                  </button>
                  <button className="text-white px-4 py-2 bg-lime-700  rounded-2xl transition-all duration-200 hover:bg-lime-900">
                    Code <FontAwesomeIcon icon={faCode} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className={`relative `}>
      {addLectureOpen && (
        <div className="absolute z-50 top-0 left-0 flex flex-col h-screen w-screen justify-center items-center">
          <AddLectureBox />
        </div>
      )}
      {addQuizBoxOpen && (
        <div
          ref={quizContainer}
          className="absolute z-50 top-0 left-0 flex flex-col h-screen  w-screen justify-center items-center"
        >
          <div id="quizCont">
            <AddQuizBox lecID={currLecT._id} />
          </div>
        </div>
      )}
      {quizQuestion && topicData.Quiz ? (
        <div
          ref={quizContainer}
          className="absolute z-50 top-0 left-0 flex flex-col h-screen w-screen justify-center items-center"
        >
          <div id="quizCont" className=" w-[70%] h-[80%]  backdrop-blur-xl">
            <QuizQuestions questions={topicData?.Quiz[0].questions} />
            <button
              className="bg-blue-700  text-white py-2 px-4 rounded-3xl hover:bg-blue-900 my-8 duration-200"
              onClick={() => {
                setQuizQuestion(false);
                setAddQuizBoxOpen(true);
              }}
            >
              Replace
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {addResourcesBox && (
        <div
          ref={quizContainer}
          className="absolute z-50 top-0 left-0 flex flex-col h-screen w-screen justify-center items-center"
        >
          <div id="quizCont" className=" w-[70%] h-[50%]  backdrop-blur-xl">
            <DragDrop />
          </div>
        </div>
      )}
      <div
        className={`h-screen relativ py-[10vh] w-screen  flex flex-col items-center justify-center bg-HomeBG-main ${addLectureOpen || addQuizBoxOpen ? "brightness-[20%]" : "brightness-100"}`}
      >
        <div className="text-white flex gap-4   ">
          <button
            className="focus:outline-none  bg-blue-700 hover:bg-blue-900 transition-all duration-300 px-4 py-2 my-8 rounded-2xl cursor-pointer"
            onClick={() => {
              setAddLectureOpen(true);
            }}
          >
            Add Lecture <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className="bg-blue-700 py-2 px-4 rounded-3xl hover:bg-blue-900 my-8 duration-200"
            onClick={() => {
              console.log(topicData);
              if (topicData.Quiz) {
                setQuizQuestion(true);
              } else {
                setAddQuizBoxOpen(true);
              }
            }}
          >
            {topicData.Quiz ? "Show Quiz" : "Add Quiz"}
          </button>
        </div>

        <div className="grid grid-cols-1 border-x-2 border-transparent transition-all duration-200 hover:border-white px-5  h-[80%] overflow-auto md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {Lectures.map((lecture) => (
            <div
              key={lecture._id}
              className="flex flex-col justify-between bg-gray-500 rounded-lg shadow-md overflow-hidden h-[300px] w-[200px]"
            >
              <div className="p-6">
                <h2
                  className="text-xl font-semibold mb-2 border-b-2 border-transparent hover:border-white transition-all duration-200 cursor-pointer"
                  onClick={() => {
                    setCurrLecT(lecture);
                  }}
                >
                  {lecture.title}
                </h2>
                <p className="text-gray-900 line-clamp-3">
                  {lecture.description}
                </p>
              </div>
              <div className="flex justify-center items-center bg-gray-800 py-3 ">
                <a
                  href={lecture.lec_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-600 font-semibold "
                >
                  Watch Lecture
                </a>
              </div>
            </div>
          ))}
        </div>
        {Object.keys(currLecT).length && (
          <div
            id="currentLecT"
            className="text-white absolute flex flex-col gap-4 -right-5 bc h-auto w-[20%] p-2 pr-5 rounded-2xl"
          >
            <div className="text-3xl">{currLecT.title}</div>
            <div className="text-md">{currLecT.description}</div>
            <div
              className="text-blue-400 hover:text-blue-600 hover:underline cursor-pointer transition-all duration-200  "
              onClick={() => {
                window.open(currLecT.lec_link);
              }}
            >
              {currLecT.lec_link}
            </div>
            {currLecT.Quiz.length ? (
              <div
                className=" bg-green-500 w-1/2 text-center hover:scale-105 transition-all duration-200 cursor-pointer"
                onClick={() => {
                  setQuizQuestion(true);
                  console.log(currLecT.Quiz);
                }}
              >
                Quiz
              </div>
            ) : (
              ""
            )}

            <button
              className="bg-blue-500 py-2 px-4 rounded-3xl hover:bg-blue-800 translate-x-0 duration-200"
              onClick={() => {
                setAddResources(true);
              }}
            >
              Add Resources
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
