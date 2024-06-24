import React from "react";

import JsBack from "../../img/Jsbackground.png";

const Background = styled.div`
  background-image: url(${JsBack});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function JsStart() {
  return (
    <Background>
      <p>JsStart</p>
    </Background>
  );
}

export default JsStart;
