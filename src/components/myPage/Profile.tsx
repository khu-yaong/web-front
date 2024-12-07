import React from "react";
import Post from "./Post";
import { posts } from "data/dummy/post";

export default function Profile() {
  return (
    <div className="py-8 px-6 sm:py-12 lg:py-16 lg:px-9 xl:px-16">
      <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8 justify-between">
        <div className="w-full lg:w-1/3 flex flex-col justify-center bg-white p-4 lg:px-5 lg:py-4">
          <p className="text-dark2 text-lg sm:text-xl">닉네임</p>
          <p className="text-dark1 text-xl sm:text-2xl font-bold">
            도규는유명한MZ투수
          </p>
        </div>
        <div className="w-full lg:w-1/3 flex justify-between items-center bg-white p-4 lg:px-5 lg:py-4">
          <div className="flex flex-col">
            <p className="text-dark2 text-lg sm:text-xl">응원하는 구단</p>
            <p className="text-dark1 text-xl sm:text-2xl font-bold">
              KIA Tigers
            </p>
          </div>
          <img
            src="/assets/images/club/kia.svg"
            alt="club"
            className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]"
          />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col justify-center bg-white p-4 lg:px-5 lg:py-4">
          <p className="text-dark2 text-lg sm:text-xl">칭호</p>
          <div className="flex items-center justify-between">
            <p className=" text-dark1 text-xl sm:text-2xl font-bold">뉴비</p>
            <p className="bg-light3 text-dark1 rounded-xl px-2 py-1 sm:px-4 sm:py-2">
              LV05
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-white mt-8 sm:mt-16 lg:my-16 p-4 sm:px-6 sm:py-5 font-bold text-lg sm:text-2xl">
        작성한 게시글
      </div>

      <Post posts={posts} />
    </div>
  );
}
