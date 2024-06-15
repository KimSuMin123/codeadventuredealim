import React from 'react';
import styled, { keyframes } from 'styled-components';

import img0 from '../img/Trainee Knight/02-Run/__TRAINEE_Run_000.png';
import img1 from '../img/Trainee Knight/02-Run/__TRAINEE_Run_001.png';
import img2 from '../img/Trainee Knight/02-Run/__TRAINEE_Run_002.png';
import img3 from '../img/Trainee Knight/02-Run/__TRAINEE_Run_003.png';
import img4 from '../img/Trainee Knight/02-Run/__TRAINEE_Run_004.png';
import img5 from '../img/Trainee Knight/02-Run/__TRAINEE_Run_005.png';
import img6 from '../img/Trainee Knight/02-Run/__TRAINEE_Run_006.png';
import img7 from '../img/Trainee Knight/02-Run/__TRAINEE_Run_007.png';
import img8 from '../img/Trainee Knight/02-Run/__TRAINEE_Run_008.png';
import img9 from '../img/Trainee Knight/02-Run/__TRAINEE_Run_009.png';

const runAnimation = keyframes`
  0% { background-image: url(${img0}); }
  10% { background-image: url(${img1}); }
  20% { background-image: url(${img2}); }
  30% { background-image: url(${img3}); }
  40% { background-image: url(${img4}); }
  50% { background-image: url(${img5}); }
  60% { background-image: url(${img6}); }
  70% { background-image: url(${img7}); }
  80% { background-image: url(${img8}); }
  90% { background-image: url(${img9}); }
  100% { background-image: url(${img9}); }
`;

const AnimatedDiv = styled.div`
  width: 100px;
  height: 100px;
  animation: ${runAnimation} 2s steps(10) forwards;
  background-size: cover;
`;

const Run = () => {
  return <AnimatedDiv />;
};

export default Run;