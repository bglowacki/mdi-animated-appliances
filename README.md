# MDI Animated Appliances

Animated, **Material Design Icon–style** appliance cards for Home Assistant. Pick an entity and the
icon follows the appliance: water moves in the window of a dishwasher, the drum of a washing machine
turns, a tumble dryer glows with moving heat waves, a robot vacuum circles its ring, a robot mower
spins its wheel – and a check draws itself when the cycle is finished.

![Preview](assets/preview.png)

Supported appliances: **dishwasher**, **washer** (washing machine), **dryer** (tumble dryer), **vacuum** (robot vacuum) and **mower** (robot lawn mower). More to come – pick one with the `appliance` option.

* Pure SVG + CSS, no dependencies, no `card-mod`, no extra resources.
* Built on the real Material Design Icons outlines (`dishwasher`, `washing-machine`, `tumble-dryer`, `robot-vacuum`, `robot-mower`), so it blends in with the rest of your dashboard and theme.
* 5 appliances with 3–12 animations each, all shown in the [Gallery](#gallery); pick one with `variant`.
* States: washing / cleaning / mowing, spinning (washer), drying, returning (robots), finished, paused, delayed start, error, idle / docked, unavailable.
* Optional progress bar and finish time for appliances; battery level for robots.
* Visual editor, English and Polish labels, honours `prefers-reduced-motion`.

## Gallery

Every animation is a seamless loop. Expand an appliance; the name under each icon is the `variant` value.

<details>
<summary><b>Dishwasher</b> — 5 animations (<code>appliance: dishwasher</code>)</summary>

<br>

<table>
<tr>
<td align="center" valign="top" width="25%"><img src="assets/gallery/dishwasher-wave.gif" width="140" alt="Dishwasher wave"><br><sub>wave (default)</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/dishwasher-bubbles.gif" width="140" alt="Dishwasher bubbles"><br><sub>bubbles</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/dishwasher-drops.gif" width="140" alt="Dishwasher drops"><br><sub>drops</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/dishwasher-sway.gif" width="140" alt="Dishwasher sway"><br><sub>sway</sub></td>
</tr>
<tr>
<td align="center" valign="top" width="25%"><img src="assets/gallery/dishwasher-drying.gif" width="140" alt="Dishwasher drying"><br><sub>drying</sub></td>
<td width="25%"></td>
<td width="25%"></td>
<td width="25%"></td>
</tr>
</table>

<p><sub>Other states: finished · paused · delayed start · needs attention · idle · unavailable</sub></p>
<img src="assets/gallery/dishwasher-states.png" width="100%" alt="Dishwasher states">

</details>

<details>
<summary><b>Washing machine</b> — 5 animations (<code>appliance: washer</code>)</summary>

<br>

<table>
<tr>
<td align="center" valign="top" width="25%"><img src="assets/gallery/washer-tumble.gif" width="140" alt="Washing machine tumble"><br><sub>tumble (default)</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/washer-bubbles.gif" width="140" alt="Washing machine bubbles"><br><sub>bubbles</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/washer-sway.gif" width="140" alt="Washing machine sway"><br><sub>sway</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/washer-spinning.gif" width="140" alt="Washing machine spinning"><br><sub>spinning</sub></td>
</tr>
<tr>
<td align="center" valign="top" width="25%"><img src="assets/gallery/washer-drying.gif" width="140" alt="Washing machine drying"><br><sub>drying</sub></td>
<td width="25%"></td>
<td width="25%"></td>
<td width="25%"></td>
</tr>
</table>

<p><sub>Other states: finished · paused · delayed start · needs attention · idle · unavailable</sub></p>
<img src="assets/gallery/washer-states.png" width="100%" alt="Washing machine states">

</details>

<details>
<summary><b>Tumble dryer</b> — 3 animations (<code>appliance: dryer</code>)</summary>

<br>

<table>
<tr>
<td align="center" valign="top" width="25%"><img src="assets/gallery/dryer-heat.gif" width="140" alt="Tumble dryer heat"><br><sub>heat (default)</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/dryer-tumble.gif" width="140" alt="Tumble dryer tumble"><br><sub>tumble</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/dryer-sway.gif" width="140" alt="Tumble dryer sway"><br><sub>sway</sub></td>
<td width="25%"></td>
</tr>
</table>

<p><sub>Other states: finished · paused · delayed start · needs attention · idle · unavailable</sub></p>
<img src="assets/gallery/dryer-states.png" width="100%" alt="Tumble dryer states">

</details>

<details>
<summary><b>Robot vacuum</b> — 12 animations (<code>appliance: vacuum</code>)</summary>

<br>

<table>
<tr>
<td align="center" valign="top" width="25%"><img src="assets/gallery/vacuum-clean.gif" width="140" alt="Robot vacuum clean"><br><sub>clean (default)</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/vacuum-scan.gif" width="140" alt="Robot vacuum scan"><br><sub>scan</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/vacuum-sonar.gif" width="140" alt="Robot vacuum sonar"><br><sub>sonar</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/vacuum-bounce.gif" width="140" alt="Robot vacuum bounce"><br><sub>bounce</sub></td>
</tr>
<tr>
<td align="center" valign="top" width="25%"><img src="assets/gallery/vacuum-suction.gif" width="140" alt="Robot vacuum suction"><br><sub>suction</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/vacuum-vortex.gif" width="140" alt="Robot vacuum vortex"><br><sub>vortex</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/vacuum-brush.gif" width="140" alt="Robot vacuum brush"><br><sub>brush</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/vacuum-bin.gif" width="140" alt="Robot vacuum bin"><br><sub>bin</sub></td>
</tr>
<tr>
<td align="center" valign="top" width="25%"><img src="assets/gallery/vacuum-sparkle.gif" width="140" alt="Robot vacuum sparkle"><br><sub>sparkle</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/vacuum-mop.gif" width="140" alt="Robot vacuum mop"><br><sub>mop</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/vacuum-sway.gif" width="140" alt="Robot vacuum sway"><br><sub>sway</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/vacuum-returning.gif" width="140" alt="Robot vacuum returning"><br><sub>returning</sub></td>
</tr>
</table>

<p><sub>Other states: docked · paused · needs attention · unavailable</sub></p>
<img src="assets/gallery/vacuum-states.png" width="100%" alt="Robot vacuum states">

</details>

<details>
<summary><b>Robot mower</b> — 11 animations (<code>appliance: mower</code>)</summary>

<br>

<table>
<tr>
<td align="center" valign="top" width="25%"><img src="assets/gallery/mower-mow.gif" width="140" alt="Robot mower mow"><br><sub>mow (default)</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/mower-grass.gif" width="140" alt="Robot mower grass"><br><sub>grass</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/mower-clippings.gif" width="140" alt="Robot mower clippings"><br><sub>clippings</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/mower-cut.gif" width="140" alt="Robot mower cut"><br><sub>cut</sub></td>
</tr>
<tr>
<td align="center" valign="top" width="25%"><img src="assets/gallery/mower-mulch.gif" width="140" alt="Robot mower mulch"><br><sub>mulch</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/mower-deck.gif" width="140" alt="Robot mower deck"><br><sub>deck</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/mower-meadow.gif" width="140" alt="Robot mower meadow"><br><sub>meadow</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/mower-swath.gif" width="140" alt="Robot mower swath"><br><sub>swath</sub></td>
</tr>
<tr>
<td align="center" valign="top" width="25%"><img src="assets/gallery/mower-shuttle.gif" width="140" alt="Robot mower shuttle"><br><sub>shuttle</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/mower-sway.gif" width="140" alt="Robot mower sway"><br><sub>sway</sub></td>
<td align="center" valign="top" width="25%"><img src="assets/gallery/mower-returning.gif" width="140" alt="Robot mower returning"><br><sub>returning</sub></td>
<td width="25%"></td>
</tr>
</table>

<p><sub>Other states: docked · paused · needs attention · unavailable</sub></p>
<img src="assets/gallery/mower-states.png" width="100%" alt="Robot mower states">

</details>

## Installation

### HACS (custom repository)

1. HACS → ⋮ → **Custom repositories**.
2. Repository: `https://github.com/bglowacki/mdi-animated-appliances`, type **Dashboard**.
3. Install **MDI Animated Appliances** and reload the browser.

HACS registers the resource automatically. For a manual install copy `dist/mdi-animated-appliances.js` to
`/config/www/` and add the resource `/local/mdi-animated-appliances.js` (type *JavaScript module*).

## Usage

Add a card → **MDI Animated Appliances**, choose the entity, done. Or in YAML:

```yaml
type: custom:mdi-animated-card
appliance: dishwasher
entity: sensor.kitchen_dishwasher_operation_state
progress_entity: sensor.kitchen_dishwasher_program_progress      # optional, 0–100
finish_entity: sensor.kitchen_dishwasher_program_finish_time     # optional, timestamp
variant: wave
```

### Options

| Option | Default | Description |
|---|---|---|
| `entity` | – | **Required.** Entity carrying the appliance status (see *Supported entities*). |
| `appliance` | `dishwasher` | `dishwasher`, `washer`, `dryer`, `vacuum` or `mower`. |
| `name` | entity name | Card title. |
| `variant` | `wave` / `tumble` / `heat` | Dishwasher: `wave`, `bubbles`, `drops`, `sway`. Washer: `tumble`, `bubbles`, `sway`. Dryer: `heat`, `tumble`, `sway`. Vacuum: `clean`, `scan`, `sonar`, `bounce`, `suction`, `vortex`, `brush`, `bin`, `sparkle`, `mop`, `sway`. Mower: `mow`, `grass`, `clippings`, `shuttle`, `cut`, `mulch`, `deck`, `meadow`, `swath`, `sway`. |
| `progress_entity` | – | Numeric 0–100 sensor; shows a bar and a percentage (appliances, not robots). |
| `finish_entity` | – | Timestamp sensor; shows “until HH:MM” (appliances, not robots). |
| `battery_entity` | `battery_level` attribute | Battery sensor for `vacuum` / `mower`; shows “Battery 78%”. |
| `drying_from_progress` | – | Show the *drying* animation once progress reaches this % (for integrations that do not report a drying phase). |
| `state_map` | – | Map raw states to `washing`, `drying`, `finished`, `paused`, `delayed`, `error`, `idle`. |
| `layout` | `horizontal` | `horizontal` or `vertical`. |
| `icon_size` | `72` | Icon size in px. |
| `show_progress` | `true` | Show progress bar and percentage. |
| `show_finish_time` | `true` | Show finish time. |
| `language` | HA language | `en` or `pl`. |
| `tap_action` | `more-info` | Standard Home Assistant action object. |

A tumble dryer on a smart plug (no cycle status) works with any on/off entity – e.g. a binary sensor that is `on`
while the dryer draws power. The card then shows “since HH:MM”:

```yaml
type: custom:mdi-animated-card
appliance: dryer
entity: binary_sensor.dryer_running
```

Robots (`vacuum.*` and `lawn_mower.*` entities – states `cleaning`/`mowing`, `returning`, `docked`, `paused`, `error`).
The card shows the battery (from the `battery_level` attribute, or set `battery_entity`):

```yaml
type: custom:mdi-animated-card
appliance: vacuum        # or: mower
entity: vacuum.my_robot  # or: lawn_mower.my_mower
battery_entity: sensor.my_robot_battery   # optional
```

### Supported entities

* `sensor` with an operation state – recognised out of the box: Home Connect (`run`, `finished`,
  `inactive`, `ready`, `pause`, `delayedstart`, `actionrequired`, `error`), and generic words such as
  `washing`, `drying`, `done`, `idle`.
* Washing machines (e.g. LG ThinQ `job_state`): `wash`, `rinse`, `spin`, `drying`, `finish`, `delay_wash`, `none`, and
  `machine_state` (`run`, `pause`, `stop`).
* `switch`, `input_boolean`, `binary_sensor`: `on` is shown as washing, `off` as idle.
* Anything else: use `state_map`, e.g.

```yaml
state_map:
  cycle_main: washing
  cycle_dry: drying
```

## Development

```
npm test                 # state-mapping unit tests (node:test)
python3 -m http.server   # then open /test/harness.html to see every state and variant
```

## Credits and license

MIT – see [LICENSE](LICENSE). The dishwasher outline is from
[Material Design Icons](https://pictogrammers.com/library/mdi/) (Apache-2.0), see [NOTICE](NOTICE).
