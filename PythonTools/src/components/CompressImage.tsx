import React, { useState } from "react";
import BackButton from "./BackButton";
import DropDownItem from "./DropDownItem";
import { IoMdArrowDropdown } from "react-icons/io";

interface CompressImageProps {
  backButtonFunction: () => void;
}

const CompressImage: React.FC<CompressImageProps> = ({
  backButtonFunction,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [compressionLevel, setCompressionLevel] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (value: string) => {
    setCompressionLevel(value);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getSelectedValue = () => {
    switch (compressionLevel) {
      case "30":
        return "Low (30)";
      case "60":
        return "Medium (60)";
      case "90":
        return "High (90)";
      default:
        return "Select Compression Level";
    }
  };

  const [hovered, setHovered] = useState(false);

  const hoverStyle = {
    background:
      !selectedFile || compressionLevel === ""
        ? "#ccc"
        : hovered
        ? "blue"
        : "#77c3ec",
    cursor:
      !selectedFile || compressionLevel === "" ? "not-allowed" : "pointer",
  };

  // Allow to select a word document
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && isValidFileType(file)) {
      setSelectedFile(file);
    } else {
      alert("Please select a image file.");
    }
  };

  // Check if the file is a word document
  const isValidFileType = (file: File) => {
    const fileNameParts = file.name.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

    return (
      fileExtension === "png" ||
      fileExtension === "jpg" ||
      fileExtension === "jpeg"
    );
  };

  // Allows to drag and drop a document
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (file && isValidFileType(file)) {
      setSelectedFile(file);
    } else {
      alert("Please drop a image file.");
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
      formData.append("level", compressionLevel);
      const response = await fetch("http://localhost:5000/compressImg", {
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
        link.download = "compressed_img.png";

        // Append the link to the document body
        document.body.appendChild(link);

        // Trigger a click event on the link to initiate download
        link.click();

        // Remove the link from the document body
        document.body.removeChild(link);

        // Revoke the temporary URL to release memory
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to upload file:", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BackButton onClick={backButtonFunction} />
      <h1 className="text-3xl mb-6 text-center">Image Compression</h1>
      <h4 className="text-lg mb-6 text-center">
        Select level of compression, the lower the level the worst quality of
        the image.
      </h4>
      <p className="text-m mb-6 text-center">
        Select a image. Supported formats: jpeg, jpg, png
      </p>
      <div
        className="border-dashed border-2 border-gray-300 p-4 mb-6"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          id="fileInput"
          type="file"
          accept=".png, .jpg, jpeg, "
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
      {/* Select level of compression */}
      <h3 className="text-lg mb-6 text-center">
        Select your compression level:
      </h3>
      <div className="relative flex flex-col justify-center items-center">
        <button
          onClick={toggleDropdown}
          className="bg-green-500  text-white font-semibold py-2 px-4 min-w-[240px] rounded inline-flex items-center justify-between"
        >
          <span>{getSelectedValue()}</span>
          {/* Icon for dropdown, can be replaced with an actual icon */}

          <IoMdArrowDropdown className="h-4 w-4 ml-2" />
        </button>
        {isDropdownOpen && (
          <ul className="bg-green-500 absolute top-[55px] rounded-lg px-[10px] py-[20px] cursor-pointer w-[240px] z-10 before:content-[''] before:absolute before:top-[-5px] before:left-[10px] before:h-[20px] before:w-[20px] before:rotate-45 before:bg-green-500 ">
            <DropDownItem text="Low" value="30" onSelect={handleSelect} />
            <DropDownItem text="Medium" value="60" onSelect={handleSelect} />
            <DropDownItem text="High" value="90" onSelect={handleSelect} />
          </ul>
        )}
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="mx-0 my-auto">
          <button
            className="rounded-lg p-4"
            disabled={!selectedFile || compressionLevel === ""}
            style={hoverStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleSubmit}
          >
            COMPRESS IMAGE
          </button>
        </div>
      </div>
    </>
  );
};

export default CompressImage;
