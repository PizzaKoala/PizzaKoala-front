"use client";

import style from "@/app/(afterLogin)/[username]/profile.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/model/User";
import { getUser } from "@/app/(afterLogin)/[username]/_lib/getUser";
import Link from "next/link";

type Props = {
  // postId: string;
  memberId: string;
};
// export default function UserInfo({ postId }: Props) {
export default function UserInfo({ memberId }: Props) {
  const { data: user, error } = useQuery<
    User,
    Object,
    User,
    [_1: string, _2: string]
  >({
    // queryKey: ["users", postId],
    queryKey: ["users", memberId],
    queryFn: getUser,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  console.log("error");
  console.dir(error);
  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            {/* <div>@{postId}</div> */}
            <div>@{memberId}</div>
          </div>
        </div>
        <div
          style={{
            height: 100,
            alignItems: "center",
            fontSize: 31,
            fontWeight: "bold",
            justifyContent: "center",
            display: "flex",
          }}
        >
          계정이 존재하지 않음
        </div>
      </>
    );
  }
  if (!user) {
    return null;
  }
  return (
    <>
      <div className={style.header}>
        <BackButton />
        {/* <h3 className={style.headerTitle}>{user.nickname}</h3> */}
        <h3 className={style.headerTitle}>{user.nickName}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          {/* <img src={user.image} alt={user.id} /> */}
          {/* <img src={user.profileUrl} alt={user.id} /> */}
          <img src={user.imageUrl} alt={user.id} />
        </div>
        <div className={style.userName}>
          {/* <div>{user.nickname}</div>
          <div>@{user.id}</div> */}
          <div>{user.nickName}</div>
          <div>@{user.id}</div>
        </div>
        <button className={style.followButton}>팔로우</button>
        <Link href="/messages">메시지</Link>
      </div>
    </>
  );
}
