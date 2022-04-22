import aircrafts from './data/aircrafts.json'
import airports from './data/airports.json'
import runways from './data/runways.json'
import airplane_models from './data/airplane-models.json'
import helicopter_models from './data/helicopter-models.json'
import delay from './delay'

export default class Aircraft {
    constructor() {
        // generate a uid
        this._id = Date.now().toString(36) + Math.random().toString(36).substr(2)

        // determine if aircraft spawns on ground or in air
        const rnd = Math.floor(Math.random() * 100)
        let spawnInAir = rnd % 2 === 0, isHelicopter = rnd <= 25

        // determine if helicopter
        this._isHelicopter = isHelicopter

        // generate an altitude
        this._altitude = spawnInAir ? String(Math.floor(Math.random() * (8 - 2) + 2)).padEnd(4, '0') : String(672)

        // grab a random model from the JSON list of aircrafts
        this._name = aircrafts[Math.floor(Math.random() * aircrafts.length)].value + ('' + Math.floor(Math.random() * (555 - 100) + 100))

        // generate a starting degree
        this._degree = String(Math.floor(Math.random() * 36)).padStart(3, '0')

        // generate a speed
        this._speed = spawnInAir ? Math.floor(Math.random() * (600 - 200) + 200) : 0

        // generate a destination
        this._destination = spawnInAir ? 'ORD' : airports[Math.floor(Math.random() * airports.length)].value

        // if on ground assign runway
        this._runway = spawnInAir ? null : runways[Math.floor(Math.random() * runways.length)].id

        // boolean to check if craft is on ground
        this._onGround = !spawnInAir

        // give aircraft an icon
        this._icon = spawnInAir ? isHelicopter ? 'helicopter' : 'aircraft-in-air' : 'aircraft-on-ground'

        // assign aircraft model
        this._model = isHelicopter ? helicopter_models[Math.floor(Math.random() * helicopter_models.length)].value : airplane_models[Math.floor(Math.random() * airplane_models.length)].value

       
    }

    /**
     * GETTERS
     */
    get id() { return this._id }

    get altitude() { return this._altitude }

    get name() { return this._name }

    get degree() { return this._degree }

    get speed() { return this._speed }

    get destination() { return this._destination }

    get runway() { return this._runway }

    get onGround() { return this._onGround }

    get icon() { return this._icon }

    get model() { return this._model }

    get isHelicopter() { return this._isHelicopter }

    /**
     * SETTERS
     */
    set altitude(a) { this._altitude = a.length === 1 ? String(a).padEnd(4, '0') : String(a).padEnd(5, '0') }

    set degree(d) { this._degree = String(d).padStart(3, '0') }

    set speed(s) { this._speed = s }    

    set destination(d) { this._destination = d }

    set runway(r) { this._runway = r }

    set onGround(og) { this._onGround = og }

    set icon(i) { this._icon = i }

    set model(m) { this._model = m }

    

    /**
     * METHODS
     */
    getFlightData() {
        return JSON.stringify({
            id: this.id,
            altitude: this.altitude,
            name: this.name,
            degree: this.degree,
            speed: this.speed,
            destination: this.destination,
            runway: this.runway
        })
    }

    land(cmd) {
        
        if(cmd.length === 3) {
            if(!this._onGround) {
              if(this._altitude > 3000) {
                return `
                  <span style="color: red !important">Invalid command: Aircraft is too high to land.</span>
                `
              }
              else if(runways.some(r => r.id === cmd[2])) {
                this._runway = cmd[2]
                this._onGround = true
                if(!this._isHelicopter) this._icon = 'aircraft-landing'
                else this._icon = 'helicopter-landing'
                return `
                  <span>Message recieved. Landing on runway ${cmd[2]}.</span>
                `
              }
              else return `
                <span style="color: red !important">Invalid runway identifier: ${cmd[2]} does not exist</span>
              `
            }
            else return `
              <span style="color: red !important">Invalid command: Aircraft already on ground.</span> 
            `
        }
        else {
            return `
              <span style="color: red !important">Invalid command syntax</span>
            `
        }
    }

    takeoff() {
      if(this._onGround) {
        if(this._altitude !== "672") {
        if(!this._isHelicopter) this._icon = 'aircraft-takeoff'
        else this._icon = 'helicopter-takeoff'
        this._onGround = false
        return `
          <span>Message recieved. Taking off from runway ${this._runway}.</span>
        `
        }
        else {
          return`
            <span style="color: red !important">Aircraft must be cleared for a certain altitude before taking off.</span>
          `
        }
      }
      else {
        return `
          <span style="color: red !important">Invalid command: Aircraft not on runway.</span>`
      }
    }


}