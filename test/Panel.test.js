// Run with: npm test (node --test test/*.test.js)
// Pins the Loud stage wiring in Panel.qml: the dimension must survive the
// full round trip (chip -> fxSetAmount -> fxApplyPreset JSON -> slider).
const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")

const panel = fs.readFileSync(path.join(__dirname, "..", "Panel.qml"), "utf8")

test("default fxStatus preset carries loud: 0", () => {
  assert.match(panel, /preset:\s*\{spatial: 0, bass: 0, night: 0, loud: 0\}/)
})

test("fxSetAmount composes loud with the other dimensions", () => {
  assert.match(panel, /night: fxStatus\.preset\.night \|\| 0,\s*\n\s*loud: fxStatus\.preset\.loud \|\| 0/)
})

test("fxApplyPreset serializes loud into the engine JSON — not dropped", () => {
  assert.match(panel, /JSON\.stringify\(\{spatial: p\.spatial \|\| 0, bass: p\.bass \|\| 0, night: p\.night \|\| 0, loud: p\.loud \|\| 0\}\)/)
  assert.match(panel, /\(p\.spatial \|\| p\.bass \|\| p\.night \|\| p\.loud\)/)
})

test("fxToggleLoud exists and delegates through fxSetAmount", () => {
  assert.match(panel, /function fxToggleLoud\(\)\s*\{/)
  assert.match(panel, /fxSetAmount\("loud", cur > 0 \? 0 : root\.fxLoudDefault\)/)
})

test("loud is a selectable strength dimension with a dB display", () => {
  assert.match(panel, /if \(\(p\.loud \|\| 0\) > 0\) return "loud"/)
  assert.match(panel, /if \(d === "loud"\) return "LOUDNESS"/)
  assert.match(panel, /function fxDimensionValueText\(\)/)
})

test("the LOUD chip is clickable and wired to fxToggleLoud", () => {
  assert.match(panel, /id: loudChip/)
  assert.match(panel, /onClicked: root\.fxToggleLoud\(\)/)
})
