import React from "react";
import HtmlBack from "../../img/htmlbackground.png";

const Background = styled.div`
  background-image: url(${HtmlBack});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function HtmlStart() {
  return (
    <Background>
      <p>HtmlStart</p>
    </Background>
  );
}

export default HtmlStart;
