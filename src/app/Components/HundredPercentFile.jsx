import React from "react";
import {
  blackLineCode100,
  firstGraphicTable100,
  footerWithImage100,
  footerWithoutImage100,
  secondGraphicTable100,
  singleGraphicTable100,
  underLyingStockImage100,
} from "./Hundred";

const HundredPercentFile = () => {
  const handleCopy = (text) => {
    text === "blackLineCode" && navigator.clipboard.writeText(blackLineCode100);
    text === "footerWithImage" &&
      navigator.clipboard.writeText(footerWithImage100);
    text === "footerWithoutImage" &&
      navigator.clipboard.writeText(footerWithoutImage100);
    text === "underLyingStockImage" &&
      navigator.clipboard.writeText(underLyingStockImage100);
    text === "firstGraphicTable" &&
      navigator.clipboard.writeText(firstGraphicTable100);
    text === "secondGraphicTable" &&
      navigator.clipboard.writeText(secondGraphicTable100);
    text === "singleGraphicTable" &&
      navigator.clipboard.writeText(singleGraphicTable100);
  };
  return (
    <div className="grid grid-cols-1 gap-4">
      <button
        onClick={() => handleCopy("blackLineCode")}
        className="w-full text-base bg-[#53ddf2] px-2 py-1 rounded text-black hover:bg-black hover:text-white"
      >
        Black Line Code
      </button>
      <button
        onClick={() => handleCopy("footerWithImage")}
        className="w-full text-base bg-[#53ddf2] px-2 py-1 rounded text-black hover:bg-black hover:text-white"
      >
        Footer With Image
      </button>
      <button
        onClick={() => handleCopy("footerWithoutImage")}
        className="w-full text-base bg-[#53ddf2] px-2 py-1 rounded text-black hover:bg-black hover:text-white"
      >
        Footer Without Image
      </button>
      <button
        onClick={() => handleCopy("underLyingStockImage")}
        className="w-full text-base bg-[#53ddf2] px-2 py-1 rounded text-black hover:bg-black hover:text-white"
      >
        Underlying Stock Image
      </button>
      <button
        onClick={() => handleCopy("firstGraphicTable")}
        className="w-full text-base bg-[#53ddf2] px-2 py-1 rounded text-black hover:bg-black hover:text-white"
      >
        1st Graphic Table
      </button>
      <button
        onClick={() => handleCopy("secondGraphicTable")}
        className="w-full text-base bg-[#53ddf2] px-2 py-1 rounded text-black hover:bg-black hover:text-white"
      >
        2nd Graphic Table
      </button>
      <button
        onClick={() => handleCopy("singleGraphicTable")}
        className="w-full text-base bg-[#53ddf2] px-2 py-1 rounded text-black hover:bg-black hover:text-white"
      >
        Single Graphic Table
      </button>
    </div>
  );
};

export default HundredPercentFile;
