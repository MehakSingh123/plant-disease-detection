import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./UploadForm.css"; // Import the CSS file

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [remedy, setRemedy] = useState(""); // ✅ NEW: remedy state

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Please select a valid image file (PNG, JPG, JPEG)");
    }
  };

  // Drag & Drop handlers...
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) processFile(files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image.");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ This is the fix
        },
        body: formData,
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setResult(data);
      setRemedy(data.remedy || ""); // ✅ Extract remedy from response
    } catch (err) {
      alert("Prediction failed! Please check your connection and try again.");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setPreview(null);
    setRemedy(""); // ✅ Reset remedy
    const fileInput = document.getElementById("file-input");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="upload-container">
      <div className="upload-wrapper">
        {/* Upload Section */}
        <div className="upload-card">
          <div className="upload-section">
            <h2 className="upload-title">📸 Upload Leaf Image</h2>

            <div
              className={`file-input-wrapper ${isDragging ? "dragging" : ""}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="file-input-hidden"
              />
              <label htmlFor="file-input" className="file-input-label">
                <div className="file-input-content">
                  <svg
                    className="upload-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="upload-text">
                    <span className="upload-text-bold">
                      {isDragging ? "Drop image here" : "Click to upload"}
                    </span>
                    {!isDragging && " or drag and drop"}
                  </p>
                  <p className="upload-text-small">
                    PNG, JPG, JPEG (MAX. 10MB)
                  </p>
                </div>
              </label>
            </div>

            {/* File Info */}
            {file && (
              <div className="file-info">
                <div className="file-info-content">
                  <div className="file-info-left">
                    <div className="file-info-icon">
                      <svg
                        className="check-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="file-name">{file.name}</p>
                      <p className="file-size">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={resetForm}
                    className="remove-button"
                    type="button"
                  >
                    <svg
                      className="remove-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="action-buttons">
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="analyze-button"
                type="button"
              >
                {loading ? (
                  <div className="button-content">
                    <div className="spinner"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="button-content">
                    <svg
                      className="button-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>Analyze Plant</span>
                  </div>
                )}
              </button>
              {(file || result) && (
                <button
                  onClick={resetForm}
                  className="reset-button"
                  type="button"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Preview and Results */}
          <div className="results-section">
            {preview && (
              <div className="preview-section">
                <h3 className="section-title">📷 Image Preview</h3>
                <div className="preview-container">
                  <img
                    src={preview}
                    alt="Preview of uploaded plant leaf"
                    className="preview-image"
                  />
                </div>
              </div>
            )}

            {result && (
              <div className="results-container">
                <h3 className="section-title">🔍 Analysis Results</h3>
                <div className="results-card">
                  <div className="results-content">
                    <div className="results-icon">
                      <svg
                        className="success-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="prediction-label">PREDICTION</p>
                      <h4 className="prediction-text">{result.prediction}</h4>
                    </div>

                    <div className="confidence-section">
                      <div className="confidence-header">
                        <span className="confidence-label">Confidence</span>
                        <span className="confidence-value">
                          {result.confidence}%
                        </span>
                      </div>
                      <div className="confidence-bar">
                        <div
                          className="confidence-fill"
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                    </div>

                    {result.confidence > 80 && (
                      <div className="confidence-high">
                        <p>✅ High confidence prediction</p>
                      </div>
                    )}
                    {result.confidence < 60 && (
                      <div className="confidence-low">
                        <p>
                          ⚠️ Low confidence - consider uploading a clearer image
                        </p>
                      </div>
                    )}

                    {/* ✅ Remedy Section */}
                    {remedy && (
                      <div className="remedy-section">
                        <h4>🩺 Suggested Remedy</h4>
                        <div className="remedy-markdown">
                          <ReactMarkdown>{remedy}</ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>Powered by AI • For educational purposes only</p>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
