import React, { useEffect, useState } from "react";
import bowlingIcon from "./assets/bowling.png";
import { StyledStartBoard, StyledStartImg, StylesStartData, SyledTiltle } from "./Styled";
import { topScore } from "./DataService.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, score) {
  return { name, score };
}
export default function Result() {
  const [data, setData] = useState([]);

  const rows = data.map((x,i) =>
  {
    let name = x.UserName;
    let tScore = x.TotalScore;
  return  createData(name,tScore)
  });

  useEffect(() => {
    topScore().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <>
      <StyledStartBoard>
        <StyledStartImg src={bowlingIcon}></StyledStartImg>
        <SyledTiltle>TOP SCORES</SyledTiltle>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell>SCORE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledStartBoard>
    </>
  );
}
