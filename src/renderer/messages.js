const validCommand = new RegExp("^[A-Z]{3}[1-9]{3} [C|L|A|H|T|W] [1-9]+[L|R|C]{0,1}$", "g")

const generateMessage = (command, aircrafts) => {
    const cmd = command.split(' ')

    let message = ""
    if(validCommand.test(command)) {
        const cmd = command.split(' ')
  
        if(!aircrafts.some(ac => ac.name === cmd[0])) {
          message = ` 
            <span style="color: red !important">Invalid plane name given: ${cmd[0]} does not exist</span>`
        }
        else {
          message = `
            <span style="color: white;">Roger That</span>`
        }
        message += `
          <p>Running: ${command}</p>
          <p>Response: ${message}</p>
          <p style="margin-top: -10px">-------------------------------------------------------</p>`
      }
    else if(command.toUpperCase() === 'HELP') {
        message = `
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
          </p>
          <p style="margin-top: -10px">-------------------------------------------------------</p>`
    }
    else {
        message = `
          <p>Running: ${command}</p>
          <p>Response: <span style="color: red !important">ERROR: Invalid command</span></p>
          <p style="margin-top: -10px">-------------------------------------------------------</p>`
    }
    return message
}

export default generateMessage