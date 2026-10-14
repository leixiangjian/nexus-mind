'use client'

import Link from 'next/link'

const MODULES = [
  { id: 'config',  name: '智慧配置中心', icon: '◈', color: '#60a5fa',
    desc: '大模型 · 虚拟系统 · 角色', detail: '配置智能体大模型、虚拟系统权限、机器人角色与工作机器人' },
  { id: 'task',    name: '工作任务',     icon: '📋', color: '#a78bfa',
    desc: 'Agent · MCP · Skills', detail: '创建 Agent 任务，配置 MCP 与 Skills' },
  { id: 'work',    name: '工作',         icon: '⚙', color: '#34d399',
    desc: '流程编排 · 测试', detail: '流程化编排任务节点，构建完整工作流' },
  { id: 'alloc',   name: '智能分配执行', icon: '⚡', color: '#fbbf24',
    desc: '流程图分配', detail: '根据任务角色匹配机器人，自动启动执行' },
  { id: 'monitor', name: '监控中心',     icon: '📡', color: '#22d3ee',
    desc: '实时轨迹 · 暂停', detail: '实时查看机器人工作轨迹，随时暂停或停止' },
  { id: 'report',  name: '报告大厅',     icon: '📊', color: '#14b8a6',
    desc: '进度 · 效率分析', detail: '查看工作进度、机器人状态与执行流水' },
]

export function AbilityRing() {
  const cx = 590, cy = 370, R = 300, n = MODULES.length
  return (
    <div className="absolute inset-0 pointer-events-none z-[6]">
      {MODULES.map((m, i) => {
        const ang = -Math.PI / 2 + i * (Math.PI * 2 / n)
        const x = cx + R * Math.cos(ang)
        const y = cy + R * Math.sin(ang)
        return (
          <Link
            key={m.id}
            href={`/${m.id === 'config' ? 'config' : m.id === 'task' ? 'tasks' : m.id === 'alloc' ? 'allocation' : m.id === 'monitor' ? 'monitor' : m.id === 'report' ? 'reports' : 'works'}`}
            className="absolute w-[230px] pointer-events-auto cursor-pointer rounded-xl p-3.5
                       bg-gradient-to-br from-slate-900/95 to-black/95 border
                       shadow-2xl overflow-hidden transition-all duration-300
                       hover:scale-[1.07] group"
            style={{
              left: x, top: y,
              transform: 'translate(-50%, -50%)',
              borderColor: `${m.color}66`,
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px]"
              style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }}
            />
            <div className="absolute top-2.5 right-3 text-[22px] font-extrabold font-mono text-white/10 leading-none">
              0{i + 1}
            </div>
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center text-base text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${m.color}, #3b82f680)`, boxShadow: `0 0 16px ${m.color}88` }}
              >
                {m.icon}
              </div>
              <div>
                <div className="text-[13px] font-bold text-white">{m.name}</div>
                <div className="text-[9.5px] mt-0.5 tracking-wider" style={{ color: `${m.color}cc` }}>{m.desc}</div>
              </div>
            </div>
            <div className="text-[10.5px] text-txt2 leading-snug">{m.detail}</div>
          </Link>
        )
      })}
    </div>
  )
}