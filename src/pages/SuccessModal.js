import React from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalButton,
} from "../style/quizstyle";

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>정답입니다!</ModalTitle>
        <p>다음 스테이지로 넘어 갑니다.</p>
        <ModalButton onClick={onClose}>확인</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SuccessModal;
