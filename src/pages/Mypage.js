import React, { useState, useEffect } from 'react';

function MyPage(props) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/userinfo")
      .then((res) => res.json())
      .then((json) => {
        setUserInfo(json);
      });
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>마이페이지</h2>
      <div className="form">
        <p>아이디: {userInfo.username}</p>
        <p>이메일: {userInfo.email}</p>
        <p>전화번호: {userInfo.phone}</p>
        <p>Coin : {userInfo.coin}</p>
        <p>level : {userInfo.level}</p>
        <p>exp : {userInfo.experience}</p>
        <p>C언어 단계 : {userInfo.cst}</p>
        <p>Java 단계 : {userInfo.javast}</p>
        <p>Python 단계 : {userInfo.pythonst}</p>
        <p>Html 단계 : {userInfo.htmlst}</p>
        <p>Css언어 단계 : {userInfo.cssst}</p>
        <p>Js언어 단계 : {userInfo.jsst}</p>
      </div>
      <button onClick={() => props.setMode("WELCOME")}>메인으로 돌아가기</button>
    </>
  );
}

export default MyPage;
