import React from 'react'
import AircraftCard from '../AircraftCard';

const AircraftWrapper = (props) => {
  return (
    <div className='aircraft-list-wrapper'>
        {
            props.aircrafts.map(aircraft => (
                <AircraftCard aircraft={aircraft} onAircraftClick={props.onAircraftClick} />
            ))
        }
    </div>
  )
}

export default AircraftWrapper