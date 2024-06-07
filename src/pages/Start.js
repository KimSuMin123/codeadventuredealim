import React from 'react';

function Start(props) {
  return (
    <div>
      <h2>Code Adventure</h2>
      <button onClick={() => props.setMode("LOGIN")}>로그인 페이지로 이동</button>
    </div>
  );
}

export default Start;
