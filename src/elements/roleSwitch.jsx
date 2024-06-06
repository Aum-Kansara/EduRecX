import styled from "@emotion/styled";
import { Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { uselocalStore } from "../store/store";

const RoleSwitch = () => {
  const { setRole, role } = uselocalStore();
  const [checked, setChecked] = useState(true);

  const handleRoleChange = (val) => {
    setRole(val);
  };

  useEffect(() => {
    console.log("role from role switch : ",role);
  }, [role]);

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<FontAwesomeIcon icon={faArrowRight} style={{color : "#ffffff"}} />')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#001e3c",
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<FontAwesomeIcon icon={faArrowLeft} style={{color : "#ffffff"}}/>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  return (
    <div>
      <span>Teacher</span>
      <Switch
        sx={{ m: 1 }}
        checked={role}
        onChange={(e) => {
          handleRoleChange(e.target.checked);
        }}
        role="switch"
      />
      <span>Student</span>
    </div>
  );
};

export default RoleSwitch;
