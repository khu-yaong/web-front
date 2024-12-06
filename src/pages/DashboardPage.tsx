import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "components/layout/Sidebar";
import { dashboardMenu } from "data/menu";
import { fetchMatchData } from "store/slices/matchSlice";
import { useAppDispatch } from "hooks/useAppDispatch";
import { teamInfo } from "data/dummy/dashboard";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMatchData());
  }, [dispatch]);

  return (
    <div
      className="bg-light3 flex mt-[74px]"
      style={{ minHeight: "calc(100vh - 74px)" }}
    >
      <Sidebar menu={dashboardMenu} />
      <div className="flex-1">
        <div className="flex flex-col bg-white px-14 py-1 xl:py-4 text-dark1">
          <h1 className="text-[45px] font-bold px-10 pt-4">{teamInfo.name}</h1>
          <div className="w-4/5 flex text-22px px-16 pt-3 my-1 justify-between items-center">
            <div className="flex flex-col items-center">
              <p className="text-dark2">경기</p>
              <p className="font-bold">{teamInfo.games}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-dark2">승</p>
              <p className="font-bold">{teamInfo.wins}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-dark2">패</p>
              <p className="font-bold">{teamInfo.defeats}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-dark2">무</p>
              <p className="font-bold">{teamInfo.ties}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-dark2">승률</p>
              <p className="font-bold">{teamInfo.winRate}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-dark2">최근 10경기</p>
              <p className="font-bold">{teamInfo.recentGames}</p>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
