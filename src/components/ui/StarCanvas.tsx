"use client"

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  collided: boolean;
};

type Explosion = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
      initStars();
    };

    let centerX = 0;
    let centerY = 0;

    /* ================= STARS ================= */
    const stars: Star[] = [];
    const STAR_COUNT = 700;

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width - centerX,
          y: Math.random() * canvas.height - centerY,
          z: Math.random() * canvas.width,
          r: Math.random() * 2.5 + 1.2
        });
      }
    };

    /* ================= PARTICLES ================= */
    const particles: Particle[] = [];

    const createParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 6 + Math.random() * 6;

      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 140 + Math.random() * 80,
        collided: false
      });
    };

    /* ================= EXPLOSIONS ================= */
    const explosions: Explosion[] = [];

    const createExplosion = (
      x: number,
      y: number,
      baseVx: number,
      baseVy: number
    ) => {
      const count = 12 + Math.floor(Math.random() * 10);

      for (let i = 0; i < count; i++) {
        const angle =
          Math.atan2(baseVy, baseVx) +
          (Math.random() - 0.5) * Math.PI;

        const speed = 2 + Math.random() * 4;

        explosions.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 40 + Math.random() * 30
        });
      }
    };

    /* ================= LOOP ================= */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Stars */
      ctx.fillStyle = "white";
      for (const s of stars) {
        const x = centerX + (s.x / s.z) * canvas.width;
        const y = centerY + (s.y / s.z) * canvas.height;
        const size = s.r * (1.3 - s.z / canvas.width);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        s.z -= 2;
        if (s.z <= 0) {
          s.z = canvas.width;
          s.x = Math.random() * canvas.width - centerX;
          s.y = Math.random() * canvas.height - centerY;
        }
      }

      /* Particles */
      if (Math.random() < 0.005) createParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const fade = 1 - p.life / p.maxLife;

        ctx.strokeStyle = `rgba(217,217,217,${fade})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
        ctx.stroke();

        if (!p.collided && Math.random() < 0.002) {
          p.collided = true;
          createExplosion(p.x, p.y, p.vx, p.vy);
        }

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife) particles.splice(i, 1);
      }

      /* Explosions */
      for (let i = explosions.length - 1; i >= 0; i--) {
        const e = explosions[i];
        const fade = 1 - e.life / e.maxLife;

        ctx.fillStyle = `rgba(217,217,217,${fade})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        e.x += e.vx;
        e.y += e.vy;
        e.life++;

        if (e.life > e.maxLife) explosions.splice(i, 1);
      }

      requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-screen"
    />
  );
}