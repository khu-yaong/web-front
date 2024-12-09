import React, { useEffect, useState } from "react";
import { FiThumbsUp, FiMessageSquare, FiSend } from "react-icons/fi";
import { Post } from "types/post";
import { addComment, likePost, fetchPostDetail, deleteLike } from "api/postApi";
import Modal from "components/layout/Modal";

interface Comment {
  authorName: string;
  authorProfileImage: string;
  authorTeam: string;
  commentId: number;
  content: string;
  createdDate: string;
}

interface FeedProps {
  posts: Post[];
}

export default function Feed({ posts }: FeedProps) {
  const [likePosts, setLikePosts] = useState<Post[]>(posts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLikePosts(posts);
  }, [posts]);

  // 좋아요 누르기
  const handleLike = async (postId: number) => {
    try {
      const responseData = await likePost(postId);
      alert("게시글 좋아요에 성공하였습니다.");
      setLikePosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === postId
            ? {
                ...post,
                countLike: responseData.data.likeCount,
                isLiked: responseData.data.isLiked,
              }
            : post
        )
      );
      if (selectedPost && selectedPost.postId === postId) {
        setSelectedPost((prev) => ({
          ...prev!,
          countLike: responseData.data.likeCount,
          isLiked: responseData.data.isLiked,
        }));
      }
    } catch (error: any) {
      alert(error.message || "Failed to like post");
    }
  };

  // 좋아요 취소
  const handleUnlike = async (postId: number) => {
    try {
      const responseData = await deleteLike(postId);
      alert("게시글 좋아요를 취소하였습니다.");
      setLikePosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === postId
            ? {
                ...post,
                countLike: responseData.data.likeCount,
                isLiked: responseData.data.isLiked,
              }
            : post
        )
      );
      if (selectedPost && selectedPost.postId === postId) {
        setSelectedPost((prev) => ({
          ...prev!,
          countLike: responseData.data.likeCount,
          isLiked: responseData.data.isLiked,
        }));
      }
    } catch (error: any) {
      alert(error.message || "좋아요 취소에 실패했습니다.");
    }
  };

  const openModal = async (post: Post) => {
    try {
      const { post: postDetail, comments: postComments } =
        await fetchPostDetail(post.postId);

      setSelectedPost(postDetail);
      setComments(postComments);
      setIsModalOpen(true);
    } catch (error: any) {
      console.error("Failed to fetch post detail", error);
    }
  };

  // 댓글 등록
  const handleAddComment = async () => {
    if (!selectedPost) return;
    if (!newComment.trim()) {
      alert("댓글 내용을 입력하세요.");
      return;
    }

    try {
      const response = await addComment(selectedPost.postId, newComment);
      const { comment, commentCount } = response.data;

      setComments((prevComments) => [...prevComments, comment]);

      setSelectedPost((prev) => ({
        ...prev!,
        countComment: commentCount,
      }));

      setLikePosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === selectedPost.postId
            ? { ...post, countComment: commentCount }
            : post
        )
      );

      setNewComment("");
    } catch (error: any) {
      alert(error.message || "댓글 등록에 실패했습니다.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${month}.${day}. ${hours}:${minutes}`;
  };

  return (
    <div className="flex flex-col gap-10">
      {likePosts.map((post) => (
        <div
          key={post.postId}
          className="min-w-[440px] md:min-w-[520px] lg:min-w-xl xl:min-w-[700px] mx-2 md:mx-0 p-6 md:p-10 md:py-6 bg-white cursor-pointer"
          onClick={() => openModal(post)}
        >
          <div className="flex items-center md:px-0.5 xl:px-5 mt-2">
            <img
              src={
                post.authorProfileImage
                  ? post.authorProfileImage
                  : "/assets/images/default_profile.svg"
              }
              alt="profile"
              className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px] rounded-full ml-2 xl:ml-0"
            />

            <div className="flex flex-col ml-1.5 md:ml-2 text-dark1 mb-1.5">
              <p className="font-extrabold">{post.authorName}</p>
              <p className="text-sm">{formatDate(post.createdDate)}</p>
            </div>
          </div>
          <div className="px-2 py-1 md:px-2.5 xl:px-6">
            <h2 className="font-bold text-dark1 text-lg mt-1">{post.title}</h2>
            <p className="my-1 text-dark1">{post.content}</p>
            {post.imageUrl && (
              <img src={post.imageUrl} alt="sample" className="w-72" />
            )}
            <div className="flex items-center gap-1.5 mt-5">
              <FiThumbsUp
                size={23}
                color={post.isLiked ? "#00B286" : "#333"}
                onClick={(e) => {
                  e.stopPropagation(); // 모달 오픈 방지
                  post.isLiked
                    ? handleUnlike(post.postId)
                    : handleLike(post.postId);
                }}
              />
              <span className="mr-2">{post.countLike}</span>
              <FiMessageSquare size={23} color="#333" />
              <span>{post.countComment}</span>
            </div>
          </div>
        </div>
      ))}

      {/* 게시글 상세 모달 */}
      {selectedPost && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="grid grid-cols-2">
            <div className="flex flex-col border-r-2 border-gray-300 my-3">
              <div className="flex items-center mb-4">
                <img
                  src={
                    selectedPost.authorProfileImage ||
                    "/assets/images/default_profile.svg"
                  }
                  alt="profile"
                  className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px] rounded-full"
                />
                <div className="ml-2 text-sm">
                  <h3 className="font-extrabold">{selectedPost.authorName}</h3>
                  <p>{formatDate(selectedPost.createdDate)}</p>
                </div>
              </div>
              <h2 className="font-bold text-dark1 text-xl mb-2 mx-1">
                {selectedPost.title}
              </h2>
              <p className="mb-4 mx-1">{selectedPost.content}</p>
              {selectedPost.imageUrl && (
                <img
                  src={selectedPost.imageUrl}
                  alt="sample"
                  className="w-72 mr-6"
                />
              )}
              <div className="flex items-center gap-1.5 mt-5 mx-1">
                <FiThumbsUp
                  size={23}
                  color={selectedPost.isLiked ? "#00B286" : "#333"}
                  onClick={(e) => {
                    selectedPost.isLiked
                      ? handleUnlike(selectedPost.postId)
                      : handleLike(selectedPost.postId);
                  }}
                  className="cursor-pointer"
                />
                <span>{selectedPost.countLike}</span>
                <FiMessageSquare size={23} color="#333" />
                <span>{selectedPost.countComment}</span>
              </div>
            </div>
            <div className="w-full h-[620px] flex flex-col ml-4 -mt-3.5 py-4 items-start overflow-auto">
              {comments.map((comment) => (
                <div
                  key={comment.commentId}
                  className="border rounded-md px-3 py-1 my-2 w-full"
                >
                  <div className="flex items-center xl:px-4 mt-2">
                    <img
                      src={
                        comment.authorProfileImage
                          ? comment.authorProfileImage
                          : "/assets/images/default_profile.svg"
                      }
                      alt="profile"
                      className="w-[40px] h-[40px] rounded-full mr-1"
                    />
                    <div className="flex flex-col ml-1 text-sm text-dark1">
                      <p className="font-extrabold">{comment.authorName}</p>
                      <p className="text-dark3 text-xs">
                        {formatDate(comment.createdDate)}
                      </p>
                    </div>
                  </div>
                  <p className="tex-sm my-1.5 ml-1 xl:ml-4">
                    {comment.content}
                  </p>
                </div>
              ))}
              <div className="flex w-full h-14 mt-auto">
                <textarea
                  className="w-full border rounded-md p-3"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요"
                />
                <FiSend
                  color="#666666"
                  size={20}
                  onClick={handleAddComment}
                  className=" cursor-pointer -ml-9 mt-[18px]"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
