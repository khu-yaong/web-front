import React from "react";
import BallCount from "./BallCount";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

export default function Scoreboard() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.match
  );

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
        경기 날짜, 원정팀, 홈팀을 먼저 선택해 주세요
      </div>
    );
  }

  const {
    formattedInningScoresHome,
    formattedInningScoresAway,
    summaryStats,
    ballCount,
    strikeCount,
    outCount,
    baseRunners,
  } = data;

  return (
    <div className="bg-white mx-16 my-4 p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">스코어보드</h2>
      <div className="overflow-x-auto flex p-6 text-xl">
        <BallCount
          ballCount={ballCount}
          strikeCount={strikeCount}
          outCount={outCount}
          baseRunners={baseRunners}
        />
        <table className="table-auto w-full ml-6 my-2 text-center border-collapse">
          <thead>
            <tr className="bg-gray-200">
              {[
                "",
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                "R",
                "H",
                "E",
                "B",
              ].map((col, idx) => (
                <th key={idx} className="px-2 py-1">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-bold">{data.awayTeam}</td>
              {formattedInningScoresAway.map((score, idx) => (
                <td key={idx} className="px-2 py-1">
                  {score}
                </td>
              ))}
              <td className="px-2 py-1">{summaryStats[1]?.R || "-"}</td>
              <td className="px-2 py-1">{summaryStats[1]?.H || "-"}</td>
              <td className="px-2 py-1">{summaryStats[1]?.E || "-"}</td>
              <td className="px-2 py-1">{summaryStats[1]?.B || "-"}</td>
            </tr>
            <tr>
              <td className="font-bold">{data.homeTeam}</td>
              {formattedInningScoresHome.map((score, idx) => (
                <td key={idx} className="px-2 py-1">
                  {score}
                </td>
              ))}
              <td className="px-2 py-1">{summaryStats[0]?.R || "-"}</td>
              <td className="px-2 py-1">{summaryStats[0]?.H || "-"}</td>
              <td className="px-2 py-1">{summaryStats[0]?.E || "-"}</td>
              <td className="px-2 py-1">{summaryStats[0]?.B || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
