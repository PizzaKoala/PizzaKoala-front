// import BackButton from "@/app/(afterLogin)/_component/BackButton";
// import style from "./singlePost.module.css";
// import Post from "../../../_component/Post";
// import CommentForm from "./_component/CommentForm";
// import PostRecommends from "@/app/(afterLogin)/home/_component/PostRecommends";

// export default function SinglePost() {
//   return (
//     <div>
//       <div className={style.main}>
//         {/* <div className={style.header}> */}
//         <BackButton />
//         {/* <h3 className={style.headerTitle}>게시하기</h3> */}
//         {/* </div> */}
//         <PostRecommends />
//       </div>
//       <div className={style.sub}>
//         <CommentForm />
//         <p className={style.ment}>댓글 9개 보기</p>
//       </div>
//       <div className={style.comment}>
//         <PostRecommends />
//       </div>
//     </div>
//   );
// }

import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./singlePost.module.css";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import React from "react";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";

type Props = {
  // params: { id: string };
  params: { postId: string };
};

export default async function Page({ params }: Props) {
  // const { id } = params;
  const { postId } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    // queryKey: ["posts", id],
    queryKey: ["posts", postId],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchQuery({
    // queryKey: ["posts", id, "comments"],
    queryKey: ["posts", postId, "comments"],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        {/* <SinglePost postId={id} /> */}
        <SinglePost postId={postId} />
        {/* <SinglePost id={id} /> */}
        <CommentForm id={postId} />
        {/* <CommentForm postId={postId} /> */}
        <div>
          {/* <Comments id={id} /> */}
          <Comments id={postId} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
