import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "@/app/(afterLogin)/_component/PostArticle";
import { faker } from "@faker-js/faker";
import PostImages from "@/app/(afterLogin)/_component/PostImages";
import { Post as IPost } from "@/model/Post";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean;
  post: IPost;
};
export default function Post({ noImage, post }: Props) {
  const target = post;
  // if (Math.random() > 0.5 && !noImage) {
  //   target.Images.push(
  //     { imageId: 1, link: faker.image.urlLoremFlickr() },
  //     { imageId: 2, link: faker.image.urlLoremFlickr() },
  //     { imageId: 3, link: faker.image.urlLoremFlickr() },
  //     { imageId: 4, link: faker.image.urlLoremFlickr() }
  //   );
  // }

  return (
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          {/* <Link href={`/${target.User.id}`} className={style.postUserImage}> */}
          <Link href={`/${target.id}`} className={style.postUserImage}>
            {/* <img src={target.User.image} alt={target.User.nickname} /> */}
            <img src={target.imageUrl} />
            {/* <img src={target.profileUrl} alt={target.nickName} /> */}
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            {/* <Link href={`/${target.User.id}`}> */}
            {/* <Link href={`/${target.id}`}> */}
            <Link href={`/${target.memberId}`}>
              <span className={style.postUserName}>{target.nickName}</span>
              <span className={style.postUserId}>@{target.memberId}</span>
              {/* <span className={style.postUserName}>{target.User.nickname}</span> */}
              {/* nickname이 필요함!!!!! */}
              &nbsp;
              {/* <span className={style.postUserId}>@{target.User.id}</span> */}
              {/* <span className={style.postUserId}>@{target.id}</span> */}
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          {/* <div>{target.content}</div> */}
          {/* content도 필요함!!! */}
          <div>{target.title}</div>
          <div>{target.desc}</div>
          {/* <div>{target.description}</div> */}

          {/* <div>
            {target.url.map((image, index) => (
              <img key={index} src={image} alt={`Post image ${index + 1}`} />
            ))}
          </div> */}

          <div>
            <PostImages post={target} />
          </div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
