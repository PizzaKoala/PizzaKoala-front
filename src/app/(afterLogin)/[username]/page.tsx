// // import style from "./profile.module.css";
// import style from "./singlePost.module.css";
// import Post from "@/app/(afterLogin)/_component/Post";
// import BackButton from "@/app/(afterLogin)/_component/BackButton";
// import Link from "next/link";
// import { auth } from "@/auth";
// import PostRecommends from "../home/_component/PostRecommends";

// export default async function Profile() {
//   const session = await auth();

//   const user = {
//     id: "yeong6415",
//     nickname: "HANADURI",
//     image: "/car.jpg",
//   };

//   return (
//     <main className={style.main}>
//       <div className={style.header}>
//         <BackButton />
//         {/* <h3 className={style.headerTitle}>{user.nickname}</h3> */}
//       </div>
//       <div className={style.userZone}>
//         <div className={style.userImage}>
//           <img src={user.image} alt={user.id} />
//         </div>
//         <div className={style.userName}>
//           <div>{user.nickname}</div>
//           <div>@{user.id}</div>
//         </div>
//         {session?.user && (
//           <>
//             <button className={style.followButton}>팔로우</button>
//             <Link href="/messages">메시지</Link>
//           </>
//         )}
//       </div>
//       <div>
//         <PostRecommends />
//       </div>
//     </main>
//   );
// }

import style from "./profile.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import UserPosts from "@/app/(afterLogin)/[username]/_component/UserPosts";
import UserInfo from "@/app/(afterLogin)/[username]/_component/UserInfo";
import { getUser } from "@/app/(afterLogin)/[username]/_lib/getUser";
import { getUserPosts } from "@/app/(afterLogin)/[username]/_lib/getUserPosts";

type Props = {
  // params: { postId: string };
  params: { memberId: string };
};
export default async function Profile({ params }: Props) {
  // const { postId } = params;
  const { memberId } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    // queryKey: ["users", postId],
    queryKey: ["users", memberId],
    queryFn: getUser,
  });
  await queryClient.prefetchQuery({
    // queryKey: ["posts", "users", postId],
    queryKey: ["posts", "users", memberId],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        {/* <UserInfo postId={postId} /> */}
        <UserInfo postId={memberId} />
        <div>
          {/* <UserPosts postId={postId} /> */}
          <UserPosts postId={memberId} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
