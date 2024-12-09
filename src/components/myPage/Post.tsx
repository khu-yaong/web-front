import React from "react";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";

type PostItem = {
  authorName: string;
  authorProfileImage: string;
  authorTeam: string;
  postId: number;
  title: string;
  content: string;
  imageUrl: string | null;
  createdDate: string;
  countLike: number;
  countComment: number;
  isLiked: boolean;
};

type Props = {
  posts: PostItem[];
};

export default function Post({ posts }: any) {
  return (
    <div className="w-full grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 lg:grid-cols-2 mt-4">
      {posts.map((post: any) => (
        <div className="w-full p-8 xl:p-10 bg-white ">
          <div className="flex items-center mt-2">
            <img
              src={post.authorProfileImage}
              alt="profile"
              className="w-[55px] h-[55px] xl:w-[60px] xl:h-[60px] rounded-full"
            />
            <div className="flex flex-col ml-1 md:ml-2 text-dark1">
              <p className="text-lg lg:text-[21px] font-bold">
                {post.authorName}
              </p>
              <p className="text-lg text-dark2 ">{post.createdDate}</p>
            </div>
          </div>
          <p className="mt-3 lg:mt-4 text-lg lg:text-xl text-dark1 font-bold">
            {post.title}
          </p>
          <p className="my-1 lg:text-lg text-dark1">{post.content}</p>

          <div className="flex items-center gap-1.5 mt-5">
            <FiThumbsUp size={23} color="#333" />
            <span className="mr-2">{post.countLike}</span>
            <FiMessageSquare size={23} color="#333" />
            <span>{post.countComment}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
