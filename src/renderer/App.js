import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { Button, Space } from 'antd'
import Aircraft from './Aircraft'
import { useState, useEffect } from 'react'
import AircraftWrapper from './Components/AircraftWrapper';
import ControlPanel from './Components/ControlPanel';

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

  const [command, setCommand] = useState('')

  const onAircraftClick = (aircraft) => {
    setCommand(aircraft.name + ' ')
    document.getElementById('cmd-input').focus()
  }

  const onCommand = () => {
    const log = document.getElementById('log')
    /**
     * @TODO - implement command parsing 
     */
    log.innerHTML += `<p>Running: ${command}</p><p>Result: <span style="color: red !important">ERROR: No backend created</span></p><p style="margin-top: -10px">--------------------------------</p>`
    setCommand('')
  }

  return (
    <div>
      <h1>Welcome to Air Traffic Control Simulator v0.1</h1>
      <Space>
        <ControlPanel command={command} setCommand={setCommand} onCommand={onCommand}/>
        <AircraftWrapper aircrafts={aircrafts} onAircraftClick={onAircraftClick} />
      </Space>
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
