import React, { useState, useEffect } from 'react';
import { Container, Title, Explanation, Question, Input, Button, PlayerLives, MonsterLives, Player, Monster, BottomContainer, AnswerContainer } from '../style/quizstyle';
import { CodeBlock } from "react-code-blocks";
import LevelUpModal from './LevelUpModal';
import SuccessModal from './SuccessModal';
import FailureModal from './FailureModal';

function Quiz({ stageId, setMode, selectedLanguage }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({ answer1: "", answer2: "", answer3: "" });
  const [correctAnswers, setCorrectAnswers] = useState({ answer1: false, answer2: false, answer3: false });
  const [nextStageId, setNextStageId] = useState(stageId);
  const [levelUp, setLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [hint, setHint] = useState("");
  const [playerLives, setPlayerLives] = useState(3);
  const [monsterLives, setMonsterLives] = useState(3);

  useEffect(() => {
    fetch(`http://localhost:3001/quiz/${nextStageId}?language=${selectedLanguage}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        setHint("");
        setAnswers({ answer1: "", answer2: "", answer3: "" });
        setCorrectAnswers({ answer1: false, answer2: false, answer3: false });
      });
  }, [nextStageId, selectedLanguage]);

  const handleSubmitAnswer = (answerKey) => {
    fetch("http://localhost:3001/submit-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stageId: nextStageId, answer: answers[answerKey], answerKey, language: selectedLanguage }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.correct) {
        setCorrectAnswers((prevCorrectAnswers) => ({
          ...prevCorrectAnswers,
          [answerKey]: true,
        }));

        if (data.firstTime) {
          setShowSuccessModal(true);
          if (data.levelUp) {
            setNewLevel(data.newLevel);
            setLevelUp(true);
          }
        } 

        setMonsterLives((prevLives) => {
          const updatedLives = prevLives - 1;
          if (updatedLives <= 0) {
            setNextStageId(nextStageId + 1);
            setPlayerLives(3); 
            return 3; 
          }
          return updatedLives;
        });
      } else {
        setPlayerLives((prevLives) => {
          const updatedLives = prevLives - 1;
          if (updatedLives <= 0) {
            setShowFailureModal(true);
          }
          return updatedLives;
        });
      }
    });
  };

  const handlePurchaseHint = () => {
    return fetch("http://localhost:3001/purchase-hint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stageId: nextStageId, language: selectedLanguage }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setHint(data.hint);
        setPlayerLives(3);
      }
      return data;
    });
  };

  if (!quiz) return <Container>로딩 중...</Container>;

  return (
    <Container>
      <PlayerLives>플레이어 목숨: {playerLives}</PlayerLives>
      <MonsterLives>몬스터 목숨: {monsterLives}</MonsterLives>
      <Title>스테이지 {nextStageId} ({selectedLanguage.toUpperCase()})</Title>
      <Explanation>{quiz.explanation}</Explanation>
      <Question><CodeBlock text={quiz.question}></CodeBlock></Question>
      {hint && <p>힌트: {hint}</p>}
      <AnswerContainer>
        <div>
          <Input
            type="text"
            value={answers.answer1}
            onChange={(e) => setAnswers({ ...answers, answer1: e.target.value })}
          />
          <Button
            onClick={() => handleSubmitAnswer('answer1')}
            disabled={correctAnswers.answer1}
          >
            {correctAnswers.answer1 ? "정답" : "제출"}
          </Button>
        </div>
        <div>
          <Input
            type="text"
            value={answers.answer2}
            onChange={(e) => setAnswers({ ...answers, answer2: e.target.value })}
          />
          <Button
            onClick={() => handleSubmitAnswer('answer2')}
            disabled={correctAnswers.answer2}
          >
            {correctAnswers.answer2 ? "정답" : "제출"}
          </Button>
        </div>
        <div>
          <Input
            type="text"
            value={answers.answer3}
            onChange={(e) => setAnswers({ ...answers, answer3: e.target.value })}
          />
          <Button
            onClick={() => handleSubmitAnswer('answer3')}
            disabled={correctAnswers.answer3}
          >
            {correctAnswers.answer3 ? "정답" : "제출"}
          </Button>
        </div>
      </AnswerContainer>
      <BottomContainer>
        <Player>플레이어</Player>
        <Monster>몬스터</Monster>
      </BottomContainer>
      <Button onClick={() => setMode("STAGE")}>돌아가기</Button>
      <LevelUpModal
        isOpen={levelUp}
        onClose={() => setLevelUp(false)}
        newLevel={newLevel}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      <FailureModal
        isOpen={showFailureModal}
        onClose={() => setShowFailureModal(false)}
        onPurchaseHint={handlePurchaseHint}
      />
    </Container>
  );
}

export default Quiz;
