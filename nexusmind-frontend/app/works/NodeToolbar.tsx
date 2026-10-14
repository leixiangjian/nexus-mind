'use client'

import { TASKS } from '@/lib/mocks/data'

export function NodeToolbar() {
  return (
    <aside className="w-[230px] shrink-0 border-r border-border bg-gradient-to-b from-panel/85 to-bg/95 flex flex-col">
      <div className="p-3.5 border-b border-border shrink-0">
        <div className="text-[11.5px] font-bold mb-1">节点工具栏</div>
        <div className="text-[9.5px] text-txt3 leading-snug">拖拽节点到画布，构建工作流程</div>
      </div>
      <div className="flex-1 overflow-y-auto p-2.5">
        <div className="text-[9px] font-bold tracking-wider text-txt3 uppercase mb-2
                        pb-2 border-b border-border/60 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-sm bg-tech-light shadow-[0_0_6px_#60a5fa]" />
          任务节点
          <span className="ml-auto px-1.5 py-0.5 rounded-full bg-txt3/15 text-[8.5px] font-bold">{TASKS.length}</span>
        </div>
        {TASKS.map((t) => (
          <div
            key={t.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('application/nexusmind-task', t.id)
              e.dataTransfer.effectAllowed = 'move'
            }}
            className="flex items-center gap-2.5 p-2.5 rounded-lg border border-border
                       bg-panel2/50 mb-1.5 cursor-grab hover:bg-panel3/90 hover:translate-x-0.5
                       transition relative overflow-hidden before:absolute before:left-0 before:top-0
                       before:bottom-0 before:w-[3px] before:opacity-70"
            style={{ ['--i-color' as never]: t.color }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                 style={{ background: `${t.color}22`, color: t.color }}>{t.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold truncate">{t.name}</div>
              <div className="text-[8.5px] text-txt3 mt-0.5">{t.agentType}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2.5 border-t border-border text-[9px] text-txt3 leading-relaxed">
        <b>操作：</b><br />
        拖拽节点 → 添加到画布<br />
        拖动节点 → 移动位置<br />
        单击节点 → 查看属性
      </div>
    </aside>
  )
}