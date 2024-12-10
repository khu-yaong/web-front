import React, { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { GameData, Team } from "types/match";

export default function Score() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.match
  );

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  if (loading) return <div className="m-20 text-2xl">Loading...</div>;
  if (error)
    return (
      <p className="text-dark2 m-20 text-20px">
        조회할 수 있는 경기가 없습니다. 다시 선택해 주세요.
      </p>
    );

  if (!data) {
    return (
      <div className="m-20 text-xl">
        경기 날짜, 원정팀, 홈팀을 먼저 선택해 주세요.
      </div>
    );
  }

  const { gameData }: { gameData: GameData } = data;

  const teamsArray: Team[] = Object.values(gameData.teams);

  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const handleNext = () => {
    if (currentSlide < teamsArray.length - 1) setCurrentSlide(currentSlide + 1);
  };

  return (
    <div className="my-16 mx-8 px-10 relative overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${teamsArray.length * 100}%`,
        }}
      >
        {teamsArray.map((team, index) => (
          <div key={index} className="flex-shrink-0 w-full px-4 bg-whites">
            <div className="w-1/2 flex flex-col items-center">
              <div className="w-2/5 text-center text-2xl font-bold bg-main2 text-white p-3 rounded-lg">
                {team.teamInfo.teamName}
              </div>
              <table className="w-full items-ceter justify-center my-10 text-center bg-white shadow-lg rounded-mds">
                <thead className="mt-10 py-10 font-bold text-xl">
                  <tr className="font-bold">
                    <th className="px-4 pt-4 pb-2"></th>
                    <th className="px-4 pt-4 pb-2">타자</th>
                    <th className="px-4 pt-4 pb-2">타수</th>
                    <th className="px-4 pt-4 pb-2">득점</th>
                    <th className="px-4 pt-4 pb-2">안타</th>
                    <th className="px-4 pt-4 pb-2">타점</th>
                  </tr>
                </thead>
                <tbody>
                  {team.batters.map((batter, idx) => (
                    <tr key={idx} className="text-dark2 text-lg">
                      <td className="font-bold text-xl text-black pl-10">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-2">{batter.name}</td>
                      <td className="px-4 py-2">{batter.ab}</td>
                      <td className="px-4 py-2">{batter.runs}</td>
                      <td className="px-4 py-2">{batter.hits}</td>
                      <td className="px-4 py-2">{0}</td>
                    </tr>
                  ))}
                  <tr className="text-dark2 text-lg">
                    <td className="font-bold text-xl text-black pl-10">P</td>
                    <td className="px-4 pt-2 pb-4">
                      {team.pitchers[0]?.name || "-"}
                    </td>
                    <td className="px-4 pt-2 pb-4">
                      {team.pitchers[0]?.innings || "-"}이닝
                    </td>
                    <td className="px-4 pt-2 pb-4">
                      {team.pitchers[0]?.hits || "-"}안타
                    </td>
                    <td className="px-4 pt-2 pb-4">
                      {team.pitchers[0]?.strikeOuts || "-"}삼진
                    </td>
                    <td className="px-4 pt-2 pb-4">
                      {team.pitchers[0]?.strikeOuts || "-"}자책
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className={`absolute top-1/2 -left-2 transform -translate-y-1/2 p-2 rounded ${
          currentSlide === 0 ? "opacity-40 " : "opacity-100 cursor-pointer"
        }`}
        disabled={currentSlide === 0}
      >
        <HiOutlineChevronLeft size={35} />
      </button>
      <button
        onClick={handleNext}
        className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded ${
          currentSlide === teamsArray.length - 1
            ? "opacity-40"
            : "opacity-100 cursor-pointer"
        }`}
        disabled={currentSlide === teamsArray.length - 1}
      >
        <HiOutlineChevronRight size={35} />
      </button>
      <div className="flex gap-3 justify-center mt-2">
        {teamsArray.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full ${
              currentSlide === index ? "bg-main2" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
