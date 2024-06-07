import React, { useState } from 'react';

function Login({ setMode }) {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        userPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLogin === 'True') {
          if (data.isManager) {
            setMode('MANAGER');
          } else {
            setMode('WELCOME');
          }
        } else {
          setError(data.isLogin);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>계정이 없으신가요? <button onClick={() => setMode('SIGNIN')}>회원가입</button></p>
    </div>
  );
}

export default Login;

