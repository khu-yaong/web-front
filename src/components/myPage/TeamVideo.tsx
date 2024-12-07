import React, { useEffect, useState } from "react";
import { getVideos } from "api/videoApi";

export default function TeamVideo() {
  const [teamVideos, setTeamVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos();
        if (response.status === 200) {
          setTeamVideos(response.data.recommendVideos);
        } else {
          console.error("Failed to fetch videos");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full p-4 lg:py-8 lg:pl-20 bg-white border-b">
        <h1 className="font-bold text-2xl lg:text-3xl">
          KIA 타이거즈 관련 영상
        </h1>
      </div>
      <div
        className="mx-8 my-10 bg-white p-5 mb-10 grid gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {teamVideos.map((item, index) => (
          <div
            key={`${item.index}-${index}`}
            className="min-w-64 xl:max-w-96 mt-5 flex-shrink-0 flex flex-col cursor-pointer"
            onClick={() => {
              window.open(
                `https://www.youtube.com/watch?v=${item.videoId}`,
                "_blank"
              );
            }}
          >
            <img src={item.image_path} alt="path" />
            <h3 className="w-full whitespace-pre-wrap my-2 font-bold text-xl xl:text-2xl line-clamp-2">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
