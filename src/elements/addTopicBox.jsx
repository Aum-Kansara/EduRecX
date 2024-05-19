import React, { useState } from "react";
import { addTopics } from "../helper/helper";
import { uselocalStore } from "../store/store";

const AddTopicBox = () => {
  const [topics, setTopics] = useState([]);
  const [topicDetails, setTopicDetails] = useState({
    title: "",
    description: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");

  const { addTopicSubId, setAddTopicSubId, setPopupOpen, setPopupMsg } =
    uselocalStore();

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedTitle(topics[index].title);
    setEditedDesc(topics[index].description);
  };

  const handleSave = (index) => {
    const updatedTopics = [...topics];
    updatedTopics[index].title = editedTitle;
    updatedTopics[index].description = editedDesc;
    setTopics(updatedTopics);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  return (
    <div className="absolute z-50 flex justify-center items-center top-0 left-0 h-full w-full bg-gray-800 bg-opacity-75">
      <div className="flex gap-8">
        {/* Add Topic Box */}
        <div className="w-[300px] p-6 bg-gray-700 text-white rounded-lg shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Add New Topic</h2>
            <div className="mb-4">
              <label htmlFor="topicTitle" className="block text-sm font-medium">
                Topic Title
              </label>
              <input
                id="topicTitle"
                type="text"
                className="mt-1 w-full bg-gray-800 px-2 py-1"
                placeholder="Enter topic title"
                value={topicDetails.title}
                onChange={(e) => {
                  setTopicDetails((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="topicDesc" className="block text-sm font-medium">
                Topic description
              </label>
              <textarea
                id="topicDesc"
                className=" focus:outline-none mt-1 w-full h-24 resize-none bg-gray-800 px-2 py-1"
                placeholder="Enter topic description"
                value={topicDetails.description}
                onChange={(e) => {
                  setTopicDetails((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
            </div>
            <button
              className={`px-4 py-2  text-white rounded-md hover:bg-blue-600 ${
                topicDetails.title === ""
                  ? "cursor-not-allowed bg-gray-600"
                  : "bg-blue-500 cursor-pointer"
              }`}
              onClick={() => {
                setTopics((prev) => [...prev, topicDetails]);
                setTopicDetails({ title: "", description: "" });
              }}
              disabled={topicDetails.title === ""}
            >
              Add Topic
            </button>
          </div>
          <div>
            <button
              className="w-full  bg-gray-800 hover:bg-gray-600 transition-all duration-200 rounded-3xl py-1"
              onClick={async () => {
                if (topics.length > 0) {
                  const { data, status } = await addTopics(
                    addTopicSubId,
                    topics
                  );
                  if (status === 201) {
                    setPopupMsg("Successfully added topics to the class!!!");
                    setPopupOpen(true);
                  } else if (status !== 200) {
                    setPopupMsg("Error adding topics!!!");
                    setPopupOpen(true);
                  }
                  console.log(data);
                }
              }}
            >
              Add To Subjects
            </button>
          </div>
        </div>

        {/* Topics Array Box */}
        <div className="w-[400px] h-[400px] overflow-y-auto p-4 bg-gray-700 text-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 sticky top-0 bg-gray-700 z-10">
            Topics
          </h2>
          {topics.length > 0 ? (
            topics.map((tp, index) => (
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
                      <h3 className="text-lg font-semibold">{tp.title}</h3>
                      <p className="text-sm">{tp.description}</p>
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
                          const updatedTopics = topics.filter(
                            (_, i) => i !== index
                          );
                          setTopics(updatedTopics);
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
            <p>No topics yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTopicBox;
