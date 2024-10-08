"use client";

import style from "./signup.module.css";
import BackButton from "./BackButton";
import onSubmit from "../_lib/signup";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import handleFormSubmission from "../_lib/signup";

function showMessage(messasge: string | null | undefined) {
  if (messasge === "no_id") {
    return "아이디를 입력하세요.";
  }
  if (messasge === "no_name") {
    return "닉네임을 입력하세요.";
  }
  if (messasge === "no_password") {
    return "비밀번호를 입력하세요.";
  }
  if (messasge === "no_image") {
    return "이미지를 업로드하세요.";
  }
  if (messasge === "user_exists") {
    return "이미 사용 중인 아이디입니다.";
  }
  return "";
}

export default function SignupModal() {
  const [state, formAction] = useFormState(onSubmit, { message: null });
  const { pending } = useFormStatus();

  // export default function SignupModal() {
  //   const [formState, setFormState] = useState<{ message: string | null }>({
  //     message: null,
  //   });
  //   const [isPending, setIsPending] = useState(false);

  //   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     setIsPending(true);
  //     const formData = new FormData(event.currentTarget);
  //     const result = await handleFormSubmission(null, formData);
  //     setFormState(result);
  //     setIsPending(false);
  //   };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={formAction}>
            {/* <form onSubmit={onSubmit}> */}
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  name="name"
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
                  name="image"
                  className={style.input}
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button
                type="submit"
                className={style.actionButton}
                disabled={pending}
                // disabled={isPending}
              >
                가입하기
              </button>
              <div className={style.error}>{showMessage(state?.message)}</div>
              <div className={style.error}>
                {/* {showMessage(formState?.message)} */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
