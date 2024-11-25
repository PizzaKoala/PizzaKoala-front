import { User } from "./User";
import { PostImage } from "@/model/PostImage";

interface UserID {
  userId: string;
}

export interface Post {
  id: number;
  memberId: number;
  title: string;
  nickName: string;
  description: string;
  desc: string;
  imageUrl: string;
  profileUrl: string;
  imageCount: number;
  likes: number;
  url: string[];
  comment: string;

  postId: number;
  User: User;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  Images: PostImage[];
  Hearts: UserID[];
  Reposts: UserID[];

  comments: {
    content: any[];
    totalElements: number;
    totalPages: number;
  }; // 댓글 관련 데이터

  Comments: UserID[];
  _count: {
    Hearts: number;
    Reposts: number;
    Comments: number;
  };
  Original?: Post; // 재게시
  Parent?: Post; // 답글
}

// API 응답 구조에 맞는 타입 정의
interface PostResponse {
  resultCode: string;
  result: {
    content: Post[]; // 게시물 리스트
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    totalPages: number;
  };
}
