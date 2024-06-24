import styled from "styled-components";
import backgroundImage from "../img/background.png";

export const Container = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative; /* 추가 */

  padding: 20px; /* 말풍선 내부 패딩 */
  border-radius: 10px; /* 둥근 테두리 */
  background-color: rgba(255, 255, 255, 0.9); /* 반투명 배경색 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */

  &::after {
    content: "";
    position: absolute;
    bottom: -20px; /* 꼬리 위치 조정 */
    left: 50%;
    transform: translateX(-50%);
    border-width: 20px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.9) transparent transparent transparent; /* 말풍선 꼬리 색상 */
  }
`;

export const AdContainer = styled.div`
  position: absolute;
  top: 20px; /* 조정 */
  left: 43%;
  transform: translateX(-50%);
`;

export const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 10px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: black;
`;

export const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const TableItem = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  width: 100px;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  transition: background-color 0.3s;
  &:hover {
    background-color: #555;
  }
`;

export const Links = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const Link = styled.a`
  margin: 0 10px;
  color: black;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export const StatusContainer = styled.div`
  position: absolute; /* 추가 */
  top: 20px; /* 조정 */
  right: 20px; /* 조정 */
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 10px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const CoinImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

export const StatusText = styled.span`
  font-size: 14px;
`;
