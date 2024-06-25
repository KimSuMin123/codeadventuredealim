import React from "react";
import styled, { keyframes } from "styled-components";
import background from "../img/background.png"; // 배경 이미지 경로를 확인하세요

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StartContainer = styled.div`
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d9b132;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7); /* 어둡게 처리 */
    z-index: 0;
  }
`;

const TextContainer = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  animation: ${fadeInUp} 10s ease-in-out;
  text-align: center;
  h1 {
    margin: 0;
    line-height: 1.5;
  }
`;

const Prolog = () => {
  return (
    <StartContainer>
      <TextContainer>
        <h1>
          평화로운 어느날, 세상의 균형을 유지하던 수호석이 마왕들의 공격으로
          인해 여섯 조각으로 부서지고, 전 세계는 순식간에 혼란에 휩싸이게 된다.
          <br />
          평범한 마을에 살던 소녀인 주인공의 마을도 마왕의 습격을 받게 되었고,
          마을 사람들은 모두 목숨을 잃고 만다.
          <br /> 주인공은 죽음의 문턱에서 반마족 성향의 악마인 언냐와 계약을
          맺어 간신히 살아난다. <br />
          언냐는 주인공에게 "널 살려줄 테니, 여섯 명의 마왕을 모두 처치해줘"라는
          조건을 제시했고, 주인공은 이를 수락한다. <br />
          여섯 조각으로 나뉜 수호석은 각 마왕들이 소유하고 있으며, 주인공은
          세상을 다시 안정시키기 위해 이 수호석 조각들을 되찾아야 한다는 것을
          깨닫는다. <br />
          주인공은 부모님과 마을 사람들의 원수를 갚기 위해, 그리고 세상의 균형을
          되찾기 위해 여정을 떠난다.
          <br /> 언냐와의 계약은 주인공에게 힘을 주었지만, 여섯 마왕을
          물리쳐야하는 사명감이 생긴것이다!! 주인공은 지금 세계를 구하기위해
          떠난다....
        </h1>
      </TextContainer>
    </StartContainer>
  );
};

export default Prolog;
