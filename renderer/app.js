class CinematicMorph {
  constructor() {
    this.entity = document.getElementById('entity');
    this.core = document.getElementById('entityCore');
    this.glow = document.getElementById('entityGlow');
    this.text = document.getElementById('textContent');
    this.thinking = document.getElementById('thinkingContent');
    this.speaking = document.getElementById('speakingContent');
    this.ring = document.getElementById('ambientRing');
    this.particles = document.getElementById('particles');

    this.initParticles();
    this.startIntro();
  }

  initParticles() {
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 10 + 's';
      p.style.animationDuration = (8 + Math.random() * 8) + 's';
      this.particles.appendChild(p);
    }
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  setMode(mode) {
    this.entity.className = `entity ${mode}-mode`;
    if (mode !== 'text') this.text.classList.remove('visible');
  }

  setText(txt) {
    this.text.textContent = txt;
    this.setMode('text');
    requestAnimationFrame(() => this.text.classList.add('visible'));
  }

  triggerMorph() {
    this.entity.classList.add('morphing');
    setTimeout(() => this.entity.classList.remove('morphing'), 600);
  }

  async startIntro() {
    this.ring.classList.add('active');

    this.setText('WELCOME');
    await this.wait(2200);

    this.triggerMorph();
    this.text.classList.remove('visible');
    await this.wait(600);
    this.setText('TO');
    await this.wait(1800);

    this.triggerMorph();
    this.text.classList.remove('visible');
    await this.wait(600);
    this.setText('ANUBS');
    await this.wait(2500);

    this.triggerMorph();
    this.text.classList.remove('visible');
    await this.wait(800);
    this.setMode('orb');

    await this.wait(1500);
    this.mainLoop();
  }

  async mainLoop() {
    while (true) {
      this.setMode('orb');
      await this.wait(3000);

      this.triggerMorph();
      await this.wait(400);
      this.setMode('thinking');
      await this.wait(3500);

      this.triggerMorph();
      await this.wait(400);
      this.setMode('speaking');
      await this.wait(3500);

      this.triggerMorph();
      await this.wait(400);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CinematicMorph();

  document.getElementById('exitBtn').addEventListener('click', () => {
    window.electronAPI.closeWindow();
  });
});

