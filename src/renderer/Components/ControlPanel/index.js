import { useState } from 'react'

const ControlPanel = (props) => {

  const [historyIndex, setHistoryIndex] = useState(0)

  const onChange = (e) => {
    if(e.key === 'Enter' || e.which === 13) {
        props.onCommand()
        setHistoryIndex(0)
        return
    }
    else if(e.key === "ArrowUp" || e.which === 38) {
      props.setCommand(cmd => props.history[historyIndex === 0 ? 0 : historyIndex + 1 === props.history.length ? historyIndex : historyIndex + 1])
      setHistoryIndex(hs => hs + 1 === props.history.length ? hs : hs + 1)
      const input = document.getElementById('cmd-input')
      const end = e.target.value.length
      input.setSelectionRange(end, end)
      input.focus()
      return
    }
    else if(e.key === "ArrowDown" || e.which === 40) {
      props.setCommand(cmd => historyIndex === 0 ? '' : props.history[historyIndex - 1])
      setHistoryIndex(hs => hs === 0 ? hs : hs - 1)
      const input = document.getElementById('cmd-input')
      const end = e.target.value.length
      input.setSelectionRange(end, end)
      input.focus()
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