import React from 'react'
import AircraftCard from '../AircraftCard';

const AircraftWrapper = (props) => {
  return (
    <>
        {
            props.aircrafts.map(aircraft => (
                <AircraftCard aircraft={aircraft} />
            ))
        }
    </>
  )
}

export default AircraftWrapper