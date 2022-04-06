import aircrafts from './aircrafts.json'
/****
 * NOTE: aircaft.json is a json file that contains all the aircrafts, sourced from
 * https://gist.github.com/tormjens/0e2a1a5e0e69c50a9046e01bf993bb7e
 */
import airports from './airports.json'
import runways from './runways.json'

export default class Aircraft {
    constructor() {
        // generate a uid
        this._id = Date.now().toString(36) + Math.random().toString(36).substr(2)

        // determine if aircraft spawns on ground or in air
        const rnd = Math.floor(Math.random() * 100)
        let spawnInAir = false
        if(rnd % 2 === 0) spawnInAir = true

        // generate an altitude
        this._altitude = spawnInAir ? Math.floor(Math.random() * (8000 - 2000) + 2000) : 0

        // grab a random model from the JSON list of aircrafts
        this._model = aircrafts[Math.floor(Math.random() * aircrafts.length)].value + ('' + Math.floor(Math.random() * (555 - 100) + 100))

        // generate a starting degree
        this._degree = '0' + Math.floor(Math.random() * 36)

        // generate a speed
        this._speed = spawnInAir ? Math.floor(Math.random() * (600 - 200) + 200) : 0

        // generate a destination
        this._destination = spawnInAir ? 'ORD' : airports[Math.floor(Math.random() * airports.length)].value

        // if on ground assign runway
        this._runway = spawnInAir ? null : runways[Math.floor(Math.random() * runways.length)]
    }

    /**
     * GETTERS
     */
    get id() { return this._id }

    get altitude() { return this._altitude }

    get model() { return this._model }

    get degree() { return this._degree }

    get speed() { return this._speed }

    get destination() { return this._destination }

    get runway() { return this._runway }

    /**
     * SETTERS
     */
    set altitude(a) { this._altitude = a }

    set degree(d) { this._degree = d }

    set speed(s) { this._speed = s }

    set destination(d) { this._destination = d }

    set runway(r) { this._runway = r }

}