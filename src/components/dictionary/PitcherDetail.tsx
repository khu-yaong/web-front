import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerInfo } from "api/dictionaryApi";
import { clubs } from "data/clubs";
import { TbPencilMinus } from "react-icons/tb";

const PitcherDetail: React.FC = () => {
  const { playerId } = useParams<Record<string, string>>();

  const [player, setPlayer] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!playerId) {
        setError("잘못된 접근입니다.");
        return;
      }

      try {
        const response = await getPlayerInfo(playerId);
        setPlayer(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch player data.");
      }
    };

    fetchPlayerData();
  }, [playerId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!player) {
    return <div className="m-20">Loading...</div>;
  }

  function getClubImage(team: string): string {
    if (!team) {
      return "/assets/images/logo.svg";
    }
    const club = clubs.find(
      (club) => club.title === team || club.aliases === team
    );

    return club ? club.imagePath : "/assets/images/logo.svg";
  }

  const pitcherStats = [
    {
      label: "평균자책점(방어율)",
      value: player.pitcherRecord?.era,
      key: "ERA",
    },
    { label: "승리", value: player.pitcherRecord?.win, key: "W" },
    { label: "패배", value: player.pitcherRecord?.lose, key: "L" },
    { label: "세이브", value: player.pitcherRecord?.sv, key: "SV" },
    { label: "홀드", value: player.pitcherRecord?.hld, key: "HLD" },
    { label: "이닝", value: player.pitcherRecord?.ip, key: "IP" },
    { label: "삼진", value: player.pitcherRecord?.so, key: "SO" },
    { label: "피안타", value: player.pitcherRecord?.ha, key: "HA" },
    { label: "피홈런", value: player.pitcherRecord?.hra, key: "HR" },
    { label: "볼넷", value: player.pitcherRecord?.bb, key: "BB" },
    { label: "WHIP", value: player.pitcherRecord?.whip, key: "WHIP" },
  ];

  return (
    <div className="flex-1">
      <div
        key={player.playerId}
        className="w-full bg-white flex py-8 px-6 md:px-0 lg:px-24 xl:px-36"
      >
        <div className="mx-auto flex py-8 items-center xl:space-x-10 gap-2 lg:gap-4">
          <img
            src={
              player.team
                ? getClubImage(player.team)
                : "/assets/images/logo.svg"
            }
            alt={player.team || "unknown"}
            className="w-20 md:w-20 xl:w-36 ml-1.5"
          />
          <img
            src={player.profile}
            alt="profile"
            className="w-24 md:w-20 xl:w-36"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <h3 className="font-bold text-lg md:text-22px xl:text-27px">
                {player.name}
              </h3>
            </div>
            <div className="flex flex-col md:flex-row text-sm md:text-base xl:text-20px">
              <p className="mr-0.5">no.{player.no} |</p>
              <p className="mr-0.5">{player.position} |</p>
              <p className="mr-0.5">{player.hwSpec} |</p>
              <p className="mr-0.5">{player.birth} </p>
            </div>
            <div className="flex flex-col md:flex-row text-sm md:text-base xl:text-20px">
              <p className="mr-1">
                2024: ERA{" "}
                {player.pitcherRecord.era ? player.pitcherRecord.era : "-"} |
              </p>
              <p>
                WHIP{" "}
                {player.pitcherRecord.whip ? player.pitcherRecord.whip : "-"}{" "}
              </p>
            </div>
          </div>
          <TbPencilMinus
            size="36"
            color="#999"
            className="mt-5 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col mx-12 xl:mx-48 mt-4 mb-16">
        <h1 className="font-bold text-lg md:text-22px xl:text-27px my-8 items-baseline xl:px-10">
          세부 기록
        </h1>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-y-6 xl:gap-y-9 gap-x-4 lg:gap-x-12 xl:px-10">
          {pitcherStats.map((stat) => (
            <div
              key={stat.key}
              className="min-w-[300px] max-w-[550px] mr-auto lg:mr-0 flex flex-col"
            >
              <p className="w-full font-bold text-white text-lg lg:text-xl bg-[#999] text-center rounded-t-[10px] py-1">
                {stat.label}
              </p>
              <p className="w-full text-xl lg:text-3xl bg-white text-center rounded-b-[10px] py-4 border border-[#999]">
                {stat.value ?? "-"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PitcherDetail;
