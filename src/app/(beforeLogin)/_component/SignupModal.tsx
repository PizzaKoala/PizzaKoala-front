"use client";

import style from "./signup.module.css";
import BackButton from "./BackButton";
import onSubmit from "../_lib/signup";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

function showMessage(message: string | null) {
  switch (message) {
    case "no_email":
      return "아이디를 입력하세요.";
    case "no_nickName":
      return "닉네임을 입력하세요.";
    case "no_password":
      return "비밀번호를 입력하세요.";
    case "no_file":
      return "이미지를 업로드하세요.";
    case "user_exists":
      return "이미 사용 중인 아이디입니다.";
    default:
      return "";
  }
}

export default function SignupModal() {
  const router = useRouter();

  const [state, formAction] = useFormState(onSubmit, { message: null });

  const { pending } = useFormStatus();
  console.log("state", state);

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={formAction} encType="multipart/form-data">
            {/* <form action={formAction}> */}
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="email">
                  이메일
                </label>
                <input
                  id="email"
                  name="email"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="nickName">
                  닉네임
                </label>
                <input
                  id="nickName"
                  name="nickName"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  className={style.input}
                  type="password"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  name="file"
                  required
                  className={style.input}
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button
                type="submit"
                className={style.actionButton}
                disabled={pending}
              >
                가입하기
              </button>
              <div className={style.error}>{showMessage(state?.message)}</div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
