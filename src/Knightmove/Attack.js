import React from "react";
import styled, { keyframes } from "styled-components";

import img1 from "../img/valla/valla_attack_nw/1.png";
import img2 from "../img/valla/valla_attack_nw/2.png";
import img3 from "../img/valla/valla_attack_nw/3.png";
import img4 from "../img/valla/valla_attack_nw/4.png";
import img5 from "../img/valla/valla_attack_nw/5.png";
import img6 from "../img/valla/valla_attack_nw/6.png";
import img7 from "../img/valla/valla_attack_nw/7.png";
import img8 from "../img/valla/valla_attack_nw/8.png";

import img0 from "../img/valla/valla_idle_sw/1.png";

const AttackAnimation = keyframes`
  0% { background-image: url(${img0}); }
  12.5% { background-image: url(${img1}); }
  25% { background-image: url(${img2}); }
  37.5% { background-image: url(${img3}); }
  50% { background-image: url(${img4}); }
  62.5% { background-image: url(${img5}); }
  75% { background-image: url(${img6}); }
  87.5% { background-image: url(${img7}); }
  100% { background-image: url(${img8}); }
`;

const AnimatedDiv = styled.div`
  width: 300px;
  height: 300px;
  animation: ${AttackAnimation} 2s steps(8) forwards;
  background-size: cover;
`;

const Attack = () => {
  return <AnimatedDiv />;
};

export default Attack;
