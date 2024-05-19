import React, { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useUserData, uselocalStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { attemptQuiz } from "../helper/helper.js";

// const questionData = [
//   {
//     index: 1,
//     question: "What is the capital of France?",
//     options: {
//       a: "Berlin",
//       b: "Paris",
//       c: "Madrid",
//       d: "Rome",
//     },
//     answer: "b",
//   },
//   {
//     index: 2,
//     question: "Which planet is known as the Red Planet?",
//     options: {
//       a: "Earth",
//       b: "Mars",
//       c: "Jupiter",
//       d: "Venus",
//     },
//     answer: "b",
//   },
//   {
//     index: 3,
//     question: 'Who wrote "Romeo and Juliet"?',
//     options: {
//       a: "Charles Dickens",
//       b: "William Shakespeare",
//       c: "Jane Austen",
//       d: "Mark Twain",
//     },
//     answer: "b",
//   },
//   {
//     index: 4,
//     question: "What is the largest mammal in the world?",
//     options: {
//       a: "Elephant",
//       b: "Blue Whale",
//       c: "Giraffe",
//       d: "Hippopotamus",
//     },
//     answer: "b",
//   },
//   {
//     index: 5,
//     question:
//       "Which programming language is known for its flexibility and readability?",
//     options: {
//       a: "Java",
//       b: "Python",
//       c: "C++",
//       d: "JavaScript",
//     },
//     answer: "b",
//   },
//   {
//     index: 6,
//     question: "What is the largest ocean on Earth?",
//     options: {
//       a: "Atlantic Ocean",
//       b: "Indian Ocean",
//       c: "Southern Ocean",
//       d: "Pacific Ocean",
//     },
//     answer: "d",
//   },
//   {
//     index: 7,
//     question: 'Who is known as the "Father of Computer Science"?',
//     options: {
//       a: "Alan Turing",
//       b: "Bill Gates",
//       c: "Steve Jobs",
//       d: "Mark Zuckerberg",
//     },
//     answer: "a",
//   },
//   {
//     index: 8,
//     question:
//       "Which famous scientist developed the theory of general relativity?",
//     options: {
//       a: "Isaac Newton",
//       b: "Galileo Galilei",
//       c: "Albert Einstein",
//       d: "Stephen Hawking",
//     },
//     answer: "c",
//   },
//   {
//     index: 9,
//     question: "What is the chemical symbol for water?",
//     options: {
//       a: "O2",
//       b: "CO2",
//       c: "H2O",
//       d: "N2",
//     },
//     answer: "c",
//   },
//   {
//     index: 10,
//     question: "In which year did the Titanic sink?",
//     options: {
//       a: "1905",
//       b: "1912",
//       c: "1920",
//       d: "1931",
//     },
//     answer: "b",
//   },
// ];

const Quiz = ({ questionData, quizID }) => {
  const { QuizOpen, topicPrompt, lecPrompt, setQuizOpen } = uselocalStore();
  const { decodedData } = useUserData();

  const { roleID } = decodedData(localStorage.getItem("token"));

  const navigate = useNavigate();

  useGSAP(() => {
    gsap.fromTo("#quizContainer", { scale: 0 }, { scale: 1, duration: 0.5 });
  }, [QuizOpen]);

  const [questions, setQuestions] = useState(questionData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const wrongQuestions = [];

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const answer = {
      index: currentQuestion.index,
      selectedOption,
      isCorrect: selectedOption === currentQuestion.answer,
    };
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const calculateScore = () => {
    const correctAnswers = answers.filter((answer) => answer.isCorrect);
    return (correctAnswers.length / questions.length) * 100;
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  useEffect(() => {
    const sendQuiz = async () => {
      if (currentQuestionIndex === questions.length) {
        const score = calculateScore();
        await attemptQuiz(roleID, quizID, score);
      }
    };
    sendQuiz();
  }, [currentQuestionIndex]);

  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div
        id="quizContainer"
        className=" bc flex flex-col items-center justify-center rounded-[50px] h-[80vh] w-[50vw] backdrop-blur-lg"
      >
        <div className="text-white h-[70%] w-3/4 bc rounded-xl p-8 shadow-md transform transition-all duration-500">
          <h1 className="text-3xl font-bold mb-6">Quiz</h1>
          <h2 className="text-xl font-semibold mb-4">
            Question {currentQuestion.index}
          </h2>
          <p className="text-lg mb-4">{currentQuestion.question}</p>
          <div className="flex flex-col space-y-4">
            {Object.entries(currentQuestion.options).map(
              ([optionKey, optionValue]) => (
                <button
                  key={optionKey}
                  className="bg-blue-500 text-white px-4 py-2 min-w-[50%] rounded-md hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => handleAnswer(optionKey)}
                >
                  {optionValue}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    );
  } else {
    const score = calculateScore();
    return (
      <div
        id="quizContainer"
        className=" flex flex-col  items-center justify-center p-5 rounded-[50px]  h-[80vh] w-[50vw] backdrop-blur-lg"
      >
        <div className="bg-transparent rounded-xl w-3/4 bc  overflow-auto  p-8 shadow-md transform transition-all duration-500">
          <h1 className="text-3xl font-bold mb-6 text-white">Quiz Result</h1>
          <p className="text-lg mb-4 text-white">
            Your score: {score.toFixed(2)}%
          </p>
          <div className="text-lg mb-4">
            {answers.map((answer) => {
              const question = questions.find((q) => q.index === answer.index);
              const isCorrect = answer.isCorrect;
              if (!isCorrect) {
                wrongQuestions.push(question.question);
              }
              const studentAnswer = question.options[answer.selectedOption];
              const correctAnswer = question.options[question.answer];
              return (
                <div
                  key={question.index}
                  className={`mb-4 p-4 ${
                    isCorrect ? "bg-green-400" : "bg-red-400"
                  } rounded-md`}
                >
                  <p className="mb-2">
                    <strong>Question:</strong> {question.question}
                  </p>
                  <p className="mb-2">
                    <strong>Student Answer:</strong> {studentAnswer}
                  </p>
                  {!isCorrect && (
                    <p>
                      <strong>Correct Answer:</strong>{" "}
                      <span className="bg-green-200 px-1 rounded-md">
                        {correctAnswer}
                      </span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              onClick={restartQuiz}
            >
              Restart Quiz
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              onClick={() => {
                navigate(`/student/${roleID}/pathway`);
                setQuizOpen(false);

                let pmt = `
                Topic name : ${topicPrompt.title}
                Topic description : ${topicPrompt.desc}
                Lecture titles are : 
                ${lecPrompt.map((lec) => lec)}
                Questions are : 
                ${wrongQuestions.map((q) => q)}
                `;
                console.log(pmt);
              }}
            >
              Get Personalised pathway
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Quiz;
