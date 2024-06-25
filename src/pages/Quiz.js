import React, { useState, useEffect } from "react";
import {
  Container,
  SideContainer,
  LeftContainer,
  RightContainer,
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
  BackButton,
  Spacer,
  Hint,
} from "../style/quizstyle";
import { CodeBlock } from "react-code-blocks";
import LevelUpModal from "./LevelUpModal";
import SuccessModal from "./SuccessModal";
import FailureModal from "./FailureModal";
import lifeImage from "../img/life.png";
import UserImage from "../img/valla/valla_idle_sw/1.png";
import Hurt from "../Knightmove/Hurt";
import Attack from "../Knightmove/Attack";
import Dead from "../Knightmove/Dead";
import devil from "../img/devil.png";
import coin from "../img/coin.png"; // import coin image

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

  useEffect(() => {
    fetchQuiz(nextStageId, selectedLanguage);
  }, [nextStageId, selectedLanguage]);

  const fetchQuiz = async (stageId, language) => {
    try {
      const res = await fetch(
        `https://port-0-codeadventuredealim-1lxb7tkdw.sel5.cloudtype.app/quiz/${stageId}?language=${language}`
      );
      const data = await res.json();
      setQuiz(data);
      resetState(data.cleared || false);
    } catch (error) {
      console.error("퀴즈 데이터를 불러오는데 실패했습니다:", error);
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
      const res = await fetch(
        "https://port-0-codeadventuredealim-1lxb7tkdw.sel5.cloudtype.app/submit-answer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stageId: nextStageId,
            answer: answers[answerKey],
            answerKey,
            language: selectedLanguage,
          }),
        }
      );
      const data = await res.json();
      handleAnswerResponse(data, answerKey);
    } catch (error) {
      console.error("답안을 제출하는데 실패했습니다:", error);
    }
  };

  const handleAnswerResponse = (data, answerKey) => {
    if (data.correct) {
      handleCorrectAnswer(answerKey, data);
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
        handleLevelCompletion(data);
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
      const res = await fetch(
        "https://port-0-codeadventuredealim-1lxb7tkdw.sel5.cloudtype.app/purchase-hint",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stageId: nextStageId,
            language: selectedLanguage,
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setHint(data.hint);
        setPlayerLives(3);
      }
    } catch (error) {
      console.error("힌트를 구매하는데 실패했습니다:", error);
    }
  };

  if (!quiz) return <Container>로딩중...</Container>;

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
    if (monsterState === "dead") {
      return <img src={coin} alt="Coin" />; // Show coin image when monster is dead
    }

    let rotation = 0;
    switch (monsterState) {
      case "hurt":
        rotation = 30;
        break;
      case "attack":
        rotation = -30;
        break;
      default:
        rotation = 0;
    }
    return (
      <img
        src={quiz.monster}
        alt="Monster"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    );
  };

  return (
    <Container style={{ backgroundImage: `url(${quiz.background})` }}>
      <SideContainer>
        <Spacer />
        <LeftContainer>
          <Title style={{ display: "flex", alignItems: "center" }}>
            <img src={devil} alt="Devil" style={{ width: 100, height: 100 }} />{" "}
            <Explanation style={{ marginLeft: 10 }}>
              {quiz.explanation}
            </Explanation>
          </Title>
          <Question>
            <CodeBlock text={quiz.question} />
          </Question>
          {hint && (
            <Hint>
              <p>힌트: {hint}</p>
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
                  {correctAnswers[key] ? "정답" : "제출"}
                </Button>
              </div>
            ))}
          </AnswerContainer>
          <BackButton onClick={() => setMode("STAGE")}>뒤로가기</BackButton>
        </LeftContainer>
        <RightContainer>
          <BottomContainer style={{ justifyContent: "space-between" }}>
            <Player style={{ alignSelf: "flex-end" }}>
              {renderCharacterImage()}
            </Player>
            <Monster style={{ alignSelf: "flex-start" }}>
              {renderMonsterImage()}
            </Monster>
          </BottomContainer>
          <BottomContainer>
            <div>플레이어 생명: {renderLives(playerLives)}</div>
            <div>몬스터 생명: {renderLives(monsterLives)}</div>
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
