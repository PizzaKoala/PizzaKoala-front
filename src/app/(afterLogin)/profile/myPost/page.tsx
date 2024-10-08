import Post from "@/app/(afterLogin)/_component/Post";
import style from "@/app/(afterLogin)/[username]/profile.module.css";
import BackButton from "../../_component/BackButton";
import PostRecommends from "../../home/_component/PostRecommends";

export default function myPost() {
  return (
    <div className={style.main}>
      <BackButton></BackButton>
      <PostRecommends />
    </div>
  );
}
