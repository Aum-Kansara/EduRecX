import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { getClassDetails, getClasses } from "../helper/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faComputer,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useClassData, useUserData, uselocalStore } from "../store/store";
import Loading from "./Loading.jsx";

const SidebarList = () => {
  const [open, setOpen] = useState(false);
  const { decodedData, token } = useUserData();
  const { showSidebar, setShowSidebar } = uselocalStore();

  const handleClick = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  let { role, roleID } = decodedData(token);
  const handleClassClick = async (classID) => {
    navigate(`/${role ? "students" : "teachers"}/classes/${classID}`);
  };

  const { classlist, setClassList } = useClassData();

  useEffect(() => {
    setClassList(role, roleID);
  }, [setClassList]);

  if (classlist)
    return (
      <div
        className={`side bg-HomeBG-side rounded-2xl  h-[90vh] transition-all duration-300 overflow-auto ${showSidebar ? "absolute md:static  z-20 w-[60vw] md:w-[25vw]" : "w-0 md:w-[3rem] overflow-hidden"}`}
        onMouseEnter={() => {
          setShowSidebar(true);
        }}
        onMouseLeave={() => {
          setShowSidebar(false);
          setOpen(false);
        }}
      >
        <List
          sx={{
            bgcolor: "transparent",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faComputer} className="text-gray-300" />
            </ListItemIcon>
            <ListItemText
              primary={role ? "Enrolls" : "Classes associated"}
              className="text-gray-300"
              sx={{
                fontWeight: "700",
              }}
            />

            {open ? (
              <FontAwesomeIcon icon={faAngleUp} className="text-gray-300" />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} className="text-gray-300" />
            )}
          </ListItemButton>
          <Collapse in={open} timeout={"auto"} unmountOnExit>
            <List component="div" disablePadding className="text-gray-300">
              {classlist.map((cls) => {
                return (
                  <ListItemButton
                    sx={{ pl: 2 }}
                    key={cls.classID}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClassClick(cls.classID);
                    }}
                  >
                    <ListItemText primary={cls.title} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        </List>
      </div>
    );
  return <Loading />;
};

export default SidebarList;
