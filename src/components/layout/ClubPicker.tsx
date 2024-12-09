import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clubs } from "data/clubs";

export default function ClubPicker() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (team: string | null) => {
    navigate(`?team=${team}`);
  };

  const isActive = (team: string) => {
    return location.search === `?team=${team}`;
  };

  return (
    <div className="w-full h-16 xl:h-19 sticky top-[73px] bg-white flex gap-4 xl:gap-6 mb-auto mx-auto px-2 justify-center items-center border-b-2 border-gray-200 overflow-x-auto ">
      <p
        className={`text-xs lg:text-base xl:text-lg ml-1 whitespace-nowrap cursor-pointer ${
          !location.search || isActive("")
            ? "border-b-2 border-main2 text-main2 font-bold"
            : "text-dark1"
        }`}
        onClick={() => handleClick("")}
      >
        ALL
      </p>
      {clubs.map((club, index) => (
        <div
          className={`flex items-center cursor-pointer ${
            isActive(club.aliases)
              ? "border-b-2 border-main2 text-main2 font-bold"
              : "text-dark1"
          }`}
          onClick={() => handleClick(club.aliases)}
        >
          <img
            key={index}
            src={club.imagePath}
            alt={club.title}
            className="w-8 h-8"
          />
          <p className="hidden md:block text-xs lg:text-base xl:text-lg ml-0 lg:ml-1 whitespace-nowrap">
            {club.title}
          </p>
        </div>
      ))}
    </div>
  );
}
