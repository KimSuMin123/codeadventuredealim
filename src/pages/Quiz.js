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
import cBackground from "../img/cbackground.png";
import cssBackground from "../img/cssbackground.png";
import javaBackground from "../img/javabackground.png";
import pythonBackground from "../img/pythonbackground.png";
import jsBackground from "../img/jsbackground.png";
import htmlBackground from "../img/htmlbackground.png";

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
  const [monsterState, setMonsterState] = useState("idle");

  const backgroundImages = {
    c: cBackground,
    css: cssBackground,
    java: javaBackground,
    python: pythonBackground,
    js: jsBackground,
    html: htmlBackground,
  };

  useEffect(() => {
    fetchQuiz(nextStageId, selectedLanguage);
  }, [nextStageId, selectedLanguage]);

  const fetchQuiz = async (stageId, language) => {
    try {
      const res = await fetch(
        `https://www.codeadventure.shop/quiz/${stageId}?language=${language}`
      );
      const data = await res.json();
      setQuiz(data);
      resetState(data.cleared || false);
    } catch (error) {
      console.error("Failed to fetch quiz data:", error);
    }
  };

  const resetState = (cleared) => {
    setHint("");
    setAnswers({ answer1: "", answer2: "", answer3: "" });
    setCorrectAnswers({ answer1: false, answer2: false, answer3: false });
    setFirstAttempt(true);
    setLevelCleared(cleared);
    setCharacterState("idle");
    setMonsterState("idle");
  };

  const monsterAttack = () => {
    setMonsterState("attack");
    setTimeout(() => setMonsterState("idle"), 1000);

    setPlayerLives((prevLives) => {
      const updatedLives = prevLives - 1;
      if (updatedLives <= 0) {
        setCharacterState("dead");
        setShowFailureModal(true);
      }
      return updatedLives;
    });
  };

  const handleSubmitAnswer = async (answerKey) => {
    try {
      const res = await fetch("https://www.codeadventure.shop/submit-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stageId: nextStageId,
          answer: answers[answerKey],
          answerKey,
          language: selectedLanguage,
        }),
      });
      const data = await res.json();
      handleAnswerResponse(data, answerKey);
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  const handleAnswerResponse = (data, answerKey) => {
    if (data.correct) {
      handleCorrectAnswer(answerKey, data); // Pass data here
    } else {
      handleIncorrectAnswer();
    }
  };

  const handleCorrectAnswer = (answerKey, data) => {
    setCorrectAnswers((prev) => ({ ...prev, [answerKey]: true }));
    setCharacterState("attack");
    setTimeout(() => setCharacterState("idle"), 1000);

    setMonsterLives((prevLives) => {
      const updatedLives = prevLives - 1;
      if (updatedLives > 0) {
        setMonsterState("hurt");
        setTimeout(() => setMonsterState("idle"), 1000);
      } else {
        setMonsterState("dead");
        handleLevelCompletion(data); // Pass data here
      }
      return updatedLives;
    });
  };

  const handleLevelCompletion = (data) => {
    setTimeout(() => {
      if (firstAttempt) {
        setShowSuccessModal(true);
        if (data.levelUp) {
          setNewLevel(data.newLevel);
          setLevelUp(true);
        }
      }
      moveToNextStage();
    }, 1000);
  };

  const handleIncorrectAnswer = () => {
    setCharacterState("hurt");
    setMonsterState("attack");
    setTimeout(() => setCharacterState("idle"), 1000);

    setPlayerLives((prevLives) => {
      const updatedLives = prevLives - 1;
      if (updatedLives <= 0) {
        setCharacterState("dead");
        setShowFailureModal(true);
      }
      return updatedLives;
    });
  };

  const moveToNextStage = () => {
    setNextStageId(nextStageId + 1);
    setPlayerLives(3);
    setMonsterLives(3);
    setMonsterState("idle");
  };

  const handlePurchaseHint = async () => {
    try {
      const res = await fetch("https://www.codeadventure.shop/purchase-hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stageId: nextStageId,
          language: selectedLanguage,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setHint(data.hint);
        setPlayerLives(3);
      }
    } catch (error) {
      console.error("Failed to purchase hint:", error);
    }
  };

  if (!quiz) return <Container>Loading...</Container>;

  const renderLives = (numLives) => (
    <LifeContainer>
      {[...Array(numLives)].map((_, index) => (
        <LifeImage key={index} src={lifeImage} alt="life" />
      ))}
    </LifeContainer>
  );

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

  const renderMonsterImage = () => {
    let rotation = 0;
    switch (monsterState) {
      case "hurt":
        rotation = 30;
        break;
      case "attack":
        rotation = -30;
        break;
      case "dead":
        rotation = 90;
        break;
      default:
        rotation = 0;
    }
    return (
      <img
        src={MonsterImage}
        alt="Monster"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    );
  };

  return (
    <Container backgroundImage={backgroundImages[selectedLanguage]}>
      <SideContainer>
        <Spacer />
        <LeftContainer>
          <Title>
            Stage {nextStageId} ({selectedLanguage.toUpperCase()})
          </Title>
          <Explanation>{quiz.explanation}</Explanation>
          <Question>
            <CodeBlock text={quiz.question} />
          </Question>
          {hint && (
            <Hint>
              <p>Hint: {hint}</p>
            </Hint>
          )}
          <AnswerContainer>
            {["answer1", "answer2", "answer3"].map((key) => (
              <div key={key}>
                <Input
                  type="text"
                  value={answers[key]}
                  onChange={(e) =>
                    setAnswers({ ...answers, [key]: e.target.value })
                  }
                />
                <Button
                  onClick={() => handleSubmitAnswer(key)}
                  disabled={correctAnswers[key]}
                >
                  {correctAnswers[key] ? "Correct" : "Submit"}
                </Button>
              </div>
            ))}
          </AnswerContainer>
          <BackButton onClick={() => setMode("STAGE")}>Back</BackButton>
        </LeftContainer>
        <RightContainer>
          <BottomContainer>
            <div>Player Lives: {renderLives(playerLives)}</div>
            <div>Monster Lives: {renderLives(monsterLives)}</div>
          </BottomContainer>
          <BottomContainer>
            <Monster>{renderMonsterImage()}</Monster>
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
