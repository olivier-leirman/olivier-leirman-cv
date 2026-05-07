// =====================================================================
// CV — Copy-to-clipboard for phone & email
// =====================================================================

(() => {
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
})();
