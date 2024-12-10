import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "components/layout/Sidebar";
import { dashboardMenu } from "data/menu";
import { useAppDispatch } from "hooks/useAppDispatch";
import { fetchMatchData } from "store/slices/matchSlice";

const teamCodes: Record<string, string> = {
  롯데: "LT",
  두산: "BO",
  SSG: "SK",
  NC: "NC",
  KIA: "HT",
  키움: "WO",
  LG: "LG",
  한화: "HH",
  KT: "KT",
  삼성: "SS",
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [homeTeam, setHomeTeam] = useState("");

  const handleSearch = async () => {
    if (!date || !awayTeam || !homeTeam) {
      alert("날짜, 원정팀, 홈팀을 모두 선택해주세요.");
      return;
    }

    if (!/^\d{8}$/.test(date)) {
      alert("날짜는 YYYYMMDD 형식으로 입력해야 합니다.");
      return;
    }

    const apiUrl = `http://34.237.154.47:8080/api/fetch-aspx?id=${date}${teamCodes[awayTeam]}${teamCodes[homeTeam]}0`;

    try {
      await dispatch(fetchMatchData({ apiUrl })).unwrap();
    } catch (error) {
      console.error("경기날짜, 원정팀, 홈팀을 올바르게 입력해 주세요.");
      alert("경기날짜, 원정팀, 홈팀을 올바르게 입력해 주세요.");
    }
  };

  return (
    <div className="bg-light3 flex mt-[74px]">
      <Sidebar menu={dashboardMenu} />
      <div className="flex-1">
        <div className="flex flex-col bg-white px-14 py-1 xl:py-4 text-dark1">
          <h1 className="text-3xl font-bold px-10 my-6">경기 검색</h1>
          <div className="w-4/5 flex text-20px px-9 space-x-12 items-center">
            <div className="w-80 flex items-center">
              <label className="w-40 p-2 flex items-center">
                날짜<span className="text-dark2 text-sm">(YYYYMMDD)</span>
              </label>
              <input
                className="w-40 p-2 border-2 border-light1 rounded-lg text-dark1"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="w-80 flex items-center gap-2">
              <label htmlFor="teamAway">원정팀 선택</label>
              <select
                id="teamAway"
                name="teamAway"
                className="block bg-lightGreen border-b-2 border-light2 p-3 text-dark1 leading-tight focus:outline-green-700 cursor-pointer"
                value={awayTeam}
                onChange={(e) => setAwayTeam(e.target.value)}
              >
                {Object.keys(teamCodes).map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-80 flex items-center gap-2">
              <label htmlFor="teamHome">홈팀 선택</label>
              <select
                id="teamHome"
                name="teamHome"
                className="block bg-lightGreen border-b-2 border-light2 p-3 text-dark1 leading-tight focus:outline-green-700 cursor-pointer"
                value={homeTeam}
                onChange={(e) => setHomeTeam(e.target.value)}
              >
                {Object.keys(teamCodes).map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSearch}
              className="w-24 bg-main2 hover:bg-main1 text-white px-2 py-2 rounded-lg"
            >
              검색
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
