import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { getClassDetails, getClasses, getTopicDetails } from "../helper/helper";

export const uselocalStore = create((set) => ({
  topicPrompt: {},
  setTopicPrompt: (val) => {
    set({ topicPrompt: val });
  },
  lecPrompt: [],
  setLecPrompt: (values) => {
    set({ lecPrompt: [...values] });
  },
  userLoggingIn: true,
  responseMSG: "",
  surveyGiven: false,
  setSurveyGiven: (val) => {
    set({ surveyGiven: val });
  },
  setResponseMSG: (msg) => {
    set({ responseMSG: msg });
  },
  setUserLogginIn: (val) => {
    set({ userLoggingIn: val });
  },
  role: localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token")).role
    : 0,
  PopupMsg: "",
  setPopupMsg: (msg) => {
    set({ PopupMsg: msg });
  },
  PopupOpen: false,
  setPopupOpen: (val) => {
    set({ PopupOpen: val });
  },
  PopupStatus: true,
  setPopupStatus: (val) => {
    set({ setPopupStatus: val });
  },
  QuizOpen: false,
  setQuizOpen: (val) => {
    set({ QuizOpen: val });
  },
  addQuizBoxOpen: false,
  setAddQuizBoxOpen: (val) => {
    set({ addQuizBoxOpen: val });
  },
  ResourcesOpen: false,
  setResourcesOpen: (val) => {
    set({ ResourcesOpen: val });
  },
  TranscriptOpen: false,
  setTranscriptOpen: (val) => {
    set({ TranscriptOpen: val });
  },
  addLectureOpen: false,
  setAddLectureOpen: (val) => {
    set({ addLectureOpen: val });
  },
  accountCard: false,
  showSidebar: false,
  showLoginPage: false,
  addClassOpen: false,
  setAddClassOpen: (val) => {
    set({ addClassOpen: val });
  },
  addTopicOpen: false,
  setAddTopicOpen: (val) => {
    set({ addTopicOpen: val });
  },
  addTopicSubId: "",
  setAddTopicSubId: (val) => {
    set({ addTopicSubId: val });
  },

  joinClassOpen: false,
  setJoinClassOpen: (val) => {
    set({ joinClassOpen: val });
  },
  loginStatus: localStorage.getItem("token") ? true : false,
  setShowSidebar: (val) => {
    set({ showSidebar: val });
  },
  toggleSidebar: () => {
    set((state) => ({
      showSidebar: !state.showSidebar,
    }));
  },
  setAccountCard: (val) => {
    set({ accountCard: val });
  },
  setLoginStatus: () => {
    set((state) => ({
      loginStatus: localStorage.getItem("token") ? true : false,
    }));
  },
  setRole: (role) => {
    set({ role: role });
  },
  setShowLoginPage: (val) => {
    set({ showLoginPage: val });
  },
  toggleShowLoginPage: () => {
    set((state) => ({
      showLoginPage: !state.showLoginPage,
    }));
  },
  EnteredClassCode: "",
  setEnteredClassCode: (val) => {
    set({ EnteredClassCode: val });
  },
  alertBox: false,
  setAlertBox: (val) => {
    set({ alertBox: val });
  },
  alertMsg: "",
  setAlertMsg: (val) => {
    set({ alertMsg: val });
  },
  confirmation: false,
  setConfirmation: (val) => {
    set({ confirmation: val });
  },
  addResourcesBox: false,
  setAddResources: (val) => {
    set({ addResourcesBox: val });
  },
}));

export const useUserData = create((set, get) => ({
  token: localStorage.getItem("token"),
  roleID: "",
  userID: "",
  email: "",
  userRole: 0,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token: localStorage.getItem("token") });
  },
  decodedData: (token) => {
    return jwtDecode(token);
  },
}));

export const useClassData = create((set, get) => ({
  classData: {},
  classlist: [],
  classCode: {},
  setClassList: async (role, roleID) => {
    const { data } = await getClasses(role, roleID);
    console.log(data);
    data.map((cls) => {
      set((state) => ({
        classCode: {
          ...state.classCode,
          [cls.classID]: { code: "", generate: false, shared: false },
        },
      }));
    });
    set({ classlist: data });
  },
  setClassCode: (classID, code) => {
    set((state) => ({
      classCode: {
        ...state.classCode,
        [classID]: {
          code: code,
          generate: true,
        },
      },
    }));
  },
  setClassCodeShare: (classId) => {
    set((state) => ({
      classCode: {
        ...state.classCode,
        [classId]: {
          ...state.classCode[classId],
          shared: true,
        },
      },
    }));
  },
  clearClassData: () => {
    set({ classData: {} });
  },
  setClassData: async (classID) => {
    const { data } = await getClassDetails(classID);
    set({ classData: data });
  },
  updateSubjectInClass: async (newsubject) => {
    const subIndex = get().classData.Subjects.findIndex(
      (sub) => sub._id === newsubject._id
    );

    if (subIndex !== -1) {
      set({
        [classData.Subjects[subIndex]]: newsubject,
      });
    }
  },
  createClassData: {},
  setCreateClassData: (data) => {
    set({ createClassData: data });
  },
}));

export const useTopicData = create((set, get) => ({
  topicData: {},
  setTopicData: async (topicID) => {
    const { data } = await getTopicDetails(topicID);
    set({ topicData: data });
  },
}));
