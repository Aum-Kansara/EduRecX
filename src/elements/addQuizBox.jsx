import React, { useEffect, useState } from "react";
import { addQuiz } from "../helper/helper";
import { uselocalStore } from "../store/store";
import { useParams } from "react-router-dom";

const AddQuizBox = ({ lecID }) => {
  const { topicID} = useParams();
  const { setPopupMsg, setPopupOpen, setAddQuizBoxOpen } = uselocalStore();
  const [questions, setQuestions] = useState([]);
  const [alert, setAlert] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: {
      a: "",
      b: "",
      c: "",
      d: "",
    },
    answer: "",
  });

  const PopupAlert = () => {
    return (
      <div className="h-screen w-screen absolute top-0 left-0 z-[1000] flex flex-col justify-center items-center">
        <div className="h-[300px] text-white w-[500px] rounded-2xl bc flex flex-col justify-between py-4 px-2">
          <div className="flex flex-col gap-2">
            <title className="text-3xl">Oops!!!</title>
            <p className="text-md">Quiz already exist</p>
            <p className="text-md">You sure you want to replace the last added Quiz</p>

          </div>

          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-800 transition-all duration-200"
              onClick={() => {
                setAlert(false);
                sendQuiz(true);
              }}
            >
              Continue
            </button>
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-800 transition-all duration-200"
              onClick={() => {
                setAlert(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({
      ...newQuestion,
      [name]: value,
    });
  };

  const sendQuiz = async (forced = false) => {
    await addQuiz(questions, topicID, forced)
      .then((data) => {
        if (data.status === 200) {
          setPopupMsg("Added Quiz successfully!!!!");
          setPopupOpen(true);
          setAddQuizBoxOpen(false);
        } else {
          setPopupMsg("Failed to add Quiz!!!!");
          setPopupOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Right if else");
        setAlert(true);
      });
  };

  const handleOptionChange = (option, value) => {
    setNewQuestion({
      ...newQuestion,
      options: {
        ...newQuestion.options,
        [option]: value,
      },
    });
  };

  const handleAddQuestion = () => {
    // Validate question
    if (
      !newQuestion.question ||
      !newQuestion.options.a ||
      !newQuestion.options.b ||
      !newQuestion.options.c ||
      !newQuestion.options.d ||
      !newQuestion.answer
    ) {
      alert("Please fill in all fields for the question.");
      return;
    }

    setQuestions([...questions, { ...newQuestion }]);
    // Reset newQuestion state
    setNewQuestion({
      question: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    });
  };

  const handleEditQuestion = (index) => {
    const editedQuestion = questions[index];
    setNewQuestion({ ...editedQuestion });
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleDeleteQuestion = (index) => {
    // Implement delete functionality here
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="container h-screen w-screen overflow-auto  backdrop-blur-lg text-white mx-auto bc p-10">
      {alert && <PopupAlert />}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Question</h2>
        <div className="mb-4">
          <label className="block mb-2">Question:</label>
          <input
            type="text"
            name="question"
            value={newQuestion.question}
            onChange={handleChange}
            className="w-full bg-gray-800 border rounded px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Options:</label>
          <div className="flex space-x-4">
            {Object.keys(newQuestion.options).map((option) => (
              <input
                key={option}
                type="text"
                value={newQuestion.options[option]}
                onChange={(e) => handleOptionChange(option, e.target.value)}
                className="flex-1 bg-gray-800 border rounded px-4 py-2"
                placeholder={`Option ${option.toUpperCase()}`}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Answer:</label>
          <input
            type="text"
            name="answer"
            value={newQuestion.answer}
            onChange={handleChange}
            className="w-full bg-gray-800 border rounded px-4 py-2"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAddQuestion}
            className="bg-blue-500 transition-all duration-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {newQuestion.index !== undefined ? "Save Changes" : "Add Question"}
          </button>
          <button
            onClick={() => {
              sendQuiz();
            }}
            className="bg-blue-500 transition-all duration-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            upload Quiz
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Questions Added</h2>
        <ul className="space-y-4">
          {questions.map((question, index) => (
            <li key={index} className="border rounded p-4">
              <h3 className="text-lg font-semibold mb-2">
                {question.question}
              </h3>
              <div className="flex justify-between">
                <div>
                  <p className="mb-2">
                    <strong>Options:</strong>
                  </p>
                  <ul>
                    {Object.entries(question.options).map(([key, value]) => (
                      <li key={key}>{`${key.toUpperCase()}: ${value}`}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Answer:</strong> {question.answer}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditQuestion(index)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddQuizBox;
