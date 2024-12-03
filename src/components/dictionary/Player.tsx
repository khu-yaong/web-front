import React, { useState, useEffect } from "react";
import { getPlayers } from "api/dictionaryApi";
import { HiOutlineSearch } from "react-icons/hi";
import ClubPicker from "components/layout/ClubPicker";
import { BaseballPlayer } from "types/player";

export default function Player() {
  const [players, setPlayers] = useState<BaseballPlayer[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [cursorName, setCursorName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        const playersData = await getPlayers(1000, cursorId, cursorName);
        setPlayers(playersData);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [cursorId, cursorName]);

  return (
    <div className="flex-1">
      <ClubPicker />
      <div className="w-[350px] sm:w-4/5 relative flex items-center mx-auto my-6 xl:my-12">
        <input
          type="text"
          placeholder="궁금한 야구 선수가 있나요?"
          className="w-full border-light1 border-2 rounded-3xl text-xs lg:text-sm xl:text-base px-6 xl:px-10 py-3 xl:py-4"
        />
        <HiOutlineSearch
          size={26}
          className="text-dark2 cursor-pointer -ml-12"
        />
      </div>

      {isLoading ? (
        <div className="m-5 lg:m-10">Loading...</div>
      ) : (
        <div className="w-[350px] sm:w-4/5 flex flex-col gap-5 mx-auto mb-12">
          {players.map((player, index) => (
            <div
              key={player.playerId}
              className="w-full bg-white flex flex-col sm:flex-row p-9 gap-9 xl:gap-20 items-center"
            >
              <div className="w-40 xl:w-56" />
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <h3 className="font-bold text-2xl xl:text-3xl">
                    {player.name}
                  </h3>
                  <h3 className="">{player.team}</h3>
                </div>
                <div className="flex flex-col lg:flex-row text-20px gap-1">
                  <p>no.{player.no} |</p>
                  <p>{player.position} |</p>
                  <p>{player.hwSpec} |</p>
                  <p>{player.birth} </p>
                </div>
                <div className="flex flex-col lg:flex-row text-20px gap-2">
                  <p>AVG {player.avg ? player.avg : "-"} |</p>
                  <p>OPS {player.ops ? player.ops : "-"} |</p>
                  <p>ERA {player.era ? player.era : "-"}</p>
                  <p>IP {player.ip ? player.ip : "-"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
