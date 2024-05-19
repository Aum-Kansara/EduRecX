import { useEffect } from "react";
import LoginCard from "../elements/loginCard";
import RegisterCard from "../elements/RegisterCard";
import { uselocalStore } from "../store/store";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Hero from "../elements/Hero";

const Home = () => {
  const { showLoginPage, accountCard } = uselocalStore();

  useEffect(() => {
    console.log(showLoginPage);
  }, [showLoginPage]);

  gsap.registerPlugin(useGSAP);

  const cardContainer = useRef();

  useEffect(() => {
    if (accountCard == false) {
      gsap.to("#registercard", { scale: 0, duration: 1 });
      gsap.to("#logincard", { scale: 0, duration: 1 });
    }
  }, [accountCard]);

  useGSAP(
    () => {
      // gsap code here...
      gsap.fromTo("#registercard", { scale: 0 }, { scale: 1, duration: 0.3 });
      gsap.fromTo("#logincard", { scale: 0 }, { scale: 1, duration: 0.3 }); // <-- automatically reverted
    },
    { dependencies: [showLoginPage, accountCard], scope: cardContainer }
  );

  return (
    <div className="main w-screen relative">
      <div className=" min-h-[100vh] w-[100vw] snap-mandatorysnap-y">
        <div className="heroBG absolute  top-0 left-0  h-[100vh] w-[100vw] "></div>
        <div
          ref={cardContainer}
          className="flex flex-col justify-center  items-center min-h-screen w-screen "
        >
          {accountCard ? (
            showLoginPage ? (
              <LoginCard id={"logincard"} />
            ) : (
              <RegisterCard id={"registercard"} />
            )
          ) : (
            <Hero />
          )}
        </div>
        <div className="min-h-screen  snap-start bg-gray-600 w-screen"></div>
        <div className="min-h-screen snap-start bg-gray-700 w-screen"></div>
        <div className="min-h-screen snap-start bg-gray-800 w-screen"></div>
        <div className="min-h-screen snap-start bg-gray-900 w-screen"></div>
      </div>
    </div>
  );
};

export default Home;
