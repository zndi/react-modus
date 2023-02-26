import { useState, useRef } from 'react';
import { animate } from 'motus';

function MotusGame() {
  const wordList = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig'];
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const inputRef = useRef(null);

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWord(wordList[randomIndex]);
    setUserInput('');
    animate({
      el: inputRef.current,
      translateX: [0, 300],
      duration: 3000,
      easing: 'linear',
    });
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const checkAnswer = () => {
    if (userInput === currentWord) {
      setScore(score + 1);
      startGame();
    }
  };

  return (
    <div>
      <h1>Motus Game</h1>
      <p>Score: {score}</p>
      <input
        type='text'
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
      />
      <button onClick={checkAnswer}>Check</button>
      <button onClick={startGame}>Start</button>
    </div>
  );
}

export default MotusGame;
