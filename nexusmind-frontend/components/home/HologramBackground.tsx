'use client'

import { useEffect, useRef } from 'react'

export function HologramBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1

    let W = 0, H = 0
    type F = { x: number; y: number; text: string; size: number; phase: number; speed: number }
    type P = { x: number; y: number; r: number; vx: number; vy: number; phase: number }
    let formulas: F[] = []
    let particles: P[] = []

    function resize() {
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      formulas = []
      particles = []
      const syms = ['∑', 'π', '∫', '√', '∞', 'Δ', 'θ', 'λ', 'Ω', '∂', '∇', 'f(x)', 'E=mc²', 'a²+b²=c²']
      for (let i = 0; i < 40; i++) {
        formulas.push({
          x: Math.random() * W, y: 40 + Math.random() * (H - 80),
          text: syms[Math.floor(Math.random() * syms.length)],
          size: 10 + Math.random() * 10,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0006 + Math.random() * 0.0008,
        })
      }
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.2 + 0.3,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let raf = 0
    function draw(t: number) {
      ctx.clearRect(0, 0, W, H)
      const bg = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, W * 0.75)
      bg.addColorStop(0, 'rgba(10,30,65,.55)')
      bg.addColorStop(0.5, 'rgba(5,18,42,.7)')
      bg.addColorStop(1, 'rgba(2,8,20,.95)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      ctx.strokeStyle = 'rgba(59,130,246,.08)'
      ctx.lineWidth = 0.5
      const gs = 60
      const off = (t * 0.008) % gs
      for (let x = -off; x < W; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = -off; y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      formulas.forEach((f) => {
        const pulse = (Math.sin(t * f.speed + f.phase) + 1) / 2
        const a = 0.15 + pulse * 0.35
        ctx.font = `400 ${f.size}px ui-monospace, monospace`
        ctx.fillStyle = `rgba(96,165,250,${a})`
        ctx.shadowColor = `rgba(59,130,246,${a * 0.8})`
        ctx.shadowBlur = 6
        ctx.fillText(f.text, f.x, f.y)
        ctx.shadowBlur = 0
      })

      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        const pulse = (Math.sin(t * 0.001 + p.phase) + 1) / 2
        const a = 0.2 + pulse * 0.5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * (0.8 + pulse * 0.6), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(147,197,253,${a})`
        ctx.shadowColor = 'rgba(96,165,250,0.9)'
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full z-[2] opacity-75 mix-blend-screen" />
}