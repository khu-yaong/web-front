import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { logout } from "store/slices/authSlice";
import { useMemberInfo } from "api/memberApi";
//import { logoutAndClearVideos } from "store/slices/videoSlice";

export default function Header() {
  const { fetchMemberInfo } = useMemberInfo();
  const memberInfo = useSelector((state: RootState) => state.member.memberInfo);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (accessToken) {
      fetchMemberInfo();
    }
  }, [accessToken]);

  // 로그아웃 처리
  const handleSignOut = () => {
    dispatch(logout());
    //dispatch(logoutAndClearVideos() as any);
    alert("로그아웃했습니다.");
  };

  if (["/", "/signup", "/signin"].includes(window.location.pathname))
    return null;

  return (
    <header className="w-full flex items-center justify-between px-9 py-4 bg-white border-b-2 border-gray-200 fixed top-0 left-0 z-50">
      <img
        src={"/assets/images/logo.svg"}
        alt="logo"
        className="cursor-pointer"
        onClick={() => (accessToken ? navigate("/home") : navigate("/"))}
      />
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 space-x-0 md:space-x-5 lg:space-x-14 absolute md:relative top-16 right-0 md:top-0 bg-white md:bg-transparent w-full md:w-auto border-b-2 border-gray-200 md:border-0 p-4 md:p-0 z-10`}
      >
        <Link
          to="/home"
          className="dark2 hover:text-black hover:font-semibold text-xl"
        >
          Home
        </Link>
        <Link
          to="/dictionary"
          className="dark2 hover:text-black hover:font-semibold text-xl"
        >
          Dictionary
        </Link>
        <Link
          to="/dashboard"
          className="dark2 hover:text-black hover:font-semibold text-xl"
        >
          Dashboard
        </Link>
        <Link
          to="/mypage"
          className="dark2 hover:text-black hover:font-semibold text-xl"
        >
          My Page
        </Link>
      </div>
      <div className="flex items-center justify-center space-x-3">
        {accessToken ? (
          <button
            className="dark2 hover:text-black hover:font-semibold mx-2 cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="dark2 hover:text-black hover:font-semibold mx-2 cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        )}
        <img
          src={"/assets/images/chat.svg"}
          alt="chat"
          className="cursor-pointer"
        />
        {memberInfo && (
          <img
            src={memberInfo.profileImageUrl}
            alt="profile"
            onClick={() => navigate("/mypage")}
            className="cursor-pointer w-10 h-10 rounded-full border border-dark3"
          />
        )}
      </div>

      {/* Menu for mobile */}
      <div className="md:hidden flex items-center mr-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl focus:outline-none absolute z-20"
        >
          {menuOpen ? (
            <HiX size={30} color="#666" />
          ) : (
            <HiMenu size={30} color="#666" />
          )}
        </button>
      </div>
    </header>
  );
}
