import "./App.css";
import Die from "./die.js";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
function App() {
  const [die, setDie] = useState(NewDie());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = die.every((die) => die.isHeld);

    const firstValue = die[0].value;

    const allValue = die.every((die) => die.value === firstValue);
    if (allValue && allHeld) {
      setTenzies(true);
      console.log("won");
    }
  }, [die]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function NewDie() {
    const dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push(generateNewDie());
    }
    return dice;
  }

  function hold(id) {
    setDie((oldDie) =>
      oldDie.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = die.map((EveryDie) => (
    <Die
      key={EveryDie.id}
      value={EveryDie.value}
      status={EveryDie.isHeld}
      function={() => hold(EveryDie.id)}
      link={`https://robohash.org/${EveryDie.value}?set=set2`}
    />
  ));

  function handleClick() {
    if (tenzies === false) {
      setDie((oldDie) =>
        oldDie.map((die) => {
          return die.isHeld === true ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDie(NewDie());
    }
  }
  return (
    <main>
      {tenzies === true && <Confetti className="confetti" />}
      <h1 className="title">TENZIES GAME</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>

      <button className="roll-dice" onClick={handleClick}>
        {tenzies === true ? "New game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
