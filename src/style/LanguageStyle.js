import styled from 'styled-components';
import backgroundImage from '../img/background.png'; 

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
width: 100px;  /* 고정 너비 */
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
