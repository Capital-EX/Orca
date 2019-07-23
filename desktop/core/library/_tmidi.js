'use strict'

import Operator from '../operator.js'
let i = 0;
export default function OperatorMidi (orca, x, y, passive) {
  Operator.call(this, orca, x, y, '/', true)

  this.name = 'tmidi'
  this.info = 'Toggles a MIDI note'
  this.ports.channel = { x: 1, y: 0, clamp: { min: 0, max: 16 } }
  this.ports.octave = { x: 2, y: 0, clamp: { min: 0, max: 8 } }
  this.ports.note = { x: 3, y: 0 }
  this.ports.velocity = { x: 4, y: 0, default: 'f', clamp: { min: 0, max: 16 } }
  this.active = false;
  console.log("Constructor");
  this.item = null;

  this.operation = function (force = false) {
    if (this.listen(this.ports.channel) === '.') { return }
    if (this.listen(this.ports.octave) === '.') { return }
    if (this.listen(this.ports.note) === '.') { return }
    if (!isNaN(this.listen(this.ports.note))) { return }

    const channel = this.listen(this.ports.channel, true)
    const octave = this.listen(this.ports.octave, true)
    const note = this.listen(this.ports.note)
    const velocity = this.listen(this.ports.velocity, true)
    const length = -1;
    const isPlayed = true
   

   if (this.hasNeighbor('*')) {
     terminal.io.midi.toggleNote(channel, octave, note, velocity);
    }
    
    

    if (force === true) {
      terminal.io.midi.run()
    }

    this.draw = false
  }
}
