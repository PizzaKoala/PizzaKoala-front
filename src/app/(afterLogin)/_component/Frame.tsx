"use client";

import style from "@/app/(afterLogin)/layout.module.css";
import Link from "next/link";
import circle from "../../../../public/icon/red_circle.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Session } from "@auth/core/types";

type Props = {
  me: Session | null;
};

export default function Frame({ me }: Props) {
  const router = useRouter();
  // const { data: me } = useSession();
  // const me = {
  //   // 임시로 내 정보 있는것처럼
  //   id: "JiYeong",
  //   nickname: "HANADURI",
  //   image: "/car.jpg",
  // };
  console.log("me", me);
  if (!me?.user) {
    console.log("No user found in session:", me);
    return null;
  }

  const onLogout = () => {
    signOut({ callbackUrl: "/" }).then(() => {
      router.replace("/");
    });
  };

  // const onLogout = async () => {
  //   try {
  //     const response = await signOut({
  //       redirect: false,
  //     });
  //     console.log("signout", response);
  //     router.replace("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    // <div className={style.container}>
    <div className={style.profile}>
      <div className={style.account}>
        <img
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
            <img
              src="/icon/red_circle.png"
              alt="circle_icon"
              width={10}
              height={10}
            />{" "}
            내 게시물
          </Link>
          <Link href="/profile/alarm">
            <img src="/icon/red_circle.png" alt="icon" width={10} height={10} />
            알림
          </Link>
          {/* <Link href="/profile/account"> */}
          <Link href={`/${me.user?.email}`}>
            <img src="/icon/red_circle.png" alt="icon" width={10} height={10} />
            계정관리
          </Link>
          <div className={style.all} onClick={onLogout}>
            <img
              className={style.circle}
              src="/icon/red_circle.png"
              alt="icon"
              width={10}
              height={10}
            />
            <button className={style.logOutButton} onClick={onLogout}>
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
