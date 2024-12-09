import React, { useState } from "react";
import {
  HiCheck,
  HiX,
  HiOutlinePencil,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { clubs } from "data/clubs";
import axios from "axios";

const WriteDiary: React.FC = () => {
  const matchDate = useSelector(
    (state: RootState) => state.calendar.selectedDate
  );

  const [isWriting, setIsWriting] = useState(false);
  const [place, setPlace] = useState("");
  const [seat, setSeat] = useState("");
  const [team1, setTeam1] = useState(clubs[0]);
  const [team2, setTeam2] = useState(clubs[1]);
  const [team1Score, setTeam1Score] = useState("");
  const [team2Score, setTeam2Score] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);

    // 이미지 미리보기 설정
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!place || !team1 || !team2 || !content) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    if (!matchDate) {
      alert("날짜가 선택되지 않았습니다.");
      return;
    }

    const formData = new FormData();

    formData.append(
      "requestDto",
      new Blob(
        [
          JSON.stringify({
            matchDate,
            place,
            team1: team1.title,
            team1Score: parseInt(team1Score) || 0,
            team2: team2.title,
            team2Score: parseInt(team2Score) || 0,
            seat,
            content,
            imageUrl: image ? image.name : "",
          }),
        ],
        { type: "application/json" }
      )
    );
    if (image) {
      formData.append("image", image);
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://34.237.154.47:8080/users/me/game_diaries",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("응답 데이터:", response.data);
      alert("관람 일지가 성공적으로 저장되었습니다.");
      window.location.reload();
      setPlace("");
      setTeam1(clubs[0]);
      setTeam1Score("");
      setTeam2(clubs[1]);
      setTeam2Score("");
      setSeat("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("일지 저장 중 오류 발생:", error);
      alert("관람 일지를 저장하는 중에 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
      setIsWriting(false);
    }
  };

  return (
    <div className="w-auto md:w-[450px] lg:w-auto xl:w-full xl:max-w-[660px] lg:flex-1 mx-5 lg:ml-0 lg:my-20 p-6 sm:p-10 xl:py-10 xl:px-13 bg-white shadow border flex flex-col gap-y-2">
      {/* Match Date */}
      <div className="flex justify-between items-center my-5 mb-10">
        {isWriting ? (
          <HiX
            className="size-6 xl:size-8 text-dark2 hover:text-dark1 cursor-pointer"
            onClick={() => setIsWriting(!isWriting)}
          />
        ) : (
          <div className="sie-6 size-8"></div>
        )}

        <h2 className="text-xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
          {matchDate}
        </h2>
        <button className="text-dark2 hover:text-dark1">
          {isWriting ? (
            isLoading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-dark2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              </div>
            ) : (
              <HiCheck className="size-7 xl:size-9" onClick={handleSubmit} />
            )
          ) : (
            <HiOutlinePencil
              className="size-6 xl:size-8"
              onClick={() => setIsWriting(true)}
            />
          )}
        </button>
      </div>

      {/* Match Place */}
      {isWriting ? (
        <>
          <div className="flex flex-col xl:flex-row gap-y-2 mb-4 xl:items-center">
            <label className="w-12 block font-semibold text-dark1 text-lg xl:text-xl xl:mr-2">
              장소
            </label>
            <input
              type="text"
              name="match_place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="w-full px-2 py-1.5 xl:px-3 xl:py-2 border rounded-md text-lg xl:text-xl"
            />
          </div>

          {/* Seat */}
          <div className="flex flex-col xl:flex-row gap-y-2 mb-4 xl:items-center">
            <label className="w-12 block font-semibold text-dark1 text-lg xl:text-xl xl:mr-2">
              자리
            </label>
            <input
              type="text"
              name="seat"
              value={seat}
              onChange={(e) => setSeat(e.target.value)}
              className="w-full px-2 py-1.5 xl:px-3 xl:py-2 border rounded-md text-lg xl:text-xl"
            />
          </div>

          {/* Match Score */}
          <div className="flex flex-col xl:flex-row mb-2 xl:mb-4 xl:items-center ">
            <label className="w-15 block font-semibold text-dark1 text-lg xl:text-xl mr-3">
              스코어
            </label>
            <div className="flex items-center gap-x-6">
              {/* Team Selection - Team 1 */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    onClick={() => setIsDropdownOpen1(!isDropdownOpen1)}
                    className="flex items-center cursor-pointer"
                  >
                    <img
                      src={team1.imagePath}
                      alt={team1.title}
                      className="w-12 h-12"
                    />
                  </div>
                  {isDropdownOpen1 && (
                    <ul className="absolute z-10 bg-white border rounded-md mt-2 w-[160px] max-h-40 overflow-y-auto">
                      {clubs.map((club) => (
                        <li
                          key={club.title}
                          onClick={() => {
                            setTeam1(club);
                            setIsDropdownOpen1(false);
                          }}
                          className="flex items-center gap-2 px-2 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          <img
                            src={club.imagePath}
                            alt={club.title}
                            className="w-8 h-8"
                          />
                          <span>{club.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <input
                  type="text"
                  name="team1_score1"
                  value={team1Score}
                  onChange={(e) => setTeam1Score(e.target.value)}
                  className="w-14 xl:w-16 py-1 px-2 xl:px-3 xl:py-2 border rounded-md font-semibold text-lg xl:text-xl"
                />
              </div>
              <span className="text-xl xl:text-2xl font-bold">:</span>

              {/* Team Selection - Team 2 */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div
                    onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
                    className="flex items-center cursor-pointer"
                  >
                    <img
                      src={team2.imagePath}
                      alt={team2.title}
                      className="w-12 h-12"
                    />
                  </div>
                  {isDropdownOpen2 && (
                    <ul className="absolute z-10 bg-white border rounded-md mt-2 w-[160px] max-h-40 overflow-y-auto">
                      {clubs.map((club) => (
                        <li
                          key={club.title}
                          onClick={() => {
                            setTeam2(club);
                            setIsDropdownOpen2(false);
                          }}
                          className="flex items-center gap-2 px-2 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          <img
                            src={club.imagePath}
                            alt={club.title}
                            className="w-8 h-8"
                          />
                          <span>{club.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <input
                  type="text"
                  name="team2_score"
                  value={team2Score}
                  onChange={(e) => setTeam2Score(e.target.value)}
                  className="w-14 xl:w-16 py-1 px-2 xl:px-3 xl:py-2 border rounded-md font-semibold text-lg xl:text-xl"
                />
              </div>
            </div>
          </div>

          {/* Match Details */}
          <div className="mb-2 xl:mb-4">
            <textarea
              name="match_details"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-28 xl:h-40 p-3 xl:py-7 xl:px-5 text-lg xl:text-xl text-dark1 border rounded-lg"
              rows={3}
            />
          </div>

          {/* Photo (optional) */}
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            className="hidden"
          />
          {preview ? (
            <img src={preview} alt="Preview" className="w-32 xl:w-36" />
          ) : (
            <label htmlFor="image">
              <HiOutlinePhotograph
                className="cursor-pointer size-8 md:size-9"
                color="#CCC"
              />
            </label>
          )}
        </>
      ) : (
        <div className="w-full text-base sm:text-xl flex items-center flex-wrap">
          <p>관람 일지를 작성하려면</p>
          <div className="flex items-center">
            <HiOutlinePencil size={22} color="#666666" className="m-1.5" />
            <p>버튼을 눌러주세요</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteDiary;
