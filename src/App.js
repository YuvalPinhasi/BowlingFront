import { useRoutes } from "hookrouter";
import "./App.css";
import StartGame from "./StartGame";
import Game from "./Game.js";
import Result from "./Result";
import { StyledContainer } from "./Styled";

//routing definition
const routes = {
  "/": () => <StartGame />,
  "/game/:id": ({ id }) => <Game id={id} />,
  "/result": () => <Result />,
};

const App = () => {
  const routeResult = useRoutes(routes);
  return <StyledContainer>{routeResult}</StyledContainer>;
};
export default App;
