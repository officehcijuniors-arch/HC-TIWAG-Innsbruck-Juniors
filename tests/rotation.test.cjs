const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/js/index.js'), 'utf8');

async function start(settings, failure = false) {
  let loaded;
  const timeouts = [], intervals = [], requests = [];
  const pages = Array.from({ length: 14 }, () => {
    const frame = { dataset: { src: 'test.html' }, hasAttribute() { return this.src !== undefined; }, removeAttribute() { delete this.src; } };
    const video = { currentTime: 5, calls: 0, play() { this.calls++; return Promise.resolve(); } };
    return { active: false, frame, video, classList: { toggle(_, active) { this.owner.active = active; }, remove() { this.owner.active = false; } }, querySelector(selector) { return selector === 'video' ? video : frame; } };
  });
  pages.forEach(p => p.classList.owner = p);
  const table = { children: [], set innerHTML(_) { this.children = []; }, appendChild(child) { this.children.push(child); } };
  const context = {
    window: { addEventListener(_, cb) { loaded = cb; } },
    document: { querySelectorAll() { return pages; }, getElementById() { return table; }, createElement() { return {}; } },
    async fetch(url) { requests.push(url); if (failure) throw Error('offline'); return { ok: true, async json() { return settings; } }; },
    setTimeout(fn, ms) { timeouts.push({ fn, ms }); }, setInterval(fn, ms) { intervals.push({ fn, ms }); },
    location: { reload() {} }, console: { warn() {} }
  };
  vm.runInNewContext(source, context);
  await loaded();
  return { pages, timeouts, intervals, requests, table };
}

test('starts on first enabled page, retains durations and wraps rotation', async () => {
  const settings = JSON.parse(fs.readFileSync(path.join(root, 'settings.json')));
  const app = await start(settings);
  assert.deepEqual(app.requests, ['settings.json']);
  assert.equal(app.pages.findIndex(p => p.active), 0);
  assert.equal(app.timeouts[0].ms, 20000);
  const enabled = Object.keys(settings.pages).filter(k => settings.pages[k].enabled).map(k => Number(k) - 1);
  for (let step = 1; step <= enabled.length; step++) {
    app.timeouts[step - 1].fn();
    const current = enabled[step % enabled.length];
    assert.equal(app.pages.findIndex(p => p.active), current);
    assert.equal(app.timeouts[step].ms, settings.pages[current + 1].duration * 1000);
    assert.equal(app.pages[current].video.currentTime, 0);
  }
  assert.ok(app.intervals.some(timer => timer.ms === settings.reload * 60000));
});
test('empty enabled set has no active page or rotation timer', async () => {
  const app = await start({ pages: {}, reload: 0 });
  assert.equal(app.pages.some(p => p.active), false);
  assert.equal(app.timeouts.length, 0);
  assert.equal(app.intervals.length, 1); // table rotation only
});
test('fallback settings keep the display rotating when settings fail', async () => {
  const app = await start(null, true);
  assert.equal(app.pages[0].active, true);
  assert.equal(app.timeouts[0].ms, 15000);
  app.timeouts[0].fn();
  assert.equal(app.pages[1].active, true);
});
test('tables load immediately and cycle through all four age groups', async () => {
  const app = await start({ pages: {}, reload: 0 });
  const timer = app.intervals.find(t => t.ms === 10000);
  for (const name of ['U13', 'U15', 'U17', 'U20', 'U13']) {
    assert.equal(app.table.children[0].src, `pages/Tabelle_${name}.html`);
    timer.fn();
  }
});
test('restart frames are unloaded on exit and reloaded on return', async () => {
  const app = await start({ pages: { 7: { enabled: true, duration: 45 }, 14: { enabled: true, duration: 40 } }, reload: 0 });
  assert.equal(app.pages[6].frame.src, 'test.html');
  app.timeouts[0].fn();
  assert.equal(app.pages[6].frame.src, undefined);
  assert.equal(app.pages[13].frame.src, 'test.html');
  app.timeouts[1].fn();
  assert.equal(app.pages[6].frame.src, 'test.html');
});
