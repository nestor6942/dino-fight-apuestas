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
  process.exit(ok ? 0 : 1);
})();
