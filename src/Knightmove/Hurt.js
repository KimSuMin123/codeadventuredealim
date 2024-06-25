import React from "react";
import styled, { keyframes } from "styled-components";

import img0 from "../img/valla/valla_idle_sw/1.png";

const HurtAnimation = keyframes`
  0% { background-image: url(${img0}); }
  100% { background-image: url(${img0}); }
`;

const AnimatedDiv = styled.div`
  width: 300px;
  height: 300px;
  animation: ${HurtAnimation} 2s steps(7) forwards;
  background-size: cover;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Hurt = () => {
  return <AnimatedDiv />;
};

export default Hurt;
