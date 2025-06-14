import React, { useContext, useState } from "react";
import logo from "../../assets/imgs/notes.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userToken, setUserToken } = useContext(userContext);

  const navigate = useNavigate();

  function logOut() {
    localStorage.setItem("userToken", "");
    setUserToken("");
    navigate("/login");
  }
  return (
    <>
      <nav className="bg-slate-100 p-2 dark:bg-slate-900 dark:text-white fixed top-0 left-0 right-0 ">
        <div className="container flex justify-between items-center">
          {/* logo */}
          <Link to={userToken ? "/" : "/login"}>
            <div className="logo flex items-center gap-4">
              <img src={logo} alt="logo" className="w-[40px]" />
              <h1 className="text-2xl font-bold">مهامي</h1>
            </div>
          </Link>
          {/* links big screens */}
          <div className="links md:block hidden">
            <ul className="flex gap-5">
              {userToken ? (
                <>
                  <li>
                    <NavLink to={"/"}>الصفحة الرئيسية</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/settings"}> الإعدادات</NavLink>
                  </li>
                  <p
                    className="flex items-center cursor-pointer hover:text-red-500"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    تسجيل الخروج
                    <i className="fa-solid fa-right-from-bracket fa-flip-horizontal ms-2 mt-1 text-red-500"></i>
                  </p>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to={"/login"}>تسجيل الدخول</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/register"}>ليس لدي حساب ؟</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* links small screens */}
          <button
            className="block md:hidden"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>

          {/* links small screens */}
          {isOpen && (
            <div className="links md:hidden block fixed top-0 end-0 bg-slate-100 dark:bg-slate-900 p-4 w-[200px]">
              <button
                className="ms-auto block w-fit"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <i className="fas fa-xmark text-2xl"></i>
              </button>
              <ul className="">
                {userToken ? (
                  <>
                    <li className="border-b border-main dark:border-mainDark p-4">
                      <NavLink to={"/"}>الصفحة الرئيسية</NavLink>
                    </li>
                    <li className="border-b border-main dark:border-mainDark p-4">
                      <NavLink to={"/settings"}> الإعدادات</NavLink>
                    </li>

                    <p
                      className="flex items-center cursor-pointer hover:text-red-500 p-4"
                      onClick={() => {
                        logOut();
                      }}
                    >
                      تسجيل الخروج
                      <i className="fa-solid fa-right-from-bracket fa-flip-horizontal ms-2 mt-1 text-red-500"></i>
                    </p>
                  </>
                ) : (
                  <>
                    <li className="border-b border-main dark:border-mainDark p-4">
                      <NavLink to={"/login"}>تسجيل الدخول</NavLink>
                    </li>
                    <li className="border-b border-main dark:border-mainDark p-4">
                      <NavLink to={"/register"}>ليس لدي حساب ؟</NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
