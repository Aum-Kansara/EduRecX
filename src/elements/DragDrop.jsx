import React, { useState } from "react";

const DragDrop = () => {
  const [files, setFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleFileInputChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="border border-dashed flex flex-col h-full w-full justify-between border-gray-400 p-4 rounded-md text-white"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div>
        <h3 className="text-lg font-semibold mb-2">Drag & Drop Files Here</h3>
        <input
          type="file"
          accept="*"
          onChange={handleFileInputChange}
          multiple
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          Or click to browse
        </label>
        {files.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold">Selected Files:</p>
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        disabled={files.length === 0}
        className="bg-blue-500 w-1/5 text-center py-2 rounded-2xl hover:bg-blue-700 transition-all duration-200 cursor-pointer"
        onClick={() => {
          files.map((file) => {
            console.log(file.name);
          });
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default DragDrop;
