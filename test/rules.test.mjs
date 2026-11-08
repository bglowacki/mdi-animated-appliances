import test from 'node:test';
import assert from 'node:assert/strict';
import { matchRule, applyRules, RULE_STATES } from '../dist/mdi-animated-appliances.js';

const hass = { states: {
  'vacuum.v': { state: 'docked', attributes: { washing: true, drying: false, battery_level: 12, mode: 'Sweeping' } },
  'sensor.other': { state: '42', attributes: {} },
} };
const base = { state: 'idle', variant: 'clean' };
const apply = (rules, b = base) => applyRules(rules, b, hass, 'vacuum.v');

test('state / attribute equality', () => {
  assert.equal(matchRule({ state: 'docked' }, hass, 'vacuum.v'), true);
  assert.equal(matchRule({ state: 'cleaning' }, hass, 'vacuum.v'), false);
  assert.equal(matchRule({ attribute: 'washing', equals: true }, hass, 'vacuum.v'), true);
  assert.equal(matchRule({ attribute: 'drying', equals: true }, hass, 'vacuum.v'), false);
  assert.equal(matchRule({ attribute: 'mode', equals: 'sweeping' }, hass, 'vacuum.v'), true);
});

test('in / not / above / below and other entities', () => {
  assert.equal(matchRule({ in: ['docked', 'idle'] }, hass, 'vacuum.v'), true);
  assert.equal(matchRule({ not: 'docked' }, hass, 'vacuum.v'), false);
  assert.equal(matchRule({ attribute: 'battery_level', below: 15 }, hass, 'vacuum.v'), true);
  assert.equal(matchRule({ attribute: 'battery_level', above: 15 }, hass, 'vacuum.v'), false);
  assert.equal(matchRule({ entity: 'sensor.other', above: 40, below: 50 }, hass, 'vacuum.v'), true);
  assert.equal(matchRule({ entity: 'sensor.missing', state: 'x' }, hass, 'vacuum.v'), false);
});

test('empty or unknown conditions never match; a list means AND', () => {
  assert.equal(matchRule({}, hass, 'vacuum.v'), false);
  assert.equal(matchRule({ entity: 'sensor.other' }, hass, 'vacuum.v'), false);
  assert.equal(matchRule([{ state: 'docked' }, { attribute: 'washing', equals: true }], hass, 'vacuum.v'), true);
  assert.equal(matchRule([{ state: 'docked' }, { attribute: 'washing', equals: false }], hass, 'vacuum.v'), false);
});

test('first matching rule wins and can set state, variant and label', () => {
  const r = apply([
    { when: { attribute: 'washing', equals: true }, state: 'washing', variant: 'mop', label: 'Washing the mop' },
    { when: { state: 'docked' }, variant: 'bin' },
  ]);
  assert.deepEqual(r, { state: 'washing', variant: 'mop', label: 'Washing the mop' });
  const r2 = apply([{ when: { state: 'docked' }, variant: 'bin' }]);
  assert.deepEqual(r2, { state: 'idle', variant: 'bin', label: null });
});

test('no match keeps the base; unavailable base ignores rules', () => {
  assert.deepEqual(apply([{ when: { state: 'cleaning' }, variant: 'brush' }]), { state: 'idle', variant: 'clean', label: null });
  assert.deepEqual(apply([{ when: { state: 'docked' }, state: 'error' }], { state: 'unavailable', variant: 'clean' }), { state: 'unavailable', variant: 'clean', label: null });
  assert.deepEqual(apply(undefined), { state: 'idle', variant: 'clean', label: null });
});

test('rule states cover every logical state', () => {
  for (const s of ['washing', 'spinning', 'drying', 'finished', 'paused', 'delayed', 'error', 'idle', 'returning', 'unavailable']) assert.ok(RULE_STATES.includes(s), s);
});

test('a missing attribute never matches, also with not', () => {
  assert.equal(matchRule({ attribute: 'nope', not: 'x' }, hass, 'vacuum.v'), false);
  assert.equal(matchRule({ attribute: 'nope', below: 5 }, hass, 'vacuum.v'), false);
  assert.equal(matchRule({ attribute: 'mode', not: 'x' }, hass, 'vacuum.v'), true);
});
