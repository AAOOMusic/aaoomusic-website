'use strict';
(() => {
  document.getElementById('year').textContent = new Date().getFullYear();
  const releases = Array.isArray(window.AAOO_RELEASES) ? window.AAOO_RELEASES : [];
  if (!releases.length) return;
  const grid = document.getElementById('release-grid');
  const search = document.getElementById('release-search');
  const filters = [...document.querySelectorAll('[data-filter]')];
  let activeFilter = 'All';
  const safeURL = (value, allowRelative) => {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      return url.protocol === 'https:' || (allowRelative && url.origin === location.origin) ? url.href : null;
    } catch { return null; }
  };
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function render() {
    const query = search.value.trim().toLocaleLowerCase();
    const matches = releases.filter(release =>
      (activeFilter === 'All' || release.type === activeFilter) &&
      `${release.title} ${release.artist}`.toLocaleLowerCase().includes(query));
    grid.replaceChildren();
    matches.forEach(release => {
      const article = element('article', 'release-card');
      const url = safeURL(release.url, false);
      const wrapper = element(url ? 'a' : 'div');
      if (url) { wrapper.href = url; wrapper.setAttribute('aria-label', `Listen to ${release.title} by ${release.artist}`); }
      const cover = element('div', 'release-cover');
      const img = element('img');
      img.src = safeURL(release.artwork, true) || new URL('coral.webp', document.baseURI).href;
      img.alt = release.artworkAlt || `${release.title} cover artwork`;
      img.width = 1200; img.height = 1200; img.loading = 'lazy';
      cover.append(img);
      if (url) { const arrow = element('span', 'release-arrow', '↗'); arrow.setAttribute('aria-hidden', 'true'); cover.append(arrow); }
      wrapper.append(cover, element('h3', '', release.title), element('p', '', release.artist));
      const meta = element('div', 'release-meta');
      meta.append(element('span', '', release.type || 'Release'), element('span', '', release.date || ''));
      wrapper.append(meta); article.append(wrapper); grid.append(article);
    });
    document.getElementById('no-results').hidden = matches.length > 0;
    document.getElementById('result-count').textContent = `${matches.length} release${matches.length === 1 ? '' : 's'}`;
  }
  filters.forEach(button => {
    if (button.dataset.filter !== 'All' && !releases.some(r => r.type === button.dataset.filter)) button.hidden = true;
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      render();
    });
  });
  search.addEventListener('input', render);
  render();
  document.getElementById('forthcoming').hidden = true;
  document.getElementById('catalogue').hidden = false;
  document.getElementById('catalogue-label').textContent = 'The catalogue';
})();
