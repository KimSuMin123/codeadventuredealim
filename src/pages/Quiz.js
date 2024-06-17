import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  Explanation,
  Question,
  Input,
  Button,
  Player,
  Monster,
  BottomContainer,
  AnswerContainer,
  LifeContainer,
  LifeImage,
  SideContainer,
  LeftContainer,
  RightContainer,
  BackButton,
  Spacer,
  Hint,
} from "../style/quizstyle";
import { CodeBlock } from "react-code-blocks";
import LevelUpModal from "./LevelUpModal";
import SuccessModal from "./SuccessModal";
import FailureModal from "./FailureModal";
import lifeImage from "../img/life.png";
import UserImage from "../img/Trainee Knight/01-Idle/__TRAINEE_Idle_000.png";
import MonsterImage from "../img/monster.png";
import Hurt from "../Knightmove/Hurt";
import Attack from "../Knightmove/Attack";
import Dead from "../Knightmove/Dead";

function Quiz({ stageId, setMode, selectedLanguage }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
  });
  const [correctAnswers, setCorrectAnswers] = useState({
    answer1: false,
    answer2: false,
    answer3: false,
  });
  const [nextStageId, setNextStageId] = useState(stageId);
  const [levelUp, setLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [hint, setHint] = useState("");
  const [playerLives, setPlayerLives] = useState(3);
  const [monsterLives, setMonsterLives] = useState(3);
  const [firstAttempt, setFirstAttempt] = useState(true);
  const [levelCleared, setLevelCleared] = useState(false);
  const [characterState, setCharacterState] = useState("idle");

  useEffect(() => {
    fetch(
      `http://localhost:3001/quiz/${nextStageId}?language=${selectedLanguage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        setHint("");
        setAnswers({ answer1: "", answer2: "", answer3: "" });
        setCorrectAnswers({ answer1: false, answer2: false, answer3: false });
        setFirstAttempt(true);
        setLevelCleared(data.cleared || false); // Assuming the API returns a 'cleared' field
        setCharacterState("idle"); // Reset character state to idle
      });
  }, [nextStageId, selectedLanguage]);

  const handleSubmitAnswer = (answerKey) => {
    fetch("http://localhost:3001/submit-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stageId: nextStageId,
        answer: answers[answerKey],
        answerKey,
        language: selectedLanguage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.correct) {
          setCorrectAnswers((prevCorrectAnswers) => ({
            ...prevCorrectAnswers,
            [answerKey]: true,
          }));
          setCharacterState("attack"); // Set character state to attack
          setTimeout(() => setCharacterState("idle"), 1000); // Reset to idle after 1 second

          setMonsterLives((prevLives) => {
            const updatedLives = prevLives - 1;
            if (updatedLives <= 0) {
              if (firstAttempt) {
                if (levelCleared) {
                  setShowSuccessModal(true);
                } else {
                  setShowSuccessModal(true);
                }
                if (data.levelUp) {
                  setNewLevel(data.newLevel);
                  setLevelUp(true);
                }
              }
              setNextStageId(nextStageId + 1);
              setPlayerLives(3);
              return 3;
            }
            return updatedLives;
          });
        } else {
          setCharacterState("hurt"); // Set character state to hurt
          setTimeout(() => setCharacterState("idle"), 1000); // Reset to idle after 1 second
          setPlayerLives((prevLives) => {
            const updatedLives = prevLives - 1;
            if (updatedLives <= 0) {
              setCharacterState("dead"); // Set character state to dead
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
      body: JSON.stringify({
        stageId: nextStageId,
        language: selectedLanguage,
      }),
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

  const renderLives = (numLives) => {
    return (
      <LifeContainer>
        {[...Array(numLives)].map((_, index) => (
          <LifeImage key={index} src={lifeImage} alt="life" />
        ))}
      </LifeContainer>
    );
  };

  const renderCharacterImage = () => {
    switch (characterState) {
      case "attack":
        return <Attack />;
      case "hurt":
        return <Hurt />;
      case "dead":
        return <Dead />;
      default:
        return <img src={UserImage} alt="Idle" />;
    }
  };

  return (
    <Container>
      <SideContainer>
        <Spacer />
        <LeftContainer>
          <Title>
            스테이지 {nextStageId} ({selectedLanguage.toUpperCase()})
          </Title>
          <Explanation>{quiz.explanation}</Explanation>
          <Question>
            <CodeBlock text={quiz.question} />
          </Question>
          <Hint>{hint && <p>힌트: {hint}</p>}</Hint>
          <AnswerContainer>
            <div>
              <Input
                type="text"
                value={answers.answer1}
                onChange={(e) =>
                  setAnswers({ ...answers, answer1: e.target.value })
                }
              />
              <Button
                onClick={() => handleSubmitAnswer("answer1")}
                disabled={correctAnswers.answer1}
              >
                {correctAnswers.answer1 ? "정답" : "제출"}
              </Button>
            </div>
            <div>
              <Input
                type="text"
                value={answers.answer2}
                onChange={(e) =>
                  setAnswers({ ...answers, answer2: e.target.value })
                }
              />
              <Button
                onClick={() => handleSubmitAnswer("answer2")}
                disabled={correctAnswers.answer2}
              >
                {correctAnswers.answer2 ? "정답" : "제출"}
              </Button>
            </div>
            <div>
              <Input
                type="text"
                value={answers.answer3}
                onChange={(e) =>
                  setAnswers({ ...answers, answer3: e.target.value })
                }
              />
              <Button
                onClick={() => handleSubmitAnswer("answer3")}
                disabled={correctAnswers.answer3}
              >
                {correctAnswers.answer3 ? "정답" : "제출"}
              </Button>
            </div>
          </AnswerContainer>
          <BackButton onClick={() => setMode("STAGE")}>돌아가기</BackButton>
        </LeftContainer>
        <RightContainer>
          <BottomContainer>
            <div>플레이어 목숨: {renderLives(playerLives)}</div>
            <div>몬스터 목숨: {renderLives(monsterLives)}</div>
          </BottomContainer>
          <BottomContainer>
            <Monster>
              <img src={MonsterImage} alt="Monster" />
            </Monster>
            <Player>{renderCharacterImage()}</Player>
          </BottomContainer>
        </RightContainer>
        <Spacer />
      </SideContainer>
      <LevelUpModal
        isOpen={levelUp}
        onClose={() => setLevelUp(false)}
        newLevel={newLevel}
      />
      {!levelCleared && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
      <FailureModal
        isOpen={showFailureModal}
        onClose={() => setShowFailureModal(false)}
        onPurchaseHint={handlePurchaseHint}
      />
    </Container>
  );
}

export default Quiz;
