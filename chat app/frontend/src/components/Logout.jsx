import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";

export default function Logout() {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto  hover:bg-sky-400">
      {!loading ? (
        <BiLogOut className=" w-6 h-6 text-white cursor-pointer " onClick={logout}></BiLogOut>
      ) : (
        <span className="loading loading-spinner loading-md"></span>
      )}
    </div>
  );
}
