import React, { useEffect, useState } from "react";
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

const fadeOutUp = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const StartContainer = styled.div`
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
  height: 60vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Line = styled.div`
  animation: ${({ fadeOut }) => (fadeOut ? fadeOutUp : fadeInUp)} 1s ease-in-out;
  opacity: ${({ fadeOut }) => (fadeOut ? 0 : 1)};
  transition: opacity 1s ease-in-out;
  margin: 5px 0;
`;

const Button = styled.button`
  width: 220px;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  background-color: #f39c12;
  color: white;
  &:hover {
    background-color: #e67e22;
  }
`;

const Prolog = () => {
  const [lines, setLines] = useState([]);
  const [showAll, setShowAll] = useState(false); // 모든 텍스트를 보여주는 상태 추가

  const fullText = [
    "어느날 세상의 균형을 유지하던 수호석이 마왕들의 공격에 의해 6개로 부서지고",
    "전세계는 순식간에 혼란에 휩싸이게 된다.",

    "이때 평범한 마을의 소녀인 소피아와 마을도 습격을 받게되었고,",
    "주인공을 제외한 모두가 사망하고, 죽기직전,  반마족의 성향의 악마인 그레모리와 계약을 통해",
    "다시 살아나게 되며, 부모님과 마을사람들을 죽인 원수에 대해 복수를 다짐한다.",

    "그레모리가 제안한 내용은 '널 살려줄테니, 6명의 마왕을 모두 죽여줘'",
    "가 조건이였고 소피아는 이를 수락했다",

    "각 마왕들은 나눠진 수호석 조각을 가지고 있고",
    "소피아는 세상을 다시 안정시키려면 수호석을 되찾아야된다를 느끼고 ",
    "6개로 나뉘어진 수호석을 되찾아 여행을 떠난다",

    "주인공은 지금 세계를 구하기위해 떠난다....",
  ];

  useEffect(() => {
    if (!showAll) {
      // 모든 텍스트가 보이지 않는 동안에만 인터벌 실행
      const interval = setInterval(() => {
        setLines((prevLines) => {
          if (prevLines.length < fullText.length) {
            return [...prevLines, fullText[prevLines.length]];
          } else {
            setShowAll(true); // 모든 텍스트가 보이면 상태 업데이트
            clearInterval(interval); // 인터벌 클리어
            return prevLines;
          }
        });
      }, 3000); // 3초 간격으로 새로운 줄 추가

      return () => clearInterval(interval);
    }
  }, [showAll]);

  return (
    <StartContainer>
      <TextContainer>
        {lines.map((line, index) => (
          <Line
            key={index}
            fadeOut={lines.length > fullText.length && index === 0}
          >
            {line}
          </Line>
        ))}
        {showAll && (
          <Button onClick={() => setMode("LANGUAGE")}>세상을 구하러가기</Button>
        )}
      </TextContainer>
    </StartContainer>
  );
};

export default Prolog;
