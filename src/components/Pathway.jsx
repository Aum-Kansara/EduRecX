import axios from "axios";
import React, { useEffect, useState } from "react";
import tempImg from "../assets/tmpThumbnail.jpeg";

const Pathway = ({ videoData }) => {
  // Function to show/hide the highlight line at the specified timestamp

  const convertor = (start, end, duration) => {
    let widths = [];
    let total =
      parseInt(duration.split(":")[0]) * 60 + parseInt(duration.split(":")[1]);
    let startAt =
      parseInt(start.split(":")[0]) * 60 + parseInt(start.split(":")[1]);
    let endAt = parseInt(end.split(":")[0]) * 60 + parseInt(end.split(":")[1]);

    widths.push((startAt * 100) / total);
    widths.push(((endAt - startAt) * 100) / total);
    widths.push(((total - endAt) * 100) / total);

    return widths;
  };

  const TimeStamp = ({ start, end, duration }) => {
    const widths = convertor(start, end, duration);
    console.log(widths);

    return (
      <div className=" w-full h-2  flex">
        <span className={`w-[${widths[0]}%] h-1 bg-blue-800`}></span>
        <span className={`w-[${widths[1]}%] h-1  bg-yellow-300`}>j</span>
        <span className={`w-[${widths[2]}%] h-1 bg-blue-800`}></span>
      </div>
    );
  };

  const VideoCard = ({ title, desc, link, recommendedFor }) => {
    return (
      <div className="flex gap-4 w-full py-2 border-gray-700 border-b-2 h-[200px] mb-4 overflow-hidden">
        <div className="h-full w-1/6  flex flex-col justify-between">
          <div
            className="h-[92%] w-full rounded-2xl bg-cover "
            style={{
              backgroundImage: `url(${tempImg})`,
            }}
          ></div>
          <div className="h-[8%] flex items-center ">
            <TimeStamp start={"4:00"} end={"6:00"} duration={"10:00"} />
          </div>
        </div>
        <div className="desc w-5/6 flex flex-col justify-between py-2 text-white ">
          <div>
            <div className="text-xl text-gray-200">{title}</div>
            <div className="text-lg text-gray-400">{desc}</div>
          </div>
          <div className="text-yellow-700 justify-self-end">
            Recommended for{" "}
            <span className="text-yellow-400"> {recommendedFor} </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <div
        className={`h-screen w-screen flex items-center pt-[10vh] flex-col bg-HomeBG-main `}
      >
        <div className="h-full w-2/3  px-8 py-4  overflow-auto">
          <VideoCard
            title="Introduction to HTML"
            desc="Learn the basics of HTML, including tags, elements, and structure."
            link="https://www.example.com/html-intro"
            recommendedFor="HTML Beginners"
          />
          <VideoCard
            title="CSS Fundamentals"
            desc="Explore the fundamentals of CSS, including selectors, properties, and styling."
            link="https://www.example.com/css-fundamentals"
            recommendedFor="CSS Beginners"
          />
          <VideoCard
            title="Responsive Web Design"
            desc="Discover techniques for creating responsive websites using HTML and CSS."
            link="https://www.example.com/responsive-web-design"
            recommendedFor="Intermediate Web Developers"
          />
          <VideoCard
            title="CSS Grid Layout"
            desc="Master CSS Grid Layout and learn how to create complex web layouts."
            link="https://www.example.com/css-grid-layout"
            recommendedFor="Advanced CSS Users"
          />
        </div>
      </div>
    </div>
  );
};

export default Pathway;
