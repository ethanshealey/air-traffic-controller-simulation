import React from 'react'
import { Space } from 'antd'

const AircraftCard = (props) => {
  return (
    <Space direction="vertical" className="aircraft-display-card">
        <Space>
            <h2>{props.aircraft._model}</h2>
            
        </Space>
    </Space>
  )
}

export default AircraftCard