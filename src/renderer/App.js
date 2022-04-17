import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { Button, Space } from 'antd'
import Aircraft from './Aircraft'
import { useState, useEffect } from 'react'
import AircraftWrapper from './Components/AircraftWrapper';
import ControlPanel from './Components/ControlPanel';
import runways_json from './data/runways.json'
import delay from './delay';
import HelpModal from './Components/HelpModal';

/**
 * Main()
 * ==========================================================
 * This is the main component of the application. It is the
 * entry point of the application where the control panel
 * and the aircraft list are rendered.
 * 
 * The control panel consist of the log file and the command
 * prompt. The log file is a list of all the commands ran.
 * 
 * The aircraft list is a list of all the aircraft currently
 * generated in the simulation.
 */

const Main = () => {

  // Declare states to contain the aircraft and runways
  // and the command input value
  const [aircrafts, setAircrafts] = useState([])
  const [runways, setRunways] = useState(runways_json)
  const [command, setCommand] = useState('')

  // keep track of if the simulation has encounterd a failure
  const [failed, setFailed] = useState(false)

  // boolean state for help modal
  const [showHelpModal, setShowHelpModal] = useState(false)

  // onLoad, show welcome prompt in log and begin
  // generating aircrafts
  useEffect(() => {

    // get the log element and add in message
    const log = document.getElementById('log')
    log.innerHTML += `
      <p>Welcome to our Aircraft Traffic Controller Simulator!</p>
      <p>For help, enter "help"</p>
      <p>-------------------------------------------------------</p>`

    // generate initial aircraft
    setAircrafts(ac => [...ac, new Aircraft()])

    // create timer to generate aircrafts randomly every 5000ms
    // @NOTE: aircraft has a 50% chance to spawn every run
    const intvr = setInterval(() => {
      if(aircrafts.length <= 4) {
        const rnd = Math.floor(Math.random() * 100)
        if(rnd % 2 !== 0) {
          const newAircraft = new Aircraft()
          // ensure no duplicates get added
          if(aircrafts.filter(ac => ac.name === newAircraftname).length === 0 && aircrafts.length < 10) {
            setAircrafts(ac => [...ac, new Aircraft()])
          }
        }
      }
    }, 5000)

    // clear the interval
    return () => clearInterval(intvr)
  }, [])

  // regex to validate a command is of valid syntax
  const validCommand = new RegExp("^[A-Z]{3}[0-9]{3} [C|L|A|H|T|W|S]\\s{0,1}[0-9]*[L|R|C]{0,1}$", "g")

  // function to handle clicks on the aircraft card
  const onAircraftClick = (aircraft) => {
    // set the command input value to the clicked
    // aircrafts identifier and focus the input
    setCommand(aircraft.name + ' ')
    document.getElementById('cmd-input').focus()
  }

  /**
   * AIRCRAFT FUNCTIONS
   */
  const changeAircraftAltitude = (aircraft, altitude) => {

    aircraft.altitude = String(altitude).padEnd(4, '0')
    /*if(parseInt(aircraft.altitude) < 672) {
      document.getElementById('log').innerHTML += `
        <p style="color: red !important">${aircraft.name} collided with the ground! You lost!</p>
      `
      setFailed(true)
    }*/
  }

  const changeAircraftSpeed = (aircraft, speed) => {
    aircraft.speed = speed
  }

  const changeAircraftDegree = (aircraft, degree) => {
    aircraft.degree = String(degree).padStart(3, '0')
  }

  const takeoffAircraft = async (aircraft) => {
    // deploy and wait for aircraft to leave airspace
    if(!aircraft.isHelicopter) aircraft.icon = 'aircraft-takeoff'
    else aircraft.icon = 'helicopter-takeoff'
    //delay(3000).then(() => {
    //  aircraft.icon = 'aircraft-flying'
    //})
    delay(10000).then(() => {
      setAircrafts(aircrafts => aircrafts.filter(ac => ac.name !== aircraft.name))
    })
  }

  const landAircraft = async (aircraft) => {
    if(!aircraft.isHelicopter) aircraft.icon = 'aircraft-landing'
    else aircraft.icon = 'helicopter-landing'
    //delay(5000).then(() => {
    //  aircraft.icon = 'aircraft-on-ground'
    //})
    delay(10000).then(() => {
      setAircrafts(aircrafts => aircrafts.filter(ac => ac.name !== aircraft.name))
    })
  }

  // function to handle the command input
  const onCommand = () => {
    const log = document.getElementById('log')
    /**
     * @TODO - implement command parsing 
     */
    if(validCommand.test(command)) {
      let message = ""
      const cmd = command.split(' ')

      // check aircraft exists
      if(!aircrafts.some(ac => ac.name === cmd[0])) {
        message = ` 
          <span style="color: red !important">Invalid plane name given: ${cmd[0]} does not exist</span>`
      }
      else {
        /**
         * Handle a valid command
         */

        // get aircraft
        const aircraft = aircrafts.find(ac => ac.name === cmd[0])

        // Clearing for either alt or deg
        if(cmd[1] === 'C') {
          if(cmd[2].length === 1 || cmd[2].length === 2) {
            // change altitude
            changeAircraftAltitude(aircraft, cmd[2])
            message = `Command recieved. Changing altitude of ${cmd[0]} to ${String(cmd[2]).padEnd(4,'0')}ft.`
          }
          else if(cmd[2].length === 3) {
            // change degree
            changeAircraftDegree(aircraft, cmd[2])
          }
          else 
            message = `
              <span style="color: red !important">Invalid command syntax</span>
            `
        }
        // change aircraft speed
        else if(cmd[1] === 'S') {
          if(cmd.length === 3) {
            aircraft.speed = parseInt(cmd[2])
          }
          // if command is malformed
          else {
            message = ` 
              <span style="color: red !important">Invalid command syntax</span>`
          }
        }
        // takeoff
        else if(cmd[1] === 'T') {
          if(aircraft.onGround) {
            if(aircraft.altitude !== "672") {
            takeoffAircraft(aircraft)
            aircraft.onGround = false
            message = `
              <span>Message recieved. Taking off from runway ${aircraft.runway}.</span>
            `
            }
            else {
              message = `
                <span style="color: red !important">Aircraft must be cleared for a certain altitude before taking off.</span>
              `
            }
          }
          else {
            message = `
              <span style="color: red !important">Invalid command: Aircraft not on runway.</span>`
          }
        }
        // land
        else if(cmd[1] === 'L') {
          if(cmd.length === 3) {
            if(!aircraft.onGround) {
              if(aircraft.altitude > 3000) {
                message = `
                  <span style="color: red !important">Invalid command: Aircraft is too high to land.</span>
                `
              }
              else if(runways.some(r => r.id === cmd[2])) {
                aircraft.runway = cmd[2]
                aircraft.onGround = true
                message = `
                  <span>Message recieved. Landing on runway ${cmd[2]}.</span>
                `
                landAircraft(aircraft)
              }
              else message = `
                <span style="color: red !important">Invalid runway identifier: ${cmd[2]} does not exist</span>
              `
            }
            else message = `
              <span style="color: red !important">Invalid command: Aircraft already on ground.</span> 
            `
          }
          else {
            message = `
              <span style="color: red !important">Invalid command syntax</span>`
          }
        }
      }
      log.innerHTML += `
        <p>Running: ${command}</p>
        <p>Response: ${message}</p>
        <p style="margin-top: -10px">-------------------------------------------------------</p>`
    }
    else if(command.toUpperCase() === 'HELP') {
      setShowHelpModal(true)
    }
    else if(command.toUpperCase() === 'CLEAR') {
      log.innerHTML = ''
    }
    else {
      log.innerHTML += `
        <p>Running: ${command}</p>
        <p>Response: <span style="color: red !important">ERROR: Invalid command</span></p>
        <p style="margin-top: -10px">-------------------------------------------------------</p>`
    }

    document.getElementById('log').scrollTop = document.getElementById('log').scrollHeight

    setCommand('')

  }

  return (
    <div>
      <HelpModal showHelpModal={showHelpModal} setShowHelpModal={setShowHelpModal} />
      <h1 className="header">Welcome to Air Traffic Control Simulator v0.1</h1>
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




