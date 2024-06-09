import React from 'react';

function Language({ setMode, setSelectedLanguage }) {
  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
    setMode('STAGE');
  };

  return (
    <div>
      <h2>언어 선택</h2>
      <ul>
        {['c', 'java', 'python', 'html', 'css', 'js'].map((language) => (
          <li key={language}>
            <button onClick={() => handleLanguageClick(language)}>
              {language.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
      <a href="#" onClick={() => setMode("MYPAGE")}>마이페이지</a>
      <a href="#" onClick={() => setMode("SHOP")}>쇼핑</a>
      <a href="/logout">로그아웃</a>   
    </div>
  );
}

export default Language;
