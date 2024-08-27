"use client";

import style from "./logoutButton.module.css";

export default function LogoutButton() {
  const onLogout = () => {};

  return <button className={style.logOutButton} onClick={onLogout}></button>;
}
