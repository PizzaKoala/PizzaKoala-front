import style from "@/app/(afterLogin)/[username]/profile.module.css";
import Post from "@/app/(afterLogin)/_component/Post";
import Link from "next/link";
// import BackButton from "@/app/(afterLogin)/_component/BackButton";///
export default function Profile() {
  const user = {
    id: "yeong6415",
    nickname: "HANADURI",
    image: "/car.jpg",
  };

  return (
    <main className={style.main}>
      <div className={style.header}>
        {/* <BackButton /> */}
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <button className={style.followButton}>팔로우</button>
        <Link href="/messages">메시지</Link>
      </div>
    </main>
  );
}
