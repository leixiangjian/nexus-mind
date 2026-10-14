'use client'

import { useToastStore, type ToastType } from '@/lib/stores/toastStore'

const COLORS: Record<ToastType, string> = {
  ok: '#10e08a', warn: '#fbbf24', err: '#f43f5e', info: '#22d3ee',
}
const ICONS: Record<ToastType, string> = {
  ok: '✓', warn: '!', err: '✕', info: 'i',
}

export function ToastHost() {
  const toasts = useToastStore((s) => s.toasts)
  return (
    <div className="fixed top-[70px] right-5 z-[9999] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] text-xs
                     bg-panel3/95 border border-border2 text-txt shadow-2xl max-w-[380px]
                     animate-[toastIn_.3s_cubic-bezier(.2,.9,.3,1.3)]"
        >
          <span
            className="w-[18px] h-[18px] rounded-md flex items-center justify-center
                       text-[10px] font-extrabold shrink-0"
            style={{ background: `${COLORS[t.type]}22`, color: COLORS[t.type] }}
          >
            {ICONS[t.type]}
          </span>
          <span className="leading-relaxed">{t.message}</span>
        </div>
      ))}
    </div>
  )
}

export function toast(message: string, type: ToastType = 'ok') {
  useToastStore.getState().push(message, type)
}