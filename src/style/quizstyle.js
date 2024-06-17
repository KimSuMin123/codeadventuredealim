import styled from "styled-components";
import quizimg from "../img/quiz.png";
import cimg from "../img/cbackground.png";

export const Container = styled.div`
  background-image: url(${cimg});
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  flex-direction: column;
  align-items: center;
`;

export const SideContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const LeftContainer = styled.div`
  background-image: url(${quizimg});
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 99vh;
`;

export const RightContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 70px;
  width: 70%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  margin-top: 90px;
  margin-left: 100px;
`;

export const Explanation = styled.p`
  font-size: 1.2rem;
  margin-left: 100px;
  margin-bottom: 20px;
  width: 600px;
`;
export const Spacer = styled.div`
  width: 30px;
`;

export const Question = styled.div`
  font-size: 1rem;
  width: 600px;
  margin-left: 100px;
  margin-bottom: 20px;
`;
export const Hint = styled.div`
  font-size: 1rem;
  width: 600px;
  margin-left: 100px;
  margin-bottom: 20px;
`;
export const Input = styled.input`
  margin-right: 10px;
  padding: 10px;
  margin-left: 100px;
  width: 490px;
  font-size: 1rem;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
`;
export const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  margin-left: 100px;
  margin-top: 10px;
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
`;

export const Player = styled.div`
  width: 300px;
  height: 300px;
  order: 1; // 변경된 부분
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Monster = styled.div`
  width: 300px;
  height: 300px;
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
