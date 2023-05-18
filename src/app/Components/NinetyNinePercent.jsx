import React from "react";
import {
  blackLineCode99,
  firstGraphicTable99,
  footerWithImage99,
  footerWithoutImage99,
  secondGraphicTable99,
  singleGraphicTable99,
  underLyingStockImage99,
} from "./NinetyNine";

const NinetyNinePercent = () => {
  const handleCopy = (text) => {
    text === "blackLineCode" && navigator.clipboard.writeText(blackLineCode99);
    text === "footerWithImage" &&
      navigator.clipboard.writeText(footerWithImage99);
    text === "footerWithoutImage" &&
      navigator.clipboard.writeText(footerWithoutImage99);
    text === "underLyingStockImage" &&
      navigator.clipboard.writeText(underLyingStockImage99);
    text === "firstGraphicTable" &&
      navigator.clipboard.writeText(firstGraphicTable99);
    text === "secondGraphicTable" &&
      navigator.clipboard.writeText(secondGraphicTable99);
    text === "singleGraphicTable" &&
      navigator.clipboard.writeText(singleGraphicTable99);
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

export default NinetyNinePercent;
