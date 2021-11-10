export function createNewGame(name) {
  return fetch("https://localhost:44385/Create?userName=" + name, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  }).then((data) => data.json());
}

export function shotInput(input, gameID) {
  return fetch(
    "https://localhost:44385/Game?shotInput=" + input + "&gameID=" + gameID,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((data) => data.json());
}

export function topScore() {
  return fetch("https://localhost:44385/TopScore", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}
