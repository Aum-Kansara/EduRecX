import React, { useRef } from "react";
import { uselocalStore } from "../store/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Logo from "../assets/logo.jsx";
import { redirect } from "react-router-dom";

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
      className="h-[4rem] flex fixed top-0 md:top-5 w-screen z-10 h-100"
    >
      <nav
        id="nav"
        className="w-[80%] h-[100%] text-white rounded-[30px]  flex justify-between  m-auto"
      >
        <div className="flex items-center p-3">
          <a href="#Home">
          <Logo />
          </a>
        </div>
        <div className="h-[100%] px-4 hidden md:block ">
          <ul className="flex items-center gap-8 h-[100%] text-nowrap tracking-wide font-medium font-mono">
            <li className="list"><a href="#WhyEduRecX">Why EduRecX ?</a></li>
            <li className="list"><a href="#Features">Features</a></li>
            <li className="list"><a href="#Members">Members</a></li>
            <li className="list"><a href="#Pricing">Pricing</a></li>
            <li className="list"><a href="#Contact">Contact</a></li>
          </ul>
        </div>
        <div
          onClick={() => {
            setAccountCard(!accountCard);
          }}
          className="flex items-center p-1 px-2 font-bold my-3 tracking-wide rounded bg-blue-700 transition-color duration-200 hover:bg-blue-900 cursor-pointer "
        >
          Try Now
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
