import { QueryFunction } from "@tanstack/query-core";
import { Post } from "@/model/Post";

// 1. 쿠키에서 accessToken을 가져오는 함수
function getAccessToken(): string | null {
  if (typeof document === "undefined") {
    console.error("document is undefined. Make sure this runs in the browser.");
    return null;
  }
  // 쿠키 문자열을 파싱하여 각 쿠키를 키-값으로 분리
  const cookies: { [key: string]: string } = document.cookie
    .split("; ")
    .reduce((acc: { [key: string]: string }, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});

  console.log("Document Cookies:", document.cookie);
  console.log("Parsed Cookies:", cookies);
  // accessToken이 쿠키에 저장되어 있으면 반환
  return cookies.accessToken || null;
}

// 2. 리프레시 토큰을 사용해 액세스 토큰을 재발급하는 함수
async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/reissue`,
      {
        method: "POST",
        credentials: "include", // 리프레시 토큰은 HttpOnly 쿠키에 있으므로 credentials 사용
      }
    );

    // 응답 상태 확인을 위한 콘솔 로그
    console.log("Response status:", res.status);

    if (!res.ok) {
      // 응답 상태가 200이 아닐 경우, 에러 응답 텍스트 출력
      const errorText = await res.text();
      console.error("Failed to refresh token: ", errorText);
      throw new Error("Failed to refresh token");
    }

    // Authorization 헤더에서 새로운 액세스 토큰 추출
    const newAccessToken = res.headers
      .get("Authorization")
      ?.replace("Bearer ", "");

    if (newAccessToken) {
      // 새로 받은 액세스 토큰을 쿠키에 저장
      document.cookie = `accessToken=${newAccessToken}; path=/; secure; httpOnly=false;`;
      return newAccessToken;
    } else {
      throw new Error("No access token found in response headers.");
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
}

export const getComments: QueryFunction<
  Post[],
  [_1: string, _2: string, _3: string]
> = async ({ queryKey }) => {
  // const [_1, id] = queryKey;
  // const res = await fetch(`http://localhost:9090/api/posts/${id}/comments`, {
  const [_1, postId] = queryKey;

  let token = getAccessToken();

  if (!token) {
    console.log(
      "액세스 토큰이 없습니다. 리프레시 토큰으로 재발급 요청을 시도합니다."
    );
    // 액세스 토큰이 없을 경우, 리프레시 토큰으로 액세스 토큰 재발급 시도
    token = await refreshAccessToken(); // 재발급 함수 호출
    if (!token) {
      throw new Error("액세스 토큰 재발급에 실패했습니다.");
    }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/comment/${postId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // 토큰을 Bearer 형식으로 전달
      },
      next: {
        tags: ["posts", postId, "comments"],
      },
      cache: "no-store",
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // 액세스 토큰이 만료된 경우
    const errorText = await res.text();
    // 액세스 토큰이 만료된 경우
    if (errorText.includes("access token expired")) {
      console.error("Access token expired. Attempting to refresh...");

      // 리프레시 토큰을 사용해 액세스 토큰 재발급 시도
      token = await refreshAccessToken();
      if (token) {
        // 재발급 받은 액세스 토큰으로 다시 요청
        const retryRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/comment/${postId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // 새로 받은 액세스 토큰으로 요청
            },
            next: {
              tags: ["posts", postId, "comments"],
            },
            credentials: "include",
            cache: "no-store",
          }
        );

        if (!retryRes.ok) {
          throw new Error("Failed to fetch data after refreshing token.");
        }

        return retryRes.json();
      } else {
        throw new Error("Failed to refresh token.");
      }
    } else {
      throw new Error("Failed to fetch data.");
    }
  }
  return res.json();
};
