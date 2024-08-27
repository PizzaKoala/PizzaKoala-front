import style from "./home.module.css";
import Tabs from "./_component/Tabs";
import TabProvider from "./_component/TabProvider";
import PostForm from "./_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";

export default function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tabs />
        <PostForm />
        <Post />
      </TabProvider>
    </main>
  );
}
