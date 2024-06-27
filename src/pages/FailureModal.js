import React, { useState } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalButton,
} from "../style/quizstyle";

function FailureModal({ isOpen, onClose, onPurchaseHint, setMode }) {
  const [successMessage, setSuccessMessage] = useState("");

  const handlePurchaseHint = async () => {
    try {
      const result = await onPurchaseHint();
      if (result.success) {
        setSuccessMessage("힌트 구매 성공!");
      } else {
        setSuccessMessage(result.message);
      }
    } catch (error) {
      setSuccessMessage("힌트 구매에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>틀렸습니다.</ModalTitle>
        <p>다시 시도해주세요</p>
        {successMessage && <p>{successMessage}</p>}

        <ModalButton onClick={handlePurchaseHint}>
          힌트 구매 (300 코인)
        </ModalButton>
        <ModalButton onClick={onClose}>닫기</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
}

export default FailureModal;
