import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import "./styles/videos.css";
import Loading from "./Loading";

const VideosList = () => {
  const tempProp = {
    video_id: "KmhAQJqOaIY",
    title: "BossMan Dlow - Get In With Me (Official Video)",
    author: "BossMan Dlow",
    number_of_views: 2369391,
    video_length: "2:05",
    description:
      'Listen to "Get In With Me" On All Platforms:\nhttps://bossmandlow.lnk.to/GetInWithMe\n\nFollow BossMan Dlow:\nInstagram: https://BossmanDlow.lnk.to/Instagram\nTiktok: https://BossmanDlow.lnk.to/TikTok...',
    is_live_content: null,
    published_time: "9 days ago",
    channel_id: "UC1NZP8d-VFjV-kKSo6lDBig",
    category: null,
    type: "NORMAL",
    keywords: [],
    thumbnails: [
      {
        url: "https://i.ytimg.com/vi/KmhAQJqOaIY/hqdefault.jpg?sqp=-oaymwEbCNIBEHZIVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLA171xgGhJ2c9LWoFqMvobu2h9w2w",
        width: 210,
        height: 118,
      },
      {
        url: "https://i.ytimg.com/vi/KmhAQJqOaIY/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCyKUMPofaoiYnGbetggU8kYxFyWw",
        width: 246,
        height: 138,
      },
      {
        url: "https://i.ytimg.com/vi/KmhAQJqOaIY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCMZDIqMJzG8J27mf-rdiDkF2Lg3A",
        width: 336,
        height: 188,
      },
    ],
  };
  const [vList, setVlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputQuery, setInputQuery] = useState("");
  useEffect(() => {
    const getData = async () => {
      const options = {
        method: "GET",
        url: "https://youtube-v2.p.rapidapi.com/search/",
        params: {
          query:
            inputQuery ||
            "DSA react.js Next.js  AI and ML llama ",
          lang: "en",
          order_by: "this_month",
          country: "us",
        },
        headers: {
          "X-RapidAPI-Key":
            "b79cee61f7msh7d57bdb8220c1b0p1fcb13jsn8b60ff87af10",
          "X-RapidAPI-Host": "youtube-v2.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        await setVlist(response.data.videos);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [inputQuery]);

  const printVideoList = () => {
    return vList.map((v, i) => {
      return (
        <VideoCard
          key={i}
          thumbnails={v.thumbnails}
          author={v.author}
          channelName={v.author}
          channelID={v.channel_id}
          description={v.description}
          views={v.number_of_views}
          publishTime={v.published_time}
          title={v.title}
          videoID={v.video_id}
          videoLength={v.video_length}
        />
      );
    });
  };

  return (
    <div>
      <div className="w-[100%] flex justify-center my-5">
        {" "}
        <input
          type="text"
          className="input w-[30%] "
          value={inputQuery}
          placeholder="Search..."
          onChange={(e) => {
            setInputQuery(e.target.value);
          }}
        />
      </div>
      <div className={isLoading ? "center" : "videolist"}>
        {isLoading ? <Loading /> : printVideoList()}
      </div>
    </div>
  );
};

export default VideosList;
