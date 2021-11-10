import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import bowlingIcon from "./assets/bowling.png";
import { StyledStartBoard, StyledStartImg, StylesStartData } from "./Styled";
import { createNewGame } from "./DataService.js";

export default function StartGame() {
  const [name, setName] = useState("");
  const handleSubmit = () => {
    createNewGame(name).then((data) => {
      window.location.href = ("/game", "/game/" + data.GameID);
    });
  };

  return (
    <>
      <StyledStartBoard>
        <StyledStartImg src={bowlingIcon}></StyledStartImg>
        <StylesStartData>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="User name"
              id="fullWidth"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Box>
          <Button variant="outlined" onClick={handleSubmit}>
            Start
          </Button>
        </StylesStartData>
      </StyledStartBoard>
    </>
  );
}
