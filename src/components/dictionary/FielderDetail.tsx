import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerInfo } from "api/dictionaryApi";
import { clubs } from "data/clubs";

const FielderDetail: React.FC = () => {
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
      label: "타율",
      value: player.fielderRecord?.avg,
      key: "AVG",
    },
    { label: "홈런", value: player.fielderRecord?.hr, key: "HR" },
    { label: "안타", value: player.fielderRecord?.h, key: "H" },
    { label: "득점", value: player.fielderRecord?.r, key: "R" },
    { label: "타점", value: player.fielderRecord?.rbi, key: "RBI" },
    { label: "도루", value: player.fielderRecord?.sb, key: "SB" },
    { label: "출루율", value: player.fielderRecord?.obp, key: "OBP" },
    { label: "OPS", value: player.fielderRecord?.ops, key: "OPS" },
  ];

  return (
    <div className="flex-1">
      <div
        key={player.playerId}
        className="w-full bg-white flex py-8 px-8 md:px-10 lg:px-24 xl:px-36"
      >
        <div className="xl:px-24 flex py-8 items-center xl:space-x-16">
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
            <div className="flex flex-col sm:flex-row text-sm md:text-base xl:text-20px gap-px lg:gap-1">
              <p>no.{player.no} |</p>
              <p>{player.position} |</p>
              <p>{player.hwSpec} |</p>
              <p>{player.birth} </p>
            </div>
            <div className="flex flex-col sm:flex-row text-sm md:text-base xl:text-20px gap-2">
              <p>
                2024: AVG{" "}
                {player.fielderRecord.avg ? player.fielderRecord.avg : "-"} |
              </p>
              <p>
                OPS {player.fielderRecord.ops ? player.fielderRecord.ops : "-"}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-12 xl:mx-48 mt-4 mb-16">
        <h1 className="font-bold text-lg md:text-22px xl:text-27px my-8 items-baseline xl:px-16">
          세부 기록
        </h1>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-y-6 xl:gap-y-9 gap-x-4 lg:gap-x-12 xl:px-16">
          {pitcherStats.map((stat) => (
            <div
              key={stat.key}
              className="min-w-[300px] max-w-[550px] flex flex-col"
            >
              <p className="w-full font-bold text-white text-xl bg-[#999] text-center rounded-t-[10px] py-1">
                {stat.label}
              </p>
              <p className="w-full text-3xl bg-white text-center rounded-b-[10px] py-4 border border-[#999]">
                {stat.value ?? "-"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FielderDetail;
