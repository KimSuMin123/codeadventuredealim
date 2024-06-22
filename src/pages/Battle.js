import React from "react";
import styled from "styled-components";

const BattleContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

const BattlePokemon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pokemon = styled.div`
  margin: 0 20px;
`;

const PokemonImage = styled.img`
  width: 100px;
  height: auto;
`;

const HealthBar = styled.div`
  width: 100px;
  height: 10px;
  background-color: #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 0;
`;

const Health = styled.div`
  height: 100%;
  background-color: green;
  border-radius: 5px;
  width: ${(props) => props.width || "100%"};
`;

const BattleActions = styled.div`
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background-color: yellow;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: #ffd700;
  }
`;

function Battle({ setMode }) {
  const handleRun = () => {
    setMode("STAGE");
  };

  const handleFight = () => {
    setMode("QUIZ");
  };

  return (
    <BattleContainer>
      <BattlePokemon>
        <Pokemon>
          <PokemonImage src="/path/to/pikachu.png" alt="Pikachu" />
          <h2>Pikachu</h2>
          <HealthBar>
            <Health width="80%"></Health>
          </HealthBar>
        </Pokemon>
        <Pokemon>
          <PokemonImage src="/path/to/charmander.png" alt="Charmander" />
          <h2>Charmander</h2>
          <HealthBar>
            <Health width="70%"></Health>
          </HealthBar>
        </Pokemon>
      </BattlePokemon>
      <BattleActions>
        <ActionButton onClick={handleFight}>싸운다</ActionButton>
        <ActionButton onClick={handleRun}>도망간다</ActionButton>
      </BattleActions>
    </BattleContainer>
  );
}

export default Battle;
