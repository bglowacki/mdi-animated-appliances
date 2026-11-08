import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeState } from '../dist/mdi-animated-appliances.js';

const n = (raw, domain = 'sensor', cfg = {}, progress = NaN) => normalizeState(raw, domain, cfg, progress);

test('Home Connect operation states', () => {
  assert.equal(n('run'), 'washing');
  assert.equal(n('finished'), 'finished');
  assert.equal(n('inactive'), 'idle');
  assert.equal(n('ready'), 'idle');
  assert.equal(n('pause'), 'paused');
  assert.equal(n('delayedstart'), 'delayed');
  assert.equal(n('actionrequired'), 'error');
  assert.equal(n('error'), 'error');
});
test('unavailable / unknown / missing', () => {
  assert.equal(n('unavailable'), 'unavailable');
  assert.equal(n('unknown'), 'unavailable');
  assert.equal(n(undefined), 'unavailable');
});
test('switch-like entities map on/off', () => {
  assert.equal(n('on', 'switch'), 'washing');
  assert.equal(n('off', 'binary_sensor'), 'idle');
});
test('unrecognised sensor state falls back to idle', () => {
  assert.equal(n('something_else'), 'idle');
});
test('state_map override wins', () => {
  assert.equal(n('cycle_3', 'sensor', { state_map: { cycle_3: 'drying' } }), 'drying');
});
test('drying_from_progress turns late washing into drying', () => {
  assert.equal(n('run', 'sensor', { drying_from_progress: 85 }, 92), 'drying');
  assert.equal(n('run', 'sensor', { drying_from_progress: 85 }, 50), 'washing');
  assert.equal(n('run', 'sensor', {}, 99), 'washing');
  assert.equal(n('finished', 'sensor', { drying_from_progress: 85 }, 100), 'finished');
});

test('LG ThinQ washer job states', () => {
  assert.equal(n('wash'), 'washing');
  assert.equal(n('rinse'), 'washing');
  assert.equal(n('ai_wash'), 'washing');
  assert.equal(n('spin'), 'spinning');
  assert.equal(n('drying'), 'drying');
  assert.equal(n('finish'), 'finished');
  assert.equal(n('delay_wash'), 'delayed');
  assert.equal(n('none'), 'idle');
  assert.equal(n('stop'), 'idle');
  assert.equal(n('pause'), 'paused');
});

test('smart-plug style dryer: binary_sensor / switch on-off', () => {
  assert.equal(n('on', 'binary_sensor'), 'washing');
  assert.equal(n('off', 'binary_sensor'), 'idle');
  assert.equal(n('on', 'switch'), 'washing');
});
