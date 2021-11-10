import React, { useState } from "react";
import {
  StyledShotInput,
  StyledInputContainer,
  StyledStartBoard,
  StylesStartData,
  SyledTiltle
} from "./Styled";
import { shotInput } from "./DataService.js";
import { usePath } from "hookrouter";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

export default function Game() {
  const [data, setData] = useState({
    name: null,
    GameID: 0,
    TotalScore: 0,
    isLastShot: false,
    TurnsStatus: [{ DisplayValues: ["", ""], Score: 0 }],
  });
  const [shotInTurn, setShotInTurn] = useState(1);
  const [inputNumber, setInputNumber] = useState(0);
  const [inputLastShot, setInputLastShot] = useState(0);
  const [error, setError] = useState();
  const path = usePath();
  const [gameID, setGameID] = useState(path.split("/")[2]);

  const gameOver = () => {
    window.location.href = "/result";
  };

  const Frame = ({ frameNumber, leftBox, rightBox, extraBox, score }) => (
    
    <div className="frame">
      <div className="frame-number">{frameNumber}</div>
      <div className="frame-score">
       {
          leftBox === 30 ?  <div className="box strike"></div> :
          leftBox === 20 ?  <div className="box strike"></div> : <div className="box left">{leftBox}</div>
       }
        {
          rightBox === 30 ?  <div className="box strike"></div> :
          rightBox === 20 ?  <div className="box"><div className="spaer"></div></div>  :  <div className="box right">{rightBox}</div>
       }
       
        <div className="box extra">{extraBox}</div>
      </div>
      <div className="running-score">{!isNaN(score) && score}</div>
    </div>
  );

  const handleShot = () => {
    setError("");
    if (shotInTurn === 1) {
      if (inputNumber == 10) {
        setError("STRIKE");
        setInputLastShot(0);
        setShotInTurn(1);
        setInputNumber("");
        handleShotInput();
      } else {
        setInputLastShot(inputNumber);
        setShotInTurn(2);
        setInputNumber("");
        handleShotInput();
      }
    }

    if (shotInTurn === 2) {
      const int = parseInt(inputLastShot) + parseInt(inputNumber);
      if (int > 10) {
        const left = 10 - inputLastShot;
        setError("You have only " + left + " pins");
        setInputNumber("");
        return;
      }
      if (inputLastShot == 0 && inputNumber == 10) {
        setError("STRIKE");
        setInputLastShot(0);
        setShotInTurn(1);
        setInputNumber("");
        handleShotInput();
      }
      if (inputLastShot != 0 && int === 10) {
        setError("SPARE!");
        setInputLastShot(0);
        setShotInTurn(1);
        setInputNumber("");
        handleShotInput();
      } else {
        setError("");
        setInputLastShot(0);
        setShotInTurn(1);
        setInputNumber("");
        handleShotInput();
      }
    }
  };

  const handleShotInput = () => {
    shotInput(inputNumber, gameID).then((data) => {
      setData(data);
      if(data.isLastShot)
      {
        setTimeout(() => {gameOver()}, 1000);
      }
    });
  };

  return (
    <>
      <StyledStartBoard>
        <Stack spacing={3}>
          <Item><SyledTiltle>Goodluck!</SyledTiltle></Item>
          <Item>
            <StylesStartData>
              {[...Array(10)].map((o, i) => {
                return (
                  <Frame
                    key={i}
                    frameNumber={i + 1}
                    leftBox={data.TurnsStatus[i]?.DisplayValues[0]}
                    rightBox={data.TurnsStatus[i]?.DisplayValues[1]}
                    extraBox={data.TurnsStatus[i]?.DisplayValues[2]}
                    score={data.TurnsStatus[i]?.Score}
                  />
                );
              })}
            </StylesStartData>
          </Item>
        </Stack>
              {data.isLastShot? <div></div> : <StyledInputContainer>
          <StyledShotInput
            type="number"
            id="inputNumber"
            min="0"
            max="10"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
          />
          <Button variant="outlined" onClick={(e) => handleShot()}>
            GO
          </Button>
        </StyledInputContainer>}
       
        <SyledTiltle>  {error} </SyledTiltle>
      </StyledStartBoard>
    </>
  );
}
