(() => {
  'use strict';
  const local = new URLSearchParams(window.location.search);
  let params = local;
  if (!local.toString()) {
    try { if (window.parent && window.parent !== window) params = new URLSearchParams(window.parent.location.search); } catch (error) { /* Parent may be cross-origin. */ }
  }
  const rawIdentity = (params.get('e') || params.get('n') || '').trim().slice(0, 80);
  const identity = rawIdentity || 'Gasista';
  const cleanPhone = (params.get('t') || '1158055802').replace(/[\s\-()]/g, '');
  const whatsappPhone = `549${cleanPhone}`;
  const displayPhone = cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2-$3');
  const messages = {
    consulta: `Hola, soy ____. Me comunico desde la página de ${identity}. Quiero hacer una consulta de gasista.`,
    instalacion: `Hola, soy ____. Me comunico desde la página de ${identity}. Quiero consultar una instalación o conexión de gas. El equipo o espacio es ____.`,
    fuga: `Hola, soy ____. Me comunico desde la página de ${identity}. Necesito consultar una posible fuga o reparación de cañería. Ocurre desde ____ en ____.`,
    habilitacion: `Hola, soy ____. Me comunico desde la página de ${identity}. Quiero consultar una habilitación o certificación de gas para ____.`,
    mantenimiento: `Hola, soy ____. Me comunico desde la página de ${identity}. Quiero consultar una revisión o mantenimiento de una red de gas.`
  };
  document.querySelectorAll('[data-dynamic="logo"],[data-dynamic="footer-name"]').forEach((el) => { el.textContent = identity; });
  if (rawIdentity) { document.title = `${identity} | Instalaciones y reparaciones de gas`; }
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    const intent = link.dataset.intent || 'consulta';
    link.href = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(messages[intent] || messages.consulta)}`;
  });
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => { link.href = `tel:${cleanPhone}`; });
  document.querySelectorAll('[data-phone-display]').forEach((el) => { el.textContent = displayPhone; });

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const closeMenu = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const text = `Hola, soy ${name}. Mi teléfono es ${phone}. Me comunico desde la página de ${identity}.\n\n${message || 'Quiero hacer una consulta de gasista.'}`;
    window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
  document.getElementById('currentYear').textContent = new Date().getFullYear();
})();
