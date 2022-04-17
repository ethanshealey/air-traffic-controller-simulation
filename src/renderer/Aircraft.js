import aircrafts from './data/aircrafts.json'
import airports from './data/airports.json'
import runways from './data/runways.json'
import airplane_models from './data/airplane-models.json'
import helicopter_models from './data/helicopter-models.json'

export default class Aircraft {
    constructor() {
        // generate a uid
        this._id = Date.now().toString(36) + Math.random().toString(36).substr(2)

        // determine if aircraft spawns on ground or in air
        const rnd = Math.floor(Math.random() * 100)
        let spawnInAir = false, isHelicopter = false
        if(rnd % 2 === 0) spawnInAir = true
        if(rnd <= 25) isHelicopter = true

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
    set altitude(a) { this._altitude = a }

    set degree(d) { this._degree = d }

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


}