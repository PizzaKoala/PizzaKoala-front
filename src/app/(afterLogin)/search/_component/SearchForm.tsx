"use client";

import style from "@/app/(afterLogin)/layout.module.css";
import { useRouter, usePathname } from "next/navigation";
import { FormEventHandler, useState, useEffect } from "react";

export default function SearchForm() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const pathname = usePathname();

  // 로컬 스토리지에서 검색어 불러오기
  useEffect(() => {
    const storedSearchValue = localStorage.getItem("searchFilter");

    // URL이 정확히 "/search"로 끝나는 경우 검색어 삭제
    if (pathname === "/search" && !window.location.search.includes("q=")) {
      clearSearch(); // 검색어 삭제
    } else if (storedSearchValue && pathname.includes("/search")) {
      setSearchValue(storedSearchValue); // 로컬 스토리지에서 검색어 불러오기
    }
  }, [pathname]);

  // 검색어가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (searchValue.trim()) {
      localStorage.setItem("searchFilter", searchValue); // 검색어가 있으면 저장
    }
  }, [searchValue]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const searchValue = event.currentTarget.search.value.trim(); //trim() 메서드는 문자열의 앞뒤 공백을 제거

    if (searchValue) {
      router.replace(`/search?q=${searchValue}`);
      // setSearchValue(""); // 검색어 제출 후 초기화
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    localStorage.removeItem("searchFilter"); // localStorage에서 검색어 삭제
  };

  useEffect(() => {
    if (!pathname.includes("/search")) clearSearch();
  }, [pathname]);

  // 돋보기 아이콘 클릭 시 검색 실행
  const handleSearchIconClick = () => {
    if (searchValue.trim()) {
      router.replace(`/search?q=${searchValue}`);
      // setSearchValue(""); // 검색 후 입력 필드 초기화
    }
  };

  return (
    <div className={style.search}>
      <form className={style.search_bar} onSubmit={onSubmit}>
        <svg
          width={40}
          viewBox="0 0 24 24"
          aria-hidden="true"
          onClick={handleSearchIconClick}
          style={{ cursor: "pointer" }}
        >
          <g>
            <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
          </g>
        </svg>
        <input
          type="search"
          name="search"
          placeholder="검색"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="button" className={style.xbutton} onClick={clearSearch}>
          <img src="/icon/xbutton.png" alt="Clear" width={20} height={20} />
        </button>
      </form>
    </div>
  );
}
