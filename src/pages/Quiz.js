import React, { useState, useEffect } from 'react';
import { Container, Title, Explanation, Question, Input, Button } from '../style/quizstyle';
import LevelUpModal from './LevelUpModal';
import SuccessModal from './SuccessModal'; // Import the new SuccessModal component

function Quiz({ stageId, setMode, selectedLanguage }) {
  const [quiz, setQuiz] = useState(null);
  const [answer, setAnswer] = useState("");
  const [nextStageId, setNextStageId] = useState(stageId);
  const [levelUp, setLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control the success modal visibility

  useEffect(() => {
    fetch(`http://localhost:3001/quiz/${nextStageId}?language=${selectedLanguage}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        setAnswer("");
      });
  }, [nextStageId, selectedLanguage]);

  const handleSubmit = () => {
    fetch("http://localhost:3001/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stageId: nextStageId, answer, language: selectedLanguage }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.correct) {
          if (data.firstTime) {
            setShowSuccessModal(true); // Show success modal
            if (data.levelUp) {
              setNewLevel(data.newLevel);
              setLevelUp(true);
            }
          } else {
            alert("정답입니다! 이미 클리어한 스테이지입니다, 보상은 지급되지 않습니다.");
          }
          setNextStageId(nextStageId + 1);
        } else {
          alert("틀렸습니다. 다시 시도하세요.");
        }
      });
  };

  if (!quiz) return <Container>로딩 중...</Container>;

  return (
    <Container>
      <Title>스테이지 {nextStageId} ({selectedLanguage.toUpperCase()})</Title>
      <Explanation>{quiz.explanation}</Explanation>
      <Question>{quiz.question}</Question>
      <Input 
        type="text" 
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)} 
      />
      <Button onClick={handleSubmit}>제출</Button>
      <Button onClick={() => setMode("STAGE")}>돌아가기</Button>
      <LevelUpModal 
        isOpen={levelUp} 
        onClose={() => setLevelUp(false)} 
        newLevel={newLevel} 
      />
      <SuccessModal // Include the success modal component
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </Container>
  );
}

export default Quiz;

