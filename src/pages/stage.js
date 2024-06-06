import React, { useState, useEffect } from 'react';

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
    <div>
      <h2>스테이지 선택 ({selectedLanguage.toUpperCase()})</h2>
      <ul>
        {stages.map((stage) => (
          <li key={stage.id}>
            <button onClick={() => handleStageClick(stage.id)}>
              스테이지 {stage.id}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => setMode("WELCOME")}>돌아가기</button>
    </div>
  );
}

export default Stage;

