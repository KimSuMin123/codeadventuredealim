import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  Title,
  Table,
  TableItem,
  Button,
  Links,
  Link,
  StatusContainer,
  StatusItem,
  CoinImage,
  StatusText,
  AdContainer,
  DevilImage, // 추가
} from "../style/LanguageStyle";
import coin from "../img/coin.png";
import devil from "../img/devil.png";

function Language({ setMode, setSelectedLanguage }) {
  const [userInfo, setUserInfo] = useState({
    coin: 0,
    level: 1,
    experience: 0,
    nextLevelExp: 200,
  });

  useEffect(() => {
    fetch("/userinfo")
      .then((res) => res.json())
      .then((data) => {
        const { coin, experience, level } = data;
        let requiredExperience = 200;
        for (let i = 1; i < level; i++) {
          requiredExperience *= 2.5;
        }
        setUserInfo({
          coin,
          level,
          experience,
          nextLevelExp: requiredExperience,
        });
      })
      .catch((err) => console.error("Error fetching user info:", err));
  }, []);

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
    setMode("STAGE");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.src = "https://t1.daumcdn.net/kas/static/ba.min.js";
    document.body.appendChild(script);
  }, []);

  return (
    <Container>
      <Content>
        <Title>어느 던전부터 도전 할래?</Title>
        <Table>
          {["c", "java", "python", "html", "css", "js"].map((language) => (
            <TableItem key={language}>
              <Button onClick={() => handleLanguageClick(language)}>
                {language.toUpperCase()}
              </Button>
            </TableItem>
          ))}
        </Table>
        <DevilImage src={devil} alt="Devil" /> {/* 스타일링된 이미지 */}
        <Links>
          <Link onClick={() => setMode("MYPAGE")}>마이페이지</Link>
          <Link onClick={() => setMode("SHOP")}>쇼핑</Link>
          <Link href="/logout">로그아웃</Link>
        </Links>
      </Content>
      <StatusContainer>
        <StatusItem>
          <CoinImage src={coin} alt="Coin" />
          <StatusText>{userInfo.coin}</StatusText>
        </StatusItem>
        <StatusItem>
          <StatusText>Level: {userInfo.level}</StatusText>
        </StatusItem>
        <StatusItem>
          <StatusText>
            EXP: {userInfo.experience}/{userInfo.nextLevelExp}
          </StatusText>
        </StatusItem>
      </StatusContainer>
    </Container>
  );
}

export default Language;
