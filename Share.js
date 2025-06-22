import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { useLocation } from "react-router-dom";

export function Share() {
  const location = useLocation();
  const [shareLink, setShareLink] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  useEffect(() => {
    if (location.state && location.state.fileUrl) {
      setShareLink(location.state.fileUrl);
      setInputUrl(location.state.fileUrl);
    }
  }, [location.state]);

  const generateLink = () => {
    if (inputUrl.trim() === "") {
      alert("Please enter a valid URL");
      return;
    }
    setShareLink(inputUrl.trim());
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2 className="text-2xl font-bold mb-4">Share Your Health File</h2>
      <input
        type="text"
        placeholder="Paste your file URL here"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      <button onClick={generateLink} style={{ padding: "0.5rem 1rem", backgroundColor: "#4F46E5", color: "white", borderRadius: "0.375rem" }}>
        Generate Share Link & QR Code
      </button>

      {shareLink && (
        <>
          <p style={{ marginTop: "1rem" }}>
            Shareable Link: <a href={shareLink} target="_blank" rel="noopener noreferrer">{shareLink}</a>
          </p>
          <div style={{ marginTop: "1rem" }}>
            <QRCode value={shareLink} size={256} />
          </div>
        </>
      )}
    </div>
  );
}