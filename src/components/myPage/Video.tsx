import { getRecommendVideos, getVideos } from "api/videoApi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setVideos, setReommendVideos } from "store/slices/videoSlice";

export default function Video() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div className="flex-1 py-8 pl-6 sm:py-12 sm:px-6 lg:py-10 lg:pl-3 xl:pl-10">
      <div className="mr-5 bg-white flex p-4 sm:py-5 sm:px-10 my-6 border items-center justify-between">
        <h2 className="font-bold text-22px sm:text-27px">맞춤 동영상</h2>
        <p
          className="text-dark3 text-lg sm:text-2xl font-bold cursor-pointer"
          onClick={() => navigate("recommend")}
        >
          + 더보기
        </p>
      </div>
      <div
        className="mr-5 bg-white p-5 mb-10 grid gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {teamVideos.slice(0, 5).map((item, index) => (
          <div
            key={item.index}
            className="min-w-64 xl:max-w-96 mt-5 flex-shrink-0 flex flex-col"
          >
            <img src={item.thumbnail} alt="thumbnail" />
            <h3 className="w-full whitespace-pre-wrap my-2 font-bold text-lg xl:text-xl line-clamp-2">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
      <div className="mr-5 bg-white flex p-4 sm:py-5 sm:px-10 my-6 border items-center justify-between">
        <h2 className="font-bold text-22px sm:text-27px">
          KIA 타이거즈 관련 영상
        </h2>
        <p
          className="text-dark3 text-lg sm:text-2xl font-bold cursor-pointer"
          onClick={() => navigate("team")}
        >
          + 더보기
        </p>
      </div>
      <div
        className="mr-5 bg-white p-5 mb-10 grid gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {recommendVideos.slice(0, 5).map((item, index) => (
          <div
            key={item.index}
            className="min-w-64 xl:max-w-96 mt-5 flex-shrink-0 flex flex-col"
          >
            <img src={item.thumbnail} alt="thumbnail" />
            <h3 className="w-full whitespace-pre-wrap my-2 font-bold text-xl xl:text-22px line-clamp-2">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
