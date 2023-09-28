import "./App.css";
import Die from "./die.js";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
function App() {
  //state
  const [die, setDie] = useState(NewDie());
  const [tenzies, setTenzies] = useState(false);
  //use effect to check winning condition
  useEffect(() => {
    //every checks if each elements of that array is true and if so returns true
    const allHeld = die.every((die) => die.isHeld);
    //checking whether all isHeld is true i.e. button choosen or not
    const firstValue = die[0].value;
    //checking whether all numbers are same
    const allValue = die.every((die) => die.value === firstValue);
    if (allValue && allHeld) {
      setTenzies(true);
      console.log("won");
    }
  }, [die]);
  //function to generate die object
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  //function to generate random numbers
  function NewDie() {
    const dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push(generateNewDie());
    }
    return dice;
  }
  //creating a hold function to determine which die has been selected
  function hold(id) {
    setDie((oldDie) =>
      oldDie.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  //creating an array of Die components
  const diceElements = die.map((EveryDie) => (
    <Die
      key={EveryDie.id}
      value={EveryDie.value}
      status={EveryDie.isHeld}
      function={() => hold(EveryDie.id)}
    />
  ));
  //button click changes the die numbers which are not held and not the held ones
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
//hello but test 2
export default App;
