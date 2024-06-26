import React, { useState } from "react";
import BackButton from "./BackButton";

interface PdfConversionProps {
  backButtonFunction: () => void;
}

const PdfConversion: React.FC<PdfConversionProps> = ({
  backButtonFunction,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [hovered, setHovered] = useState(false);

  const hoverStyle = {
    background: !selectedFile ? "#ccc" : hovered ? "red" : "#FF6865",
    cursor: !selectedFile ? "not-allowed" : "pointer",
  };

  // Allow to select a word document
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && isValidFileType(file)) {
      setSelectedFile(file);
    } else {
      alert("Please select a Word document.");
    }
  };

  // Check if the file is a word document
  const isValidFileType = (file: File) => {
    const fileNameParts = file.name.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

    return (
      fileExtension === "doc" ||
      fileExtension === "docx" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
  };

  // Allows to drag and drop a document
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (file && isValidFileType(file)) {
      setSelectedFile(file);
    } else {
      alert("Please drop a word document.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    //event.preventDefault();
    try {
      if (!selectedFile) {
        alert("No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await fetch("http://localhost:5000/topdf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle successful response here
        const blob = await response.blob();

        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);
        // Create a link element
        const link = document.createElement("a");
        // Set the href attribute to the temporary URL
        link.href = url;
        // Set the download attribute to specify the file name
        link.download = "converted_file.pdf";
        // Append the link to the document body
        document.body.appendChild(link);
        // Trigger a click event on the link to initiate download
        link.click();
        // Remove the link from the document body
        document.body.removeChild(link);
        // Revoke the temporary URL to release memory
        window.URL.revokeObjectURL(url);
        console.log("File uploaded successfully!");
      } else {
        // Handle error response here
        console.error("Failed to upload file:", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BackButton onClick={backButtonFunction} />
      <h1 className="text-3xl mb-6 text-center">PDF Conversion</h1>
      <h4 className="text-lg mb-6 text-center">
        Select a word document to convert to PDF.
      </h4>
      <p className="text-m mb-6 text-center">
        Select a word document. Supported formats: doc, docx.
      </p>
      <div
        className="border-dashed border-2 border-gray-300 p-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          id="fileInput"
          type="file"
          accept=".doc, .docx"
          onChange={handleFileChange}
          style={{ display: "none" }}
          ref={(input) => {
            if (input) {
              input.setAttribute("multiple", "false");
            }
          }}
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          {selectedFile ? (
            <p>Selected file: {selectedFile.name}</p>
          ) : (
            <p>Drag and drop file here or click to select</p>
          )}
        </label>
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="mx-0 my-auto">
          <button
            className="rounded-lg p-4"
            disabled={!selectedFile}
            style={hoverStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleSubmit}
          >
            START CONVERSION
          </button>
        </div>
      </div>
    </>
  );
};

export default PdfConversion;
