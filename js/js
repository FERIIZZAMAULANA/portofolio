const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
const themeBtn = document.getElementById('theme-btn');
const root = document.documentElement;

// Buka/tutup menu di HP
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Mode gelap/terang (pilihan diingat di browser)
function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  try { localStorage.setItem('tema', theme); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem('tema'); } catch (e) {}
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(saved || (prefersDark ? 'dark' : 'light'));

themeBtn.addEventListener('click', () => {
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Tahun otomatis di footer
document.getElementById('tahun').textContent = new Date().getFullYear();