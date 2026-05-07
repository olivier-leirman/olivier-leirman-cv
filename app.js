// =====================================================================
// CV — Mode toggle, copy-to-clipboard, download as PDF (print)
// =====================================================================

(() => {
  const html = document.documentElement;

  // ---------- Persisted state ----------
  const savedMode = localStorage.getItem('cv:mode') || 'light';
  const savedStyle = localStorage.getItem('cv:style') || 'hoh';
  setMode(savedMode);
  setStyle(savedStyle);

  // ---------- Mode toggle ----------
  document.querySelectorAll('[data-action="toggle-mode"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = html.dataset.mode === 'dark' ? 'light' : 'dark';
      setMode(next);
    });
  });

  function setMode(mode) {
    html.dataset.mode = mode;
    localStorage.setItem('cv:mode', mode);
  }

  // ---------- Style switcher ----------
  document.querySelectorAll('[data-set-style]').forEach((btn) => {
    btn.addEventListener('click', () => setStyle(btn.dataset.setStyle));
  });

  function setStyle(name) {
    html.dataset.style = name;
    localStorage.setItem('cv:style', name);
    document.querySelectorAll('[data-set-style]').forEach((b) => {
      b.setAttribute('aria-selected', b.dataset.setStyle === name ? 'true' : 'false');
    });
  }

  // ---------- Download PDF (print this page; pick "Save as PDF" in dialog) ----------
  document.querySelectorAll('[data-action="download-pdf"]').forEach((btn) => {
    btn.addEventListener('click', () => window.print());
  });

  // ---------- Copy to clipboard ----------
  const toast = document.querySelector('.toast');
  let toastT;
  function flashToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove('is-on'), 1600);
  }

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        flashToast(`Copied: ${text}`);
        btn.classList.add('is-copied');
        setTimeout(() => btn.classList.remove('is-copied'), 1200);
      } catch (e) {
        flashToast('Copy failed — select & copy manually');
      }
    });
  });

  // ---------- Keyboard shortcut: m toggles mode ----------
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input,textarea,button')) return;
    if (e.key.toLowerCase() === 'm') {
      const next = html.dataset.mode === 'dark' ? 'light' : 'dark';
      setMode(next);
    }
  });
})();
