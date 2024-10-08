"use client";

import { useState, ChangeEventHandler, FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./main.module.css";
import Link from "next/link";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const result = await signIn("credentials", {
        username: id,
        password,
        redirect: false,
      });
      if (result?.ok) {
        router.replace("/home");
        console.log(result);
      } else {
        setMessage("아이디와 비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.error(err);
      setMessage("로그인 중 오류가 발생했습니다.");
    }
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.right}>
      <div className={styles.rightBox}>
        <p className={styles.rightName}>PizzaKoala</p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="아이디 입력"
            className={styles.input}
            value={id}
            onChange={onChangeId}
          />
          <input
            type="password"
            placeholder="비밀번호 입력"
            className={styles.input}
            value={password}
            onChange={onChangePassword}
          />
          <button
            className={styles.button}
            disabled={!id && !password}
            type="submit"
          >
            로그인
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
        {/* <div className={styles.message}>{message}</div> */}
        <p className={styles.signupLink}>
          <Link href="/i/flow/signup" className={styles.signup}>
            계정 만들기
          </Link>
        </p>
      </div>
    </div>
  );
}
