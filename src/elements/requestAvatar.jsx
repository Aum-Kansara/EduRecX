import React from "react";
import "./styles/reqAvatar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

const RequestAvatar = ({ msgCount }) => {
  return (
    <button class="inbox-btn">
      <FontAwesomeIcon icon={faPeopleGroup} />
     
      {msgCount > 0 ? (
        <span class="msg-count text-md font-bold">{msgCount}</span>
      ) : (
        ""
      )}
    </button>
  );
};

export default RequestAvatar;
