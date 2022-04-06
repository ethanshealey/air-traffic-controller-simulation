import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { Button } from 'antd'
import Aircraft from './Aircraft'
import { useState, useEffect } from 'react'
import AircraftWrapper from './Components/AircraftWrapper';

const Main = () => {
  const [aircrafts, setAircrafts] = useState([])

  useEffect(() => {
    setAircrafts(ac => [...ac, new Aircraft()])
    const intvr = setInterval(() => {
      const rnd = Math.floor(Math.random() * 100)
      if(rnd % 2 !== 0) setAircrafts(ac => [...ac, new Aircraft()])
    }, 5000)

    return () => clearInterval(intvr)
  }, [])

  return (
    <div>
      <h1>Welcome to Air Traffic Control Simulator v0.1</h1>
        <AircraftWrapper aircrafts={aircrafts} />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
