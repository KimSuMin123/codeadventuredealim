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
      <button onClick={() => setMode("WELCOME")}>돌아가기</button>
    </div>
  );
}

export default Language;
