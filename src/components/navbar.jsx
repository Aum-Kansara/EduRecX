import React, { useRef } from "react";
import { uselocalStore } from "../store/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Logo from "../assets/logo.jsx";

const Navbar = () => {
  const { showLoginPage, setShowLoginPage, accountCard, setAccountCard } =
    uselocalStore();
  const nav = useRef();
  useGSAP(
    () => {
      gsap.fromTo("#nav", { scale: 0 }, { scale: 1, delay: 0.5 });
    },
    { scope: nav }
  );

  return (
    <div
      ref={nav}
      className="h-[4rem] flex fixed top-0 md:top-5 backdrop-blur-lg md:backdrop-blur-0 w-screen z-10 "
    >
      <nav
        id="nav"
        className="w-[80%] h-[100%] text-white rounded-[30px]  flex justify-between  m-auto"
      >
        <div className="flex items-center p-3">
          <Logo />
        </div>
        <div className="h-[100%] px-4 hidden md:block ">
          <ul className="flex items-center gap-5 h-[100%] ">
            <li className="list">about</li>
            <li className="list">features</li>
            <li className="list">Members</li>
          </ul>
        </div>
        <div
          onClick={() => {
            setAccountCard(!accountCard);
          }}
          className="flex items-center p-2 my-3 rounded-md bg-blue-700 transition-color duration-200 hover:bg-blue-900 cursor-pointer "
        >
          Try now
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
