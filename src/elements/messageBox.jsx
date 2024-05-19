import React from "react";
import "./styles/messagebox.css";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";
import ReactMarkdown from "react-markdown";
import TextToSpeech from "../helper/tts";
import { useSpeechSynthesis } from "react-speech-kit";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name, profile) {
  if (profile) {
    return {
      src: profile,
    };
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${
      name.split(" ")[1] ? name.split(" ")[1][0] : ""
    }`,
  };
}

const MsgBox = ({ msg, sender, profile, position, loading, text }) => {
  const { speak } = useSpeechSynthesis();

  return (
    <div className={`${position} msgBox`}>
      <div className="avatar">
        {position === "left" ? (
          <FontAwesomeIcon
            icon={faRobot}
            size="2xl"
            beatFade={loading ? true : false}
            style={{ color: "#ec55e0" }}
          />
        ) : (
          <Avatar alt={sender} {...stringAvatar(sender, profile)} />
        )}
      </div>
      <div className="msg">
        {loading ? (
          <ReactLoading
            type="bubbles"
            height="20px"
            width="20px"
            style={{ color: "#c7dbff" }}
          />
        ) : (
          <ReactMarkdown>{msg}</ReactMarkdown>
        )}
      </div>
      {position === "left" && !loading ? (
        <TextToSpeech className="volumeBtn" text={msg} />
      ) : (
        ""
      )}
    </div>
  );
};

export default MsgBox;

// import React from "react";
// import styled from "styled-components";

// const CurvedDiv = styled.div`
//   border-radius: 0% 100% 100% 0% / 47% 47% 53% 5;
// `;
