# Changelog

All notable changes. Versions follow [SemVer](https://semver.org/); default animations never change when variants are added.

## 0.7.1
- Fix: a rule condition on a missing attribute never matches (previously `not` matched it).

## 0.7.0
- New `rules` option: map any entity state or attribute to a logical state, an animation `variant` and a label (first match wins; conditions `state`/`equals`, `attribute`, `in`, `not`, `above`/`below`, other entities, AND lists). Works for every appliance.
- README: Rules section, gallery reorganised into collapsible per-appliance sections with icon-only tiles.

## 0.6.0
- Robot vacuum variants: `suction`, `vortex`, `brush`, `bin`, `sparkle`, `mop`.
- Robot mower variants: `cut`, `mulch`, `deck`, `meadow`, `swath`.
- Gallery gif for every new variant.

## 0.5.0
- Robot vacuum variants: `scan`, `sonar`, `bounce`. Robot mower variants: `grass`, `clippings`, `shuttle`.

## 0.4.2
- Gallery: one seamless gif per variant and animated phase, plus a static state sheet per appliance.
- Bubble, steam and orbit animation periods aligned so loops are seamless.

## 0.4.1
- Per-appliance gifs with seamless loops; robot animation periods made commensurate.

## 0.4.0
- New appliances: robot vacuum (`appliance: vacuum`) and robot mower (`appliance: mower`) with `battery_entity`, states cleaning/mowing/returning/docked.

## 0.3.2
- Restored the smooth swinging drum animation (reverts 0.3.1).

## 0.3.1
- Continuous drum rotation for washer and dryer (superseded by 0.3.2).

## 0.3.0
- New appliance: tumble dryer (`heat`, `tumble`, `sway`); "since HH:MM" for on/off entities.

## 0.2.0
- New appliance: washing machine (`tumble`, `bubbles`, `sway`) with a separate spinning state.

## 0.1.0
- First release: animated dishwasher card (`custom:mdi-animated-card`) with `wave`, `bubbles`, `drops`, `sway`, progress bar and finish time.
