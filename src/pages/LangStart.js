import React from "react";
import styled from "styled-components";
import devil from "../img/devil.png";
import valla from "../img/valla/valla_idle_sw/1.png";
import quizBackground from "../img/quiz.jpg";

const CharacterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 70px;
`;

const CharacterImage = styled.img`
  width: 250px;
  height: 300px;
`;

const DialogueBox = styled.div`
  background: url(${quizBackground}) no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  color: white;
`;

function LangStart() {
  return (
    <div className="lang-start">
      <CharacterContainer>
        <CharacterImage src={valla} alt="valla" />
        <CharacterImage src={devil} alt="Devil" />
      </CharacterContainer>
      <DialogueBox>
        <p>소피아: 여긴 정말 깊고 어두워...</p>
        <p>그레모리: 물속에는 예상치 못한 몬스터가 숨어있을 거야, 조심해.</p>
        <p>소피아: 알겠어.</p>
        <p>(갑자기 심해어가 나타났다!!)</p>
        <p>그레모리: 저기 무언가 나타났어!</p>
        <p>소피아: 전투 준비!</p>
      </DialogueBox>
    </div>
  );
}

export default LangStart;
