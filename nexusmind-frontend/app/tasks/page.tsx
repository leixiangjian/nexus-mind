'use client'

import { useState } from 'react'
import { TASKS } from '@/lib/mocks/data'

export default function TasksPage() {
  const [curId, setCurId] = useState(TASKS[0]?.id ?? '')
  const cur = TASKS.find((t) => t.id === curId)

  return (
    <div className="flex-1 flex overflow-hidden">
      <aside className="w-[260px] shrink-0 border-r border-border bg-gradient-to-b from-panel/70 to-bg/85 flex flex-col">
        <div className="p-3.5 border-b border-border flex items-center gap-2 bg-bg/50">
          <div className="flex-1 text-[11.5px] font-bold">工作任务列表</div>
        </div>
        <div className="flex-1 overflow-y-auto p-2.5">
          {TASKS.map((t) => (
            <div key={t.id} onClick={() => setCurId(t.id)}
                 className={`p-2.5 rounded-[10px] border mb-1.5 cursor-pointer transition
                             ${curId === t.id ? 'border-tech/50 bg-gradient-to-b from-tech/10 to-panel2/70'
                                              : 'border-border bg-panel2/50 hover:bg-panel3/75'}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-[7px] flex items-center justify-center text-[11px]"
                     style={{ background: `${t.color}22`, color: t.color }}>{t.icon}</div>
                <div className="flex-1 text-[11.5px] font-semibold truncate">{t.name}</div>
                <span className={`status-pill ${t.status}`}>{t.status}</span>
              </div>
              <div className="flex gap-2 text-[9.5px] text-txt3">
                <span>{t.agentType}</span><span>{t.id}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="h-[42px] shrink-0 flex items-center gap-2.5 px-4 border-b border-border bg-bg/40">
          <span className="text-[11.5px] text-txt2">Agent 智能体配置</span>
          <div className="ml-auto flex gap-1.5">
            <button className="btn btn-sm btn-danger">删除</button>
            <button className="btn btn-sm btn-primary">测试验证</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {cur && (
            <>
              <div className="card">
                <div className="flex items-center gap-2 text-[11.5px] font-bold mb-3">
                  <span className="w-1 h-1 rounded-full bg-tech shadow-[0_0_8px_#3b82f6]" />
                  基础信息
                </div>
                <div className="field"><label>任务名称</label><input defaultValue={cur.name} /></div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="field"><label>Agent 类型</label><input defaultValue={cur.agentType} /></div>
                  <div className="field"><label>绑定角色</label><input defaultValue={cur.roleId ?? '-'} /></div>
                </div>
                <div className="field"><label>Prompt</label>
                  <textarea rows={3} defaultValue={cur.prompt} />
                </div>
              </div>

              <div className="card">
                <div className="flex items-center gap-2 text-[11.5px] font-bold mb-3">
                  <span className="w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                  MCP 工具引入
                  <span className="ml-auto text-[9.5px] text-txt3 font-mono">
                    {cur.mcp.filter((m) => m.enabled).length} / {cur.mcp.length} 启用
                  </span>
                </div>
                {cur.mcp.length === 0 ? (
                  <div className="text-[10.5px] text-txt3 py-2">暂无 MCP 工具</div>
                ) : cur.mcp.map((m) => (
                  <div key={m.id} className="flex items-center gap-2 p-2 rounded-md bg-panel2/60 border border-border mb-1.5">
                    <div className="w-6 h-6 rounded-md bg-amber-400/20 text-amber-400 flex items-center justify-center text-[11px]">🔌</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold">{m.name}</div>
                      <div className="text-[9.5px] text-txt3 font-mono">{m.url}</div>
                    </div>
                    <div className={`w-8 h-4 rounded-full relative transition ${m.enabled ? 'bg-gradient-to-r from-blue-600 to-tech' : 'bg-txt3/25'}`}>
                      <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${m.enabled ? 'left-4' : 'left-0.5'}`} />
                    </div>
                  </div>
                ))}
                <button className="btn btn-sm w-full mt-1.5 border-dashed">+ 添加 MCP 工具</button>
              </div>

              <div className="card">
                <div className="flex items-center gap-2 text-[11.5px] font-bold mb-3">
                  <span className="w-1 h-1 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
                  Skills 技能引入
                </div>
                {cur.skills.length === 0 ? (
                  <div className="text-[10.5px] text-txt3 py-2">暂无技能</div>
                ) : cur.skills.map((s) => (
                  <div key={s.id} className="flex items-center gap-2 p-2 rounded-md bg-panel2/60 border border-border mb-1.5">
                    <div className="w-6 h-6 rounded-md bg-pink-500/20 text-pink-400 flex items-center justify-center text-[11px]">✦</div>
                    <div className="flex-1">
                      <div className="text-[11px] font-semibold">{s.name}</div>
                      <div className="text-[9.5px] text-txt3">{s.description}</div>
                    </div>
                  </div>
                ))}
                <button className="btn btn-sm w-full mt-1.5 border-dashed">+ 添加技能</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}