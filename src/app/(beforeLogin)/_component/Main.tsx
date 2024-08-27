import Link from "next/link";
import Image from "next/image";
import styles from "./main.module.css";
import pizzaKoala from "../../../../public/pizzaKoala_logo.png";

export default function Main() {
  return (
    <div className={styles.all}>
      <div className={styles.left}>
        <div className={styles.main}>
          <p className={styles.name}>피자코알라</p>
          <Image src={pizzaKoala} alt="logo" width={300}></Image>
        </div>
        <h2 className={styles.ment}>
          하루를 시작하는 당신에게 작은 도전, 하루를 종료하는 당신에게는
          자랑스러운 성취감을 선사하는 피자코알라와 함께, 지금 당장 당신의
          일상을 변화시켜보세요.
        </h2>
      </div>
      <div className={styles.right}>
        <div className={styles.rightBox}>
          <p className={styles.rightName}>PizzaKoala</p>
          <input
            type="text"
            placeholder="이메일 입력"
            className={styles.input}
          />
          <input
            type="password"
            placeholder="비밀번호 입력"
            className={styles.input}
          />

          <button className={styles.button}>
            <Link href="/login" className={styles.login}>
              로그인
            </Link>
          </button>
          <Link href="/i/flow/signup" className={styles.signup}>
            계정 만들기
          </Link>
        </div>
      </div>
    </div>
  );
}
