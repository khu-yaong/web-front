import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import Word from "./Word";

export default function Dictionary() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex-1">
      <div className="w-full py-4 lg:py-6 flex justify-around items-center bg-white">
        <h1 className="font-bold text-2xl lg:text-3xl">야구 사전</h1>
        <div className="relative w-3/5 flex items-center px-4">
          <input
            type="text"
            placeholder="용어를 검색하세요"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full border-light1 border-2 rounded-3xl text-sm sm:text-lg lg:text-xl px-5 py-2 lg:py-3"
          />
          <HiOutlineSearch
            size={26}
            className="text-dark2 cursor-pointer -ml-12"
          />
        </div>
      </div>
      <Word searchQuery={searchQuery} />
    </div>
  );
}
