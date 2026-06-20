import React, { useState } from "react";
import "./App.css";
import { getUploadUrl } from "./api";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadFile = async () => {
    try {
      const uploadUrl = await getUploadUrl(file.name);

      await fetch(uploadUrl, {
        method: "PUT",
        body: file,
      });

      setMessage("✅ Image uploaded successfully!");
    } catch (error) {
      setMessage("❌ Upload failed.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">AWS DevOps Capstone</h1>

        <p className="subtitle">
          Upload images directly to Amazon S3
        </p>

        <input
          type="file"
          className="file-input"
          accept="image/*"
          onChange={handleFileChange}
        />

        {preview && (
          <div className="preview">
            <img src={preview} alt="preview" />
          </div>
        )}

        <button
          className="upload-btn"
          disabled={!file}
          onClick={uploadFile}
        >
          Upload Image
        </button>

        {message && (
          <p
            className={
              message.includes("success")
                ? "success"
                : "error"
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
