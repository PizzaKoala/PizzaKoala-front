import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import cookie from "cookie";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    // signIn: "/",
    newUser: "/i/flow/signup",
  },
  callbacks: {
    jwt({ token }) {
      console.log("auth.ts jwt", token);
      return token;
    },
    session({ session, newSession, user }) {
      console.log("auth.ts session", session, newSession, user);
      return session;
    },
  },
  events: {
    signOut(data) {
      console.log(
        "auth.ts events signout",
        "session" in data && data.session,
        "token" in data && data.token
      );
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      // if ('session' in data) {
      //   data.session = null;
      // }
      // if ('token' in data) {
      //   data.token = null;
      // }
    },
    session(data) {
      console.log(
        "auth.ts events session",
        "session" in data && data.session,
        "token" in data && data.token
      );
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("authorize function start");

        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            credentials: "include",
          }
        );

        console.log("fetch executed");

        // 응답을 텍스트로 출력하고 유효한 JSON인지 검사
        const responseText = await authResponse.text();
        console.log("Response Text:", responseText);

        let responseData;
        try {
          responseData = JSON.parse(responseText); // JSON 파싱 시도
        } catch (error) {
          console.error("Failed to parse JSON:", error);
          throw new Error("Invalid JSON response"); // 에러 처리
        }

        // 요청 실패 시 로그 출력
        if (!authResponse.ok) {
          console.error("authorization failed", responseData);
          return null;
        }

        // Set-Cookie 헤더에서 쿠키 추출
        let setCookie = authResponse.headers.get("Set-Cookie");
        console.log("set-cookie", setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set("refresh", parsed["refresh"], parsed); // 브라우저에 쿠키를 심어주는 것
        }
        // if (!authResponse.ok) {
        //   return null;
        // }

        // const user = await authResponse.json();
        // console.log("user", user);
        // return {
        //   email: user.email,
        //   name: user.nickname,
        //   image: user.file,
        //   ...user,
        // };

        // JSON 응답을 직접 처리
        // const responseData = await authResponse.json();

        // if (!authResponse.ok) {
        //   console.log("authorization failed", responseData);
        //   return null;
        // }

        console.log("user", responseData);
        return {
          email: responseData.email,
          name: responseData.nickname,
          image: responseData.file,
          ...responseData,
        };
      },
    }),
  ],
});
