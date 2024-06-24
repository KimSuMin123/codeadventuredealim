import React, { Component } from "react";
import axios from "axios";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const { stageId } = this.props.match.params;
    axios
      .get(`/quiz/${stageId}`)
      .then((response) => {
        this.setState({
          quiz: response.data,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        this.setState({
          quiz: null,
          loading: false,
          error: "Failed to fetch quiz data",
        });
      });
  }

  render() {
    const { quiz, loading, error } = this.state;

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
  }
}

export default Quiz;
