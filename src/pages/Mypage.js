import React, { useState, useEffect } from "react";
import {
  MyPageContainer,
  UserInfoContainer,
  UserInfoItem,
  Title,
  Button,
} from "../style/MypageStyle";

function MyPage(props) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch("https://www.codeadventure.shop/userinfo")
      .then((res) => res.json())
      .then((json) => {
        setUserInfo(json);
      });
  }, []);

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <MyPageContainer>
      <Title>마이페이지</Title>
      <UserInfoContainer>
        <UserInfoItem>아이디: {userInfo.username}</UserInfoItem>
        <UserInfoItem>이메일: {userInfo.email}</UserInfoItem>
        <UserInfoItem>전화번호: {userInfo.phone}</UserInfoItem>
        <UserInfoItem>코인: {userInfo.coin}</UserInfoItem>
        <UserInfoItem>레벨: {userInfo.level}</UserInfoItem>
        <UserInfoItem>경험치: {userInfo.experience}</UserInfoItem>
        <UserInfoItem>C언어 단계: {userInfo.cst}</UserInfoItem>
        <UserInfoItem>Java 단계: {userInfo.javast}</UserInfoItem>
        <UserInfoItem>Python 단계: {userInfo.pythonst}</UserInfoItem>
        <UserInfoItem>HTML 단계: {userInfo.htmlst}</UserInfoItem>
        <UserInfoItem>CSS 단계: {userInfo.cssst}</UserInfoItem>
        <UserInfoItem>JS 단계: {userInfo.jsst}</UserInfoItem>
        <img src="https://steep-watchmaker-8f8.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F5486ac02-837a-4340-b853-a8cd7b03f65f%2F76d6c5a7-b6a0-4de6-a466-dda88f9bd14a%2FUntitled.png?table=block&id=5e3b79a1-2a07-4e25-834c-9b68804ef326&spaceId=5486ac02-837a-4340-b853-a8cd7b03f65f&width=2000&userId=&cache=v2"></img>
      </UserInfoContainer>
      <Button onClick={() => props.setMode("LANGUAGE")}>
        메인으로 돌아가기
      </Button>
    </MyPageContainer>
  );
}

export default MyPage;
