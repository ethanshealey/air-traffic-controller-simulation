import React, { useState, useEffect } from 'react'
import { Space } from 'antd'
import { GiAirplaneArrival, GiAirplaneDeparture, GiHelicopter } from 'react-icons/gi'
import { IoIosAirplane } from 'react-icons/io'
import { ImRoad } from 'react-icons/im'

const AircraftCard = (props) => {

  const [icon, setIcon] = useState(<IoIosAirplane />)

  useEffect(() => {
    switch(props.aircraft.icon) {
      case 'aircraft-landing':
        return setIcon(<GiAirplaneArrival />)
      case 'helicopter':
        return setIcon(<GiHelicopter />)
      case 'aircraft-takeoff':
        return setIcon(<GiAirplaneDeparture />)
      case 'aircraft-on-ground':
        return setIcon()
      default:
        return setIcon(<IoIosAirplane />)
    }
  }, [])

  return (
    <Space onClick={() => props.onAircraftClick(props.aircraft)} direction="vertical" className="aircraft-display-card" style={{ borderTop: `5px solid ${ props.aircraft.destination === 'ORD' ? '#c0e4fa' : '#fcf0c6' }` }}>
        <div className="upper-card">
            <p className="aircraft-display-name">{props.aircraft.name}</p>
            <p className="aircraft-display-deg-runway">{props.aircraft.runway ? props.aircraft.runway : props.aircraft.degree}</p>
            <p className="aircraft-display-672-alt">{`${props.aircraft.altitude}=`}</p>
        </div>
        <div className="lower-card">
          <p className="aircraft-display-model">E145</p>
          <p className="aircraft-display-dest">{props.aircraft.destination === 'ORD' ? 'Arrival' : `To: ${props.aircraft.destination}` }</p>
          <p className="aircraft-display-icon-wrapper">Status: <span className="aircraft-display-icon">{
            props.aircraft.icon === 'aircraft-on-ground' ? <ImRoad /> : 
            props.aircraft.icon === 'aircraft-takeoff' ? <GiAirplaneDeparture /> :
            props.aircraft.icon === 'aircraft-landing' ? <GiAirplaneArrival /> :
            props.aircraft.icon === 'helicopter' ? <GiHelicopter /> :
            <IoIosAirplane />
          }</span></p>
        </div>
    </Space>
  )
}

export default AircraftCard