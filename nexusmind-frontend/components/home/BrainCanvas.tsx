'use client'

import { useEffect, useRef } from 'react'

export function BrainCanvas({ thinking }: { thinking: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const thinkingRef = useRef(thinking)
  thinkingRef.current = thinking

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const W = 1180, H = 740
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    let raf = 0
    function draw(t: number) {
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2, cy = H / 2 - 10
      const faceW = 190, faceH = 250, bs = 9
      const time = t * 0.001
      const thinking = thinkingRef.current
      for (let r = 0; r < Math.ceil(faceH * 2 / bs); r++) {
        for (let c = 0; c < Math.ceil(faceW * 2 / bs); c++) {
          const bx = cx - faceW + c * bs + bs / 2
          const by = cy - faceH + r * bs + bs / 2
          const nx = (bx - cx) / faceW
          const ny = (by - cy) / faceH
          const d = nx * nx + ny * ny
          if (d > 1) continue
          const edge = 1 - Math.sqrt(d)
          const a = Math.min(1, edge * 4) * 0.85
          const w1 = Math.sin(time * 3 + c * 0.5 + r * 0.4) * 0.5 + 0.5
          const w2 = Math.sin(time * 5 - c * 0.3 + r * 0.6) * 0.5 + 0.5
          const amp = thinking ? 1 : 0.25
          const pulse = (w1 * 0.6 + w2 * 0.4) * amp
          const eyeDist1 = Math.hypot(bx - (cx - 55), by - (cy - 50))
          const eyeDist2 = Math.hypot(bx - (cx + 55), by - (cy - 50))
          const eyeGlow = Math.max(0, 1 - Math.min(eyeDist1, eyeDist2) / 50) * 0.7
          const bright = 0.35 + edge * 0.35 + pulse * 0.35 + eyeGlow
          const size = bs * (0.7 + pulse * 0.25)
          ctx.fillStyle = `hsla(${210 + pulse * 20}, 90%, ${35 + bright * 35}%, ${a})`
          ctx.shadowColor = `hsla(${210 + pulse * 20}, 100%, 65%, 0.85)`
          ctx.shadowBlur = 8 + eyeGlow * 10
          ctx.fillRect(bx - size / 2, by - size / 2, size, size)
          ctx.shadowBlur = 0
        }
      }
      const eyePulse = thinking ? Math.sin(time * 8) * 0.5 + 0.5 : 0.4
      ;[{ x: cx - 55, y: cy - 50 }, { x: cx + 55, y: cy - 50 }].forEach((e) => {
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, 45)
        g.addColorStop(0, `rgba(147,197,253,${0.55 + eyePulse * 0.45})`)
        g.addColorStop(0.4, `rgba(59,130,246,${0.25 + eyePulse * 0.25})`)
        g.addColorStop(1, 'rgba(59,130,246,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(e.x, e.y, 45, 0, Math.PI * 2)
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-[1180px] h-[740px] z-[4] drop-shadow-[0_0_30px_rgba(96,165,250,.4)] pointer-events-none" />
}