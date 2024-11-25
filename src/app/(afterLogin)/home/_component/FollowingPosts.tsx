"use client";

import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { getFollowingPosts } from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import styles from "@/app/(afterLogin)/home/home.module.css";

// API 응답 구조에 맞는 타입 정의
interface PostResponse {
  resultCode: string;
  result: {
    content: IPost[]; // 게시물 배열
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    totalPages: number;
  };
}

export default function FollowingPosts() {
  // const { data, isPending } = useSuspenseQuery<IPost[]>({
  const { data, isPending } = useSuspenseQuery<PostResponse>({
    // const { data, isPending } = useQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  console.log("Fetched Following Data:", data);

  // 'result' 안에 있는 'content'가 배열로 올 것임
  if (data.result.content.length === 0) {
    return <div>게시물이 없습니다.</div>;
  }

  // data가 배열인지 확인한 후에만 map 실행
  if (!Array.isArray(data)) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  // return data?.map((post) => <Post key={post.postId} post={post} />);
  // return data?.map((post) => <Post key={post.id} post={post} />);
  <>
    {data.result.content.map((post: IPost) => (
      <Post key={post.id} post={post} />
    ))}
  </>;
}
