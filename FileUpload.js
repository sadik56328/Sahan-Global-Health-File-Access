import React, { useState } from "react";
import { storage, auth } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file first");
      return;
    }
    const user = auth.currentUser;
    if (!user) {
      setMessage("You must be logged in to upload files");
      return;
    }
    const fileRef = ref(storage, `healthFiles/${user.uid}/${file.name}`);
    try {
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setMessage(`File uploaded successfully.`);
      // Navigate to Share page with URL as state
      navigate("/share", { state: { fileUrl: url } });
    } catch (error) {
      setMessage("Upload failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleUpload} className="p-6 max-w-md mx-auto flex flex-col gap-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept=".pdf,.jpg,.png"
      />
      <button type="submit" className="bg-green-600 text-white py-2 rounded">Upload</button>
      {message && <p>{message}</p>}
    </form>
  );
}