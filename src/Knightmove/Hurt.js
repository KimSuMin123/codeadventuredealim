import React from 'react';
import styled, { keyframes } from 'styled-components';

import img0 from '../img/Trainee Knight/06-Hurt/__TRAINEE_Hurt_000.png';
import img1 from '../img/Trainee Knight/06-Hurt/__TRAINEE_Hurt_001.png';
import img2 from '../img/Trainee Knight/06-Hurt/__TRAINEE_Hurt_002.png';
import img3 from '../img/Trainee Knight/06-Hurt/__TRAINEE_Hurt_003.png';
import img4 from '../img/Trainee Knight/06-Hurt/__TRAINEE_Hurt_004.png';
import img5 from '../img/Trainee Knight/06-Hurt/__TRAINEE_Hurt_005.png';
import img6 from '../img/Trainee Knight/06-Hurt/__TRAINEE_Hurt_006.png';

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
  width: 100px;
  height: 100px;
  animation: ${HurtAnimation} 2s steps(7) forwards;
  background-size: cover;
`;

const Hurt = () => {
  return <AnimatedDiv />;
};

export default Hurt;
