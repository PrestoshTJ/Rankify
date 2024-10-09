import logo from './logo.svg';
import './App.css';
import packsArr from './cards';
import React, { useState, useEffect } from 'react';

function App() {
  const [packIndex, setPackIndex] = useState(1)
  const [item1, setItem1] = useState('Item 1');
  const [item2, setItem2] = useState("Item 2")
  const [choices, setChoices] = useState([])
  const [rankPage, setRankPage] = useState("Hidden")
  const [packPage, setPackPage] = useState("Hidden")
  const topItems = packsArr[packIndex]
    .sort((a, b) => b.elo - a.elo) 
    .slice(0, 5)
  
  useEffect(() => {
    start()
  }, [packIndex])

  const cardPicked = (index, other) => {
    let win = choices[index]
    let lose = choices[other]
    console.log(choices)
    let winner = packsArr[packIndex][win].elo
    let loser = packsArr[packIndex][lose].elo

    let losePer = 1 / (1 + 10 ** ((winner - loser) / 400))
    let winPer = 1 / (1 + 10 ** ((loser - winner) / 400))
    let winELO = winner + 30 * (1 - winPer)
    let loseELO = loser + 30 * (0 - losePer)

    packsArr[packIndex][win].elo = winELO
    packsArr[packIndex][lose].elo = loseELO
    localStorage.setItem('packs', JSON.stringify(packsArr))
    start()
  }

  const reset = () => {
    for (let i = 0; i < packsArr[packIndex].length; i++) {
      packsArr[packIndex].elo = 1000
    }
    localStorage.setItem('packs', JSON.stringify(packsArr))
    window.location.reload();
  }

  const stats = () => {
    if (rankPage == "Hidden") {
      setRankPage("Shown")
    }
    else {
      setRankPage("Hidden")
    }
  }

  const packs = () => {
    if (packPage == "Hidden") {
      setPackPage("Shown")
    } else {
      setPackPage("Hidden")
    }
  }

  const start = () => {
    setChoices([])
    let max = packsArr[packIndex].length 
    let choice1 = Math.floor(Math.random() * max)
    let choice2 = Math.floor(Math.random() * max)
    setChoices([choice1, choice2])
    if (choice1 == choice2) {
      start()
    } 
    let data = packsArr[packIndex][choice1].name
    setItem1(data)
    data = packsArr[packIndex][choice2].name
    setItem2(data)
  }

  const packPick = (index) => {
    setPackIndex(index)
    setPackPage("Hidden")
  }

  return (
    <div className="App">
      <div className = "options">
        <div className = "new">
          <button onClick = {start}>Start</button>
        </div>
        <div className = "reset" onClick = {reset}>
          <button>Reset</button>
        </div>
        <div className = "stats" onClick = {stats}>
          <button>Stats</button>
        </div>
        <div className = "packs" onClick = {packs}>
          <button>Packs</button>
        </div>
      </div>
      <div className = "cards">
        <div className = "card" onClick={() => cardPicked(0,1)}>
          <h1 className = "item1" id = "item">{item1}</h1>
        </div>
        <div className = "card" onClick={() => cardPicked(1,0)}>
          <h1 className = "item2" id = "item">{item2}</h1>
        </div>
      </div>
      <div id = "statsPage" className = {rankPage}>
        <ul>
          {topItems.map(item => (
            <li key = {item.name}>{item.name} - {Math.floor(item.elo)}</li>
          ))}
        </ul>
      </div>
      <div id = "packsPage" className = {packPage}>
          <ul>
            {packsArr[0].map((pack, index) => (
              <button onClick = {() => packPick(index + 1)}>{pack}</button>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default App;
