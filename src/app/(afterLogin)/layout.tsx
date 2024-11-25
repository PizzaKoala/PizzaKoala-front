// import style from "@/app/(afterLogin)/layout.module.css";
// import Link from "next/link";
// import circle from "../../../public/icon/red_circle.png";
// import Image from "next/image";
// import plus from "../../../public/icon/plus_icon.png";
// import LogoutButton from "./_component/LogoutButton";
// import { ReactNode } from "react";
// import SearchForm from "./search/_component/SearchForm";
// import { useSession } from "next-auth/react";

// type Props = {
//   children: ReactNode;
//   modal: ReactNode;
// };

// export default function AfterLoginLayout({ children, modal }: Props) {
//   // const { data: me } = useSession();
//   // const me = {
//   //   // 임시로 내 정보 있는것처럼
//   //   id: "JiYeong",
//   //   nickname: "HANADURI",
//   //   image: "/car.jpg",
//   // };

//   // if (!me?.user) {
//   //   return null;
//   // }

//   return (
//     <div className={style.container}>
//       <header className={style.header}>
//         <div className={style.name}>
//           <Link href="/home">피자코알라</Link>
//         </div>
//         {/* <div className={style.search}>
//           <form className={style.search_bar} onSubmit={onSubmit}>
//             <svg width={40} viewBox="0 0 24 24" aria-hidden="true">
//               <g>
//                 <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
//               </g>
//             </svg>
//             <input type="search" />
//           </form>
//         </div> */}
//         {/* <SearchForm q={searchParams.q} /> */}
//         <SearchForm />
//         <Link href="/compose/tweet" className={style.plus}>
//           <Image
//             src={plus}
//             alt="plus_icon"
//             width={30}
//             height={30}
//             className={style.profileImg}
//           ></Image>
//         </Link>
//         <div className={style.profile}>
//           <div className={style.account}>
//             <Image
//               src={me.user?.image as string}
//               alt={me.user?.email as string}
//               width={60}
//               height={60}
//               className={style.userImg}
//             />
//             <div className={style.nickName}>
//               <div>{me.user?.name}</div>
//               <div>@{me.user?.email}</div>
//             </div>
//           </div>
//           <div className={style.profileDropdown}>
//             <div className={style.list_name}>
//               <Link href="/profile/myPost">
//                 <Image src={circle} alt="circle_icon" width={10} height={10} />{" "}
//                 내 게시물
//               </Link>
//               <Link href="/profile/alarm">
//                 <Image src={circle} alt="icon" width={10} height={10} />
//                 알림
//               </Link>
//               {/* <Link href="/profile/account"> */}
//               <Link href={`/${me.user?.email}`}>
//                 <Image src={circle} alt="icon" width={10} height={10} />
//                 계정관리
//               </Link>
//               {/* <Link href="/logout"> */}
//               {/* <Image src={circle} alt="icon" width={10} height={10} /> */}
//               <LogoutButton></LogoutButton>
//               {/* 로그아웃 */}
//               {/* </Link> */}
//             </div>
//           </div>
//         </div>
//       </header>
//       <main className={style.wrapper}>{children}</main>
//       <div>{modal}</div>
//     </div>
//   );
// }

import style from "@/app/(afterLogin)/layout.module.css";
import Link from "next/link";
import circle from "../../../public/icon/red_circle.png";
import Image from "next/image";
// import plus from "../../../public/icon/plus_icon.png";
import LogoutButton from "./_component/LogoutButton";
import { ReactNode } from "react";
import SearchForm from "./search/_component/SearchForm";
import Frame from "@/app/(afterLogin)/_component/Frame";
import RQProvider from "./_component/RQProvider";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default async function AfterLoginLayout({ children, modal }: Props) {
  const session = await auth();

  // session이 없을 경우 로그인 페이지로 리다이렉트
  // if (!session?.user) {
  //   redirect("/i/flow/login");
  // }
  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.name}>
          <Link href="/home">피자코알라</Link>
        </div>
        <SearchForm />
        <Link href="/compose/tweet" className={style.plus}>
          <img
            src="/icon/plus_icon.png"
            alt="plus"
            width={30}
            height={30}
            className={style.profileImg}
          ></img>
        </Link>
        <Frame me={session}></Frame>
        {/* <div className={style.profile}>
          <div className={style.account}>
            <Image
              src={me.user?.image as string}
              alt={me.user?.email as string}
              width={60}
              height={60}
              className={style.userImg}
            />
            <div className={style.nickName}>
              <div>{me.user?.name}</div>
              <div>@{me.user?.email}</div>
            </div>
          </div>
          <div className={style.profileDropdown}>
            <div className={style.list_name}>
              <Link href="/profile/myPost">
                <Image src={circle} alt="circle_icon" width={10} height={10} />{" "}
                내 게시물
              </Link>
              <Link href="/profile/alarm">
                <Image src={circle} alt="icon" width={10} height={10} />
                알림
              </Link>
              {/* <Link href="/profile/account"> */}
        {/* <Link href={`/${me.user?.email}`}>
                <Image src={circle} alt="icon" width={10} height={10} />
                계정관리
              </Link> */}
        {/* <LogoutButton></LogoutButton> */}
        {/* </div>
          </div>
        </div>  */}
      </header>
      <RQProvider>
        <main className={style.wrapper}>{children}</main>
        <div>{modal}</div>
      </RQProvider>
    </div>
  );
}
