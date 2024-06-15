import React from 'react';
import styled, { keyframes } from 'styled-components';

import img0 from '../img/Trainee Knight/03-Attack/Effect/__TRAINEE_Attack_000.png'
import img1 from '../img/Trainee Knight/03-Attack/Effect/__TRAINEE_Attack_001.png'
import img2 from '../img/Trainee Knight/03-Attack/Effect/__TRAINEE_Attack_002.png'
import img3 from '../img/Trainee Knight/03-Attack/Effect/__TRAINEE_Attack_003.png'
import img4 from '../img/Trainee Knight/03-Attack/Effect/__TRAINEE_Attack_004.png'
import img5 from '../img/Trainee Knight/03-Attack/Effect/__TRAINEE_Attack_005.png'
import img6 from '../img/Trainee Knight/03-Attack/Effect/__TRAINEE_Attack_006.png'
import img7 from '../img/Trainee Knight/03-Attack/Effect/__TRAINEE_Attack_007.png'

const dieAnimation = keyframes`
  0% { background-image: url(${img0}); }
  12.5% { background-image: url(${img1}); }
  25% { background-image: url(${img2}); }
  37.5% { background-image: url(${img3}); }
  50% { background-image: url(${img4}); }
  62.5% { background-image: url(${img5}); }
  75% { background-image: url(${img6}); }
  87.5% { background-image: url(${img7}); }
  100% { background-image: url(${img7}); }
`;

const AnimatedDiv = styled.div`
  width: 100px;
  height: 100px;
  animation: ${AttackAnimation} 2s steps(8) forwards;
  background-size: cover;
`;

const Attack = () => {
  return <AnimatedDiv />;
};

export default Attack;
