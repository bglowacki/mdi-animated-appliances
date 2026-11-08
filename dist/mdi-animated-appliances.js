/*!
 * MDI Animated Appliances – Home Assistant dashboard card
 * https://github.com/bglowacki/mdi-animated-appliances
 * MIT License. Icon geometry: Material Design Icons by Pictogrammers (Apache-2.0), see NOTICE.
 */
const VERSION = '0.4.0';

/* ---------- MDI "dishwasher" geometry (split so the drop can be swapped for a check) ---------- */
const DISHWASHER_FRAME =
  'M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M10,4A1,1 0 0,1 11,5A1,1 0 0,1 10,6A1,1 0 0,1 9,5A1,1 0 0,1 10,4M7,4A1,1 0 0,1 8,5A1,1 0 0,1 7,6A1,1 0 0,1 6,5A1,1 0 0,1 7,4M18,20H6V8H18V20';
const DISHWASHER_DROP =
  'M14.67,15.33C14.69,16.03 14.41,16.71 13.91,17.21C12.86,18.26 11.15,18.27 10.09,17.21C9.59,16.71 9.31,16.03 9.33,15.33C9.4,14.62 9.63,13.94 10,13.33C10.37,12.5 10.81,11.73 11.33,11L12,10C13.79,12.59 14.67,14.36 14.67,15.33';

/* MDI "washing-machine": body with the drum cut out, plus the half-disc that sits inside the drum */
const WASHER_FRAME =
  'M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z';
const WASHER_HALF =
  'M14.83,11.17C16.39,12.73 16.39,15.27 14.83,16.83C13.27,18.39 10.73,18.39 9.17,16.83L14.83,11.17';

/* MDI "tumble-dryer": body with the drum cut out, plus the two "heat" waves that sit inside the drum */
const DRYER_FRAME =
  'M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z';
const DRYER_WAVES = [
  'M8.11,10.5H10C9.76,11.88 10,12.67 10.58,13.29C11.68,14.36 12.16,15.71 11.89,17.5H10C10.24,16.12 10,15.33 9.42,14.71C8.32,13.64 7.85,12.29 8.11,10.5Z',
  'M12.11,10.5H14C13.76,11.88 14,12.67 14.58,13.29C15.68,14.36 16.16,15.71 15.89,17.5H14C14.24,16.12 14,15.33 13.42,14.71C12.32,13.64 11.85,12.29 12.11,10.5Z',
];

/* MDI "robot-vacuum" and "robot-mower" outlines */
const VACUUM_RING =
  'M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5Z';
const VACUUM_BODY =
  'M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z';
const VACUUM_BODY_SOLID =
  'M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6';
const MOWER_PATH =
  'M1 14V5H13C18.5 5 23 9.5 23 15V17H20.83C20.42 18.17 19.31 19 18 19C16.69 19 15.58 18.17 15.17 17H10C9.09 18.21 7.64 19 6 19C3.24 19 1 16.76 1 14M6 11C4.34 11 3 12.34 3 14C3 15.66 4.34 17 6 17C7.66 17 9 15.66 9 14C9 12.34 7.66 11 6 11M15 10V12H20.25C19.92 11.27 19.5 10.6 19 10H15Z';

const APPLIANCES = {
  dishwasher: { frame: DISHWASHER_FRAME, drop: DISHWASHER_DROP, window: { x: 6, y: 8, w: 12, h: 12 }, variants: ['wave', 'bubbles', 'drops', 'sway'], defaultVariant: 'wave' },
  dryer: { frame: DRYER_FRAME, waves: DRYER_WAVES, drum: { cx: 12, cy: 14, r: 6 }, variants: ['heat', 'tumble', 'sway'], defaultVariant: 'heat' },
  vacuum: { variants: ['clean', 'sway'], defaultVariant: 'clean' },
  mower: { variants: ['mow', 'sway'], defaultVariant: 'mow' },
  washer: { frame: WASHER_FRAME, half: WASHER_HALF, drum: { cx: 12, cy: 14, r: 6 }, variants: ['tumble', 'bubbles', 'sway'], defaultVariant: 'tumble' },
};

const VARIANTS = Array.from(new Set(Object.values(APPLIANCES).flatMap((a) => a.variants)));

/* ---------- state normalisation ---------- */
const STATE_WORDS = {
  washing: ['run', 'running', 'washing', 'wash', 'main_wash', 'mainwash', 'prewash', 'pre_wash', 'pre-wash', 'rinse', 'rinsing', 'in_progress', 'active', 'ai_wash', 'ai_rinse', 'air_wash', 'weight_sensing', 'soak', 'soaking', 'filling', 'cleaning', 'mowing', 'mopping', 'sweeping'],
  returning: ['returning', 'return_to_base', 'returning_to_dock', 'going_home'],
  spinning: ['spin', 'spinning', 'ai_spin', 'draining'],
  drying: ['dry', 'drying', 'final_dry', 'cooling', 'wrinkle_prevent'],
  finished: ['finished', 'finish', 'end', 'ended', 'complete', 'completed', 'done', 'end_of_cycle'],
  paused: ['pause', 'paused'],
  delayed: ['delayedstart', 'delayed_start', 'delayed', 'delay_wash', 'scheduled'],
  error: ['error', 'actionrequired', 'action_required', 'aborting', 'fault', 'alarm'],
  idle: ['inactive', 'ready', 'idle', 'off', 'standby', 'none', 'initial', 'power_off', 'closed', 'stop', 'stopped', 'freeze_protection', 'docked', 'charging', 'charged'],
};
const SWITCH_DOMAINS = ['switch', 'input_boolean', 'binary_sensor', 'fan', 'light'];

const LABELS = {
  en: { washing: 'Washing', spinning: 'Spinning', washing_washer: 'Washing', drying: 'Drying', finished: 'Finished', paused: 'Paused', delayed: 'Delayed start', error: 'Needs attention', idle: 'Idle', unavailable: 'Unavailable', until: 'until', since: 'since', dishwasher: 'Dishwasher', washer: 'Washing machine', dryer: 'Tumble dryer', run_dryer: 'Drying', vacuum: 'Robot vacuum', mower: 'Robot mower', run_vacuum: 'Cleaning', run_mower: 'Mowing', returning: 'Returning', docked: 'Docked', battery: 'Battery' },
  pl: { washing: 'Mycie', spinning: 'Wirowanie', washing_washer: 'Pranie', drying: 'Suszenie', finished: 'Zakończono', paused: 'Wstrzymano', delayed: 'Opóźniony start', error: 'Wymaga uwagi', idle: 'Gotowa', unavailable: 'Niedostępna', until: 'do', since: 'od', dishwasher: 'Zmywarka', washer: 'Pralka', dryer: 'Suszarka', run_dryer: 'Suszenie', vacuum: 'Odkurzacz', mower: 'Kosiarka', run_vacuum: 'Sprząta', run_mower: 'Kosi', returning: 'Wraca do bazy', docked: 'Na stacji', battery: 'Bateria' },
};

function normalizeState(raw, domain, config, progress) {
  if (raw === undefined || raw === null) return 'unavailable';
  const s = String(raw).trim().toLowerCase();
  if (s === 'unavailable' || s === 'unknown' || s === '') return 'unavailable';
  const custom = config.state_map || {};
  if (Object.prototype.hasOwnProperty.call(custom, s) && custom[s] in STATE_WORDS) return applyDrying(custom[s], progress, config);
  if (SWITCH_DOMAINS.includes(domain) && (s === 'on' || s === 'off')) return s === 'on' ? applyDrying('washing', progress, config) : 'idle';
  for (const key of Object.keys(STATE_WORDS)) {
    if (STATE_WORDS[key].includes(s)) return applyDrying(key, progress, config);
  }
  return 'idle';
}

function applyDrying(key, progress, config) {
  const t = Number(config.drying_from_progress);
  if (key === 'washing' && Number.isFinite(t) && t > 0 && Number.isFinite(progress) && progress >= t) return 'drying';
  return key;
}

/* ---------- icon markup ---------- */
function windowContent(variant, state) {
  const w = APPLIANCES.dishwasher.window;
  if (state === 'washing') {
    if (variant === 'wave') {
      return `<g class="wave1"><path d="M-12,14 q3,-2 6,0 t6,0 t6,0 t6,0 t6,0 t6,0 V22 H-12Z" fill="#3b9cff" opacity=".85"/></g>
              <g class="wave2"><path d="M-12,15 q3,2 6,0 t6,0 t6,0 t6,0 t6,0 t6,0 V22 H-12Z" fill="#6cb8ff" opacity=".6"/></g>`;
    }
    if (variant === 'bubbles') {
      const b = [[8, 0.9], [10.5, 0.6], [13, 1.0], [15.5, 0.7], [17, 0.5], [9.2, 0.5]]
        .map(([x, r], i) => `<circle class="bub bub${i}" cx="${x}" cy="19" r="${r}" fill="#8fd0ff"/>`).join('');
      return `<rect x="${w.x}" y="${w.y}" width="${w.w}" height="${w.h}" fill="#3b9cff" opacity=".28" class="tint"/>${b}`;
    }
    if (variant === 'drops') {
      return [7.5, 9.5, 11.5, 13.5, 15.5, 17, 8.5, 12.5, 16]
        .map((x, i) => `<ellipse class="drp drp${i}" cx="${x}" cy="8" rx=".55" ry="1" fill="#6cb8ff"/>`).join('');
    }
    return '';
  }
  if (state === 'drying') {
    return `<rect x="${w.x}" y="${w.y}" width="${w.w}" height="${w.h}" fill="#ff9800" opacity=".18"/>` +
      [8.5, 12, 15.5].map((x, i) =>
        `<path class="steam steam${i}" d="M${x},20 q-1.2,-1.6 0,-3 t0,-3 t0,-3" fill="none" stroke="#ffe3b8" stroke-width=".9" stroke-linecap="round"/>`).join('');
  }
  if (state === 'finished') return `<rect x="${w.x}" y="${w.y}" width="${w.w}" height="${w.h}" fill="#4cd08a" opacity=".18"/>`;
  if (state === 'error') return `<rect x="${w.x}" y="${w.y}" width="${w.w}" height="${w.h}" fill="#f44336" opacity=".18"/>`;
  return '';
}

function washerSvg(state, variant, size) {
  const a = APPLIANCES.washer, d = a.drum;
  const swayClass = state === 'washing' && variant === 'sway' ? ' sway' : '';
  const circle = (fill, op) => `<circle cx="${d.cx}" cy="${d.cy}" r="${d.r}" fill="${fill}" opacity="${op}"/>`;
  let inside = '';
  let overlay = '';
  let halfClass = 'drop half';
  if (state === 'washing') {
    halfClass += ' tumble';
    inside = '<g class="wm-water"><path d="M-2,15.6 q1.5,-1.2 3,0 t3,0 t3,0 t3,0 t3,0 t3,0 t3,0 t3,0 t3,0 t3,0 V22 H-2Z" fill="#3b9cff" opacity=".75"/></g>';
    if (variant === 'bubbles') {
      inside += [[9.5, 0.7], [12, 0.5], [14.5, 0.8], [11, 0.4]]
        .map(([x, r], i) => `<circle class="bub bub${i}" cx="${x}" cy="18.5" r="${r}" fill="#8fd0ff"/>`).join('');
    }
  } else if (state === 'spinning') {
    halfClass += ' spinfast';
    inside = '<circle class="ring" cx="12" cy="14" r="4.6" fill="none" stroke="#8fd0ff" stroke-width=".9" stroke-dasharray="2.2 2.6"/>';
  } else if (state === 'drying') {
    halfClass += ' tumble';
    inside = circle('#ff9800', 0.18) + [10, 14].map((x, i) =>
      `<path class="steam steam${i}" d="M${x},19 q-1.1,-1.5 0,-2.8 t0,-2.8 t0,-2.8" fill="none" stroke="#ffe3b8" stroke-width=".8" stroke-linecap="round"/>`).join('');
  } else if (state === 'finished') {
    inside = circle('#4cd08a', 0.18);
    overlay = '<path class="check" d="M9,14.4 L11.4,16.8 L15.2,12" fill="none" stroke="var(--mdi-anim-success,#4cd08a)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>';
  } else if (state === 'error') {
    inside = circle('#f44336', 0.18);
    overlay = '<path class="alert" d="M12,11.3 V15 M12,16.8 V17" fill="none" stroke="var(--mdi-anim-error-contrast,#ffd0cc)" stroke-width="1.5" stroke-linecap="round"/>';
  } else if (state === 'paused') {
    overlay = '<path d="M10.2,11.8 V16.2 M13.8,11.8 V16.2" fill="none" stroke="var(--mdi-anim-warning,#ffa600)" stroke-width="1.5" stroke-linecap="round"/>';
  } else if (state === 'delayed') {
    overlay = '<circle cx="12" cy="14" r="3.2" fill="none" stroke="var(--secondary-text-color)" stroke-width="1"/><path d="M12,12.2 V14 L13.3,14.8" fill="none" stroke="var(--secondary-text-color)" stroke-width=".9" stroke-linecap="round"/>';
  }
  const showHalf = ['washing', 'spinning', 'drying', 'idle', 'unavailable'].includes(state);
  return `<svg class="svg s-${state}${swayClass}" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">
    <defs><clipPath id="drum"><circle cx="${d.cx}" cy="${d.cy}" r="${d.r}"/></clipPath></defs>
    <g clip-path="url(#drum)">${inside}</g>
    <path class="frame" d="${a.frame}" fill-rule="evenodd"/>
    ${showHalf ? `<path class="${halfClass}" d="${a.half}"/>` : ''}
    ${overlay}
  </svg>`;
}

function dryerSvg(state, variant, size) {
  const a = APPLIANCES.dryer, d = a.drum;
  const running = state === 'washing' || state === 'drying';
  const swayClass = running && variant === 'sway' ? ' sway' : '';
  const circle = (fill, op, cls = '') => `<circle class="${cls}" cx="${d.cx}" cy="${d.cy}" r="${d.r}" fill="${fill}" opacity="${op}"/>`;
  let inside = '';
  let overlay = '';
  let showWaves = true;
  if (running) {
    inside = circle('#ff9800', 0.22, 'glow');
    inside += variant === 'tumble'
      ? '<g class="orbit"><circle cx="12" cy="9.9" r=".9" fill="#ffd9a0"/><circle cx="15.6" cy="16" r=".9" fill="#ffd9a0"/><circle cx="8.4" cy="16" r=".9" fill="#ffd9a0"/></g>'
      : '<circle class="ring" cx="12" cy="14" r="5" fill="none" stroke="#ffd9a0" stroke-width=".7" stroke-dasharray="1.4 2.6"/>';
  } else if (state === 'finished') {
    inside = circle('#4cd08a', 0.18);
    overlay = '<path class="check" d="M9,14.4 L11.4,16.8 L15.2,12" fill="none" stroke="var(--mdi-anim-success,#4cd08a)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>';
    showWaves = false;
  } else if (state === 'error') {
    inside = circle('#f44336', 0.18);
    overlay = '<path class="alert" d="M12,11.3 V15 M12,16.8 V17" fill="none" stroke="#ff8a80" stroke-width="1.6" stroke-linecap="round"/>';
    showWaves = false;
  } else if (state === 'paused') {
    overlay = '<path d="M10.2,11.8 V16.2 M13.8,11.8 V16.2" fill="none" stroke="var(--mdi-anim-warning,#ffa600)" stroke-width="1.5" stroke-linecap="round"/>';
    showWaves = false;
  } else if (state === 'delayed') {
    overlay = '<circle cx="12" cy="14" r="3.2" fill="none" stroke="var(--secondary-text-color)" stroke-width="1"/><path d="M12,12.2 V14 L13.3,14.8" fill="none" stroke="var(--secondary-text-color)" stroke-width=".9" stroke-linecap="round"/>';
    showWaves = false;
  }
  const waves = showWaves ? a.waves.map((p, i) => `<path class="drop dwave${running ? ' hot dwave' + i : ''}" d="${p}"/>`).join('') : '';
  return `<svg class="svg s-${state}${swayClass}" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">
    <defs><clipPath id="drum"><circle cx="${d.cx}" cy="${d.cy}" r="${d.r}"/></clipPath></defs>
    <g clip-path="url(#drum)">${inside}</g>
    <path class="frame" d="${a.frame}" fill-rule="evenodd"/>
    ${waves}
    ${overlay}
  </svg>`;
}

function vacuumSvg(state, variant, size) {
  const running = state === 'washing' || state === 'returning';
  const warm = state === 'returning';
  const swayClass = state === 'washing' && variant === 'sway' ? ' sway' : '';
  let arc = '';
  let overlay = '';
  if (running) {
    arc = `<circle class="${warm ? 'vring slow rev' : 'vring'}" cx="12" cy="12" r="9" fill="none" stroke="${warm ? '#ffb454' : '#3b9cff'}" stroke-width="1.7" stroke-dasharray="17 40" stroke-linecap="round"/>`;
  } else if (state === 'error') {
    overlay = '<path d="M12,10.2 V13 M12,14.5 V14.6" fill="none" stroke="var(--card-background-color,#1c1c1c)" stroke-width="1.4" stroke-linecap="round"/>';
  } else if (state === 'paused') {
    overlay = '<path d="M10.6,10.6 V13.6 M13.4,10.6 V13.6" fill="none" stroke="var(--card-background-color,#1c1c1c)" stroke-width="1.3" stroke-linecap="round"/>';
  }
  return `<svg class="svg s-${state}${swayClass}" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">
    <path class="frame" d="${VACUUM_RING}" fill-rule="evenodd"/>
    ${arc}
    <path class="frame vbody" d="${state === 'error' || state === 'paused' ? VACUUM_BODY_SOLID : VACUUM_BODY}" fill-rule="evenodd"/>
    ${overlay}
  </svg>`;
}

function mowerSvg(state, variant, size) {
  const running = state === 'washing' || state === 'returning';
  const warm = state === 'returning';
  const col = warm ? '#ffb454' : '#4cd08a';
  const swayClass = state === 'washing' && variant === 'sway' ? ' sway' : '';
  let wheel = '';
  let overlay = '';
  let light = '';
  if (running) {
    wheel = `<circle cx="6" cy="14" r="3" fill="${col}" opacity=".22"/><g class="spokes"><path d="M6,14 V11.4 M6,14 L8.25,15.3 M6,14 L3.75,15.3" fill="none" stroke="${warm ? '#fff1d6' : '#c9f7dc'}" stroke-width="1" stroke-linecap="round"/></g>`;
    light = `<path class="blink" d="M15,10 V12 H20.25 C19.92,11.27 19.5,10.6 19,10 Z" fill="${col}"/>`;
  } else if (state === 'error') {
    wheel = '<circle cx="6" cy="14" r="3" fill="#f44336" opacity=".25"/>';
    overlay = '<path d="M10.8,6.8 V10.4 M10.8,12 V12.1" fill="none" stroke="var(--card-background-color,#1c1c1c)" stroke-width="1.6" stroke-linecap="round"/>';
  } else if (state === 'paused') {
    overlay = '<path d="M9.4,7 V11 M12.4,7 V11" fill="none" stroke="var(--card-background-color,#1c1c1c)" stroke-width="1.5" stroke-linecap="round"/>';
  } else if (state === 'idle') {
    light = '<path class="blink slowglow" d="M15,10 V12 H20.25 C19.92,11.27 19.5,10.6 19,10 Z" fill="#4cd08a"/>';
  }
  const bob = running ? ' bob' : '';
  return `<svg class="svg s-${state}${swayClass}" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">
    <g class="mowbody${bob}">
      ${wheel}
      <path class="frame" d="${MOWER_PATH}" fill-rule="evenodd"/>
      ${light}
      ${overlay}
    </g>
  </svg>`;
}

function iconSvg(appliance, state, variant, size) {
  if (appliance === 'vacuum') return vacuumSvg(state, variant, size);
  if (appliance === 'mower') return mowerSvg(state, variant, size);
  if (appliance === 'dryer') return dryerSvg(state, variant, size);
  if (appliance === 'washer') return washerSvg(state, variant, size);
  const a = APPLIANCES[appliance] || APPLIANCES.dishwasher;
  const w = a.window;
  const swayClass = state === 'washing' && variant === 'sway' ? ' sway' : '';
  let overlay = '';
  if (state === 'finished') {
    overlay = '<path class="check" d="M8.4,14 L11.2,16.8 L15.8,11" fill="none" stroke="var(--mdi-anim-success,#4cd08a)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>';
  } else if (state === 'error') {
    overlay = '<path class="alert" d="M12,10.5 V15 M12,17 V17.2" fill="none" stroke="var(--mdi-anim-error-contrast,#ffd0cc)" stroke-width="1.6" stroke-linecap="round"/>';
  } else if (state === 'paused') {
    overlay = '<path d="M10,11 V17 M14,11 V17" fill="none" stroke="var(--mdi-anim-warning,#ffa600)" stroke-width="1.6" stroke-linecap="round"/>';
  } else if (state === 'delayed') {
    overlay = '<circle cx="12" cy="14" r="3.4" fill="none" stroke="var(--secondary-text-color)" stroke-width="1"/><path d="M12,12 V14 L13.4,14.8" fill="none" stroke="var(--secondary-text-color)" stroke-width=".9" stroke-linecap="round"/>';
  }
  const showDrop = !['finished', 'error', 'paused', 'delayed'].includes(state);
  return `<svg class="svg s-${state}${swayClass}" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">
    <defs><clipPath id="win"><rect x="${w.x}" y="${w.y}" width="${w.w}" height="${w.h}"/></clipPath></defs>
    <g clip-path="url(#win)">${windowContent(variant, state)}</g>
    <path class="frame" d="${a.frame}" fill-rule="evenodd"/>
    ${showDrop ? `<path class="drop" d="${a.drop}"/>` : ''}
    ${overlay}
  </svg>`;
}

const STYLE = `
:host { display: block; }
ha-card { height: 100%; overflow: hidden; cursor: pointer; }
.wrap { display: flex; align-items: center; gap: 14px; padding: 12px 16px; box-sizing: border-box; }
.wrap.vertical { flex-direction: column; text-align: center; padding: 16px; }
.icon { flex: 0 0 auto; display: flex; }
.txt { min-width: 0; flex: 1 1 auto; }
.name { font-size: 13px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.state { font-size: 22px; font-weight: 500; line-height: 1.2; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sub { font-size: 13px; color: var(--secondary-text-color); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.bar { height: 4px; background: var(--divider-color, rgba(127,127,127,.25)); }
.bar > i { display: block; height: 100%; background: var(--mdi-anim-accent, #3b9cff); transition: width .6s ease; }
.card-error { padding: 12px 16px; color: var(--error-color); }

.svg { overflow: visible; display: block; }
.svg .frame { fill: var(--secondary-text-color); transition: fill .4s; }
.svg .drop { fill: var(--secondary-text-color); transition: fill .4s; }
.svg.s-washing .frame, .svg.s-washing .drop, .svg.s-spinning .frame, .svg.s-spinning .drop { fill: var(--primary-text-color); }
.svg.s-drying .frame, .svg.s-drying .drop { fill: #ffcf8a; }
.svg.s-finished .frame { fill: #9be0b8; }
.svg.s-error .frame { fill: var(--mdi-anim-error, #f44336); }
.svg.s-paused .frame { fill: var(--mdi-anim-warning, #ffa600); }
.svg.s-unavailable { opacity: .35; }
.svg.sway .frame, .svg.sway .drop { fill: #7fc0ff; }
.svg.sway { animation: sway 1.2s ease-in-out infinite; transform-origin: 50% 75%; filter: drop-shadow(0 0 3px #3b9cff); }

.wave1 { animation: wv 1.4s linear infinite; }
.wave2 { animation: wv2 2.1s linear infinite; }
.bub { animation: rise 2.2s ease-in infinite; }
.bub1 { animation-delay: .4s; } .bub2 { animation-delay: 1s; } .bub3 { animation-delay: .2s; animation-duration: 2.6s; } .bub4 { animation-delay: 1.4s; } .bub5 { animation-delay: .8s; }
.tint { animation: pulse 2s ease-in-out infinite; }
.drp { animation: fall .9s linear infinite; }
.drp1 { animation-delay: .15s; } .drp2 { animation-delay: .3s; } .drp3 { animation-delay: .45s; } .drp4 { animation-delay: .6s; } .drp5 { animation-delay: .75s; } .drp6 { animation-delay: .2s; } .drp7 { animation-delay: .5s; } .drp8 { animation-delay: .7s; }
.steam { animation: steam 2s ease-out infinite; } .steam1 { animation-delay: .6s; } .steam2 { animation-delay: 1.2s; }
.check { stroke-dasharray: 20 20; animation: draw 2.4s ease-out infinite; }
.alert { animation: pulse 1.4s ease-in-out infinite; }
.half { transform-origin: 12px 14px; }
.glow { animation: glow 2.4s ease-in-out infinite; }
.orbit { transform-origin: 12px 14px; animation: tumble 3s ease-in-out infinite alternate; }
.drop.hot { fill: #ffb454; animation: heatwave 1.8s ease-in-out infinite; }
.drop.dwave1 { animation-delay: .6s; }
.svg.s-washing .drop.hot, .svg.s-drying .drop.hot { fill: #ffb454; }
.svg.s-returning .frame { fill: #ffcf8a; }
.svg.s-washing .vbody { fill: #8fd0ff; animation: pulse2 1.8s ease-in-out infinite; }
.svg.s-returning .vbody { fill: #ffcf8a; animation: pulse2 2.6s ease-in-out infinite; }
.svg.s-idle .vbody { fill: #9be0b8; }
.vring { transform-origin: 12px 12px; animation: spin 2.2s linear infinite; }
.vring.slow { animation-duration: 4s; }
.vring.rev { animation-direction: reverse; }
.slowglow { animation: glowslow 3.2s ease-in-out infinite; }
.spokes { transform-origin: 6px 14px; animation: spin 1.1s linear infinite; }
.blink { animation: pulse 1.4s ease-in-out infinite; }
.mowbody.bob { animation: bob .5s ease-in-out infinite alternate; }
.half.tumble { animation: tumble 2.4s ease-in-out infinite alternate; }
.half.spinfast { animation: spin 0.45s linear infinite; }
.ring { transform-origin: 12px 14px; animation: spin 0.9s linear infinite; }
.wm-water { animation: ww 1.6s linear infinite; }

@keyframes bob { from { transform: translateY(0); } to { transform: translateY(-.35px); } }
@keyframes pulse2 { 50% { opacity: .82; } }
@keyframes glowslow { 50% { opacity: .35; } }
@keyframes glow { 50% { opacity: .08; } }
@keyframes heatwave { 0%, 100% { transform: translateY(1.1px); opacity: .55; } 50% { transform: translateY(-.9px); opacity: 1; } }
@keyframes tumble { from { transform: rotate(-70deg); } to { transform: rotate(200deg); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes ww { from { transform: translateX(0); } to { transform: translateX(6px); } }
@keyframes wv { from { transform: translateX(0); } to { transform: translateX(12px); } }
@keyframes wv2 { from { transform: translateX(0); } to { transform: translateX(-12px); } }
@keyframes rise { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: .95; } 100% { transform: translateY(-11px); opacity: 0; } }
@keyframes pulse { 50% { opacity: .12; } }
@keyframes fall { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 1; } 100% { transform: translateY(11px); opacity: 0; } }
@keyframes sway { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-1px) rotate(3deg); } 60% { transform: translateY(-1px) rotate(-3deg); } }
@keyframes steam { 0% { transform: translateY(2px); opacity: 0; } 30% { opacity: .9; } 100% { transform: translateY(-9px); opacity: 0; } }
@keyframes draw { 0% { stroke-dasharray: 0 20; } 40%, 100% { stroke-dasharray: 20 20; } }

@media (prefers-reduced-motion: reduce) {
  .svg, .svg * { animation: none !important; }
  .check { stroke-dasharray: none; }
}
`;

/* ---------- the card ---------- */
const Base = typeof HTMLElement !== 'undefined' ? HTMLElement : class {};

class MdiAnimatedCard extends Base {
  static getStubConfig(hass) {
    const ent = Object.keys(hass?.states || {}).find((e) => /^sensor\..*(dishwasher|zmywark).*(operation|state)/i.test(e))
      || Object.keys(hass?.states || {}).find((e) => /dishwasher|zmywark/i.test(e));
    return { type: 'custom:mdi-animated-card', appliance: 'dishwasher', entity: ent || '', variant: 'wave' };
  }
  static getConfigElement() { return document.createElement('mdi-animated-card-editor'); }

  setConfig(config) {
    if (!config || !config.entity) throw new Error('mdi-animated-card: "entity" is required');
    const appliance = config.appliance || 'dishwasher';
    if (!APPLIANCES[appliance]) throw new Error(`mdi-animated-card: unsupported appliance "${appliance}" (supported: ${Object.keys(APPLIANCES).join(', ')})`);
    const def = APPLIANCES[appliance];
    if (config.variant && !def.variants.includes(config.variant)) throw new Error(`mdi-animated-card: unknown variant "${config.variant}" for ${appliance} (use ${def.variants.join(', ')})`);
    this._config = { appliance, variant: def.defaultVariant, layout: 'horizontal', icon_size: 72, show_progress: true, show_finish_time: true, ...config };
    this._sig = null;
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() { return this._config?.layout === 'vertical' ? 3 : 2; }
  getGridOptions() { return { columns: 6, rows: 2, min_columns: 3, min_rows: 1 }; }

  _lang() {
    const l = (this._config.language || this._hass?.locale?.language || this._hass?.language || 'en').toLowerCase();
    return l.startsWith('pl') ? 'pl' : 'en';
  }

  _compute() {
    const c = this._config, h = this._hass;
    const st = h?.states?.[c.entity];
    const domain = c.entity.split('.')[0];
    const progStateObj = c.progress_entity ? h?.states?.[c.progress_entity] : null;
    const progress = progStateObj ? Number(progStateObj.state) : NaN;
    const state = st ? normalizeState(st.state, domain, c, progress) : 'unavailable';
    const finStateObj = c.finish_entity ? h?.states?.[c.finish_entity] : null;
    const finish = finStateObj && !['unknown', 'unavailable', ''].includes(finStateObj.state) ? finStateObj.state : null;
    return { st, state, progress, finish, raw: st?.state };
  }

  _render() {
    if (!this._config || !this.shadowRoot) return;
    const v = this._compute();
    const lang = this._lang();
    const name = this._config.name ?? v.st?.attributes?.friendly_name ?? LABELS[lang][this._config.appliance];
    const sig = JSON.stringify([v.state, v.raw, this._hass?.states?.[this._config.battery_entity]?.state, v.st?.attributes?.battery_level, Number.isFinite(v.progress) ? Math.round(v.progress) : null, v.finish, v.st?.last_changed, name, lang, this._config]);
    if (sig === this._sig) return;
    this._sig = sig;

    const L = LABELS[lang];
    const c = this._config;
    let sub = '';
    const robot = c.appliance === 'vacuum' || c.appliance === 'mower';
    if (robot) {
      const bs = c.battery_entity ? this._hass?.states?.[c.battery_entity] : null;
      const bv = bs ? Number(bs.state) : Number(v.st?.attributes?.battery_level);
      if (Number.isFinite(bv) && v.state !== 'unavailable') sub = `${L.battery} ${Math.round(bv)}%`;
    } else if (v.state === 'washing' || v.state === 'drying' || v.state === 'spinning') {
      const parts = [];
      if (c.show_progress && Number.isFinite(v.progress)) parts.push(`${Math.round(v.progress)}%`);
      if (c.show_finish_time && v.finish) {
        const d = new Date(v.finish);
        if (!isNaN(d) && d.getTime() > Date.now()) {
          parts.push(`${L.until} ${d.toLocaleTimeString(this._hass?.locale?.language || lang, { hour: '2-digit', minute: '2-digit' })}`);
        }
      }
      if (!v.finish && c.show_finish_time && v.st?.last_changed && SWITCH_DOMAINS.includes(c.entity.split('.')[0])) {
        const d = new Date(v.st.last_changed);
        if (!isNaN(d)) parts.push(`${L.since} ${d.toLocaleTimeString(this._hass?.locale?.language || lang, { hour: '2-digit', minute: '2-digit' })}`);
      }
      sub = parts.join(' · ');
    }
    const showBar = !robot && c.show_progress && Number.isFinite(v.progress) && (v.state === 'washing' || v.state === 'drying' || v.state === 'spinning');
    const label = v.state === 'unavailable' ? L.unavailable : robot && v.state === 'washing' ? L['run_' + c.appliance] : robot && v.state === 'idle' ? L.docked : (v.state === 'washing' && c.appliance === 'washer' ? L.washing_washer : (v.state === 'washing' || v.state === 'drying') && c.appliance === 'dryer' ? L.run_dryer : L[v.state]);
    const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
    this.shadowRoot.innerHTML = `
      <style>${STYLE}</style>
      <ha-card>
        <div class="wrap ${c.layout === 'vertical' ? 'vertical' : ''}" role="button" tabindex="0">
          <div class="icon">${iconSvg(c.appliance, v.state, c.variant, Number(c.icon_size) || 72)}</div>
          <div class="txt">
            <div class="name">${esc(name)}</div>
            <div class="state">${esc(label)}</div>
            ${sub ? `<div class="sub">${esc(sub)}</div>` : ''}
          </div>
        </div>
        ${showBar ? `<div class="bar"><i style="width:${Math.max(0, Math.min(100, v.progress))}%"></i></div>` : ''}
      </ha-card>`;
    const card = this.shadowRoot.querySelector('.wrap');
    card.addEventListener('click', () => this._tap());
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._tap(); } });
  }

  _tap() {
    const tap = this._config.tap_action || { action: 'more-info' };
    this.dispatchEvent(new CustomEvent('hass-action', {
      bubbles: true, composed: true,
      detail: { config: { entity: this._config.entity, tap_action: tap }, action: 'tap' },
    }));
  }
}

/* ---------- visual editor ---------- */
class MdiAnimatedCardEditor extends Base {
  setConfig(config) { this._config = config; this._draw(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; }
  _schema() {
    return [
      { name: 'appliance', selector: { select: { mode: 'dropdown', options: Object.keys(APPLIANCES).map((v) => ({ value: v, label: v })) } } },
      { name: 'entity', required: true, selector: { entity: {} } },
      { name: 'name', selector: { text: {} } },
      { name: 'variant', selector: { select: { mode: 'dropdown', options: (APPLIANCES[this._config?.appliance]?.variants || APPLIANCES.dishwasher.variants).map((v) => ({ value: v, label: v })) } } },
      { name: 'progress_entity', selector: { entity: { domain: 'sensor' } } },
      { name: 'battery_entity', selector: { entity: { domain: 'sensor' } } },
      { name: 'finish_entity', selector: { entity: { domain: 'sensor' } } },
      { name: 'drying_from_progress', selector: { number: { min: 1, max: 100, step: 1, mode: 'box' } } },
      { name: 'layout', selector: { select: { mode: 'dropdown', options: [{ value: 'horizontal', label: 'horizontal' }, { value: 'vertical', label: 'vertical' }] } } },
      { name: 'show_progress', selector: { boolean: {} } },
      { name: 'show_finish_time', selector: { boolean: {} } },
    ];
  }
  _draw() {
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.computeLabel = (s) => ({
        appliance: 'Appliance', entity: 'Status entity (required)', name: 'Name', variant: 'Washing animation',
        progress_entity: 'Progress entity (optional, %)', battery_entity: 'Battery entity (robots, optional)', finish_entity: 'Finish time entity (optional)',
        drying_from_progress: 'Show drying from progress % (optional)', layout: 'Layout',
        show_progress: 'Show progress', show_finish_time: 'Show finish time',
      }[s.name] || s.name);
      this._form.addEventListener('value-changed', (ev) => {
        const cfg = { ...ev.detail.value };
        for (const k of Object.keys(cfg)) if (cfg[k] === '' || cfg[k] === undefined) delete cfg[k];
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: cfg }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = this._schema();
    this._form.data = { appliance: 'dishwasher', variant: (APPLIANCES[this._config?.appliance] || APPLIANCES.dishwasher).defaultVariant, layout: 'horizontal', show_progress: true, show_finish_time: true, ...this._config };
  }
}

if (typeof customElements !== 'undefined') {
if (!customElements.get('mdi-animated-card')) customElements.define('mdi-animated-card', MdiAnimatedCard);
if (!customElements.get('mdi-animated-card-editor')) customElements.define('mdi-animated-card-editor', MdiAnimatedCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === 'mdi-animated-card')) {
  window.customCards.push({
    type: 'mdi-animated-card',
    name: 'MDI Animated Appliances',
    description: 'Animated Material Design Icon of a household appliance driven by an entity (dishwasher, washing machine, tumble dryer, robot vacuum, robot mower).',
    preview: true,
    documentationURL: 'https://github.com/bglowacki/mdi-animated-appliances',
  });
}
console.info(`%c MDI-ANIMATED-APPLIANCES %c v${VERSION} `, 'color:#fff;background:#3b9cff;font-weight:700', 'color:#3b9cff;background:#fff');
}

export { normalizeState, STATE_WORDS, VARIANTS };
