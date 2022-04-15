import React from 'react'
import { Modal, Button } from 'antd'
import { GiAirplaneArrival, GiAirplaneDeparture, GiHelicopter } from 'react-icons/gi'
import { IoIosAirplane } from 'react-icons/io'
import { ImRoad } from 'react-icons/im'

const HelpModal = (props) => {
  return (
    <Modal cancelButtonProps={{ type: 'ghost' }} width="600px" bodyStyle={{ backgroundColor: '#1F1F1F' }} centered title="Welcome to the help page!" visible={props.showHelpModal} onCancel={() => props.setShowHelpModal(false)} footer={
        [
            <Button type='primary' onClick={() => props.setShowHelpModal(false)}>Close</Button>
        ]}
    >
        <p>Basic usage: <pre>{`\<aircraft name\> \<command\> [\<sub command\>]`}</pre></p>
        <p>Examples:</p>
        <p><pre>AAL412 C 3   {`\<`}-- Clears an aircraft for 3000ft</pre></p>
        <p><pre>AAL412 C 035 {`\<`}-- Clears an aircraft for 35°</pre></p>
        <p><pre>AAL412 L 4R  {`\<`}-- Commands aircraft to land at runway 4R</pre></p>
        <p><pre>AAL412 T     {`\<`}-- Commands aircraft to takeoff</pre></p>
        <p><pre>AAL412 H     {`\<`}-- Commands an aircraft to hold and circle</pre></p>
        <p><pre>AAL412 A     {`\<`}-- Aborts previously given command</pre></p>
        <br />
        <p>Other commands</p>
        <p><pre>clear        {`\<`}-- Clears the log</pre></p>
        <p><pre>help         {`\<`}-- Opens the help modal</pre></p>
        <br />
        <p>Legend</p>
        <p><pre><span className="aircraft-display-icon"><IoIosAirplane /></span> {`\<`}-- Airborne airplane</pre></p>
        <p><pre><span className="aircraft-display-icon"><GiHelicopter /></span> {`\<`}-- Airborne helicopter</pre></p>
        <p><pre><span className="aircraft-display-icon"><GiAirplaneDeparture /></span> {`\<`}-- Airplane taking off</pre></p>
        <p><pre><span className="aircraft-display-icon"><GiAirplaneArrival /></span> {`\<`}-- Airplane landing</pre></p>
        <p><pre><span className="aircraft-display-icon"><ImRoad /></span> {`\<`}-- Aircraft on runway</pre></p>
    </Modal>
  )
}

export default HelpModal

/*
      log.innerHTML += `
        <p>Running: ${command}</p>
        <p>Response: Welcome to the help page</p>
        <p>Basic usage: {Aircraft ID} {Command} [Sub Command]</p>
        <p>Aircraft ID: 6 letter code of the aircraft, i.e AAL123<br>(Hint: Click on an aircraft in the list to automatically put the ID into the command input)</p>
        <p>Command: C = Clear, L = Land, A = Abort, H = Hold, T = Takeoff, W = Line Up and Wait</p>
        <p>Sub Command: The sub command can consist of items like runways, altitude, and degree
        <br>Examples:
        <br>AAL123 C 3 <- clears for 3000ft
        <br>AAL123 C 035 <- clears for 35°
        <br>AAL123 T <- tell plane to take off
        <br>AAL123 L 24R<- tell plane to land on runway 24L
        <br>AAL123 A <- aborts previously given command
        <br>AAL123 H <- tells plane to hold
        <p>Other Commands:</p>
        <p>clear: Clears the log</p>
        </p>
        <p style="margin-top: -10px">-------------------------------------------------------</p>`*/