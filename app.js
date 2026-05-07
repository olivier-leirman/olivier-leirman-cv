// =====================================================================
// CV — Style switcher, mode toggle, copy-to-clipboard, print
// =====================================================================

(() => {
  const html = document.documentElement;

  // ---------- Persisted state ----------
  const saved = {
    style: localStorage.getItem('cv:style') || 'hoh',
    mode: localStorage.getItem('cv:mode') || 'light',
  };
  setStyle(saved.style, false);
  setMode(saved.mode, false);

  // ---------- Style switcher ----------
  document.querySelectorAll('[data-set-style]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setStyle(btn.dataset.setStyle, true);
    });
  });

  function setStyle(name, animate) {
    if (animate) {
      // crossfade: fade body briefly to 0, swap attribute, fade back
      const stage = document.querySelector('.stage');
      if (stage) {
        stage.classList.add('is-swapping');
        setTimeout(() => {
          html.dataset.style = name;
          requestAnimationFrame(() => {
            stage.classList.remove('is-swapping');
          });
        }, 180);
      } else {
        html.dataset.style = name;
      }
    } else {
      html.dataset.style = name;
    }
    localStorage.setItem('cv:style', name);
    document.querySelectorAll('[data-set-style]').forEach((b) => {
      if (b.dataset.setStyle === name) b.setAttribute('data-active', '');
      else b.removeAttribute('data-active');
    });
  }

  // ---------- Mode toggle ----------
  document.querySelectorAll('[data-action="toggle-mode"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = html.dataset.mode === 'dark' ? 'light' : 'dark';
      setMode(next, true);
    });
  });

  function setMode(mode, animate) {
    html.dataset.mode = mode;
    localStorage.setItem('cv:mode', mode);
  }

  // ---------- Print ----------
  document.querySelectorAll('[data-action="print"]').forEach((btn) => {
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

  // ---------- Keyboard shortcuts: 1-5 cycle styles, m toggles mode ----------
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input,textarea,button')) return;
    const map = { '1': 'hoh', '2': 'editorial', '3': 'brutal', '4': 'glass', '5': 'flat' };
    if (map[e.key]) setStyle(map[e.key], true);
    if (e.key.toLowerCase() === 'm') {
      const next = html.dataset.mode === 'dark' ? 'light' : 'dark';
      setMode(next, true);
    }
  });
})();
