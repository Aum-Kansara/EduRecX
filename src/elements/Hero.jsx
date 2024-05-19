import React, { useRef } from "react";
import teacher from "../assets/Teacher.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { uselocalStore } from "../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  const { showLoginPage, setShowLoginPage, accountCard, setAccountCard } =
    uselocalStore();
  const heroContainer = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".img",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, delay: 0.5, duration: 0.4 }
      )
        .fromTo(
          ".title1",
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.2 }
        )
        .fromTo(
          ".title2",
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.2 }
        )
        .fromTo(
          ".title3",
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.2 }
        )
        .fromTo(
          ".txt1",
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.2 }
        )
        .fromTo(
          ".txt2",
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.2 }
        )
        .fromTo(
          "#btn",
          { y: 100, opacity: 0, duration: 0.2 },
          { y: 0, opacity: 1, duration: 0.2 }
        );
    },
    { scope: heroContainer }
  );

  return (
    <div
      ref={heroContainer}
      className="h-[100%]  max-h-[70vh] w-[100%] flex backdrop-blur-sm justify-center gap-5  text-white"
    >
      <div className="img hidden md:block">
        <img src={teacher} className="h-full w-full"></img>
      </div>
      <div className="w-[90%] md:w-[70%] lg:w-[40%] p-0  md:p-[2rem] flex flex-col items-center gap-2">
        <div className="flex flex-col  items-center xl md:text-2xl lg:text-3xl xl:text-4xl">
          <span className="title1 text-center ">
            Empower Your Learning Journey with AI.
          </span>
          <span className="title2 text-center">Tailored.</span>
          <span className="title3 text-center">Transformative.</span>
        </div>
        <div>
          <ul className="flex flex-col gap-2 text-xs md:text-sm lg:text-md">
            <li className="txt1 text-center ">
              Personalized Learning: Experience education like never before with
              our AI-driven platform that tailors lessons to your unique needs
              and preferences.
            </li>
            <li className="txt2 text-center ">
              Transformative Experience: Unlock your full potential as our
              system provides customized recommendations based on your
              performance, fostering continuous growth and achievement
            </li>
          </ul>
        </div>

        <div
          onClick={() => {
            setAccountCard(!accountCard);
          }}
          id="btn"
          className=" flex items-center justify-around py-3  my-3 min-w-[30vw] md:min-w-[10vw] md:w-[20%] rounded-md bg-sky-600 transition-all duration-200 hover:bg-sky-900 cursor-pointer "
        >
          Get Started
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
