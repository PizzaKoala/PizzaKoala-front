"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/auth";

const handleFormSubmission = async (prevState: any, formData: FormData) => {
  if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
    return { message: "no_id" };
  }
  if (!formData.get("name") || !(formData.get("name") as string)?.trim()) {
    return { message: "no_name" };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return { message: "no_password" };
  }
  if (!formData.get("image")) {
    return { message: "no_image" };
  }
  formData.set("nickname", formData.get("name") as string);
  let shouldRedirect = false;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/join`,
      {
        method: "post",
        body: formData,
        credentials: "include",
      }
    );

    console.log(response.status);
    if (response.status === 403) {
      return { message: "user_exists" };
    }
    console.log(await response.json());
    shouldRedirect = true;
    await signIn("credentials", {
      username: formData.get("id"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (err) {
    console.error(err);
    return { message: null };
  }

  if (shouldRedirect) {
    redirect("/home"); // try/catch문 안에서 X
  }
  return { message: null };
};

export default handleFormSubmission;

//     // 응답 상태 코드가 403인 경우, 이미 존재하는 유저
//     if (response.status === 403) {
//       return { message: "user_exists" };
//     }

//     // 회원가입이 실패한 경우
//     if (response.status !== 200) {
//       console.error("회원가입 실패:", response.status);
//       return { message: "회원가입에 실패했습니다." };
//     }

//     // 회원가입 성공 후, 로그인 시도
//     const responseData = await response.json(); // 응답 데이터 로깅
//     console.log("회원가입 성공:", responseData);

//     // 로그인 시도
//     const signInResult = await signIn("credentials", {
//       username: formData.get("id"),
//       password: formData.get("password"),
//       redirect: false, // 자동 리다이렉트 방지
//     });

//     // 로그인 실패 처리
//     if (!signInResult) {
//       return { message: "로그인에 실패했습니다." };
//     }

//     // 로그인 성공 후 리다이렉트
//     redirect("/home");
//   } catch (err) {
//     console.error("에러 발생:", err);
//     return { message: "서버에 문제가 발생했습니다." };
//   }

//   // return { message: null };
// };

// export default handleFormSubmission;
