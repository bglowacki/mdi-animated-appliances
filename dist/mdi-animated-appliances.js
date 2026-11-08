/*!
 * MDI Animated Appliances – Home Assistant dashboard card
 * https://github.com/bglowacki/mdi-animated-appliances
 * MIT License. Icon geometry: Material Design Icons by Pictogrammers (Apache-2.0), see NOTICE.
 */
const VERSION = '0.1.0';

/* ---------- MDI "dishwasher" geometry (split so the drop can be swapped for a check) ---------- */
const DISHWASHER_FRAME =
  'M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M10,4A1,1 0 0,1 11,5A1,1 0 0,1 10,6A1,1 0 0,1 9,5A1,1 0 0,1 10,4M7,4A1,1 0 0,1 8,5A1,1 0 0,1 7,6A1,1 0 0,1 6,5A1,1 0 0,1 7,4M18,20H6V8H18V20';
const DISHWASHER_DROP =
  'M14.67,15.33C14.69,16.03 14.41,16.71 13.91,17.21C12.86,18.26 11.15,18.27 10.09,17.21C9.59,16.71 9.31,16.03 9.33,15.33C9.4,14.62 9.63,13.94 10,13.33C10.37,12.5 10.81,11.73 11.33,11L12,10C13.79,12.59 14.67,14.36 14.67,15.33';

const APPLIANCES = {
  dishwasher: { frame: DISHWASHER_FRAME, drop: DISHWASHER_DROP, window: { x: 6, y: 8, w: 12, h: 12 } },
};

const VARIANTS = ['wave', 'bubbles', 'drops', 'sway'];

/* ---------- state normalisation ---------- */
const STATE_WORDS = {
  washing: ['run', 'running', 'washing', 'wash', 'main_wash', 'mainwash', 'prewash', 'pre_wash', 'pre-wash', 'rinse', 'rinsing', 'in_progress', 'active'],
  drying: ['dry', 'drying', 'final_dry'],
  finished: ['finished', 'finish', 'end', 'ended', 'complete', 'completed', 'done', 'end_of_cycle'],
  paused: ['pause', 'paused'],
  delayed: ['delayedstart', 'delayed_start', 'delayed', 'scheduled'],
  error: ['error', 'actionrequired', 'action_required', 'aborting', 'fault', 'alarm'],
  idle: ['inactive', 'ready', 'idle', 'off', 'standby', 'none', 'initial', 'power_off', 'closed'],
};
const SWITCH_DOMAINS = ['switch', 'input_boolean', 'binary_sensor', 'fan', 'light'];

const LABELS = {
  en: { washing: 'Washing', drying: 'Drying', finished: 'Finished', paused: 'Paused', delayed: 'Delayed start', error: 'Needs attention', idle: 'Idle', unavailable: 'Unavailable', until: 'until', dishwasher: 'Dishwasher' },
  pl: { washing: 'Mycie', drying: 'Suszenie', finished: 'Zakończono', paused: 'Wstrzymano', delayed: 'Opóźniony start', error: 'Wymaga uwagi', idle: 'Gotowa', unavailable: 'Niedostępna', until: 'do', dishwasher: 'Zmywarka' },
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

function iconSvg(appliance, state, variant, size) {
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
.svg.s-washing .frame, .svg.s-washing .drop { fill: var(--primary-text-color); }
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
    if (config.variant && !VARIANTS.includes(config.variant)) throw new Error(`mdi-animated-card: unknown variant "${config.variant}" (use ${VARIANTS.join(', ')})`);
    this._config = { appliance, variant: 'wave', layout: 'horizontal', icon_size: 72, show_progress: true, show_finish_time: true, ...config };
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
    const sig = JSON.stringify([v.state, v.raw, Number.isFinite(v.progress) ? Math.round(v.progress) : null, v.finish, name, lang, this._config]);
    if (sig === this._sig) return;
    this._sig = sig;

    const L = LABELS[lang];
    const c = this._config;
    let sub = '';
    if (v.state === 'washing' || v.state === 'drying') {
      const parts = [];
      if (c.show_progress && Number.isFinite(v.progress)) parts.push(`${Math.round(v.progress)}%`);
      if (c.show_finish_time && v.finish) {
        const d = new Date(v.finish);
        if (!isNaN(d) && d.getTime() > Date.now()) {
          parts.push(`${L.until} ${d.toLocaleTimeString(this._hass?.locale?.language || lang, { hour: '2-digit', minute: '2-digit' })}`);
        }
      }
      sub = parts.join(' · ');
    }
    const showBar = c.show_progress && Number.isFinite(v.progress) && (v.state === 'washing' || v.state === 'drying');
    const label = v.state === 'unavailable' ? L.unavailable : L[v.state];
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
      { name: 'variant', selector: { select: { mode: 'dropdown', options: VARIANTS.map((v) => ({ value: v, label: v })) } } },
      { name: 'progress_entity', selector: { entity: { domain: 'sensor' } } },
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
        progress_entity: 'Progress entity (optional, %)', finish_entity: 'Finish time entity (optional)',
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
    this._form.data = { appliance: 'dishwasher', variant: 'wave', layout: 'horizontal', show_progress: true, show_finish_time: true, ...this._config };
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
    description: 'Animated Material Design Icon of a household appliance driven by an entity (dishwasher for now).',
    preview: true,
    documentationURL: 'https://github.com/bglowacki/mdi-animated-appliances',
  });
}
console.info(`%c MDI-ANIMATED-APPLIANCES %c v${VERSION} `, 'color:#fff;background:#3b9cff;font-weight:700', 'color:#3b9cff;background:#fff');
}

export { normalizeState, STATE_WORDS, VARIANTS };
