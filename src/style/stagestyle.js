import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-family: 'PixelEmulator', sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const StageList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const StageItem = styled.li`
  margin: 10px;
`;

export const StageButton = styled.button`
  font-family: 'Noto', sans-serif;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: ${({ completed }) => (completed ? 'blue' : 'red')};
  &:disabled {
    cursor: not-allowed;
    background-color: gray;
  }
`;

export const BackButton = styled.button`
  margin-top: 20px;
  font-size: 18px;
  padding: 10px 20px;
  cursor: pointer;
`;
