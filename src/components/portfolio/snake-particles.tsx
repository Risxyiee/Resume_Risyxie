"use client";

import { useRef, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   Perlin noise (fast 2D)
   ═══════════════════════════════════════════════════════════ */
const PERM = new Uint8Array(512);
const GRAD: [number, number][] = [
  [1, 1], [-1, 1], [1, -1], [-1, -1],
  [1, 0], [-1, 0], [0, 1], [0, -1],
];
(function initPerm() {
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
})();

function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(a: number, b: number, t: number) { return a + t * (b - a); }

function noise2d(x: number, y: number) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = fade(xf);
  const v = fade(yf);
  const aa = PERM[PERM[X] + Y] & 7;
  const ab = PERM[PERM[X] + Y + 1] & 7;
  const ba = PERM[PERM[X + 1] + Y] & 7;
  const bb = PERM[PERM[X + 1] + Y + 1] & 7;
  const dot = (gi: number, dx: number, dy: number) => GRAD[gi][0] * dx + GRAD[gi][1] * dy;
  return lerp(
    lerp(dot(aa, xf, yf), dot(ba, xf - 1, yf), u),
    lerp(dot(ab, xf, yf - 1), dot(bb, xf - 1, yf - 1), u),
    v
  );
}

/* ═══════════════════════════════════════════════════════════
   Snake entity
   ═══════════════════════════════════════════════════════════ */
interface Snake {
  points: { x: number; y: number }[];
  segments: number;
  speed: number;
  noiseScale: number;
  noiseOffset: number;
  thickness: number;
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  headX: number;
  headY: number;
  vx: number;
  vy: number;
}

function createSnake(w: number, h: number): Snake {
  const segments = 80 + Math.floor(Math.random() * 100);
  const startX = Math.random() * w;
  const startY = Math.random() * h;
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.3 + Math.random() * 0.5;
  return {
    segments,
    speed,
    noiseScale: 0.002 + Math.random() * 0.003,
    noiseOffset: Math.random() * 1000,
    thickness: 0.8 + Math.random() * 1.5,
    hue: 30 + Math.random() * 18,        // gold range 30-48
    saturation: 50 + Math.random() * 25,  // 50-75%
    lightness: 45 + Math.random() * 20,   // 45-65%
    alpha: 0.06 + Math.random() * 0.12,
    headX: startX,
    headY: startY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    points: Array.from({ length: segments }, () => ({ x: startX, y: startY })),
  };
}

function updateSnake(s: Snake, time: number, w: number, h: number) {
  // Multi-octave noise for more organic movement
  const n1 = noise2d(
    s.headX * s.noiseScale + s.noiseOffset,
    s.headY * s.noiseScale + time * 0.00008
  );
  const n2 = noise2d(
    s.headX * s.noiseScale * 2.5 + s.noiseOffset + 100,
    s.headY * s.noiseScale * 2.5 + time * 0.00015
  );
  const angle = (n1 + n2 * 0.5) * Math.PI * 2.5;
  s.vx += Math.cos(angle) * 0.025;
  s.vy += Math.sin(angle) * 0.025;
  // Limit speed
  const mag = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
  if (mag > s.speed) {
    s.vx = (s.vx / mag) * s.speed;
    s.vy = (s.vy / mag) * s.speed;
  }
  s.headX += s.vx;
  s.headY += s.vy;
  // Wrap around edges with padding
  const pad = 150;
  if (s.headX < -pad) s.headX = w + pad;
  if (s.headX > w + pad) s.headX = -pad;
  if (s.headY < -pad) s.headY = h + pad;
  if (s.headY > h + pad) s.headY = -pad;
  // Shift points and set new head
  for (let i = 0; i < s.points.length - 1; i++) {
    s.points[i] = s.points[i + 1];
  }
  s.points[s.points.length - 1] = { x: s.headX, y: s.headY };
}

function drawSnake(ctx: CanvasRenderingContext2D, s: Snake) {
  const pts = s.points;
  if (pts.length < 3) return;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Draw smooth curve through points
  for (let i = 2; i < pts.length; i++) {
    const t = i / pts.length; // 0 = tail, 1 = head
    const alpha = t * t * s.alpha;
    const thickness = Math.max(0.1, t * s.thickness);

    const prev = pts[i - 1];
    const curr = pts[i];

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(curr.x, curr.y);
    ctx.strokeStyle = `hsla(${s.hue}, ${s.saturation}%, ${s.lightness}%, ${alpha})`;
    ctx.lineWidth = thickness;
    ctx.stroke();
  }

  // Brighter head segment with glow
  const head = pts[pts.length - 1];
  const preHead = pts[pts.length - 2];
  ctx.beginPath();
  ctx.moveTo(preHead.x, preHead.y);
  ctx.lineTo(head.x, head.y);
  ctx.strokeStyle = `hsla(${s.hue}, ${s.saturation + 10}%, ${s.lightness + 15}%, ${s.alpha * 2})`;
  ctx.lineWidth = s.thickness * 1.2;
  ctx.stroke();

  // Head glow dot
  const grad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 5);
  grad.addColorStop(0, `hsla(${s.hue}, ${s.saturation + 10}%, ${s.lightness + 20}%, ${s.alpha * 2.5})`);
  grad.addColorStop(1, `hsla(${s.hue}, ${s.saturation}%, ${s.lightness}%, 0)`);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(head.x, head.y, 5, 0, Math.PI * 2);
  ctx.fill();
}

/* ═══════════════════════════════════════════════════════════
   Canvas component — fixed to viewport, snakes roam freely
   ═══════════════════════════════════════════════════════════ */
const SNAKE_COUNT = 14;

export function SnakeParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakesRef = useRef<Snake[]>([]);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const animateRef = useRef<(ts: number) => void>();

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const init = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    snakesRef.current = Array.from({ length: SNAKE_COUNT }, () =>
      createSnake(w, h)
    );
  }, []);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const time = timestamp - startTimeRef.current;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // Fade trail — slow fade for longer trails
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "rgba(11, 10, 8, 0.045)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Update and draw each snake
      for (const snake of snakesRef.current) {
        updateSnake(snake, time, w, h);
        drawSnake(ctx, snake);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animateRef.current = animate;
    resize();
    init();
    rafRef.current = requestAnimationFrame(animate);
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [resize, init]);

  return (
    <canvas
      ref={canvasRef}
      className="snake-particles-canvas"
      aria-hidden="true"
    />
  );
}
