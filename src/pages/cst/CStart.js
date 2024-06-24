import React from "react";
import styled from "styled-components";
import CBack from "../../img/cbackground.png";

const Background = styled.div`
  background-image: url(${CBack});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function CStart() {
  return (
    <Background>
      <p>CStart</p>
    </Background>
  );
}

export default CStart;
