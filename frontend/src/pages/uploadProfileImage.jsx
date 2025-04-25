import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadProfileImage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("profileImage", image);

    try {
      const token = JSON.parse(localStorage.getItem("user"));

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload-profile-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Image uploaded successfully!");
      setLoading(false)
    } catch (err) {
      console.error("Upload failed:", err);
      setLoading(false)
    }
  };

  useEffect(() => {
    document.title = "Change Profile Image";
  })

  return (
    <>
      <h1>Only .jpeg, .jpg & .png images with size of maximum 1MB are allowed</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}

    </>
  );
};

export default UploadProfileImage;
