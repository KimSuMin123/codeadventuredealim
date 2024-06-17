import React from "react";
import styled, { keyframes } from "styled-components";

import img0 from "../img/Trainee Knight/05-Jump & Fall/__TRAINEE_Fall_000.png";
import img1 from "../img/Trainee Knight/05-Jump & Fall/__TRAINEE_Fall_001.png";
import img2 from "../img/Trainee Knight/01-Idle/__TRAINEE_Idle_000.png";

const JumpFallAnimation = keyframes`
  0% { background-image: url(${img0}); }
  50% { background-image: url(${img1}); }
  100% { background-image: url(${img2}); }
`;

const AnimatedDiv = styled.div`
  width: 300px;
  height: 300px;
  animation: ${JumpFallAnimation} 2s steps(8) forwards;
  background-size: cover;
`;

const JumpFall = () => {
  return <AnimatedDiv />;
};

export default JumpFall;
