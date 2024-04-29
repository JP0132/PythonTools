import React, { useState } from "react";

// Components
import ToolButtons from "./components/ToolButtons";
import PdfConversion from "./components/PdfConversion";
import BackgroundRemover from "./components/BackgroundRemover";
import CompressImage from "./components/CompressImage";

// React Icons
import { FaFilePdf } from "react-icons/fa6";
import { PiSelectionBackgroundDuotone } from "react-icons/pi";
import { FaCompressAlt } from "react-icons/fa";

const App: React.FC = () => {
  // To show the tool selection components
  const [selection, setSelection] = useState(true);

  // Show the pdf conversion page
  const [pdfConversion, setPdfConversion] = useState(false);

  // Show the remove background page
  const [removeBg, setRemoveBg] = useState(false);

  // Show the compress a image page
  const [compressImg, setCompressImg] = useState(false);

  const tools = [
    {
      name: "PDF Conversion",
      description:
        "Converting files to pdf. Currently converting word documents to pdfs only.",
      icon: FaFilePdf,
      hoverColour: "#FF6865",
      colour: "red",
      action: () => {
        setSelection(false);
        setPdfConversion(true);
      },
    },
    {
      name: "Background Remover",
      description:
        "Using a python AI package, it removes the background of an image.",
      icon: PiSelectionBackgroundDuotone,
      hoverColour: "#77c3ec",
      colour: "blue",
      action: () => {
        setSelection(false);
        setRemoveBg(true);
      },
    },
    {
      name: "Image Compressor",
      description:
        "Compresses the image using Pillow. Select what level of compression you want.",
      icon: FaCompressAlt,
      hoverColour: "#9FE2BF",
      colour: "green",
      action: () => {
        setSelection(false);
        setCompressImg(true);
      },
    },
  ];
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-900">
      <div className="bg-slate-700 p-8 rounded-lg w-[900px] h-[600px]">
        {selection && (
          <>
            <h1 className="text-3xl mb-6 text-center">
              Select which Tool you want to use:
            </h1>
            <div className="flex flex-row gap-4 justify-center">
              {tools.map(
                (tool, index) =>
                  tool.colour && (
                    <ToolButtons
                      key={index}
                      name={tool.name}
                      description={tool.description}
                      icon={tool.icon}
                      hoverColour={tool.hoverColour}
                      colour={tool.colour}
                      onClick={tool.action}
                    />
                  )
              )}
            </div>
          </>
        )}
        {pdfConversion && (
          <PdfConversion
            backButtonFunction={() => {
              setSelection(true);
              setPdfConversion(false);
            }}
          />
        )}
        {removeBg && (
          <BackgroundRemover
            backButtonFunction={() => {
              setSelection(true);
              setRemoveBg(false);
            }}
          />
        )}
        {compressImg && (
          <CompressImage
            backButtonFunction={() => {
              setSelection(true);
              setCompressImg(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
