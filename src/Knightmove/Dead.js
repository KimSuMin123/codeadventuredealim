import React from "react";
import styled, { keyframes } from "styled-components";

import img1 from "../img/valla/death/01.png";
import img2 from "../img/valla/death/02.png";
import img3 from "../img/valla/death/03.png";
import img4 from "../img/valla/death/04.png";

const dieAnimation = keyframes`
  0% { background-image: url(${img0}); }
  25% { background-image: url(${img1}); }
  50% { background-image: url(${img2}); }
  75% { background-image: url(${img3}); }
  100% { background-image: url(${img4}); }

`;

const AnimatedDiv = styled.div`
  width: 300px;
  height: 300px;
  animation: ${dieAnimation} 2s steps(8) forwards;
  background-size: cover;
`;

const Dead = () => {
  return <AnimatedDiv />;
};

export default Dead;
