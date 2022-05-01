import icon from '../../assets/icon.svg';
import { Button, Space } from 'antd'
import Aircraft from '../../Aircraft'
import { useState, useEffect } from 'react'
import AircraftWrapper from '../AircraftWrapper';
import ControlPanel from '../ControlPanel';
import runways_json from '../../data/runways.json'
import delay from '../../helpers/delay';
import HelpModal from '../HelpModal';
import FadeIn from 'react-fade-in'
import validCommand from '../../helpers/validCommand'

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

const Main = (props) => {

  // Declare states to contain the aircraft and runways
  // and the command input value
  const [aircrafts, setAircrafts] = useState([])
  const [runways, setRunways] = useState(runways_json)
  const [command, setCommand] = useState('')

  // keep track of if the simulation has encounterd a failure
  const [failed, setFailed] = useState(false)

  // boolean state for help modal
  const [showHelpModal, setShowHelpModal] = useState(false)

  // keep track of previous command history
  const [history, setHistory] = useState([])

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
        const rnd = Math.floor(Math.random() * 100)
        if(rnd % 2 !== 0) {
          const newAircraft = new Aircraft()
          // ensure no duplicates get added
          if(aircrafts.filter(ac => ac.name === newAircraft.name).length === 0) {
            setAircrafts(ac => [...ac, new Aircraft()])
          }
        }
    }, props.difficulty === 'easy' ? 10000 : props.difficulty === 'medium' ? 5000 : 2500)

    // clear the interval
    return () => clearInterval(intvr)
  }, [])

  // function to handle clicks on the aircraft card
  const onAircraftClick = (aircraft) => {
    // set the command input value to the clicked
    // aircrafts identifier and focus the input
    setCommand(aircraft.name + ' ')
    document.getElementById('cmd-input').focus()
  }

  // function to handle the command input
  const onCommand = () => {
    if(command.length <= 0) return
    setHistory(hs => [command, ...hs])
    const log = document.getElementById('log')

    if(validCommand.test(command)) {
      let message = ""
      const cmd = command.toUpperCase().split(' ')

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
          if(cmd.length === 3) {
            if(cmd[2].length === 1 || cmd[2].length === 2) {
              // change altitude
              if(/^\d+$/.test(cmd[2])) {
                aircraft.altitude = cmd[2]
                message = `Command recieved. Changing altitude of ${cmd[0]} to ${String(cmd[2]).padEnd(4,'0')}ft.`
              }
              else {
                message = `
                  <span style="color: red !important">Invalid altitude given: ${cmd[2]}</span>`
              }
            }
            else if(cmd[2].length === 3) {
              // change degree
              if(cmd[2] > 360 || cmd[2] < 0) {
                message = `
                  <span style="color: red !important">Invalid degree given: ${cmd[2]}</span>`
              }
              else {
                aircraft.degree = cmd[2]
                message = `Command recieved. Changing degree of ${cmd[0]} to ${String(cmd[2])}°.`
              }
            }
            else 
              message = `
                <span style="color: red !important">Invalid command syntax</span>
              `
          }
          else {
            message = `
              <span style="color: red !important">Invalid command syntax: ${command}</span>`
          }
        }
        // change aircraft speed
        else if(cmd[1] === 'S') {
          if(cmd.length === 3) {
            if(aircraft.onGround) {
              message = `<span style="color: red !important">Cannot change speed of grounded aircraft.</span>`
            }
            else if(aircraft.isHelicopter) {
              if(cmd[2] < 150) 
                message = `<span style="color: red !important">Helicopter speed cannot be under 150mph</span>`
              else if(cmd[2] > 175) 
                message = `<span style="color: red !important">Helicopter speed cannot be over 175mph</span>`
              else {
                aircraft.speed = parseInt(cmd[2])
                message = `Command recieved. Changing speed of ${cmd[0]} to ${String(cmd[2])}mph.`
              }
            }
            else {
              if(cmd[2] < 160) 
                message = `<span style="color: red !important">Aircraft speed cannot be under 600mph</span>`
              else if(cmd[2] > 600) 
                message = `<span style="color: red !important">Aircraft speed cannot be over 600mph</span>`
              else {
                aircraft.speed = parseInt(cmd[2])
                message = `Command recieved. Changing speed of ${cmd[0]} to ${String(cmd[2])}mph.`
              }
            }
          }
          // if command is malformed
          else {
            message = `<span style="color: red !important">Invalid command syntax</span>`
          }
        }
        // takeoff
        else if(cmd[1] === 'T') {
          message = aircraft.takeoff(cmd)
          delay(10000).then(() => {
            setAircrafts(aircrafts => aircrafts.filter(ac => ac.name !== aircraft.name))
          })
        }
        // land
        else if(cmd[1] === 'L') {
          message = aircraft.land(cmd)
          delay(10000).then(() => {
            setAircrafts(aircrafts => aircrafts.filter(ac => ac.name !== aircraft.name))
          })
        }
        else message = `
          <span style="color: red !important">ERROR: Invalid command</span>
        `        
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
    <FadeIn>
      <HelpModal showHelpModal={showHelpModal} setShowHelpModal={setShowHelpModal} />
      <h1 className="header">Welcome to Air Traffic Control Simulator v0.1</h1>
      <Space>
        <ControlPanel command={command} setCommand={setCommand} onCommand={onCommand} history={history} />
        <AircraftWrapper aircrafts={aircrafts} onAircraftClick={onAircraftClick} />
      </Space>
    </FadeIn>
  );
};

export default Main