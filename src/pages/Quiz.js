import React, { useState, useEffect } from 'react';

function Quiz({ stageId, setMode, selectedLanguage }) {
  const [quiz, setQuiz] = useState(null);
  const [answer, setAnswer] = useState("");
  const [nextStageId, setNextStageId] = useState(stageId);

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
            alert("정답입니다! 코인 500을 획득 하셨고 경험치가 50 증가하였습니다.");
          } else {
            alert("정답입니다! 이미 클리어한 스테이지입니다, 보상은 지급되지 않습니다.");
          }
          setNextStageId(nextStageId + 1);
        } else {
          alert("틀렸습니다. 다시 시도하세요.");
        }
      });
  };

  if (!quiz) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>스테이지 {nextStageId} ({selectedLanguage.toUpperCase()})</h2>
      <p>{quiz.question}</p>
      <input 
        type="text" 
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)} 
      />
      <button onClick={handleSubmit}>제출</button>
      <button onClick={() => setMode("STAGE")}>돌아가기</button>
    </div>
  );
}

export default Quiz;
