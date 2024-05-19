import React, { useState } from "react";
import { addLectures } from "../helper/helper";
import { useParams } from "react-router-dom";
import { uselocalStore } from "../store/store";

const AddLectureBox = () => {
  const { setPopupMsg, setPopupOpen, setAddLectureOpen } = uselocalStore();
  const { topicID } = useParams();
  const [lectures, setLectures] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lec_link: "",
  });
  const [editIndex, setEditIndex] = useState(null); // New state to track the index being edited

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddLecture = () => {
    if (!formData.title || !formData.lec_link) {
      setPopupMsg("Title and lecture link can't be empty!!!");
      setPopupOpen(true);
      return;
    }
    if (editIndex !== null) {
      const editedLectures = [...lectures];
      editedLectures[editIndex] = { ...formData };
      setLectures(editedLectures);
      setFormData({ title: "", description: "", lec_link: "" });
      setEditIndex(null);
    } else {
      setLectures([...lectures, formData]);
      setFormData({ title: "", description: "", lec_link: "" });
    }
  };

  const handleDeleteLecture = (index) => {
    setLectures(lectures.filter((_, i) => i !== index));
  };

  const handleEditLecture = (index) => {
    setFormData({ ...lectures[index] }); // Populate form fields with lecture data
    setEditIndex(index);
  };

  return (
    <div className="flex justify-center space-x-8 w-screen">
      <div className="w-[35%] p-6 bg-gray-900 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-white">Add Lecture</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 px-2 focus:ring-white py-2 bg-black text-white focus:border-white block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 px-2 bg-black text-white
               focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="lec_link"
              className="block text-sm font-medium text-white"
            >
              lec_link
            </label>
            <input
              type="text"
              id="lec_link"
              name="lec_link"
              value={formData.lec_link}
              onChange={handleChange}
              className="mt-1 px-2 bg-black py-2 text-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </form>
        <div className="flex gap-2">
          <button
            onClick={handleAddLecture}
            className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            {editIndex !== null ? "Save" : "Add Lecture"}{" "}
            {/* Change button text */}
          </button>
          {editIndex === null && (
            <button
              className="mt-4 bg-lime-600 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded"
              onClick={async () => {
                const { data, status } = await addLectures(lectures, topicID);
                console.log(status);
                if (status === 200) {
                  setPopupMsg("Lectures uploaded successfully!!!");
                  setAddLectureOpen(false);
                } else {
                  setPopupMsg("error uploading Lectures!!");
                  console.log(data);
                }
                setPopupOpen(true);
              }}
            >
              upload all lectures
              {/* Change button text */}
            </button>
          )}
        </div>
      </div>
      <div className="w-[35%] p-6 bg-gray-900 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-white">
          Lectures Added
        </h2>
        <ul className="space-y-4">
          {lectures.map((lecture, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-[0.2px] border-gray-500 p-2 rounded-2xl "
            >
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {lecture.title}
                </h3>
                <p className="text-sm text-gray-500">{lecture.description}</p>
                <a
                  href={lecture.lec_link}
                  className="text-sm text-blue-500 underline"
                >
                  {lecture.lec_link}
                </a>
              </div>
              <div>
                <button
                  onClick={() => handleEditLecture(index)}
                  className="text-yellow-500 hover:text-yellow-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteLecture(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddLectureBox;
