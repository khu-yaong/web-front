import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { fetchMp3Files, Mp3File, syncMp3Files } from "api/songApi";

export default function Song() {
  const [songs, setSongs] = useState<Mp3File[]>([]);
  const [currentSong, setCurrentSong] = useState<Mp3File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [category, setCategory] = useState("공식");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const syncData = await syncMp3Files();
        console.log(syncData);

        const data = await fetchMp3Files("기아", category);
        setSongs(data);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };

    loadSongs();
  }, [category]);

  const playSong = (song: Mp3File) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.play();
    }
    console.log(duration);
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
        setDuration(audio.duration);
      };

      audio.addEventListener("loadedmetadata", updateProgress);
      audio.addEventListener("timeupdate", updateProgress);

      return () => {
        audio.removeEventListener("loadedmetadata", updateProgress);
        audio.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, []);

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

  return (
    <div className="flex-1">
      <div className="w-full h-32 sm:h-48 xl:h-64 bg-dark2 flex flex-row text-white items-baseline justify-between px-7 sm:px-16 xl:px-24">
        <h1 className="font-bold text-3xl sm:text-4xl xl:text-5xl mt-16 sm:mt-28 xl:mt-40">
          KIA TIGERS
        </h1>
        <p className="sm:text-lg xl:text-2xl">구단 바꾸기</p>
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
            <div className="bg-kia rounded-3xl size-16 xl:size-20 flex items-center justify-center ml-0 sm:ml-2 mr-3 xl:mr-5">
              <p className=" text-white font-bold text-xl xl:text-2xl">KIA</p>
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
        <div className="fixed bottom-0 right-0 md:left-[260px] xl:left-[310px] bg-white p-6 z-50 w-full md:w-auto">
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
