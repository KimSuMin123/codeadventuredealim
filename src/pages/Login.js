import React, { useState } from "react";
import {
  StartContainer,
  LoginContainer,
  LoginForm,
  Title,
  Input,
  Button,
  ErrorMessage,
  SignupPrompt,
} from "../style/LoginStyle";
import background from "../img/background.png";

function Login({ setMode }) {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("https://www.codeadventure.shop/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        userPassword,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to authenticate");
        }
        return res.json();
      })
      .then((data) => {
        if (data.isLogin === "True") {
          if (data.isManager) {
            setMode("MANAGER");
          } else if (data.isNewUser) {
            setMode("PROLOG");
          } else {
            setMode("STAGE");
          }
        } else {
          setError(data.isLogin);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to authenticate. Please try again.");
      });
  };

  return (
    <StartContainer background={background}>
      <LoginContainer>
        <LoginForm onSubmit={handleLogin}>
          <Title>Login</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
          <SignupPrompt>
            계정이 없으신가요?{" "}
            <Button type="button" onClick={() => setMode("SIGNIN")}>
              회원가입
            </Button>
          </SignupPrompt>
        </LoginForm>
      </LoginContainer>
    </StartContainer>
  );
}

export default Login;
