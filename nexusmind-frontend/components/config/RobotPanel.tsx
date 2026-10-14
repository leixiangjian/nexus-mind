'use client'

import { useConfigStore } from '@/lib/stores/configStore'
import { toast } from '@/components/ui/Toast'

export function RobotPanel() {
  const { robots, roles, createRobot, deleteRobot } = useConfigStore()
  const idle = robots.filter((b) => b.status === 'idle').length
  const busy = robots.length - idle

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-[42px] shrink-0 flex items-center gap-2.5 px-4 border-b border-border bg-bg/40">
        <span className="text-[11.5px] text-txt2">机器人列表</span>
        <div className="ml-auto flex gap-1.5 items-center">
          <span className="px-2 py-0.5 rounded-md text-[9.5px] font-semibold bg-green/10 text-green border border-green/20">
            空闲 {idle}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[9.5px] font-semibold bg-cyan/10 text-cyan border border-cyan/20">
            忙碌 {busy}
          </span>
          <button className="btn btn-sm btn-primary" onClick={() => { createRobot(); toast('已创建机器人', 'ok') }}>
            + 新建机器人
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
          {robots.map((b) => {
            const role = roles.find((r) => r.id === b.roleId)
            return (
              <div key={b.id} className="relative p-3.5 rounded-xl bg-gradient-to-b
                                          from-slate-800/85 to-slate-900/90 border border-border
                                          hover:border-tech/40 hover:-translate-y-0.5 transition group">
                <div className="absolute top-2.5 right-2.5 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button className="w-5 h-5 rounded-md flex items-center justify-center
                                     bg-panel2/85 border border-border2 text-txt3 text-[11px]"
                          onClick={() => toast('编辑机器人', 'info')}>✎</button>
                  <button className="w-5 h-5 rounded-md flex items-center justify-center
                                     bg-red-500/10 border border-red-500/30 text-red-300 text-[11px]"
                          onClick={() => {
                            if (b.status === 'busy') { toast('机器人忙碌中，不可删除', 'warn'); return }
                            deleteRobot(b.id); toast('已删除', 'ok')
                          }}>✕</button>
                </div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-9 h-9 rounded-md flex items-center justify-center text-base"
                       style={{ background: `${b.color}22`, color: b.color }}>🤖</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-bold">{b.name}</div>
                    <div className="text-[10px] text-txt3">{role ? `${role.icon} ${role.name}` : '未绑定角色'}</div>
                  </div>
                  <span className={`status-pill ${b.status}`} style={{ marginRight: 44 }}>
                    {b.status === 'idle' ? '空闲' : '忙碌'}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-txt3">
                  <span>已完成: <b className="text-txt">{b.totalTasks}</b></span>
                  <span>成功率: <b className="text-green">{b.successRate.toFixed(1)}%</b></span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}