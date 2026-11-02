// Elemen DOM
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// --- 1. Navigasi Menu Mobile ---
function openMenu() {
  nav.classList.add('open');
  menuBtn.textContent = '✕';
  menuBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  nav.classList.remove('open');
  menuBtn.textContent = '☰';
  menuBtn.setAttribute('aria-expanded', 'false');
}

if (menuBtn && nav) {
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Tutup menu ketika salah satu link diklik
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Tutup menu ketika klik di luar navbar
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Tutup menu dengan tombol Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });
}

// --- 2. Fitur Ganti Tema (Dark / Light Mode Sesuai Toggle) ---
function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  const isDark = theme === 'dark';

  if (themeToggle) {
    themeToggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
    themeToggle.setAttribute(
      'title',
      isDark
        ? 'Mode Gelap Aktif (Klik untuk Mode Terang)'
        : 'Mode Terang Aktif (Klik untuk Mode Gelap)'
    );
  }

  try {
    localStorage.setItem('tema', theme);
  } catch (err) {
    // Abaikan jika localStorage dibatasi browser
  }
}

// Deteksi tema yang tersimpan atau preferensi sistem operasi
let savedTheme = null;
try {
  savedTheme = localStorage.getItem('tema');
} catch (err) {}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
// Default ke dark mode jika belum ada setting, agar langsung melihat tampilan seperti di gambar
const initialTheme = savedTheme || (prefersDark.matches ? 'dark' : 'dark');
setTheme(initialTheme);

if (themeToggle) {
  // Klik seluruh toggle untuk beralih mode
  themeToggle.addEventListener('click', (e) => {
    const currentTheme = root.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Navigasi Aksesibilitas Keyboard (Enter / Space)
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }
  });
}

// Dengarkan perubahan tema sistem secara dinamis jika belum ada preferensi manual
prefersDark.addEventListener('change', (e) => {
  let hasManualChoice = false;
  try {
    hasManualChoice = !!localStorage.getItem('tema');
  } catch (err) {}
  
  if (!hasManualChoice) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// --- 3. ScrollSpy: Highlight Navigasi Aktif Saat Scroll ---
function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });
window.addEventListener('DOMContentLoaded', updateActiveNavLink);

// --- 4. Tahun Otomatis di Footer ---
const tahunEl = document.getElementById('tahun');
if (tahunEl) {
  tahunEl.textContent = new Date().getFullYear();
}
