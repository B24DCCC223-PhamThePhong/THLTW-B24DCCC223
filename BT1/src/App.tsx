import { useState } from "react";
import "./App.css";

const generateRandomNumber = (): number => {
  return Math.floor(Math.random() * 100) + 1;
};

function App(): JSX.Element {
  const [randomNumber, setRandomNumber] = useState<number>(generateRandomNumber());
  const [guess, setGuess] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(10);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleGuess = (): void => {
    if (gameOver) return;

    const userGuess: number = parseInt(guess);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage("Vui lòng nhập số từ 1 đến 100!");
      setIsSuccess(false);
      return;
    }

    if (userGuess === randomNumber) {
      setMessage("Chúc mừng! Bạn đã đoán đúng!");
      setIsSuccess(true);
      setGameOver(true);
    } else if (attempts - 1 === 0) {
      setAttempts(0);
      setMessage(`Bạn đã hết lượt! Số đúng là ${randomNumber}`);
      setIsSuccess(false);
      setGameOver(true);
    } else if (userGuess < randomNumber) {
      setMessage("Bạn đoán quá thấp!");
      setIsSuccess(false);
      setAttempts(attempts - 1);
    } else {
      setMessage("Bạn đoán quá cao!");
      setIsSuccess(false);
      setAttempts(attempts - 1);
    }

    setGuess("");
  };

  const handleRestart = (): void => {
    setRandomNumber(generateRandomNumber());
    setGuess("");
    setMessage("");
    setAttempts(10);
    setGameOver(false);
    setIsSuccess(false);
  };

  return (
    <div className="game-container">
      <h1>Trò chơi đoán số</h1>
      <p className="attempts">Bạn còn {attempts} lượt</p>

      <div className="input-group">
        <input
          type="number"
          value={guess}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGuess(e.target.value)
          }
          disabled={gameOver}
          placeholder="Nhập số (1 - 100)"
        />
        <button onClick={handleGuess} disabled={gameOver}>
          Đoán
        </button>
      </div>

      <p className={`message ${isSuccess ? "success" : "error"}`}>
        {message}
      </p>

      {gameOver && (
        <button className="restart-btn" onClick={handleRestart}>
          Chơi lại
        </button>
      )}
    </div>
  );
}

export default App;