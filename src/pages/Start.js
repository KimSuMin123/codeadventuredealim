import React from 'react';

function Start(props) {
  return (
    <div>
      <h2>시작 페이지</h2>
      <button onClick={() => props.setMode("LOGIN")}>로그인 페이지로 이동</button>
    </div>
  );
}

export default Start;
