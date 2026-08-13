// ============================================================
// CONFIGURA AQUÍ tu número de WhatsApp de negocio (con indicativo, sin +, sin espacios)
// Ejemplo Colombia: "573001234567"
// ============================================================
const WHATSAPP_NUMBER = "573165341545";

// ============================================================
// 1. Cielo dinámico: la página "amanece" según el scroll
// ============================================================
const sky = document.getElementById('sky');
const stars = document.getElementById('stars');
const arcMarker = document.getElementById('arcMarker');
const nav = document.getElementById('nav');

// Paletas de cielo en el orden en que aparecen al hacer scroll
const skyStops = [
  [10, 15, 30],   // medianoche  (hero)
  [20, 27, 51],   // madrugada   (problema)
  [36, 30, 61],   // previo al alba (solución)
  [250, 245, 238],// amanecer -> día claro (funciones en adelante)
  [250, 248, 243] // día pleno
];

function lerp(a, b, t){ return a + (b - a) * t; }
function lerpColor(c1, c2, t){
  return [ Math.round(lerp(c1[0],c2[0],t)), Math.round(lerp(c1[1],c2[1],t)), Math.round(lerp(c1[2],c2[2],t)) ];
}

function updateSky(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = Math.min(Math.max(scrollTop / (docHeight * 0.55), 0), 1); // termina de aclarar a mitad de página

  const segments = skyStops.length - 1;
  const scaled = progress * segments;
  const idx = Math.min(Math.floor(scaled), segments - 1);
  const localT = scaled - idx;
  const color = lerpColor(skyStops[idx], skyStops[idx + 1], localT);
  sky.style.background = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

  // estrellas se desvanecen al amanecer
  stars.style.opacity = Math.max(1 - progress * 1.8, 0);

  // marcador se mueve por el arco y cambia de luna a sol
  const arcProgress = Math.min(scrollTop / (docHeight * 0.6), 1);
  arcMarker.style.left = (2 + arcProgress * 96) + '%';
  arcMarker.textContent = arcProgress > 0.55 ? '☀️' : '🌙';

  // nav se oscurece / aclara según el fondo
  if (progress > 0.5) {
    nav.classList.add('nav-light');
  } else {
    nav.classList.remove('nav-light');
  }

  // nav gana fondo con blur al hacer scroll
  if (scrollTop > 40) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { updateSky(); ticking = false; });
    ticking = true;
  }
});
updateSky();

// nav-light: ajustar color de texto del menú cuando el fondo es claro
const navStyle = document.createElement('style');
navStyle.textContent = `
  .nav-light .nav-links a{ color: rgba(20,22,31,0.75); }
  .nav-light .nav-links a:hover{ color: #14161F; }
  .nav-light .logo{ color:#14161F; }
`;
document.head.appendChild(navStyle);

// ============================================================
// 2. Menú móvil
// ============================================================
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navMobile.classList.remove('open');
  navToggle.setAttribute('aria-expanded', false);
}));

// ============================================================
// 3. Chat animado del hero (mockup de conversación)
// ============================================================
const conversation = [
  { side: 'in',  text: 'Hola, quisiera información sobre sus servicios.' },
  { side: 'out', text: '¡Hola! 👋 Claro, cuéntame qué servicio buscas y te doy toda la información.' },
  { side: 'in',  text: 'Quiero una cotización.' },
  { side: 'out', text: 'Perfecto. Te haré unas preguntas rápidas para preparar la mejor opción para ti.' },
];

const chatBody = document.getElementById('chatBody');
const typingDots = document.getElementById('typingDots');

async function playConversation(){
  chatBody.innerHTML = '';
  typingDots.hidden = true;
  for (const msg of conversation) {
    if (msg.side === 'out') {
      typingDots.hidden = false;
      await sleep(1100);
      typingDots.hidden = true;
    } else {
      await sleep(700);
    }
    const bubble = document.createElement('div');
    bubble.className = 'bubble ' + (msg.side === 'in' ? 'bubble-in' : 'bubble-out');
    bubble.textContent = msg.text;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  await sleep(3500);
  playConversation(); // loop
}
function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }
playConversation();

// Reloj del teléfono: cuenta minutos de madrugada para reforzar "trabaja 24/7"
const phoneClock = document.getElementById('phoneClock');
let clockMinutes = 47;
setInterval(() => {
  clockMinutes = (clockMinutes + 1) % 60;
  phoneClock.textContent = `2:${clockMinutes.toString().padStart(2,'0')} a.m.`;
}, 4000);

// ============================================================
// 4. Acordeón FAQ
// ============================================================
document.querySelectorAll('.acc-item').forEach(item => {
  const trigger = item.querySelector('.acc-trigger');
  const panel = item.querySelector('.acc-panel');
  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item.open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.acc-panel').style.maxHeight = null;
      }
    });
    if (isOpen) {
      item.classList.remove('open');
      panel.style.maxHeight = null;
    } else {
      item.classList.add('open');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

// ============================================================
// 5. Formulario -> abre WhatsApp con los datos prellenados
//    (la web es estática / GitHub Pages, no hay backend: este es
//    el punto de contacto real con el negocio)
// ============================================================
const leadForm = document.getElementById('leadForm');
leadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(leadForm);
  const nombre = data.get('nombre');
  const empresa = data.get('empresa');
  const whatsapp = data.get('whatsapp');
  const correo = data.get('correo');
  const tipo = data.get('tipo');
  const volumen = data.get('volumen');

  const mensaje =
`Hola, quiero acceso anticipado a NexoAI 🚀
Nombre: ${nombre}
Empresa: ${empresa}
WhatsApp: ${whatsapp}
Correo: ${correo}
Tipo de negocio: ${tipo}
Clientes al mes: ${volumen}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
});

// ============================================================
// 6. Botón flotante de WhatsApp: enlaza directo al chat de contacto
// ============================================================
const waFloat = document.getElementById('waFloat');
waFloat.addEventListener('click', (e) => {
  e.preventDefault();
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quiero saber más sobre NexoAI')}`, '_blank');
});

// ============================================================
// 7. Reveal suave de secciones al entrar en pantalla
// ============================================================
const revealTargets = document.querySelectorAll('.card-dark, .feature, .audience-card, .timeline-item, .step');
revealTargets.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => observer.observe(el));
