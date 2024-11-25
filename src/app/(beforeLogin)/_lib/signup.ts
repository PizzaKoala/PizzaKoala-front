"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import cookie from "cookie";
import { cookies } from "next/headers";

const onSubmitFunc = async (prevState: any, formData: FormData) => {
  // JSON 데이터를 FormData로 추가하기 위해 객체 생성
  const jsonData = {
    email: formData.get("email"),
    nickName: formData.get("nickName"),
    password: formData.get("password"),
  };

  if (!jsonData.email || !(jsonData.email as string)?.trim()) {
    return { message: "no_email" };
  }
  if (!jsonData.nickName || !(jsonData.nickName as string)?.trim()) {
    return { message: "no_nickName" };
  }
  if (!jsonData.password || !(jsonData.password as string)?.trim()) {
    return { message: "no_password" };
  }
  if (!formData.get("file")) {
    return { message: "no_file" };
  }

  // formData.set("nickname", formData.get("name") as string);

  // JSON 데이터를 Blob으로 변환하여 FormData에 추가
  formData.set(
    "request",
    new Blob([JSON.stringify(jsonData)], { type: "application/json" })
  );

  //   if (shouldRedirect) {
  //     redirect("/home"); // try/catch문 안에서 X
  //   }
  //   return { message: null };
  // };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/join`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    if (!response.ok) {
      return { message: "user_exists" };
    }

    // // 1. 헤더에서 accessToken 추출
    // const accessToken = response.headers
    //   .get("Authorization")
    //   ?.replace("Bearer ", "");

    // if (accessToken) {
    //   // 액세스 토큰이 존재할 경우 처리 로직
    //   console.log("Access Token:", accessToken);
    // }

    console.log("회원가입 응답 상태:", response.status);

    // JSON 응답 데이터 파싱
    const responseData = await response.json();

    // resultCode 출력
    console.log("응답 데이터 resultCode:", responseData.resultCode);

    // Authorization 헤더에서 access token을 추출
    const accessToken = response.headers
      .get("Authorization")
      ?.replace("Bearer ", "");

    if (accessToken) {
      // 쿠키에 accessToken 저장 (클라이언트에서 접근 가능하도록 httpOnly: false)
      cookies().set("accessToken", accessToken, {
        httpOnly: false, // 클라이언트에서 접근 가능
        secure: process.env.NODE_ENV === "production", // 프로덕션에서는 HTTPS에서만 전송
        maxAge: 60 * 15, // 15분 동안 유효
        path: "/", // 모든 경로에서 사용 가능
      });

      console.log("Access Token을 쿠키에 저장했습니다:", accessToken);
    }

    let setCookie = response.headers.get("Set-Cookie");
    console.log("set-cookie", setCookie);
    if (setCookie) {
      const parsed = cookie.parse(setCookie);
      cookies().set("refresh", parsed["refresh"], parsed); // 브라우저에 쿠키를 심어주는 것
      console.log("JWT", parsed);
    }
  } catch (error) {
    console.error("회원가입 중 오류:", error);
    // return { success: false, message: "회원가입 실패" };
    return { message: null };
  }

  // **NextAuth를 통해 세션 생성 및 로그인**
  // const loginResult = await signIn("credentials", {
  //   email: jsonData.email,
  //   password: jsonData.password,
  //   redirect: false, // 수동 리다이렉트
  // });

  // console.log("Login result:", loginResult);

  // if (loginResult?.ok) {
  redirect("/home"); // 로그인 후 홈으로 리다이렉트
  // } else {
  //   return { message: "login_failed" };
  // }
};

export default onSubmitFunc;
