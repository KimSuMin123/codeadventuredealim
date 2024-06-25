import React from "react";
import styled, { keyframes } from "styled-components";

import img0 from "../img/valla/valla_idle_sw/1.png";

const HurtAnimation = keyframes`
  0% { background-image: url(${img0}); }
  16.67% { background-image: url(${img1}); }
  33.33% { background-image: url(${img2}); }
  50% { background-image: url(${img3}); }
  66.67% { background-image: url(${img4}); }
  83.33% { background-image: url(${img5}); }
  100% { background-image: url(${img6}); }
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
