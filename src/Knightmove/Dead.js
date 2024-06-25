import React from "react";
import styled, { keyframes } from "styled-components";

import img1 from "../img/valla/valla_death/01.png";
import img2 from "../img/valla/valla_death/02.png";
import img3 from "../img/valla/valla_death/03.png";
import img4 from "../img/valla/valla_death/04.png";

const dieAnimation = keyframes`
  0% { background-image: url(${img1}); }
  35% { background-image: url(${img1}); }
  65% { background-image: url(${img2}); }
  100% { background-image: url(${img3}); }
  

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
