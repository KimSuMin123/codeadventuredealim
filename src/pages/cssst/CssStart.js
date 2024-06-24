import React from "react";

import CssBack from "../../img/Cssbackground.png";

const Background = styled.div`
  background-image: url(${CssBack});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function CssStart() {
  return (
    <Background>
      <p>CssStart</p>
    </Background>
  );
}

export default CssStart;
