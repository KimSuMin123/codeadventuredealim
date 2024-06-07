import React from 'react';
import '../App.css';

function LevelUpModal({ isOpen, onClose, newLevel, extraExperience, randomCoin, totalExperience, totalCoin }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>레벨 업!</h2>
        <p>축하합니다! 새로운 레벨에 도달했습니다: {newLevel}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default LevelUpModal;
