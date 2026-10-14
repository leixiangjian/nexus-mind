'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useConfigStore } from '@/lib/stores/configStore'
import { cn } from '@/lib/utils/cn'

const MODULES = [
  { id: 'config',    name: '智慧配置中心', icon: '◈', href: '/config' },
  { id: 'task',      name: '工作任务',     icon: '📋', href: '/tasks' },
  { id: 'work',      name: '工作',         icon: '⚙', href: '/works' },
  { id: 'alloc',     name: '智能分配执行', icon: '⚡', href: '/allocation' },
  { id: 'monitor',   name: '监控中心',     icon: '📡', href: '/monitor' },
  { id: 'report',    name: '报告大厅',     icon: '📊', href: '/reports' },
]

export function TopBar() {
  const pathname = usePathname()
  const { models, vms, robots } = useConfigStore()

  return (
    <header
      className="h-[58px] shrink-0 flex items-center gap-3.5 px-5
                 border-b border-border bg-gradient-to-b from-panel/95 to-bg/90
                 backdrop-blur-xl z-50 relative
                 after:absolute after:left-0 after:right-0 after:bottom-[-1px]
                 after:h-px after:bg-gradient-to-r
                 after:from-transparent after:via-tech after:to-transparent
                 after:animate-scan-line"
    >
      <Link href="/" className="flex items-center gap-2.5 shrink-0 rounded-[10px] p-1 pr-2.5
                                 hover:bg-panel3/60 transition">
        <div className="w-[38px] h-[38px] relative flex items-center justify-center
                        before:absolute before:inset-[-3px] before:rounded-[13px]
                        before:border before:border-tech/50 before:animate-brain-ripple">
          <div className="w-[38px] h-[38px] rounded-[10px] bg-gradient-to-br from-tech/60 to-blue-700/20
                          flex items-center justify-center text-xl">🧠</div>
        </div>
        <div className="flex flex-col gap-px">
          <div className="text-[13px] font-bold tracking-[.3px] bg-gradient-to-r
                          from-txt via-tech to-tech-light bg-[length:300%_100%]
                          bg-clip-text text-transparent animate-text-flow">
            NexusMind 智慧大脑
          </div>
          <div className="text-[9px] text-txt3 tracking-[.6px] flex items-center gap-1">
            <span className="w-[5px] h-[5px] rounded-full bg-green shadow-[0_0_6px_#10e08a] animate-blink" />
            在线待命
          </div>
        </div>
      </Link>

      <nav className="flex gap-1 flex-1 h-10 items-center px-2.5 overflow-x-auto">
        {MODULES.map((m) => {
          const active = pathname?.startsWith(m.href)
          return (
            <Link
              key={m.id}
              href={m.href}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-semibold',
                'transition whitespace-nowrap border',
                active
                  ? 'bg-gradient-to-br from-tech/20 to-tech-light/10 border-tech/40 text-white shadow-[0_0_14px_rgba(59,130,246,.2)]'
                  : 'border-transparent text-txt3 hover:bg-panel3/60 hover:text-txt2',
              )}
            >
              <span>{m.icon}</span>
              <span>{m.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center gap-3.5 shrink-0 pl-3.5 border-l border-border h-9">
        <Stat label="大模型" value={models.length} color="text-cyan" />
        <Stat label="虚拟系统" value={vms.length} color="text-violet" />
        <Stat label="机器人" value={robots.length} color="text-amber" />
        <Stat label="运行中" value={0} color="text-green" />
      </div>
    </header>
  )
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col">
      <div className="text-[8px] text-txt3 tracking-[.5px]">{label}</div>
      <div className={`text-[11.5px] font-bold ${color}`}>{value}</div>
    </div>
  )
}