// import style from "./search.module.css";
// import BackButton from "@/app/(afterLogin)/_component/BackButton";
// import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
// import SearchTabs from "@/app/(afterLogin)/search/_component/SearchTabs";
// import Post from "@/app/(afterLogin)/_component/Post";

// export default function Search() {
//   return (
//     <main className={style.main}>
//       <BackButton />
//       <SearchTabs />
//       <div className={style.list}>
//         <Post />
//         <Post />
//         <Post />
//         <Post />
//         <Post />
//         <Post />
//         <Post />
//         <Post />
//         <Post />
//         <Post />
//         <Post />
//       </div>
//     </main>
//   );
// }

import style from "./search.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import SearchTabs from "./_component/SearchTabs";
import Post from "@/app/(afterLogin)/_component/Post";
import PostRecommends from "../home/_component/PostRecommends";
import SearchResult from "@/app/(afterLogin)/search/_component/SearchResult";

// export default function Search({
//   searchParams,
// }: {
//   searchParams: { q?: string };
// }) {

type Props = {
  searchParams: { q: string; nf?: string; pf?: string };
};
export default function Search({ searchParams }: Props) {
  // URL에서 쿼리 파라미터를 가져와 초기 상태 설정
  const initialFilter = searchParams.q;

  return (
    <main className={style.main}>
      <BackButton custom={style.customButton} />
      <SearchTabs initialFilter={initialFilter} />
      <div className={style.list}>
        <SearchResult searchParams={searchParams} />
      </div>
    </main>
  );
}
