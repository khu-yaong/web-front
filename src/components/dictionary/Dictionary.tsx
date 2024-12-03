import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import Word from "./Word";

export default function Dictionary() {
  return (
    <div className="flex-1">
      <div className="w-full py-4 lg:py-6 flex justify-around items-center bg-white">
        <h1 className="font-bold text-2xl lg:text-3xl">야구 사전</h1>
        <div className="relative w-3/5 flex items-center px-4">
          <input
            type="text"
            placeholder="용어를 검색하세요"
            className="w-full border-light1 border-2 rounded-3xl text-xs lg:text-sm xl:text-base px-5 py-4"
          />
          <HiOutlineSearch
            size={26}
            className="text-dark2 cursor-pointer -ml-12"
          />
        </div>
      </div>
      <Word />
    </div>
  );
}
