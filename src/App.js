import logo from './logo.svg';
import './App.css';
import presidents from './cards';
import React, { useState } from 'react';

function App() {

  const [item1, setItem1] = useState('Item 1');
  const [item2, setItem2] = useState("Item 2")

  const cardPicked = (card) => {
    console.log(card)
  }

  const start = () => {
    console.log(presidents)
    let choices = []
    let max = presidents.length 
    let choice1 = Math.floor(Math.random() * max)
    let choice2 = Math.floor(Math.random() * max)
    choices.push(choice1, choice2)
    if (choice1 == choice2) {
      start()
    } 
    let data = presidents[choice1].name
    setItem1(data)
    data = presidents[choice2].name
    setItem2(data)
  }

  return (
    <div className="App">
      <div className = "options">
        <div className = "new">
          <button onClick = {start}>Start</button>
        </div>
        <div className = "reset">
          <button>Reset</button>
        </div>
        <div className = "stats">
          <button>Stats</button>
        </div>
      </div>
      <div className = "cards">
        <div className = "card" onClick={() => cardPicked(0)}>
          <h1 className = "item1" id = "item">{item1}</h1>
        </div>
        <div className = "card" onClick={() => cardPicked(1)}>
          <h1 className = "item2" id = "item">{item2}</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
