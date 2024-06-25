export const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${({ background }) => background});
  background-size: cover;
  background-position: center;
  text-align: center;
`;
