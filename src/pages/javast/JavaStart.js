import React from "react";
import styled from "styled-components";
import JavaBack from "../../img/javabackground.png";

const Background = styled.div`
  background-image: url(${JavaBack});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function JavaStart() {
  return (
    <Background>
      <p>JavaStart</p>
    </Background>
  );
}

export default JavaStart;
