import React from "react";

const QuizQuestions = ({ questions }) => {
  console.log(questions);
  return (
    // <></>
    <div className="container mx-auto p-4  backdrop-blur-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-white">Questions List</h2>
      <ul className="space-y-4">
        {questions.map((question, index) => (
          <li key={question._id} className="border rounded p-4 bg-gray-100">
            <h3 className="text-lg font-semibold mb-2">{`Question ${index + 1}`}</h3>
            <p className="mb-2">
              <strong className="text-gray-800">Question:</strong>{" "}
              {question.question}
            </p>
            <p className="mb-2">
              <strong className="text-gray-800">Options:</strong>
            </p>
            <ul className="list-disc ml-6">
              {Object.entries(question.options).map(([key, value]) => (
                <li
                  key={key}
                  className="text-gray-800"
                >{`${key.toUpperCase()}: ${value}`}</li>
              ))}
            </ul>
            <p className="mt-2">
              <strong className="text-gray-800">Answer:</strong>{" "}
              {question.answer.toUpperCase()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestions;
