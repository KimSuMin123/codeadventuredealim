import styled, { createGlobalStyle } from "styled-components";
import PixelEmulator from "../font/PixelEmulator.otf";
import Noto from "../font/NotoSans-Regular.ttf";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'PixelEmulator';
    src: url(${PixelEmulator}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Noto';
    src: url(${Noto}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
    font-family: 'Noto', sans-serif;
  }
`;

export const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-size: cover;
  text-align: center;
`;

export const Title = styled.h2`
  font-family: "PixelEmulator", sans-serif;
  font-size: 100px;
  text-align: center;
  background: linear-gradient(to bottom, #f7d04f, #b8860b); /* gold gradient */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px black;
  line-height: 0.8;
  margin: 0;
`;

export const LoginButton = styled.button`
  font-size: 16px;
  margin-top: 20px;
  padding: 10px 20px;
  color: #333;
  background-color: #f0f0f0;
  border: 2px dotted #333;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #e0e0e0;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }
  &:active {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    transform: translateY(0);
  }
`;
