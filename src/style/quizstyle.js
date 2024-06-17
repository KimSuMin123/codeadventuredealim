import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SideContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const LeftContainer = styled.div`
  background-image: url("https://i.pinimg.com/564x/7f/ac/63/7fac637e5e4d4fe7df9579bcf226f8af.jpg");
  padding: 20px;
  width: 50%;
`;

export const RightContainer = styled.div`
  padding: 20px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

export const Explanation = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

export const Question = styled.div`
  font-size: 1rem;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  margin-right: 10px;
  padding: 10px;
  font-size: 1rem;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
`;

export const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const LifeContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const LifeImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 20px;
`;

export const Player = styled.div`
  width: 150px;
  height: 150px;
  order: 1; // 변경된 부분
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Monster = styled.div`
  width: 100px;
  height: 100px;
  order: 2; // 변경된 부분
  img {
    width: 100%;
    height: 100%;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 20px;
`;

export const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
`;
