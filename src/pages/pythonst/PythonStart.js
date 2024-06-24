import React from "react";

import React from "react";
import styled from "styled-components";
import PythonBack from "../../img/pythonbackground.png";

const Background = styled.div`
  background-image: url(${PythonBack});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function PythonStart() {
  return (
    <Background>
      <p>PythonStart</p>
    </Background>
  );
}

export default PythonStart;
