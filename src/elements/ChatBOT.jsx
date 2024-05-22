import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";
import "./styles/chatBOT.css";
import MsgBox from "./messageBox";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMicrophone,
  faMinus,
  faStop,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const ChatBOT = () => {
  const [receivingStatus, setReceivingStatus] = useState(true);
  const [msgList, setMsgList] = useState([]);
  const [msg, setMsg] = useState("");
  const [listeningStatus, setlisteningStatus] = useState(false);

  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  const axiosConfig = axios.create({
    baseURL: "https://edurecx-chatbot-backend-api-ugxdufb6ga-em.a.run.app",
    method: ["GET"],
  });

  const sendMsg = async (msg) => {
    setReceivingStatus(true);
    await axiosConfig
      .get("/chat", {
        params: { query: msg },
      })
      .then((res) => {
        updateMsgList(res.data, "left");
        setReceivingStatus(false);
      });
  };

  const updateMsgList = (msg, pos) => {
    if (msg) {
      var txtSent = {
        position: pos,
        msg,
      };
      if (pos === "right") {
        txtSent = { ...txtSent, sender: "Risheet Parmar" };
      }
      setMsgList((msgList) => [txtSent, ...msgList]);
    }
  };

  const [onStart, setOnStart] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await axiosConfig.get(`/start`).then((res) => {
        updateMsgList(res.data, "left");
        setReceivingStatus(false);
        setOnStart(false);
      });
    };
    getData();
  }, []);

  return (
    <div className="chatContainer">
      <div className="chat-header chat-ele">
        <div className="head">Your assistant</div>
        <div className="ctrl">
          <FontAwesomeIcon icon={faXmark} onClick={() => {}} />
        </div>
      </div>
      <div className="chat-body chat-ele">
        {onStart ? <MsgBox position="left" loading={onStart} /> : ""}
        {receivingStatus && !onStart ? (
          <MsgBox position="left" loading={receivingStatus} />
        ) : (
          ""
        )}
        {msgList.map((msg, i) => {
          return (
            <MsgBox
              position={msg.position}
              sender={msg.sender}
              msg={msg.msg}
              profile={msg.profile}
              text={msg.msg}
              key={i}
            />
          );
        })}
      </div>
      <div className="chat-footer chat-ele">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            if (msg) {
              updateMsgList(msg, "right");
              setReceivingStatus(true);
              sendMsg(msg);
              setMsg("");
            }
          }}
        >
          <div className="msgCont">
            <div
              className="speechBtns"
              onClick={() => {
                if (!browserSupportsSpeechRecognition) {
                  console.warn(
                    "Sorry! your browser doesn't support speech recognition"
                  );
                }
                setlisteningStatus(!listeningStatus);
                if (!listeningStatus) {
                  SpeechRecognition.startListening({ continuous: true });
                } else {
                  setMsg(transcript);
                  resetTranscript();
                  SpeechRecognition.stopListening();
                }
              }}
            >
              {!listeningStatus ? (
                <FontAwesomeIcon
                  icon={faMicrophone}
                  style={{ color: "white" }}
                />
              ) : (
                <FontAwesomeIcon icon={faStop} style={{ color: "white" }} />
              )}
            </div>
            <input
              type="text"
              name=""
              id=""
              className="text-white"
              placeholder="message..."
              value={listeningStatus ? transcript : msg}
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setMsg(e.target.value);
              }}
            />
            <button type="submit" className="btn">
              <SendHorizontal height={"17px"} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBOT;
