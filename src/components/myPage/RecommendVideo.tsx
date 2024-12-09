import { getRecommendVideos } from "api/videoApi";
import React, { useEffect, useState } from "react";

export default function RecommendVideo() {
  const [recommendVideos, setRecommendVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getRecommendVideos();
        if (response.status === 200) {
          setRecommendVideos(response.data.recommendVideos);
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
      <div className="w-full p-4 lg:py-7 lg:pl-20 bg-white border-b">
        <h1 className="font-bold text-2xl lg:text-3xl">맞춤 동영상</h1>
      </div>
      <div
        className="mx-7 my-10 bg-white p-5 mb-10 grid gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {recommendVideos.map((item, index) => (
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
            <img src={item.thumbnail} alt="path" />
            <h3 className="w-full whitespace-pre-wrap my-2 font-bold text-xl line-clamp-2">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
