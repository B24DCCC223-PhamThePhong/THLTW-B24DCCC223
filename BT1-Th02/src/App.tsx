import { useState } from "react";
import "./App.css";

type Choice = "Kéo" | "Búa" | "Bao";

interface Round {
  player: Choice;
  computer: Choice;
  result: string;
}

const choices: Choice[] = ["Kéo", "Búa", "Bao"];

function App() {
  const [history, setHistory] = useState<Round[]>([]);

  const getComputerChoice = (): Choice => {
    const random = Math.floor(Math.random() * choices.length);
    return choices[random];
  };

  const getResult = (player: Choice, computer: Choice) => {
    if (player === computer) return "Hòa";

    if (
      (player === "Kéo" && computer === "Bao") ||
      (player === "Búa" && computer === "Kéo") ||
      (player === "Bao" && computer === "Búa")
    ) {
      return "Thắng";
    }

    return "Thua";
  };

  const playGame = (playerChoice: Choice) => {
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    const round: Round = {
      player: playerChoice,
      computer: computerChoice,
      result,
    };

    setHistory([round, ...history]);
  };

  return (
    <div className="container">
      <h1>Trò chơi Oẳn Tù Tì</h1>

      <div className="buttons">
        {choices.map((choice) => (
          <button key={choice} onClick={() => playGame(choice)}>
            {choice}
          </button>
        ))}
      </div>

      <h2>Lịch sử ván đấu</h2>

      <table>
        <thead>
          <tr>
            <th>Người chơi</th>
            <th>Máy</th>
            <th>Kết quả</th>
          </tr>
        </thead>

        <tbody>
          {history.map((round, index) => (
            <tr key={index}>
              <td>{round.player}</td>
              <td>{round.computer}</td>
              <td>{round.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;