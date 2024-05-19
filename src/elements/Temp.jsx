import React, { useState, useEffect } from "react";
import axios from "axios";

const BufferToRkConverter = () => {
  const [bufferFile, setBufferFile] = useState(null);
  const [rkFile, setRkFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    // Fetch uploaded files from MongoDB on component mount
    fetchUploadedFiles();
  }, []);

  const handleBufferFileChange = (event) => {
    setBufferFile(event.target.files[0]);
  };

  const convertBufferToRk = async () => {
    if (!bufferFile) return;

    const buffer = await bufferFile.arrayBuffer();
    const rkData = new Uint8Array(buffer);

    const rkFile = new File([rkData], "rkfile.rk");
    setRkFile(rkFile);
  };

  const uploadFileToMongoDB = async () => {
    if (!bufferFile) return;

    const formData = new FormData();
    formData.append("file", bufferFile);

    try {
      await axios.post("/upload", formData);
      setBufferFile(null); // Clear the selected file after upload
      fetchUploadedFiles(); // Refresh the list of uploaded files
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get("/files");
      setUploadedFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  const downloadRkFile = () => {
    if (!rkFile) return;

    const url = URL.createObjectURL(rkFile);
    const link = document.createElement("a");
    link.href = url;
    link.download = rkFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="mb-4">
        <input type="file" onChange={handleBufferFileChange} className="mr-2" />
        <button
          onClick={uploadFileToMongoDB}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload to MongoDB
        </button>
      </div>
      <div className="mb-4">
        <button
          onClick={convertBufferToRk}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Convert to RK File
        </button>
        {rkFile && (
          <button
            onClick={downloadRkFile}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Download RK File
          </button>
        )}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Uploaded Files</h2>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index} className="text-gray-800">
              {file.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BufferToRkConverter;
