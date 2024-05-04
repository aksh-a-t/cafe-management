// @ts-nocheck
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const CircularLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="neutral" size={"10vw"} />
    </div>
  );
};

export default CircularLoader;
