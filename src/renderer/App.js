import { useState } from 'react'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './Components/StartScreen';
import Main from "./Components/Main";
import './App.css';

export default function App() {

  // keep track of the difficulty
  const [difficulty, setDifficulty] = useState('easy')

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen difficulty={difficulty} setDifficulty={setDifficulty} />} />
        <Route path="/play" element={<Main difficulty={difficulty} setDifficulty={setDifficulty} />} />
      </Routes>
      <div className="copy">&copy; What's Up Doc 2022</div>
    </Router>
  );
}




