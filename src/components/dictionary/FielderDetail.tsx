import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerInfo, updatePlayerInfo } from "api/dictionaryApi";
import { clubs } from "data/clubs";
import { TbPencilMinus } from "react-icons/tb";
import Modal from "components/layout/Modal";

const FielderDetail: React.FC = () => {
  const { playerId } = useParams<Record<string, string>>();

  const [player, setPlayer] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 선수 정보 수정 요청값
  const [battingAverage, setBattingAverage] = useState(""); // 타율
  const [homeRuns, setHomeRuns] = useState(""); // 홈런
  const [rbis, setRbis] = useState(""); // 타점
  const [hits, setHits] = useState(""); // 안타
  const [stolenBases, setStolenBases] = useState(""); // 도루

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

  const openModal = async () => {
    setIsModalOpen(true);
  };

  const handleUpdatePlayer = async () => {
    try {
      const updatedData = {
        battingAverage,
        homeRuns,
        rbis,
        hits,
        stolenBases,
      };

      await updatePlayerInfo(playerId, updatedData);

      alert("정보 수정을 성공적으로 요청했습니다.");
    } catch (error) {
      alert("정보 수정 요청이 실패하였습니다.");
    }
  };

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
              <p className="mr-0.5">{player.position} | </p>
              <p className="mr-0.5">{player.hwSpec} | </p>
              <p>{player.birth} </p>
            </div>
            <div className="flex flex-col md:flex-row text-sm md:text-base xl:text-20px">
              <p className="mr-1">
                2024: AVG{" "}
                {player.fielderRecord.avg ? player.fielderRecord.avg : "-"} |
              </p>
              <p>
                OPS {player.fielderRecord.ops ? player.fielderRecord.ops : "-"}{" "}
              </p>
            </div>
          </div>
          <TbPencilMinus
            size="36"
            color="#999"
            className="mt-5 cursor-pointer"
            onClick={openModal}
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
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col h-[500px] items-center">
            <h3 className="font-bold text-20px mb-1">선수 정보 수정 요청</h3>
            <p className="text-dark2">수정할 정보를 입력해주세요</p>
            <div className="w-[450px] border rounded-md mt-6 p-8 flex flex-col gap-4">
              <div className="flex items-center justify-center">
                <label className="text-dark1 w-11">타율</label>
                <input
                  value={battingAverage}
                  onChange={(e) => setBattingAverage(e.target.value)}
                  className="w-36 border-b-2 border-light2 border-2 rounded-md p-1 text-dark2"
                />
              </div>
              <div className="flex items-center justify-center">
                <label className="text-dark1 w-11">홈런</label>
                <input
                  value={homeRuns}
                  onChange={(e) => setHomeRuns(e.target.value)}
                  className="w-36 border-b-2 border-light2 border-2 rounded-md p-1 text-dark2"
                />
              </div>
              <div className="flex items-center justify-center">
                <label className="text-dark1 w-11">타점</label>
                <input
                  value={rbis}
                  onChange={(e) => setRbis(e.target.value)}
                  className="w-36 border-b-2 border-light2 border-2 rounded-md p-1 text-dark2"
                />
              </div>
              <div className="flex items-center justify-center">
                <label className="text-dark1 w-11">안타</label>
                <input
                  value={hits}
                  onChange={(e) => setHits(e.target.value)}
                  className="w-36 border-b-2 border-light2 border-2 rounded-md p-1 text-dark2"
                />
              </div>
              <div className="flex items-center justify-center">
                <label className="text-dark1 w-11">도루</label>
                <input
                  value={stolenBases}
                  onChange={(e) => setStolenBases(e.target.value)}
                  className="w-36 border-b-2 border-light2 border-2 rounded-md p-1 text-dark2"
                />
              </div>
            </div>
            <div className="flex gap-x-10 mt-8 font-bold">
              <button
                className="w-[160px] border p-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button
                className="w-[160px] bg-main2 text-white p-2 rounded-md"
                onClick={handleUpdatePlayer}
              >
                수정 요청하기
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FielderDetail;
