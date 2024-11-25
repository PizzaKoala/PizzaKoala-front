"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "@/app/(afterLogin)/home/home.module.css";

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

export default function PostRecommends() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
    isLoading, // isPending && isFetching
    isError,
  } = useInfiniteQuery<
    // IPost[],
    PostResponse,
    Object,
    // InfiniteData<IPost[]>,
    InfiniteData<PostResponse>, // 페이지네이션된 데이터 구조
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,

    // getNextPageParam: (lastPage) => {
    //   console.log("Last Page:", lastPage);
    //   if (Array.isArray(lastPage) && lastPage.length > 0) {
    //     return lastPage.at(-1)?.postId;
    //   }
    getNextPageParam: (lastPage) => {
      // lastPage.result.content에서 게시물 리스트 확인
      const content = lastPage?.result?.content;

      // content가 배열인지 확인한 후 처리
      if (Array.isArray(content) && content.length > 0) {
        // return content.at(-1)?.postId; // 마지막 게시물의 postId 반환
        return content.at(-1)?.id;
      }
      return null;
    },
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // useEffect(() => {
  //   if (data) {
  //     console.log("Fetched Data:", data);
  //   }
  // }, [data]);

  useEffect(() => {
    if (data) {
      console.log("Fetched Data Posts:", data.pages[0].result.content);
    }
  }, [data]);

  if (isPending) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg
          className={styles.loader}
          height="100%"
          viewBox="0 0 32 32"
          width={40}
        >
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
          ></circle>
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{
              stroke: "rgb(29, 155, 240)",
              strokeDasharray: 80,
              strokeDashoffset: 60,
            }}
          ></circle>
        </svg>
      </div>
    );
  }

  if (isError) {
    return "에러 처리해줘";
  }

  return (
    // <>
    //   {data?.pages.map((page, i) => (
    //     <Fragment key={i}>
    //       {page.map((post) => (
    //         <Post key={post.postId} post={post} />
    //       ))}
    //     </Fragment>
    //   ))}
    //   <div ref={ref} style={{ height: 50 }} />
    // </>
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.result.content.map((post) => (
            // <Post key={post.postId} post={post} />
            <Post key={post.id} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
