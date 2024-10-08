"use client";

import { useEffect } from "react";

export default function AlertOnUnauthorized() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("error") === "unauthorized") {
      alert("로그인이 필요합니다.");
    }
  }, []);

  return null; // UI를 렌더링할 필요 없으므로 null 반환
}
