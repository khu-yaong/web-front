import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerInfo } from "api/dictionaryApi";
import { clubs } from "data/clubs";
import { TbPencilMinus } from "react-icons/tb";
import Modal from "components/layout/Modal";
import axios from "axios";

const FIELD_LABELS: { [key: string]: string } = {
  era: "평균자책점",
  win: "승리",
  lose: "패배",
  sv: "세이브",
  hld: "홀드",
  so: "삼진",
  ha: "피안타",
  hra: "(피)홈런",
  bb: "볼넷",
  whip: "WHIP",
};

const PitcherDetail: React.FC = () => {
  const { playerId } = useParams<Record<string, string>>();

  const [player, setPlayer] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 선수 정보 수정 요청값
  const [fields, setFields] = useState<{
    [key: string]: { value: string; checked: boolean };
  }>(
    Object.keys(FIELD_LABELS).reduce((acc, key) => {
      acc[key] = { value: "", checked: false };
      return acc;
    }, {} as { [key: string]: { value: string; checked: boolean } })
  );

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

  function getClubImage(team: string): string {
    if (!team) {
      return "/assets/images/logo.svg";
    }
    const club = clubs.find(
      (club) => club.title === team || club.aliases === team
    );

    return club ? club.imagePath : "/assets/images/logo.svg";
  }

  const handleFieldChange = (key: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }));
  };

  const toggleFieldCheck = (key: string) => {
    setFields((prev) => ({
      ...prev,
      [key]: { ...prev[key], checked: !prev[key].checked },
    }));
  };

  const updateStats = async () => {
    const url = `http://34.237.154.47:8080/players/${playerId}/pitchers`;
    const token = localStorage.getItem("accessToken");

    const data = Object.entries(fields)
      .filter(([_, field]) => field.checked)
      .reduce<{ [key: string]: number }>((acc, [key, field]) => {
        const numericValue = parseFloat(field.value);
        if (!isNaN(numericValue)) {
          acc[key] = numericValue;
        }
        return acc;
      }, {});

    if (Object.keys(data).length === 0) {
      alert("수정할 값을 선택해주세요.");
      return;
    }

    try {
      const response = await axios.patch(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response:", response.data);
      alert("정보 수정이 성공적으로 요청되었습니다.");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating pitcher data:", error);
      alert("정보 수정 요청이 실패하였습니다.");
    }
  };

  const pitcherStats = Object.entries(FIELD_LABELS).map(([key, label]) => ({
    label,
    value: player.fielderRecord?.[key] || "-",
    key,
  }));

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
          <div className="flex flex-col h-[560px] items-center">
            <h3 className="font-bold text-20px mb-1">선수 정보 수정 요청</h3>
            <p className="text-dark2">수정할 정보를 입력해주세요</p>
            <div className="w-[600px] grid grid-cols-2 border rounded-md mt-6 p-8 flex-col gap-4">
              {Object.entries(fields).map(([key, field]) => (
                <div
                  key={key}
                  className="flex items-center my-2 justify-between"
                >
                  <label className="text-dark1">{FIELD_LABELS[key]}</label>
                  <input
                    type="checkbox"
                    checked={field.checked}
                    onChange={() => toggleFieldCheck(key)}
                  />
                  <input
                    value={field.value}
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                    className="w-36 border-b-2 border-light2 border-2 rounded-md p-1 text-dark2"
                    disabled={!field.checked} // 체크박스가 체크되지 않으면 입력 불가능
                  />
                </div>
              ))}
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
                onClick={updateStats}
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

export default PitcherDetail;
