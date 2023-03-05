import React, { useEffect, useState } from "react";
import { Box, Card, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import HeroUpload from "../components/sections/HeroUpload";

const UploadImage = () => {

  return (
    <>
      <HeroUpload className="illustration-section-01" />
    </>
  );
};

export default UploadImage;
