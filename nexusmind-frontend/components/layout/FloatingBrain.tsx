'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

export function FloatingBrain() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const dragRef = useRef({ active: false, sx: 0, sy: 0, ox: 0, oy: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const visible = pathname !== '/'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !visible || collapsed) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const W = 130, H = 130
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    let raf = 0
    function draw(t: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2, cy = H / 2
      const time = t * 0.001
      const bs = 5, fw = 42, fh = 54
      for (let r = 0; r < Math.ceil(fh * 2 / bs); r++) {
        for (let c = 0; c < Math.ceil(fw * 2 / bs); c++) {
          const bx = cx - fw + c * bs + bs / 2
          const by = cy - fh + r * bs + bs / 2
          const nx = (bx - cx) / fw, ny = (by - cy) / fh
          const d = nx * nx + ny * ny
          if (d > 1) continue
          const edge = 1 - Math.sqrt(d)
          const w = Math.sin(time * 4 + c * 0.7 + r * 0.5) * 0.5 + 0.5
          const pulse = w * 0.5
          const bright = 0.35 + edge * 0.4 + pulse * 0.35
          const size = bs * (0.75 + pulse * 0.25)
          ctx.fillStyle = `hsla(${210 + pulse * 20}, 90%, ${35 + bright * 35}%, ${Math.min(1, edge * 4) * 0.85})`
          ctx.shadowColor = 'rgba(96,165,250,0.9)'
          ctx.shadowBlur = 5
          ctx.fillRect(bx - size / 2, by - size / 2, size, size)
          ctx.shadowBlur = 0
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [visible, collapsed])

  if (!visible) return null

  const style: React.CSSProperties = pos
    ? { left: pos.x, top: pos.y, right: 'auto', transition: dragRef.current.active ? 'none' : undefined }
    : {}

  return (
    <div
      className={cn(
        'fixed right-5 top-[74px] z-[60] flex flex-col gap-2.5 transition-all duration-500',
        collapsed && 'w-11',
      )}
      style={style}
    >
      <button
        className="absolute top-2 right-2.5 w-5 h-5 rounded-md border border-border2
                   bg-panel2/80 text-txt3 text-[11px] z-10 hover:text-txt hover:border-tech"
        onClick={() => setCollapsed((v) => !v)}
      >
        {collapsed ? '🧠' : '◀'}
      </button>

      {!collapsed && (
        <>
          <div
            onMouseDown={(e) => startDrag(e, 'card')}
            className="p-3 rounded-[15px] border border-tech/40 bg-gradient-to-b from-slate-900 to-bg
                       shadow-2xl backdrop-blur-md animate-float cursor-grab active:cursor-grabbing select-none"
          >
            <div className="relative w-full h-[130px] flex items-center justify-center">
              <canvas ref={canvasRef} className="w-[130px] h-[130px] drop-shadow-[0_0_22px_rgba(96,165,250,.5)]" />
              <div className="absolute w-20 h-20 rounded-full border border-tech/35 animate-brain-ripple" />
            </div>
            <div className="text-[11.5px] font-bold text-center flex items-center justify-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-tech shadow-[0_0_8px_#3b82f6] animate-blink" />
              智慧大脑
            </div>
            <div className="text-[9.5px] text-txt3 text-center mt-0.5">正在指挥 · {pathname?.split('/')[1] || '主屏'}</div>
          </div>

          <div
            onMouseDown={(e) => startDrag(e, 'hint')}
            className="p-3 rounded-[13px] border border-tech/20 bg-gradient-to-b from-slate-900 to-bg
                       backdrop-blur-md shadow-lg relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tech to-transparent animate-scan-line" />
            <div className="text-[10px] font-bold text-tech-light tracking-[.5px] mb-1.5 uppercase flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-tech shadow-[0_0_6px_#3b82f6]" />
              大脑引导
            </div>
            <div className="text-[10.5px] text-txt2 leading-relaxed">
              <b className="text-white">当前模块</b>
              <br />
              点击左侧菜单切换功能
            </div>
          </div>
        </>
      )}
    </div>
  )

  function startDrag(e: React.MouseEvent, _tag: string) {
    if (e.target instanceof HTMLElement && e.target.textContent === '◀') return
    dragRef.current = { active: true, sx: e.clientX, sy: e.clientY, ox: pos?.x ?? 0, oy: pos?.y ?? 0 }
    const el = e.currentTarget as HTMLElement
    el.style.transition = 'none'
    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current.active) return
      setPos({ x: dragRef.current.ox + ev.clientX - dragRef.current.sx, y: dragRef.current.oy + ev.clientY - dragRef.current.sy })
    }
    const onUp = () => {
      dragRef.current.active = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }
}