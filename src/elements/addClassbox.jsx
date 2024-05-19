import React, { useState } from "react";
import { addTopics } from "../helper/helper";
import { uselocalStore } from "../store/store";

const AddClassBox = () => {
  const [classData, setClassData] = useState({ title: "", description: "" });
  const [subjects, setSubjects] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  const { addTopicSubId, setAddTopicSubId } = uselocalStore();

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedTitle(subjects[index].title);
    setEditedDesc(subjects[index].description);
  };

  const handleSave = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].title = editedTitle;
    updatedSubjects[index].description = editedDesc;
    setSubjects(updatedSubjects);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  const handleAddClass = () => {
    // Handle adding class logic
    console.log("Class Data:", classData);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { title: "", description: "" }]);
  };

  return (
    <div className="absolute z-50 flex justify-center items-center top-0 left-0 h-full w-full bg-gray-800 bg-opacity-75">
      <div className="flex gap-8">
        {/* Add Class Card */}
        <div className="w-[300px] p-6 bg-gray-700 text-white rounded-lg shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Add Class</h2>
            <div className="mb-4">
              <input
                type="text"
                className="input"
                placeholder="Class Title"
                value={classData.title}
                onChange={(e) =>
                  setClassData({ ...classData, title: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <textarea
                className="input resize-none"
                placeholder="Class Description"
                value={classData.description}
                onChange={(e) =>
                  setClassData({ ...classData, description: e.target.value })
                }
              />
            </div>
            <button
              className={`btn ${classData.title === "" ? "disabled" : ""}`}
              onClick={handleAddClass}
              disabled={classData.title === ""}
            >
              Add Class
            </button>
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (subjects.length > 0) {
                  addTopics(addTopicSubId, subjects);
                }
              }}
            >
              Add Subjects to Class
            </button>
          </div>
        </div>

        {/* Subjects Card */}
        <div className="w-[400px] h-[400px] overflow-y-auto p-4 bg-gray-700 text-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 sticky top-0 bg-gray-700 z-10">
            Subjects
          </h2>
          {subjects.length > 0 ? (
            subjects.map((subject, index) => (
              <div key={index} className="border-b border-gray-600 py-2">
                {editingIndex === index ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="mr-2 px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded"
                    />
                    <input
                      type="text"
                      value={editedDesc}
                      onChange={(e) => setEditedDesc(e.target.value)}
                      className="mr-2 px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded"
                    />
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{subject.title}</h3>
                      <p className="text-sm">{subject.description}</p>
                    </div>
                    <div>
                      <button
                        className="text-sm text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm text-red-500 hover:text-red-700"
                        onClick={() => {
                          const updatedSubjects = subjects.filter(
                            (_, i) => i !== index
                          );
                          setSubjects(updatedSubjects);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No subjects yet</p>
          )}
          <button className="btn btn-primary" onClick={handleAddSubject}>
            Add Subject
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClassBox;
