import React, { useEffect, useState } from 'react';
import { Container, Content, Title, Table, TableItem, Button, Links, Link, StatusContainer, StatusItem, CoinImage, StatusText } from '../style/LanguageStyle';
import coin from '../img/coin.png'

function Language({ setMode, setSelectedLanguage }) {
  const [userInfo, setUserInfo] = useState({ coin: 0, level: 1, experience: 0, nextLevelExp: 200 });

  useEffect(() => {
    fetch('/userinfo')
      .then(res => res.json())
      .then(data => {
        const { coin, experience, level } = data;
        let requiredExperience = 200;
        for (let i = 1; i < level; i++) {
          requiredExperience *= 2.5;
        }
        setUserInfo({ coin, level, experience, nextLevelExp: requiredExperience });
      })
      .catch(err => console.error('Error fetching user info:', err));
  }, []);

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
    setMode('STAGE');
  };

  return (
    <Container>
      <Content>
        <Title>언어 선택</Title>
        <Table>
          {['c', 'java', 'python', 'html', 'css', 'js'].map((language) => (
            <TableItem key={language}>
              <Button onClick={() => handleLanguageClick(language)}>
                {language.toUpperCase()}
              </Button>
            </TableItem>
          ))}
        </Table>
        <Links>
          <Link href="#" onClick={() => setMode("MYPAGE")}>마이페이지</Link>
          <Link href="#" onClick={() => setMode("SHOP")}>쇼핑</Link>
          <Link href="/logout">로그아웃</Link>
        </Links>
      </Content>
      <StatusContainer>
        <StatusItem>
          <CoinImage src={coin}alt="Coin" />
          <StatusText>{userInfo.coin}</StatusText>
        </StatusItem>
        <StatusItem>
          <StatusText>Level: {userInfo.level}</StatusText>
        </StatusItem>
        <StatusItem>
          <StatusText>EXP: {userInfo.experience}/{userInfo.nextLevelExp}</StatusText>
        </StatusItem>
      </StatusContainer>
    </Container>
  );
}

export default Language;

