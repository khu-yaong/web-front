import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { fetchMp3Files, Mp3File, syncMp3Files } from "api/songApi";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { clubs } from "data/clubs";

export default function Song() {
  const [songs, setSongs] = useState<Mp3File[]>([]);
  const [currentSong, setCurrentSong] = useState<Mp3File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [category, setCategory] = useState("공식");
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const team = useSelector((state: RootState) => state.member.team);
  const audioRef = useRef<HTMLAudioElement>(null);
  const teamName = team ? getTeamName(team) : "";

  function getTeamName(team: string | null): string {
    if (!team) {
      return "";
    }
    const club = clubs.find((club) => team === club.aliases);

    return club ? club.title : "";
  }

  useEffect(() => {
    const loadSongs = async () => {
      try {
        await syncMp3Files();

        const data = await fetchMp3Files(teamName, category);
        setSongs(data);

        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };

    loadSongs();
  }, [token, teamName, category]);

  const playSong = (song: Mp3File) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.play();
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 0);
      };

      audio.addEventListener("loadedmetadata", updateProgress);
      audio.addEventListener("timeupdate", updateProgress);

      return () => {
        audio.removeEventListener("loadedmetadata", updateProgress);
        audio.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [audioRef.current]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
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

  function getClubColor(team: any): string {
    if (!team) {
      return "";
    }
    const club = clubs.find(
      (club) => club.title === team || club.aliases === team
    );

    return club ? club.color : "";
  }

  if (isLoading) {
    return <div className="m-20">Loading...</div>;
  }

  return (
    <div className="flex-1">
      <div
        className="w-full h-32 sm:h-48 xl:h-64 flex flex-row text-white items-baseline justify-between px-7 sm:px-16 xl:px-24"
        style={{ backgroundColor: getClubColor(team) }}
      >
        <h1 className="font-bold text-3xl sm:text-4xl xl:text-5xl mt-16 sm:mt-28 xl:mt-40">
          {team}
        </h1>
      </div>
      <div className="flex flex-col gap-7 xl:gap-9 p-7 sm:p-12 xl:px-36 xl:pt-16 mb-28">
        <div className="flex text-base xl:text-xl font-bold text-center">
          <div
            className={`w-20 xl:w-24 rounded-xl p-2 mr-4 cursor-pointer ${
              category === "공식"
                ? "bg-dark1 text-white"
                : "bg-light2 text-dark4"
            }`}
            onClick={() => handleCategoryChange("공식")}
          >
            팀
          </div>
          <div
            className={`w-20 xl:w-24 rounded-xl p-2 cursor-pointer ${
              category === "선수"
                ? "bg-dark1 text-white"
                : "bg-light2 text-dark4"
            }`}
            onClick={() => handleCategoryChange("선수")}
          >
            선수
          </div>
        </div>
        <p className="text-dark4 border-b-2 pb-3 text-lg xl:text-xl">
          총 {songs.length}곡
        </p>
        {songs.map((song, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center border-b-2 pb-4"
            onClick={() => playSong(song)}
          >
            <div className="text-xl w-16 text-center">{index + 1}</div>
            <div
              className="rounded-3xl size-16 xl:size-20 flex items-center justify-center ml-0 sm:ml-2 mr-3 xl:mr-5"
              style={{ backgroundColor: getClubColor(team) }}
            >
              <img
                src={team ? getClubImage(team) : ""}
                alt={team || "unknown"}
                className="w-11 xl:w-16"
              />
            </div>
            <div className="flex flex-col justify-center gap-y-1 cursor-pointer">
              <h1 className="text-xl xl:text-2xl font-bold">{song.name}</h1>
              <p className="p-0 text-lg xl:text-xl text-gray text-dark4">
                {song.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {currentSong && (
        <div className="fixed bottom-0 right-0 md:left-[250px] xl:left-[280px] bg-white p-6 z-50 w-full md:w-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">{currentSong.name}</h2>
              <p className="text-sm text-gray-500">{currentSong.category}</p>
            </div>
            <button
              className="bg-main2 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-green-600"
              onClick={togglePlay}
            >
              {isPlaying ? <FaPause /> : <FaPlay className="ml-px" />}
            </button>
          </div>

          <div
            className="bg-gray-300 rounded-full h-3 cursor-pointer mt-4"
            onClick={handleProgressClick}
          >
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>

          <audio ref={audioRef} preload="metadata" />
        </div>
      )}
    </div>
  );
}
