"use client";

import { useRef, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   Lightning Background — electric bolts that follow the cursor
   ═══════════════════════════════════════════════════════════ */

interface Bolt {
  points: { x: number; y: number }[];
  alpha: number;
  life: number;
  maxLife: number;
  thickness: number;
 hue: number;
}

interface Branch {
  points: { x: number; y: number }[];
  alpha: number;
  thickness: number;
  hue: number;
}

/** Generate a lightning bolt from start to end with jitter */
function generateBolt(
  sx: number, sy: number,
  ex: number, ey: number,
  segments: number,
  jitter: number
): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [{ x: sx, y: sy }];
  const dx = ex - sx;
  const dy = ey - sy;
  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const bx = sx + dx * t + (Math.random() - 0.5) * jitter;
    const by = sy + dy * t + (Math.random() - 0.5) * jitter;
    pts.push({ x: bx, y: by });
  }
  pts.push({ x: ex, y: ey });
  return pts;
}

/** Generate sub-branches from a bolt */
function generateBranches(
  bolt: { x: number; y: number }[],
  count: number,
  length: number,
  jitter: number
): Branch[] {
  const branches: Branch[] = [];
  if (bolt.length < 4) return branches;
  for (let b = 0; b < count; b++) {
    const idx = 2 + Math.floor(Math.random() * (bolt.length - 4));
    const origin = bolt[idx];
    const angle = Math.random() * Math.PI * 2;
    const ex = origin.x + Math.cos(angle) * length;
    const ey = origin.y + Math.sin(angle) * length;
    const pts = generateBolt(origin.x, origin.y, ex, ey, 6, jitter * 0.6);
    branches.push({
      points: pts,
      alpha: 0.15 + Math.random() * 0.25,
      thickness: 0.3 + Math.random() * 0.6,
      hue: 35 + Math.random() * 15,
    });
  }
  return branches;
}

function drawBolt(
  ctx: CanvasRenderingContext2D,
  bolt: { x: number; y: number }[],
  alpha: number,
  thickness: number,
  hue: number,
  glow: boolean
) {
  if (bolt.length < 2) return;

  // Glow layer
  if (glow) {
    ctx.beginPath();
    ctx.moveTo(bolt[0].x, bolt[0].y);
    for (let i = 1; i < bolt.length; i++) {
      ctx.lineTo(bolt[i].x, bolt[i].y);
    }
    ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${alpha * 0.35})`;
    ctx.lineWidth = thickness * 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  // Core line
  ctx.beginPath();
  ctx.moveTo(bolt[0].x, bolt[0].y);
  for (let i = 1; i < bolt.length; i++) {
    ctx.lineTo(bolt[i].x, bolt[i].y);
  }
  ctx.strokeStyle = `hsla(${hue}, 75%, 65%, ${alpha})`;
  ctx.lineWidth = thickness;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();

  // Bright center
  ctx.beginPath();
  ctx.moveTo(bolt[0].x, bolt[0].y);
  for (let i = 1; i < bolt.length; i++) {
    ctx.lineTo(bolt[i].x, bolt[i].y);
  }
  ctx.strokeStyle = `hsla(${hue}, 40%, 90%, ${alpha * 0.7})`;
  ctx.lineWidth = thickness * 0.3;
  ctx.stroke();
}

/** Draw cursor glow */
function drawCursorGlow(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  hue: number,
  intensity: number
) {
  const r = 80 + intensity * 40;
  const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
  grad.addColorStop(0, `hsla(${hue}, 80%, 70%, ${0.06 + intensity * 0.04})`);
  grad.addColorStop(0.4, `hsla(${hue}, 70%, 55%, ${0.02 + intensity * 0.02})`);
  grad.addColorStop(1, `hsla(${hue}, 60%, 45%, 0)`);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

export function SnakeParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boltsRef = useRef<Bolt[]>([]);
  const branchesRef = useRef<Branch[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const prevMouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const frameCount = useRef(0);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onMouseMove = (e: MouseEvent) => {
      prevMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      prevMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: t.clientX, y: t.clientY, active: true };
    };
    const onTouchEnd = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    const animate = () => {
      frameCount.current++;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const active = mouseRef.current.active;

      // Clear
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Draw cursor glow
      if (active) {
        drawCursorGlow(ctx, mx, my, 38, 1);
      }

      // Generate new bolts near cursor
      if (active && frameCount.current % 2 === 0) {
        const speed = Math.sqrt(
          (mx - prevMouseRef.current.x) ** 2 +
          (my - prevMouseRef.current.y) ** 2
        );
        const boltCount = Math.min(3, 1 + Math.floor(speed / 20));

        for (let i = 0; i < boltCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 30 + Math.random() * 120;
          const ex = mx + Math.cos(angle) * dist;
          const ey = my + Math.sin(angle) * dist;
          const segments = 8 + Math.floor(Math.random() * 8);
          const jitter = 15 + Math.random() * 30;
          const pts = generateBolt(mx, my, ex, ey, segments, jitter);

          boltsRef.current.push({
            points: pts,
            alpha: 0.4 + Math.random() * 0.4,
            life: 0,
            maxLife: 12 + Math.floor(Math.random() * 16),
            thickness: 0.6 + Math.random() * 1.2,
            hue: 32 + Math.random() * 18,
          });

          // Branches
          if (Math.random() > 0.4) {
            const newBranches = generateBranches(pts, 1 + Math.floor(Math.random() * 2), 20 + Math.random() * 40, 12);
            branchesRef.current.push(...newBranches);
          }
        }
      }

      // Ambient bolts (even without cursor, occasional flickers)
      if (frameCount.current % 30 === 0 && !active) {
        const ax = Math.random() * w;
        const ay = Math.random() * h;
        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 80;
        const ex = ax + Math.cos(angle) * dist;
        const ey = ay + Math.sin(angle) * dist;
        const pts = generateBolt(ax, ay, ex, ey, 6, 10);
        boltsRef.current.push({
          points: pts,
          alpha: 0.15 + Math.random() * 0.15,
          life: 0,
          maxLife: 8 + Math.floor(Math.random() * 10),
          thickness: 0.3 + Math.random() * 0.5,
          hue: 35 + Math.random() * 12,
        });
      }

      // Draw & decay bolts
      for (let i = boltsRef.current.length - 1; i >= 0; i--) {
        const bolt = boltsRef.current[i];
        bolt.life++;
        const progress = bolt.life / bolt.maxLife;
        const fade = 1 - progress;
        // Regenerate jitter each frame for crackling effect
        if (bolt.life < bolt.maxLife - 2 && bolt.life % 2 === 0) {
          const pts = bolt.points;
          for (let j = 1; j < pts.length - 1; j++) {
            pts[j].x += (Math.random() - 0.5) * 6;
            pts[j].y += (Math.random() - 0.5) * 6;
          }
        }
        drawBolt(ctx, bolt.points, bolt.alpha * fade, bolt.thickness * fade, bolt.hue, true);
        if (bolt.life >= bolt.maxLife) boltsRef.current.splice(i, 1);
      }

      // Draw & decay branches
      for (let i = branchesRef.current.length - 1; i >= 0; i--) {
        const branch = branchesRef.current[i];
        branch.alpha *= 0.82;
        if (branch.alpha < 0.01) {
          branchesRef.current.splice(i, 1);
          continue;
        }
        drawBolt(ctx, branch.points, branch.alpha, branch.thickness, branch.hue, false);
      }

      // Cap arrays
      if (boltsRef.current.length > 40) boltsRef.current.splice(0, boltsRef.current.length - 40);
      if (branchesRef.current.length > 80) branchesRef.current.splice(0, branchesRef.current.length - 80);

      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [resize]);

  return (
    <canvas
      ref={canvasRef}
      className="snake-particles-canvas"
      aria-hidden="true"
    />
  );
}
