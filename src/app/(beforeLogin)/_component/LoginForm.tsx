"use client";

import { useState, ChangeEventHandler, FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./main.module.css";
import Link from "next/link";
import { Roboto } from "next/font/google"; // Roboto 폰트 가져오기
import { FcGoogle } from "react-icons/fc"; // Google 아이콘 가져오기

// Roboto 폰트 설정
// const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const result = await signIn("credentials", {
        email: setEmail,
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

  const handleGoogleLogin = async () => {
    try {
      // const response = await fetch("/api/login/google"); // Next.js API 라우트 호출
      window.location.href = "/api/login/google"; // Next.js API 라우트가 리다이렉션을 처리하도록 요청
      // if (response.redirected) {
      //   window.location.href = response.url; // 리다이렉션 URL로 이동
      // } else {
      //   console.error("Login failed:", await response.json());
      // }
    } catch (error) {
      console.error("Login request error:", error);
    }
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.right}>
      <div className={styles.rightBox}>
        <p className={styles.rightName}>PizzaKoala</p>
        <form onSubmit={onSubmit} className={styles.formCenter}>
          <input
            type="text"
            placeholder="아이디 입력"
            className={styles.input}
            value={email}
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
            disabled={!email && !password}
            type="submit"
          >
            로그인
          </button>
        </form>
        <div className={styles.divider}>
          <hr className={styles.line} />
          <span>또는</span>
          <hr className={styles.line} />
        </div>
        {/* Google Login 버튼 */}
        {/* <div className={roboto.className}> */} {/* Roboto 폰트 적용 */}
        <button onClick={handleGoogleLogin} className={styles.googleBtn}>
          <FcGoogle className={styles.googleIcon} /> {/* Google 아이콘 */}
          <span className={styles.googleText}>Google 계정으로 로그인</span>
        </button>
        {/* </div> */}
        {message && <p className={styles.message}>{message}</p>}
        {/* <div className={styles.message}>{message}</div> */}
        <p className={styles.signupLink}>
          <Link href="/i/flow/signup" className={styles.signup}>
            계정이 없으신가요?{" "}
            <span className={styles.signupText}>가입하기</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
