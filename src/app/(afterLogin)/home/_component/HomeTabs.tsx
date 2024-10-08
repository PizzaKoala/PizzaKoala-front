"use client";

import React, { useState, useEffect } from "react";
import style from "./tabs.module.css";
import { useContext } from "react";
import { TabContext } from "@/app/(afterLogin)/home/_component/TabProvider";
import { useRouter, useSearchParams } from "next/navigation";

export default function HomeTabs() {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // 선택된 리스트 항목을 관리하는 상태
  const [activeList, setActiveList] = useState("list1");

  const handleListClick = (listName: string) => {
    setActiveList(listName);
  };

  // const [tab, setTab] = useState("rec");
  const { tab, setTab } = useContext(TabContext);

  const onClickRec = () => {
    setTab("rec");
    // router.replace(`/search?q=${searchParams.get("q")}`);
  };

  const onClickFol = () => {
    setTab("fol");
    // router.replace(`/search?${searchParams.toString()}&f=live`);
  };

  return (
    <div className={style.frame}>
      <div className={style.group}>
        <div
          className={`${style.list1}  ${
            activeList === "list1" ? style.list1_color : ""
          }`}
          onClick={() => handleListClick("list1")}
          style={{ fontWeight: activeList === "list1" ? "bold" : "normal" }}
        >
          <div onClick={onClickRec}>팔로우</div>
        </div>
        <div
          className={`${style.list2} ${
            activeList === "list2" ? style.list2_color : ""
          }`}
          onClick={() => handleListClick("list2")}
          style={{ fontWeight: activeList === "list2" ? "bold" : "normal" }}
        >
          <div onClick={onClickFol}>추천순</div>
        </div>
      </div>

      <div
        className={`${style.post} ${
          activeList === "list1" ? style.hideUnderline1 : style.hideUnderline2
        }`}
      ></div>
    </div>
  );
}
