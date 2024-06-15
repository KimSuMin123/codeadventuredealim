import React from 'react';
import styled, { keyframes } from 'styled-components';

import img0 from '../img/Trainee Knight/05-Jump & Fall/__TRAINEE_Fall_000.png'
import img1 from '../img/Trainee Knight/05-Jump & Fall/__TRAINEE_Fall_001.png'

const JumpFallAnimation = keyframes`
  0% { background-image: url(${img0}); }
  100% { background-image: url(${img1}); }
`;

const AnimatedDiv = styled.div`
  width: 100px;
  height: 100px;
  animation: ${JumpFallAnimation} 2s steps(8) forwards;
  background-size: cover;
`;

const JumpFall = () => {
  return <AnimatedDiv />;
};

export default JumpFall;
