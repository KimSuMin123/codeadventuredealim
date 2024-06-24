import React, { useState } from "react";

const Prolog = () => {
  const PrologData = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Who wrote Hamlet?",
      options: ["Shakespeare", "Dickens", "Twain", "Hemingway"],
      answer: "Shakespeare",
    },
    {
      question: "What is the powerhouse of the cell?",
      options: [
        "Nucleus",
        "Cell membrane",
        "Mitochondria",
        "Endoplasmic reticulum",
      ],
      answer: "Mitochondria",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");

  const handleAnswerSubmit = () => {
    if (userAnswer === PrologData[currentQuestion].answer) {
      alert("Correct answer!");
    } else {
      alert("Wrong answer. Try again!");
    }

    if (currentQuestion + 1 < PrologData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
    } else {
      alert("Prolog completed!");
    }
  };

  return (
    <div>
      <h1>Prolog Page</h1>
    </div>
  );
};

export default Prolog;
