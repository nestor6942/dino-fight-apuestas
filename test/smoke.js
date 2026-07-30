const assert = require('node:assert/strict');

const urls = ['http://localhost:3000/', 'http://localhost:3000/overlay.html'];
(async () => {
  let ok = true;
  for (const u of urls) {
    try {
      const res = await fetch(u);
      console.log(`${u} -> ${res.status}`);
      if (res.status !== 200) ok = false;
    } catch (e) {
      console.error(`${u} -> ERROR`, e.message);
      ok = false;
    }
  }

  try {
    const res = await fetch('http://localhost:3000/overlay.html');
    const html = await res.text();
    assert.match(html, /id="fight-canvas"/);
    assert.match(html, /id="fb-status"/);
    assert.match(html, /id="player-name"/);
    assert.match(html, /id="overlay-mode-btn"/);
    assert.doesNotMatch(html, /let pearls = 1000;/);
    console.log('overlay.html -> contenido de juego válido');
  } catch (e) {
    console.error('overlay.html -> ERROR', e.message);
    ok = false;
  }

  process.exitCode = ok ? 0 : 1;
})();
