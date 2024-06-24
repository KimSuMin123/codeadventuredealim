import React, { useState, useEffect } from "react";
import axios from "axios";

const Quiz = (props) => {
  const { stageId } = props.match.params; // React Router로부터 stageId 파라미터를 가져옴
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/quiz/${stageId}`)
      .then((response) => {
        setQuiz(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setQuiz(null);
        setLoading(false);
        setError("Failed to fetch quiz data");
      });
  }, [stageId]); // stageId가 변경될 때마다 useEffect가 다시 실행됨

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div>
      <h2>Quiz Details</h2>
      <p>
        <strong>Question:</strong> {quiz.question_text}
      </p>
      <p>
        <strong>Answer 1:</strong> {quiz.answer1_text}
      </p>
      <p>
        <strong>Answer 2:</strong> {quiz.answer2_text}
      </p>
      <p>
        <strong>Answer 3:</strong> {quiz.answer3_text}
      </p>
      <p>
        <strong>Hint:</strong> {quiz.hint_text}
      </p>
      <p>
        <strong>Explanation:</strong> {quiz.explanation_text}
      </p>
      <p>
        <strong>Monster:</strong> {quiz.monster_text}
      </p>
      <p>
        <strong>Monster Name:</strong> {quiz.monster_name}
      </p>
      <p>
        <strong>Background:</strong> {quiz.background_text}
      </p>
    </div>
  );
};

export default Quiz;
