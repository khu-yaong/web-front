export interface Post {
  authorName: string;
  authorProfileImage: string;
  authorTeam: string;
  postId: number;
  title: string;
  content: string;
  imageUrl: string;
  createdDate: string;
  countLike: number;
  countComment: number;
  isLiked: boolean;
}
