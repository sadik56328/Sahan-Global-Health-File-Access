import React, { useEffect, useState } from "react";
import { storage, auth } from "../firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export function Dashboard() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const listRef = ref(storage, `healthFiles/${user.uid}/`);
      try {
        const res = await listAll(listRef);
        const urls = await Promise.all(
          res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url };
          })
        );
        setFiles(urls);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
      <p className="mb-4">Access and manage your health files here.</p>
      <div className="flex gap-4 mb-4">
        <a href="/upload" className="bg-green-600 text-white px-4 py-2 rounded">Upload File</a>
        <a href="/share" className="bg-indigo-600 text-white px-4 py-2 rounded">Share File</a>
      </div>
      <ul>
        {files.map((file) => (
          <li key={file.url}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}