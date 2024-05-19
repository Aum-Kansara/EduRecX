import React, { useEffect } from "react";
import { uselocalStore } from "../store/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ReactTypingEffect from "react-typing-effect";

const LoginRole = () => {
  const { role } = uselocalStore();

  
  return (
    <div className="main absolute bg-black z-50 top-0 left-0 h-screen w-screen flex flex-col justify-center items-center">
      <div id="loginrole-container" className="p-[2rem] text-3xl text-white">
        <ReactTypingEffect
          text={[`logging in as a ${role ? "Student" : "Teacher"}`]}
          cursorRenderer={(cursor) => (
            <h1 className=" text-lg md:text-2xl  lg:text-[3rem]">{cursor}</h1>
          )}
          // cursor=".."
          speed={100}
          typingDelay={500}
          displayTextRenderer={(text, i) => {
            return (
              <h1 className="text-lg md:text-2xl  lg:text-[3rem]">
                {text.split("").map((char, i) => {
                  const key = `${i}`;
                  return (
                    <span
                      key={key}
                      style={i % 2 === 0 ? { color: "white" } : {}}
                    >
                      {char}
                    </span>
                  );
                })}
              </h1>
            );
          }}
        />
      </div>
    </div>
  );
};

export default LoginRole;
