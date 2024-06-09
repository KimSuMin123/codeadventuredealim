import React from 'react';
import { Container, Content, Title, Table, TableItem, Button, Links, Link } from '../style/LanguageStyle';

function Language({ setMode, setSelectedLanguage }) {
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
    </Container>
  );
}

export default Language;
