import React from 'react'
import { Modal, Button } from 'antd'
import { GiAirplaneArrival, GiAirplaneDeparture, GiHelicopter } from 'react-icons/gi'
import { IoIosAirplane } from 'react-icons/io'
import { ImRoad } from 'react-icons/im'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import runways_json from '../../data/runways.json'

const HelpModal = (props) => {
  return (
    <Modal cancelButtonProps={{ type: 'ghost' }} width="600px" bodyStyle={{ backgroundColor: '#23334a' }} centered title="Welcome to the help page!" visible={props.showHelpModal} onCancel={() => props.setShowHelpModal(false)} footer={
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
        <p><pre>clear {`\<`}-- Clears the log</pre></p>
        <p><pre>help  {`\<`}-- Opens the help modal</pre></p>
        <br />
        <p>Runways</p>
        <ul className='help-runway-list'>
            {
                runways_json.map((runway, index) => (
                    <li>{runway.id}</li>
                ))
            }
        </ul>
        <br />
        <p>Legend</p>
        <p><pre><span className="aircraft-display-icon"><IoIosAirplane /></span>   {`\<`}-- Airborne airplane</pre></p>
        <p><pre><span className="aircraft-display-icon"><GiAirplaneDeparture /></span>   {`\<`}-- Airplane taking off</pre></p>
        <p><pre><span className="aircraft-display-icon"><GiAirplaneArrival /></span>   {`\<`}-- Airplane landing</pre></p>
        <p><pre><span className="aircraft-display-icon"><ImRoad /></span>   {`\<`}-- Aircraft on runway</pre></p>
        <p><pre><span className="aircraft-display-icon"><GiHelicopter /></span>   {`\<`}-- Airborne helicopter</pre></p>
        <p><pre><span className="aircraft-display-icon"><GiHelicopter /><BsArrowUp /></span> {`\<`}-- Helicopter taking off</pre></p>
        <p><pre><span className="aircraft-display-icon"><GiHelicopter /><BsArrowDown /></span> {`\<`}-- Helicopter landing</pre></p>

    </Modal>
  )
}

export default HelpModal

