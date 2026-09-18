(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const archive = document.querySelector('.experiments');
  if (innerWidth <= 860 || reduced) archive.setAttribute('data-sc-act', 'flow');
  ScrollCraft.mount(document.body);
  const steps = [
    ['iOS app', 'Start with a photographed problem or a written STEM question.'],
    ['pgvector · HNSW', 'A retrieval pipeline uses hybrid search to find relevant context for the explanation.'],
    ['Python · Manim', 'A dedicated rendering service produces the animated STEM explanation.'],
    ['Video explanation', 'The finished explanation returns to the app, ready to watch and revisit.']
  ];
  const buttons = [...document.querySelectorAll('[data-step]')];
  const lines = [...document.querySelectorAll('.trace-line')];
  let selected = 0, manual = false;
  function select(index, announce = true) {
    selected = index;
    buttons.forEach((button,i) => button.setAttribute('aria-pressed', String(i === index)));
    lines.forEach((line,i) => line.classList.toggle('complete', i < index));
    document.querySelector('#trace-tech').textContent = steps[index][0];
    const description = document.querySelector('#trace-description');
    description.setAttribute('aria-live', announce ? 'polite' : 'off');
    description.textContent = steps[index][1];
  }
  buttons.forEach((button, index) => button.addEventListener('click', () => { manual = true; select(index); }));
  const architecture = document.querySelector('.architecture');
  let queued = false;
  function update() {
    queued = false;
    if (reduced || manual) return;
    const box = architecture.getBoundingClientRect();
    if (box.top < innerHeight && box.bottom > 0) {
      const p = Math.max(0, Math.min(1, (innerHeight * .85 - box.top) / (innerHeight * .6)));
      const next = Math.min(3, Math.floor(p * 4));
      if (next !== selected) select(next, false);
    }
  }
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, {passive:true});
  document.querySelectorAll('.archive-item a,.archive-tail a').forEach(link => link.addEventListener('focus', () => {
    if (innerWidth <= 860 || reduced) return;
    const rail = document.querySelector('.archive-rail');
    const card = link.closest('article');
    const overflow = rail.scrollWidth - innerWidth;
    const fraction = Math.max(0,Math.min(1,(card.offsetLeft - 60) / overflow));
    scrollTo({top:archive.offsetTop + fraction * (archive.offsetHeight - innerHeight),behavior:'instant'});
  }));
})();
if(matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
  const scene=document.querySelector('.peyk-scene');
  scene.addEventListener('pointermove',e=>{const r=scene.getBoundingClientRect();scene.style.setProperty('--px',((e.clientX-r.left)/r.width-.5)*2);scene.style.setProperty('--py',((e.clientY-r.top)/r.height-.5)*2);},{passive:true});
  scene.addEventListener('pointerleave',()=>{scene.style.setProperty('--px',0);scene.style.setProperty('--py',0);});
}
