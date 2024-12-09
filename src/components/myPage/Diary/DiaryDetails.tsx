import React, { useState } from "react";
import {
  HiCheck,
  HiOutlineReply,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
import { clubs } from "data/clubs";

const DiaryDetails: React.FC<{ diary: Diary }> = ({ diary }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Diary>({
    ...diary,
  });

  // 클럽 이름으로 이미지 경로를 찾는 함수
  const getImagePath = (teamName: string) => {
    const club = clubs.find((club) => club.title === teamName);
    return club ? club.imagePath : "/assets/images/baseball_icon.svg";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-auto md:w-[450px] lg:w-auto xl:w-full xl:max-w-[660px] lg:flex-1 mx-5 lg:ml-0 lg:my-20 p-6 sm:p-10 xl:py-10 xl:px-13 bg-white shadow border flex flex-col gap-y-2">
      {/* Match Date */}
      <div className="flex justify-between items-center my-5 mb-10">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-dark2 hover:text-dark1"
        >
          {isEditing ? (
            <HiOutlineReply className="size-6 xl:size-8" />
          ) : (
            <div className="size-7 xl:size-9" />
          )}
        </button>
        <h2 className="text-xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
          {formData.matchDate}
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-dark2 hover:text-dark1"
        >
          {/*isEditing ? (
            <HiCheck className="size-7 xl:size-9" />
          ) : (
            <HiOutlinePencilAlt className="size-7 xl:size-9" />
          )*/}
        </button>
      </div>

      {/* Match Place */}
      <div className="flex flex-col xl:flex-row gap-y-2 mb-4 xl:items-center">
        <label className="w-12 block font-semibold text-dark1 text-lg xl:text-xl xl:mr-2">
          장소
        </label>
        {isEditing ? (
          <input
            type="text"
            name="match_place"
            value={formData.place}
            onChange={handleChange}
            className="w-full px-2 py-1.5 xl:px-3 xl:py-2 border rounded-md text-lg xl:text-xl"
          />
        ) : (
          <p className="w-full px-2 py-1.5 xl:px-3 xl:py-2 text-dark1 text-lg xl:text-xl border rounded-md shadow-sm">
            {formData.place}
          </p>
        )}
      </div>

      {/* Seat */}
      <div className="flex flex-col xl:flex-row gap-y-2 mb-4 xl:items-center">
        <label className="w-12 block font-semibold text-dark1 text-lg xl:text-xl xl:mr-2">
          자리
        </label>
        {isEditing ? (
          <input
            type="text"
            name="seat"
            value={formData.seat}
            onChange={handleChange}
            className="w-full px-2 py-1.5 xl:px-3 xl:py-2 border rounded-md text-lg xl:text-xl"
          />
        ) : (
          <p className="w-full px-2 py-1.5 xl:px-3 xl:py-2 text-dark1 text-lg xl:text-xl border rounded-md shadow-sm">
            {formData.seat}
          </p>
        )}
      </div>

      {/* Match Score */}
      <div className="flex flex-col xl:flex-row mb-2 xl:mb-4 xl:items-center ">
        <label className="w-15 block font-semibold text-dark1 text-lg xl:text-xl mr-3">
          스코어
        </label>
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-3">
            <img
              src={getImagePath(formData.team1)}
              alt="team 1"
              className="w-10 h-10 xl:w-12 xl:h-12"
            />
            {isEditing ? (
              <input
                type="text"
                name="team1_score1"
                value={formData.team1Score}
                onChange={handleChange}
                className="w-14 xl:w-16 py-1 px-2 xl:px-3 xl:py-2 border rounded-md font-semibold text-xl xl:text-2xl"
              />
            ) : (
              <span className="font-semibold text-xl xl:text-2xl">
                {formData.team1Score}
              </span>
            )}
          </div>
          <span className="text-xl xl:text-2xl font-bold">:</span>
          <div className="flex items-center gap-2">
            <img
              src={getImagePath(formData.team2)}
              alt="team 2"
              className="w-10 h-10 xl:w-12 xl:h-12"
            />
            {isEditing ? (
              <input
                type="text"
                name="team2_score"
                value={formData.team2Score}
                onChange={handleChange}
                className="w-14 xl:w-16 py-1 px-2 xl:px-3 xl:py-2 border rounded-md font-semibold text-xl xl:text-2xl"
              />
            ) : (
              <span className="font-semibold text-xl xl:text-2xl">
                {formData.team2Score}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Match Details */}
      <div className="mb-2 xl:mb-4">
        {isEditing ? (
          <textarea
            name="match_details"
            value={formData.content}
            onChange={handleChange}
            className="w-full h-28 xl:h-40 p-3 xl:py-7 xl:px-5 text-lg xl:text-xl text-dark1 border rounded-lg"
            rows={3}
          />
        ) : (
          <p className="w-full h-28 xl:h-40 p-3 xl:py-7 xl:px-5 text-lg xl:text-xl border rounded-lg shadow-sm">
            {formData.content}
          </p>
        )}
      </div>

      {/* Photo (optional) */}
      <div className="mb-4">
        {formData.imageUrl && (
          <img src={formData.imageUrl} alt="이미지" className="max-w-56" />
        )}
      </div>
    </div>
  );
};

export default DiaryDetails;
