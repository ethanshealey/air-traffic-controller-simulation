import React from 'react'
import { Modal, Button } from 'antd'
import { GiAirplaneArrival, GiAirplaneDeparture, GiHelicopter } from 'react-icons/gi'
import { IoIosAirplane } from 'react-icons/io'
import { ImRoad } from 'react-icons/im'
import { BsArrowDown, BsArrowUp, BsArrowLeft } from 'react-icons/bs'
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
        <p><pre>AAL412 C 3   <span className="aircraft-display-icon"><BsArrowLeft /></span> Clears an aircraft for 3000ft</pre></p>
        <p><pre>AAL412 C 035 <span className="aircraft-display-icon"><BsArrowLeft /></span> Clears an aircraft for 35°</pre></p>
        <p><pre>AAL412 L 4R  <span className="aircraft-display-icon"><BsArrowLeft /></span> Commands aircraft to land at runway 4R</pre></p>
        <p><pre>AAL412 T     <span className="aircraft-display-icon"><BsArrowLeft /></span> Commands aircraft to takeoff</pre></p>
        <p><pre>AAL412 H     <span className="aircraft-display-icon"><BsArrowLeft /></span> Commands an aircraft to hold and circle</pre></p>
        <p><pre>AAL412 A     <span className="aircraft-display-icon"><BsArrowLeft /></span> Aborts previously given command</pre></p>
        <br />
        <p>Other commands</p>
        <p><pre>clear <span className="aircraft-display-icon"><BsArrowLeft /></span> Clears the log</pre></p>
        <p><pre>help  <span className="aircraft-display-icon"><BsArrowLeft /></span> Opens the help modal</pre></p>
        <br />
        <p>Runways</p>
        <ul className='help-runway-list'>
            {
                runways_json.map((runway, index) => (
                    <li key={index}>{runway.id}</li>
                ))
            }
        </ul>
        <br />
        <p>Legend</p>
        <p><pre><span className="aircraft-display-icon"><IoIosAirplane /></span>   <span className="aircraft-display-icon"><BsArrowLeft /></span> Airborne airplane</pre></p>
        <p><pre><span className="aircraft-display-icon"><GiAirplaneDeparture /></span>   <span className="aircraft-display-icon"><BsArrowLeft /></span> Airplane taking off</pre></p>
        <p><pre><span className="aircraft-display-icon"><GiAirplaneArrival /></span>   <span className="aircraft-display-icon"><BsArrowLeft /></span> Airplane landing</pre></p>
        <p><pre><span className="aircraft-display-icon"><ImRoad /></span>   <span className="aircraft-display-icon"><BsArrowLeft /></span> Aircraft on runway</pre></p>
        <p><pre><span className="aircraft-display-icon"><GiHelicopter /></span>   <span className="aircraft-display-icon"><BsArrowLeft /></span> Airborne helicopter</pre></p>
        <p><pre><span className="aircraft-display-icon"><GiHelicopter /><BsArrowUp /></span> <span className="aircraft-display-icon"><BsArrowLeft /></span> Helicopter taking off</pre></p>
        <p><pre><span className="aircraft-display-icon"><GiHelicopter /><BsArrowDown /></span> <span className="aircraft-display-icon"><BsArrowLeft /></span> Helicopter landing</pre></p>

    </Modal>
  )
}

export default HelpModal

