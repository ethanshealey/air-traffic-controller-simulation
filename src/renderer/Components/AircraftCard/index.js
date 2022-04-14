import React from 'react'
import { Space } from 'antd'

const AircraftCard = (props) => {
  return (
    <Space onClick={() => props.onAircraftClick(props.aircraft)} direction="vertical" className="aircraft-display-card" style={{ borderTop: `5px solid ${ props.aircraft.destination === 'ORD' ? '#c0e4fa' : '#fcf0c6' }` }}>
        <div className="upper-card">
            <p className="aircraft-display-name">{props.aircraft.name}</p>
            <p className="aircraft-display-deg-runway">{props.aircraft.runway ? props.aircraft.runway : props.aircraft.degree}</p>
            <p className="aircraft-display-672-alt">{!props.aircraft.runway ? `${props.aircraft.altitude}=` : '672=' }</p>
        </div>
        <div className="lower-card">
          <p className="aircraft-display-model">E145</p>
          <p className="aircraft-display-dest">{props.aircraft.destination === 'ORD' ? 'Arrival' : `To: ${props.aircraft.destination}` }</p>
        </div>
    </Space>
  )
}

export default AircraftCard