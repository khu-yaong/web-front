import React, { useState, useEffect } from "react";
import { getPlayers } from "api/dictionaryApi";
import {
  HiOutlineSearch,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import ClubPicker from "components/layout/ClubPicker";
import { BaseballPlayer } from "types/player";
import { clubs } from "data/clubs";
import useDebounce from "hooks/useDebounce";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Player() {
  const navgaite = useNavigate();
  const [players, setPlayers] = useState<BaseballPlayer[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [cursorName, setCursorName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [wordsPerPage] = useState(10);

  const [searchParams] = useSearchParams();
  const team = searchParams.get("team") || null;

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchPlayers = async (query: string) => {
      setIsLoading(true);
      try {
        const playersData = await getPlayers(
          1000,
          cursorId,
          cursorName,
          team,
          query
        );
        setPlayers(playersData);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers(debouncedSearchQuery);
  }, [cursorId, cursorName, debouncedSearchQuery, team]);

  const indexOfLastPlayer = currentPage * wordsPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - wordsPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(players.length / wordsPerPage);

  const getDisplayedPages = (): number[] => {
    const pagesToShow: number[] = [];
    const rangeSize = 7; // 한 구간에 표시할 페이지 수

    // 현재 페이지가 속한 구간의 시작/끝 페이지 계산
    const rangeStart =
      Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1;
    const rangeEnd = Math.min(rangeStart + rangeSize - 1, totalPages);

    // 구간의 페이지를 배열에 추가
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pagesToShow.push(i);
    }

    return pagesToShow;
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex-1">
      <ClubPicker />
      <div className="w-[350px] sm:w-4/5 relative flex items-center mx-auto my-6 xl:my-12">
        <input
          type="text"
          placeholder="궁금한 야구 선수가 있나요?"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full border-light1 border-2 rounded-3xl text-xs lg:text-sm xl:text-base px-6 xl:px-10 py-3 xl:py-4"
        />
        <HiOutlineSearch
          size={26}
          className="text-dark2 cursor-pointer -ml-12"
        />
      </div>

      {isLoading ? (
        <div className="m-5 lg:m-20">Loading...</div>
      ) : (
        <div className="w-[350px] sm:w-4/5 flex flex-col gap-5 mx-auto mb-12">
          {currentPlayers.map((player, index) => (
            <div
              key={player.playerId}
              className="w-full bg-white flex flex-col sm:flex-row p-9 gap-9 xl:gap-20 items-center cursor-pointer"
              onClick={() => {
                player.position === "투수"
                  ? navgaite(`pitcher/${player.playerId}`)
                  : navgaite(`fielder/${player.playerId}`);
              }}
            >
              <img
                src={player.profile}
                alt="profile"
                className="ml-16 w-[150px]"
              />
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <h3 className="font-bold text-2xl xl:text-3xl">
                    {player.name}
                  </h3>
                  <img
                    src={player.team ? getClubImage(player.team) : ""}
                    alt={player.team || "unknown"}
                    className="w-11 xl:w-14 ml-1.5"
                  />
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
          {!searchQuery && !isLoading && (
            <div className="flex justify-center mt-10">
              {currentPage > 1 ? (
                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(1, prev - 1));
                    window.scrollTo(0, 0);
                  }}
                  className="w-12 h-12 mx-1 xl:mx-1.5 bg-gray-200 hover:bg-emerald-500 hover:text-white text-black rounded justify-center"
                >
                  <HiOutlineChevronLeft size={25} className="w-full" />
                </button>
              ) : (
                <div className="w-12 h-12 mx-1 xl:mx-1.5" />
              )}
              {getDisplayedPages().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-12 h-12 mx-1 mb-5 md:my-auto xl:mx-1.5 text-sm sm:text-lg xl:text-xl ${
                    page === currentPage
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-200 hover:bg-emerald-500 hover:text-white text-black"
                  } rounded`}
                >
                  {page}
                </button>
              ))}
              {currentPage < totalPages ? (
                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                    window.scrollTo(0, 0);
                  }}
                  className="w-12 h-12 mx-1 xl:mx-1.5 bg-gray-200 hover:bg-emerald-500 hover:text-white text-black rounded justify-center"
                >
                  <HiOutlineChevronRight size={25} className="w-full" />
                </button>
              ) : (
                <div className="w-12 h-12 mx-1 xl:mx-1.5" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
