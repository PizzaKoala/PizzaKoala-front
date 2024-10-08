"use client";

import style from "./logoutButton.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import circle from "../../../../public/icon/red_circle.png";

export default function LogoutButton() {
  const router = useRouter();
  // const { data: me } = useSession();

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };

  // if (!me?.user) {
  //   return null;
  // }

  return (
    <div className={style.all}>
      <img
        className={style.circle}
        src="/red_circle.png"
        alt="icon"
        width={10}
        height={10}
      />
      <button className={style.logOutButton} onClick={onLogout}>
        로그아웃
      </button>
    </div>
  );
}
