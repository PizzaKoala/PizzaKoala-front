"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import style from "./tabs.module.css";

type Props = {
  initialFilter: string; // 검색어 초기화용
};

export default function SearchTabs({ initialFilter }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 상태 정의: 기본값 게시물 탭과 최신순 필터
  const [activeList, setActiveList] = useState<string>("list1");
  const [searchFilter, setSearchFilter] = useState<string>(initialFilter);
  const [postFilter, setPostFilter] = useState<string>("latest");
  const [nickNameFilter, setNicknameFilter] = useState<string>("activity");

  // 새로고침 시 localStorage에서 마지막 선택된 탭, 필터, 검색어 상태 불러오기
  useEffect(() => {
    const storedActiveList = localStorage.getItem("activeList") || "list1";
    const storedPostFilter = localStorage.getItem("postFilter") || "latest";
    const storedNicknameFilter =
      localStorage.getItem("nickNameFilter") || "activity";
    const storedSearchFilter = localStorage.getItem("searchFilter") || "";

    setActiveList(storedActiveList);
    setPostFilter(storedPostFilter);
    setNicknameFilter(storedNicknameFilter);
    setSearchFilter(storedSearchFilter);

    console.log(
      storedActiveList +
        "/" +
        storedPostFilter +
        "/" +
        storedNicknameFilter +
        "/" +
        storedSearchFilter
    );
  }, []);

  //   //  URL에 직접 /search만 기입했을 경우 기본 상태로 초기화
  useEffect(() => {
    if (pathname === "/search") {
      // 검색 페이지로 돌아올 때 기본값으로 초기화
      setActiveList("list1");
      setPostFilter("latest");
      setNicknameFilter("activity");
      localStorage.setItem("activeList", "list1");
      localStorage.setItem("postFilter", "latest");
      localStorage.setItem("nickNameFilter", "activity");
      router.replace(`/search?pf=${postFilter}`); // 기본 필터와 탭으로 URL 업데이트
    }
  }, [pathname]);

  // 검색어가 변경되었을 때만 탭과 필터를 초기화 (새 검색어 입력 시만)
  useEffect(() => {
    if (initialFilter !== searchFilter) {
      setActiveList("list1");
      setPostFilter("latest");
      setNicknameFilter("activity");
    }
  }, [initialFilter, searchFilter]);

  // URL의 q값이 변경되면 검색어 상태 업데이트
  useEffect(() => {
    const currentSearchQuery = searchParams.get("q");
    if (currentSearchQuery !== null && currentSearchQuery !== searchFilter) {
      setSearchFilter(currentSearchQuery);
    }
  }, [searchParams]);

  // 검색어가 변경되면 URL에 q 삭제여부와 탭과 필터 변경시 URL에 추가와 삭제 여부, 그리고 상태를 localStorage에 저장
  useEffect(() => {
    const currentSearchParams = new URLSearchParams(window.location.search);

    if (searchFilter) {
      currentSearchParams.set("q", searchFilter);
    } else {
      currentSearchParams.delete("q");
    }

    if (activeList === "list1") {
      currentSearchParams.set("pf", postFilter);
      currentSearchParams.delete("nf");
    } else {
      currentSearchParams.set("nf", nickNameFilter);
      currentSearchParams.delete("pf");
    }

    // 상태를 localStorage에 저장
    localStorage.setItem("activeList", activeList);
    localStorage.setItem("postFilter", postFilter);
    localStorage.setItem("nickNameFilter", nickNameFilter);
    localStorage.setItem("searchFilter", searchFilter);

    // URL 업데이트
    router.replace(`/search?${currentSearchParams.toString()}`);
  }, [searchFilter, activeList, postFilter, nickNameFilter]);

  // 탭 클릭 시 상태와 URL 업데이트 및 localStorage 저장
  const handleListClick = (listName: string) => {
    const newSearchParams = new URLSearchParams(window.location.search);

    if (listName === "list2") {
      setActiveList("list2");
      localStorage.setItem("activeList", "list2"); // list2로 변경한 후 localStorage에 저장
      newSearchParams.delete("pf");
      newSearchParams.set("nf", nickNameFilter);
      localStorage.setItem("nickNameFilter", nickNameFilter); // nickNameFilter도 저장

      console.log(nickNameFilter);
    } else {
      setActiveList("list1");
      localStorage.setItem("activeList", "list1"); // list1로 변경한 후 localStorage에 저장
      newSearchParams.delete("nf");
      newSearchParams.set("pf", postFilter);
      localStorage.setItem("postFilter", postFilter); // postFilter도 저장

      console.log(postFilter);
    }

    if (!searchFilter) {
      newSearchParams.delete("q");
    }

    router.replace(`/search?${newSearchParams.toString()}`);
  };

  return (
    <>
      <div className={style.frame}>
        <div className={style.group}>
          {/* 게시글 탭 */}
          <div
            className={`${style.list1} ${
              activeList === "list1" ? style.list1_color : ""
            }`}
            onClick={() => handleListClick("list1")}
            style={{ fontWeight: activeList === "list1" ? "bold" : "normal" }}
          >
            <div>게시글</div>
          </div>

          {/* 닉네임 탭 */}
          <div
            className={`${style.list2} ${
              activeList === "list2" ? style.list2_color : ""
            }`}
            onClick={() => handleListClick("list2")}
            style={{ fontWeight: activeList === "list2" ? "bold" : "normal" }}
          >
            <div>닉네임</div>
          </div>
        </div>

        <div
          className={`${style.post} ${
            activeList === "list1" ? style.hideUnderline1 : style.hideUnderline2
          }`}
        ></div>
      </div>

      <div>
        <div className={style.all}>
          <h5 className={style.filterTitle}>검색 필터</h5>
          <div className={style.filterSection}>
            <div>
              <div>
                {/* 게시글 탭일 때 */}
                {activeList === "list1" && (
                  <>
                    {/* 최신순 */}
                    <div className={style.radio}>
                      <div>최신순</div>
                      <input
                        type="radio"
                        name="postFilter"
                        value="latest"
                        checked={postFilter === "latest"}
                        onChange={() => setPostFilter("latest")}
                      />
                    </div>

                    {/* 좋아요순 */}
                    <div className={style.radio}>
                      <div>좋아요순</div>
                      <input
                        type="radio"
                        name="postFilter"
                        value="like"
                        checked={postFilter === "like"}
                        onChange={() => setPostFilter("like")}
                      />
                    </div>
                  </>
                )}

                {/* 닉네임 탭일 때 */}
                {activeList === "list2" && (
                  <>
                    {/* 활동순 */}
                    <div className={style.radio}>
                      <div>활동순</div>
                      <input
                        type="radio"
                        name="nickNameFilter"
                        value="activity"
                        checked={nickNameFilter === "activity"}
                        onChange={() => setNicknameFilter("activity")}
                      />
                    </div>

                    {/* 팔로워순 */}
                    <div className={style.radio}>
                      <div>팔로워순</div>
                      <input
                        type="radio"
                        name="nickNameFilter"
                        value="follower"
                        checked={nickNameFilter === "follower"}
                        onChange={() => setNicknameFilter("follower")}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
