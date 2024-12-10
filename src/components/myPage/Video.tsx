import { getRecommendVideos, getVideos, videoClick } from "api/videoApi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setVideos, setReommendVideos } from "store/slices/videoSlice";
import { RootState } from "store/store";
import { clubs } from "data/clubs";

export default function Video() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberInfo = useSelector((state: RootState) => state.member.memberInfo);
  const [teamVideos, setTeamVideos] = useState<any[]>([]);
  const [recommendVideos, setRecommendVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos();
        if (response.status === 200) {
          setTeamVideos(response.data.recommendVideos);
          dispatch(setVideos(response.data.recommendVideos));
        } else {
          console.error("Failed to fetch videos");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    const fetchRecommendVideos = async () => {
      try {
        const response = await getRecommendVideos();
        if (response.status === 200) {
          setRecommendVideos(response.data.recommendVideos);
          dispatch(setReommendVideos(response.data.recommendVideos));
        } else {
          console.error("Failed to fetch videos");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
    fetchRecommendVideos();
  }, []);

  const handleVideoClick = async (videoId: string) => {
    try {
      await videoClick(videoId);
      console.log(`영상 조회 내역이 업데이트 되었습니다: ${videoId}`);
    } catch (error) {
      console.error("업데이트에 실패하였습니다:", error);
    }
  };

  function getClubTitle(team: any): string {
    if (!team) {
      return "";
    }
    const club = clubs.find(
      (club) => club.title === team || club.aliases === team
    );

    return club ? club.title : "";
  }

  return (
    <div className="flex-1 py-8 pl-6 sm:py-12 sm:px-6 lg:py-10 lg:pl-3 xl:pl-10">
      <div className="mr-5 bg-white flex p-4 sm:py-5 sm:px-10 my-4 border items-center justify-between">
        <h2 className="font-bold text-22px sm:text-2xl">맞춤 동영상</h2>
        <p
          className="text-dark3 text-lg sm:text-20px font-bold cursor-pointer"
          onClick={() => navigate("recommend")}
        >
          + 더보기
        </p>
      </div>
      <div
        className="mr-5 bg-white px-5 pt-2 pb-4 mb-10 grid gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {recommendVideos.slice(0, 5).map((item, index) => (
          <div
            key={item.index}
            className="min-w-64 xl:max-w-96 mt-5 flex-shrink-0 flex flex-col cursor-pointer"
            onClick={() => {
              handleVideoClick(item.videoId);
              window.open(
                `https://www.youtube.com/watch?v=${item.videoId}`,
                "_blank"
              );
            }}
          >
            <img src={item.thumbnail} alt="thumbnail" />
            <h3 className="w-full whitespace-pre-wrap my-2 font-bold text-lg xl:text-xl line-clamp-2">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
      <div className="mr-5 bg-white flex p-4 sm:py-5 sm:px-10 my-4 border items-center justify-between">
        <h2 className="font-bold text-22px sm:text-2xl">
          {getClubTitle(memberInfo?.team)} 관련 영상
        </h2>
        <p
          className="text-dark3 text-lg sm:text-20px font-bold cursor-pointer"
          onClick={() => navigate("team")}
        >
          + 더보기
        </p>
      </div>
      <div
        className="mr-5 bg-white px-5 pt-2 pb-4 mb-10 grid gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {teamVideos.slice(0, 5).map((item, index) => (
          <div
            key={item.index}
            className="min-w-64 xl:max-w-96 mt-5 flex-shrink-0 flex flex-col cursor-pointer"
            onClick={() => {
              handleVideoClick(item.videoId);
              window.open(
                `https://www.youtube.com/watch?v=${item.videoId}`,
                "_blank"
              );
            }}
          >
            <img src={item.thumbnail} alt="thumbnail" />
            <h3 className="w-full whitespace-pre-wrap my-2 font-bold text-lg xl:text-xl line-clamp-2">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
