import style from "./home.module.css";
import Tabs from "./_component/Tabs";
import TabProvider from "./_component/TabProvider";
import PostForm from "./_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import TabDecider from "./_component/TabDecider";

export default function Home() {
  // 테스트용으로 사용할 임시 데이터 생성
  const samplePost: IPost = {
    postId: 1,
    User: {
      id: "sampleUser",
      nickname: "Sample User",
      image: "/sampleImage.jpg",
    },
    content: "This is a sample post for testing.",
    createdAt: new Date(),
  };
  return (
    <main className={style.main}>
      <TabProvider>
        <Tabs />
        <PostForm />
        <TabDecider />
        <Post post={samplePost} />
      </TabProvider>
    </main>
  );
}
