'use client'

import { useState } from 'react'
import { ModelPanel } from '@/components/config/ModelPanel'
import { VmPanel } from '@/components/config/VmPanel'
import { RolePanel } from '@/components/config/RolePanel'
import { RobotPanel } from '@/components/config/RobotPanel'

const TABS = [
  { id: 'model', label: '🧠 智能体大模型' },
  { id: 'vm',    label: '🌐 虚拟系统' },
  { id: 'role',  label: '🎭 机器人角色' },
  { id: 'bot',   label: '🤖 工作机器人' },
]

export default function ConfigPage() {
  const [tab, setTab] = useState('model')

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-14 shrink-0 flex items-center gap-3.5 px-5 border-b border-border
                      bg-gradient-to-b from-panel/60 to-bg/30 relative
                      after:absolute after:left-5 after:right-5 after:bottom-0 after:h-px
                      after:bg-gradient-to-r after:from-tech/40 after:to-transparent">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[15px]
                        bg-gradient-to-br from-tech/20 to-tech-light/10 border border-tech/35 text-tech-light">
          ◈
        </div>
        <div>
          <div className="text-sm font-bold">智慧配置中心</div>
          <div className="text-[10.5px] text-txt3 mt-0.5">配置智能体大模型、虚拟系统、机器人角色与工作机器人</div>
        </div>
      </div>

      <div className="h-[42px] shrink-0 flex gap-1.5 items-center px-5 border-b border-border bg-bg/40">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3.5 py-1.5 rounded-[7px] text-[11px] font-semibold transition border ${
              tab === t.id
                ? 'bg-tech/15 border-tech/40 text-tech-light'
                : 'border-transparent text-txt3 hover:bg-panel3/60 hover:text-txt2'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex overflow-hidden">
        {tab === 'model' && <ModelPanel />}
        {tab === 'vm' && <VmPanel />}
        {tab === 'role' && <RolePanel />}
        {tab === 'bot' && <RobotPanel />}
      </div>
    </div>
  )
}