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
  DevilImage,
} from "../style/LanguageStyle";
import coin from "../img/coin.png";
import devil from "../img/devil.png";
import { useNavigate } from "react-router-dom"; //enen

function Language({ setMode, setSelectedLanguage }) {
  const [userInfo, setUserInfo] = useState({
    coin: 0,
    level: 1,
    experience: 0,
    nextLevelExp: 200,
  });
  const navigate = useNavigate();

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
    fetch(`/check-language-start?language=${language}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedLanguage(language);
        if (data.startPage) {
          setMode(`${language}START`);
        } else {
          setMode("STAGE");
        }
      })
      .catch((err) => console.error("Error checking language start:", err));
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
        <Title>어느 던전부터 도전할래?</Title>
        <Table>
          {["c", "java", "python", "html", "css", "js"].map((language) => (
            <TableItem key={language}>
              <Button onClick={() => handleLanguageClick(language)}>
                {language.toUpperCase()}
              </Button>
            </TableItem>
          ))}
        </Table>
        <DevilImage src={devil} alt="Devil" />
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
