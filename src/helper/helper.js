import axios from "axios";
import { useUserData } from "../store/store";
import { useParams } from "react-router-dom";

// const baseURL = "http://localhost:8080";
const baseURL = "https://edurecx-backend-api-ugxdufb6ga-em.a.run.app";

export async function getClasses(role, roleID) {
  try {
    const url = `${baseURL}/api/${role ? "students" : "teachers"}/${roleID}/getclassNames`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw err; // Re-throw the error so it can be caught by the caller
  }
}

export async function getClassDetails(classID) {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/classes/getclass/${classID}`
    );

    if (data) return data;
    // throw new Error("No data received");
  } catch (error) {
    throw error;
  }
}

export async function getTopicDetails(topicID) {
  try {
    const res = await axios.get(`${baseURL}/api/topics/${topicID}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function joinClass(studentID, code) {
  try {
    const res = await axios.post(
      `${baseURL}/api/students/${studentID}/joinClass/`,
      {
        code,
      }
    );
    console.log(res.data);
  } catch (error) {
    throw error;
  }
}

export async function getLectures(topicID) {
  try {
    const response = await axios.get(
      `${baseURL}/api/topics/${topicID}/getlectures`
    );

    return { data: response.data, status: response.status };
  } catch (error) {
    throw error;
  }
}

export async function addLectures(lectures, topicID) {
  try {
    const response = await axios.post(
      `${baseURL}/api/topics/${topicID}/addlectures`,
      { lectures }
    );

    return { data: response.data, status: response.status };
  } catch (error) {
    throw error;
  }
}

export async function addTopics(subjectID, topics) {
  try {
    const response = await axios.post(
      `${baseURL}/api/subjects/${subjectID}/addTopics`,
      { topics }
    );

    return { data: response.data, status: response.status };
  } catch (error) {
    throw error;
  }
}

export async function addSurvey(studentID, survey) {
  try {
    const response = await axios.post(
      `${baseURL}/students/${studentID}/addSurvey`,
      { survey }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    throw error;
  }
}

export async function addClassCode(classID, code) {
  try {
    const res = await axios.post(`${baseURL}/api/classes/${classID}/addCode`, {
      code,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPeople(classID) {
  try {
    const response = await axios.get(
      `${baseURL}/api/classes/${classID}/people`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function cancelRequest(reqID, classID, studentID) {
  try {
    const response = await axios.post(`${baseURL}/api/cancelRequest`, {
      reqID,
      classID,
      studentID,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function acceptRequest(reqID, classID, studentID) {
  try {
    const response = await axios.post(`${baseURL}/api/acceptRequest`, {
      reqID,
      classID,
      studentID,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function addQuiz(questions, topicID, forced) {
  try {
    const response = await axios.post(
      `${baseURL}/api/topics/${topicID}/addQuiz`,
      {
        questions,
        forced,
      }
    );

    return { data: response.data, status: response.status };
  } catch (error) {
    throw error;
  }
}

export async function attemptQuiz(sid, quizID, quizScore) {
  try {
    const response = await axios.post(
      `${baseURL}/api/students/${sid}/attemptQuiz`,
      {
        quizID,
        quizScore,
      }
    );
    console.log(response);
    return { data: response.data, status: response.status };
  } catch (error) {
    throw error;
  }
}

export async function submitSurvey(sid, surveyData, personalData) {
  try {
    const survey = {
      education_level: surveyData.educationLevels,
      field_of_study: surveyData.fieldOfStudy,
      skills: surveyData.skills,
      interests: surveyData.interests,
      preferred_technologies: surveyData.preferredTechnologies,
      core_subjects: surveyData.coreSubjects,
      specialization_subjects: surveyData.specializationSubjects,
      carrer_roles: surveyData.professionalRoles,
      ...personalData,
    };
    const response = await axios.post(
      `${baseURL}/api/students/${sid}/submitSurvey`
    );
    const pyResponse = await axios.post(
      `https://survey-system-api.onrender.com/surveyData`
    );

    console.log(response);
    console.log(pyResponse);

    return {
      data: response.data,
      status: response.status,
      pythonData: pyResponse.data,
      pythonStatus: pyResponse.status,
    };
  } catch (error) {
    throw error;
  }
}
