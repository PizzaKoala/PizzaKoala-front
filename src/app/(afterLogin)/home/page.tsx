// import style from "./home.module.css";
// import HomeTabs from "./_component/HomeTabs";
// import TabProvider from "./_component/TabProvider";
// import PostForm from "./_component/PostForm";
// import Post from "@/app/(afterLogin)/_component/Post";
// import PostRecommends from "./_component/PostRecommends";
// import { getPostRecommends } from "./_lib/getPostRecommends";
// import {
//   QueryClient,
//   dehydrate,
//   HydrationBoundary,
// } from "@tanstack/react-query";
// import TabDecider from "./_component/TabDecider";

// export default async function Home() {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchInfiniteQuery({
//     queryKey: ["posts", "recommends"],
//     queryFn: getPostRecommends,
//     initialPageParam: 0,
//   });
//   const dehydratedState = dehydrate(queryClient);

//   return (
//     <main className={style.main}>
//       <HydrationBoundary state={dehydratedState}>
//         <TabProvider>
//           <HomeTabs />
//           {/* <PostForm /> */}
//           <TabDecider />
//           <div className={style.innerPost}>
//             <PostRecommends />
//           </div>
//         </TabProvider>
//       </HydrationBoundary>
//     </main>
//   );
// }

import style from "./home.module.css";
import HomeTabs from "@/app/(afterLogin)/home/_component/HomeTabs";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import { Suspense } from "react";
import Loading from "@/app/(afterLogin)/home/loading";
import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";

export default async function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <HomeTabs />
        {/* <PostForm /> */}
        <div className={style.postList}>
          <Suspense fallback={<Loading />}>
            {/* <Suspense> */}
            <TabDeciderSuspense />
          </Suspense>
        </div>
      </TabProvider>
    </main>
  );
}
