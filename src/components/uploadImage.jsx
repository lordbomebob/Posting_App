import React, { useState } from "react";
import { uploadImage } from "../services/storageService";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    try {
      const url = await uploadImage(file);
      setImageURL(url); // Display uploaded image
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageURL && <img src={imageURL} alt="Uploaded" style={{ width: "200px" }} />}
    </div>
  );
};

export default ImageUploader;
