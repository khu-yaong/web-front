import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { clubs } from "data/clubs";
import Scoreboard from "./Scoreboard";

export default function Dashboard() {
  const {
    data: matchInfo,
    loading,
    error,
  } = useSelector((state: RootState) => state.match);

  const getTeamLogo = (teamName: string) => {
    const club = clubs.find(
      (c) => c.title === teamName || c.aliases === teamName
    );
    return club?.imagePath || "/assets/images/logo.svg"; // 로고가 없으면 기본 이미지 사용
  };

  if (loading) return <div className="m-20 text-2xl">Loading...</div>;
  if (error) return <p className="text-red-600 m-20">{error}</p>;

  return (
    <div className="w-full">
      <div className="mx-16 mt-16 mb-2">
        <div className="bg-white shadow-sm my-8 px-24 py-10 flex justify-between items-center">
          <div className="flex items-center pl-10">
            <div className="flex flex-col text-xl">
              <p className="font-bold text-2xl ml-auto">
                {matchInfo?.awayTeam}
              </p>
              <p>투. {matchInfo?.pitcherAway}</p>
            </div>
            <img
              src={getTeamLogo(matchInfo?.awayTeam || "")}
              alt={`${matchInfo?.awayTeam} logo`}
              className="w-36 ml-10"
            />
          </div>
          <h1 className="text-4xl font-bold">{matchInfo?.awayScore}</h1>

          <div className="flex flex-col items-center text-xl gap-1">
            <p className="w-full text-2xl font-bold bg-green-600 text-white px-8 py-1 rounded-lg text-center">
              {matchInfo?.inning}
            </p>
            <p className="text-dark2">{matchInfo?.date}</p>
            <p className="text-dark2">{matchInfo?.time}</p>
            <p className="text-dark2">{matchInfo?.stadium}</p>
          </div>

          <h1 className="text-4xl font-bold">{matchInfo?.homeScore}</h1>
          <div className="flex items-center text-xl pr-10">
            <img
              src={getTeamLogo(matchInfo?.homeTeam || "")}
              alt={`${matchInfo?.homeTeam} logo`}
              className="w-36 mr-10"
            />
            <div className="flex flex-col">
              <p className="font-bold text-2xl">{matchInfo?.homeTeam}</p>
              <p>투. {matchInfo?.pitcherHome}</p>
            </div>
          </div>
        </div>
      </div>

      <Scoreboard />
    </div>
  );
}
