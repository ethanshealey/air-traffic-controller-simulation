import React from 'react'
const ControlPanel = (props) => {

  const onChange = (e) => {
    if(e.key === 'Enter' || e.which === 13) {
        props.onCommand()
        return
    }
    props.setCommand(e.target.value)
  }

  return (
    <div className="control-panel">
        <div className='log' id='log' />
        <input id='cmd-input' type="text" value={props.command} onChange={onChange} onKeyDown={onChange} placeholder="Enter a command" className="control-input"/>
    </div>
  )
}

export default ControlPanel