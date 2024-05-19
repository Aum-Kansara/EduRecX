import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { submitSurvey } from "../helper/helper";
import { useUserData, uselocalStore } from "../store/store";

const educationLevels = [
  "High School Diploma",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate or Professional Degree",
];

const fieldsOfStudy = [
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biomedical Engineering",
  "Mathematics",
  "Physics",
  "Biology",
  "Chemistry",
  "Business Administration",
  "Finance",
  "Marketing",
  "Psychology",
  "Sociology",
  "Education",
  "English Literature",
  "History",
  "Political Science",
  "Art",
  "Music",
];

const skills = [
  "Programming",
  "Web Development",
  "Mobile App Development",
  "Data Analysis",
  "Machine Learning",
  "Artificial Intelligence",
  "Cybersecurity",
  "Network Administration",
  "Database Management",
  "Cloud Computing",
  "DevOps",
  "UI/UX Design",
  "Project Management",
  "Communication",
  "Problem Solving",
  "Critical Thinking",
  "Time Management",
  "Leadership",
  "Teamwork",
];

const interests = [
  "Technology",
  "Science",
  "Engineering",
  "Mathematics",
  "Art",
  "Music",
  "Literature",
  "History",
  "Philosophy",
  "Sports",
  "Travel",
  "Cooking",
  "Gaming",
  "Fashion",
  "Fitness",
  "Health",
  "Environment",
];

const preferredTechnologies = [
  "Java",
  "Python",
  "JavaScript",
  "C#",
  "C++",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "HTML",
  "CSS",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Express.js",
  "Django",
  "Flask",
  "ASP.NET",
  "Unity",
  "Unreal Engine",
  "TensorFlow",
  "PyTorch",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud Platform",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
];

const professionalRoles = [
  "Full Stack Dev (FrontEnd, BackEnd)",
  "Software Developer",
  "Mobile App Dev",
  "Information Security Analyst",
  "System Architect",
  "AI EngineerComputer Hardware Engineer",
  "Game Developer",
  "Software Tester",
  "Cloud Engineer (DevOps)",
  "Data Scientist",
  "Computer Network Architect",
  "Database Administration",
  "System Design Engineer",
  "Deep Learning Engineer / AI Engineer",
  "LLM App Developer",
  "Open Source Developer",
];
const specializationSubjects = [
  "Java",
  "Python",
  "DotNet",
  "JavaScript",
  "Web Technology & Development",
  "Cloud Computing",
  "Game Development",
  "Big Data",
  "Cyber Security",
  "Robotics",
  "Blockchain",
  "IoT",
  "Quantum Computing",
  "VR",
  "Data Science",
  "Computer Networks",
  "DevOps",
  "Computer Vision",
  "Developer",
  "Machine Learning",
  "Cyber Security",
  "Cloud Computing",
];

const coreSubjects = [
  "Database",
  "Computer Architecture",
  "Operating Systems",
  "Software Engineering",
  "Computer Networks",
  "Data Structures & Algorithms",
  "AI",
  "Programming (Languages and Programming Basics, Login Building)",
  "Discrete Math",
  "Design (Algorithms, System, Database)",
  "C / C++",
  "OOPs",
  "Compiler",
];

const Survey = () => {
  const [currIndex, setCurrIndex] = useState(-1);

  const [selectedFields, setSelectedFields] = useState({
    coreSubjects: [],
    professionalRoles: [],
    specializationSubjects: [],
    educationLevels: [],
    fieldOfStudy: [],
    skills: [],
    interests: [],
    preferredTechnologies: [],
  });

  const { setSurveyGiven, surveyGiven } = uselocalStore();
  const { decodedData } = useUserData();
  const data = decodedData(localStorage.getItem("token"));
  const personalData = {
    user_id: data.roleID,
    age: data.age,
    gender: data.gender,
  };

  const PrintSurveyFilters = () => {
    if (currIndex === -1) {
      return (
        <div className="  flex justify-center items-center">
          <div className="max-w-lg p-8 rounded-lg shadow-md w-full">
            <h1 className="text-white text-3xl font-extrabold text-center mb-6">
              Welcome to Our LMS Recommendation Survey
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              We're excited to help you find the perfect learning management
              system (LMS) for your needs. By answering a few questions about
              your interests and preferences, we can tailor our recommendations
              just for you.
            </p>
            <p className="text-gray-300 text-lg mb-6">
              This survey will only take a few minutes of your time. Let's get
              started!
            </p>
            <button
              className="bg-blue-800 text-white px-6 py-3 rounded-md w-full"
              onClick={() => {
                setCurrIndex(0);
              }}
            >
              Start Survey
            </button>
          </div>
        </div>
      );
    }

    let roleType, rolename;
    if (currIndex === 0) {
      rolename = "coreSubjects";
      roleType = coreSubjects;
    } else if (currIndex === 1) {
      rolename = "professionalRoles";
      roleType = professionalRoles;
    } else if (currIndex === 2) {
      rolename = "specializationSubjects";
      roleType = specializationSubjects;
    } else if (currIndex === 3) {
      rolename = "skills";
      roleType = skills;
    } else if (currIndex === 4) {
      rolename = "preferredTechnologies";
      roleType = preferredTechnologies;
    } else if (currIndex === 5) {
      rolename = "interests";
      roleType = interests;
    } else if (currIndex === 6) {
      rolename = "educationLevels";
      roleType = educationLevels;
    } else if (currIndex === 7) {
      rolename = "fieldOfStudy";
      roleType = fieldsOfStudy;
    }

    return (
      <div className="text-white font px-4  w-full flex flex-col gap-4 ">
        <h1 className="text-2xl text-center">
          {currIndex === 0
            ? "Core Subjects"
            : currIndex === 1
              ? "Professional Roles"
              : currIndex === 2
                ? "Specialization Subjects"
                : currIndex === 3
                  ? "skills"
                  : currIndex === 4
                    ? "Preferred Technologies"
                    : currIndex === 5
                      ? "Interests"
                      : currIndex === 6
                        ? "Educational Levels"
                        : currIndex === 7
                          ? "Field of study"
                          : ""}
        </h1>
        <ul className={`flex flex-wrap gap-5 `}>
          {roleType.map((role) => {
            return (
              <li
                className={`text-black flex gap-2 cursor-pointer  font-bold px-4 py-2 rounded-xl  ${selectedFields[rolename].includes(role) ? "bg-green-700" : "bg-emerald-300 hover:bg-emerald-500 transition-all duration-200"}`}
                onClick={() => {
                  console.log(selectedFields);
                  console.log(rolename);
                  if (selectedFields[rolename].includes(role)) {
                    setSelectedFields((prev) => ({
                      ...prev,
                      [rolename]: prev[rolename].filter((rl) => rl !== role),
                    }));
                  } else {
                    setSelectedFields((prev) => ({
                      ...prev,
                      [rolename]: [...prev[rolename], role],
                    }));
                  }
                }}
              >
                {role}
                {selectedFields[rolename].includes(role) ? (
                  <span>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                ) : (
                  ""
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="absolute bg-black h-screen w-screen top-0 left-0 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-between gap-[5rem] overflow-x-auto-auto min-h-[60%] w-[40%] p-[2rem] rounded-2xl bg-gray-900">
        <PrintSurveyFilters />
        {currIndex !== -1 && (
          <div className="h-[10%] px-[2rem] flex items-center justify-between gap-3">
            <div>
              <button
                className={`font-extrabold text-lg px-4 py-2 text-black rounded-xl justify-self-end  transition-all duration-200 ${currIndex === 0 ? "cursor-not-allowed bg-gray-800" : "cursor-pointer bg-sky-600 hover:bg-sky-800"}`}
                onClick={() => {
                  setCurrIndex((prev) => prev - 1);
                }}
                disabled={currIndex > 0 ? false : true}
              >
                prev
              </button>
            </div>
            <div className="flex gap-3">
              <button
                className="bg-sky-600 font-extrabold text-lg px-4 py-2 text-black rounded-xl justify-self-end hover:bg-sky-800 transition-all duration-200"
                onClick={() => {
                  setSelectedFields({
                    coreSubjects: [],
                    professionalRoles: [],
                    specializationSubjects: [],
                    educationLevels: [],
                    fieldsOfStudy: [],
                    skills: [],
                    interests: [],
                    preferredTechnologies: [],
                  });
                }}
              >
                clear all
              </button>
              <button
                className={`bg-sky-600 font-extrabold text-lg px-4 py-2 text-black rounded-xl justify-self-end hover:bg-sky-800 transition-all duration-200 cursor-pointer`}
                onClick={async () => {
                  console.log();
                  if (currIndex < 7) {
                    setCurrIndex((prev) => prev + 1);
                  } else {
                    const data = await submitSurvey(
                      data.roleID,
                      selectedFields,
                      personalData
                    );
                    setSurveyGiven(true);
                  }
                }}
              >
                {currIndex === 7 ? "Submit" : "next"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Survey;
