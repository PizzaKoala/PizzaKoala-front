"use client";

import { ReactNode } from "react";
import style from "./post.module.css";
import { useRouter } from "next/navigation";
import { Post as IPost } from "@/model/Post";

type Props = {
  children: ReactNode;
  post: IPost;
};

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  const onClick = () => {
    if (post.id) {
      // if (post.id && post.nickName) {
      console.log("Post Data:", post);
      router.push(`/${post.nickName}/status/${post.id}`);
    } else {
      console.error("Post or User information is missing:", post);
    }
  };

  return (
    <article onClickCapture={onClick} className={style.post}>
      {children}
    </article>
  );
}
