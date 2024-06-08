import React, { useState, useEffect } from 'react';
import { Container, Title, StageList, StageItem, StageButton, BackButton } from '../style/stagestyle';

function Stage({ setMode, setSelectedStage, selectedLanguage }) {
  const [stages, setStages] = useState([]);
  const [userProgress, setUserProgress] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3001/stages?language=${selectedLanguage}`)
      .then((res) => res.json())
      .then((data) => {
        setStages(data.stages);
        setUserProgress(data.userProgress);
      });
  }, [selectedLanguage]);

  const handleStageClick = (stageId) => {
    if (stageId <= userProgress + 1) {
      setSelectedStage(stageId);
      setMode("QUIZ");
    } else {
      alert("이전 스테이지를 완료해야 합니다.");
    }
  };

  return (
    <Container>
      <Title>스테이지 선택 ({selectedLanguage.toUpperCase()})</Title>
      <StageList>
        {stages.map((stage) => (
          <StageItem key={stage.id}>
            <StageButton
              onClick={() => handleStageClick(stage.id)}
              completed={stage.id <= userProgress}
              disabled={stage.id > userProgress + 1}
            >
              스테이지 {stage.id}
            </StageButton>
          </StageItem>
        ))}
      </StageList>
      <BackButton onClick={() => setMode("WELCOME")}>돌아가기</BackButton>
    </Container>
  );
}

export default Stage;
