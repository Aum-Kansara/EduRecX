import {
  faAngleDown,
  faAngleUp,
  faArrowRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uselocalStore } from "../store/store";

const ClassList = ({ classData }) => {
  const [openSubject, setOpenSubject] = useState({});
  const { role, addTopicOpen, setAddTopicOpen, setAddTopicSubId } =
    uselocalStore();

  useEffect(() => {
    const updateSubjectList = () => {
      const newOpenSubject = {};
      classData.Subjects.forEach((sub) => {
        const k = sub._id;
        newOpenSubject[k.toString()] = false;
      });
      setOpenSubject(newOpenSubject);
    };
    updateSubjectList();
  }, [classData]);

  const handleClick = (subjectID) => {
    setOpenSubject((prev) => ({
      ...prev,
      [subjectID.toString()]: !prev[subjectID.toString()],
    }));
  };

  const navigate = useNavigate();

  if (!classData.Subjects.length) {
    return (
      <div className="text-2xl text-white h-full w-full flex items-center justify-center">
        No Subjects found
      </div>
    );
  }

  return (
    <div>
      <List
        sx={{ width: "100%", bgcolor: "#334155", borderRadius: "8px" }}
        component="nav"
      >
        {classData.Subjects.map((sub, i) => (
          <div key={i}>
            <ListItemButton
              onClick={() => handleClick(sub._id)}
              sx={{
                justifyContent: "space-between",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#1E293B",
                },
              }}
            >
              <ListItemText primary={sub.title} />
              <FontAwesomeIcon
                icon={openSubject[sub._id.toString()] ? faAngleUp : faAngleDown}
                className="text-slate-400"
              />
            </ListItemButton>
            <Collapse
              in={openSubject[sub._id.toString()]}
              timeout={100}
              unmountOnExit
            >
              <div className={`w-full flex justify-end px-4 pb-2`}>
                {!role && (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600 focus:outline-none transition-all duration-150"
                    onClick={() => {
                      setAddTopicSubId(sub._id);
                      setAddTopicOpen(true);
                    }}
                  >
                    Add Topic <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </div>
              {sub.topics.map((top, j) => (
                <List component="div" key={j}>
                  <ListItemButton
                    onClick={() => navigate(`/topics/${top._id}`)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={top.title} className="text-sm" />
                  </ListItemButton>
                </List>
              ))}
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
};

export default ClassList;
