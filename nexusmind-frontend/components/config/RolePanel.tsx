'use client'

import { useConfigStore } from '@/lib/stores/configStore'
import { toast } from '@/components/ui/Toast'

export function RolePanel() {
  const { roles, robots, vms, curRoleId, selectRole, createRole, deleteRole } = useConfigStore()
  const cur = roles.find((r) => r.id === curRoleId)
  const usedBy = cur ? robots.filter((b) => b.roleId === cur.id).length : 0

  return (
    <div className="flex-1 flex overflow-hidden">
      <aside className="w-[260px] shrink-0 border-r border-border bg-gradient-to-b from-panel/70 to-bg/85 flex flex-col">
        <div className="p-3.5 border-b border-border flex items-center gap-2 bg-bg/50">
          <div className="flex-1 text-[11.5px] font-bold">角色列表</div>
          <button onClick={createRole} className="w-6 h-6 rounded-md border border-border2 bg-panel2
                          text-txt2 hover:bg-tech/15 hover:text-tech-light transition">+</button>
        </div>
        <div className="flex-1 overflow-y-auto p-2.5">
          {roles.map((r) => (
            <div
              key={r.id}
              onClick={() => selectRole(r.id)}
              className={`p-2.5 rounded-[10px] border mb-1.5 cursor-pointer transition
                          ${curRoleId === r.id
                            ? 'border-tech/50 bg-gradient-to-b from-tech/10 to-panel2/70'
                            : 'border-border bg-panel2/50 hover:bg-panel3/75'}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-[7px] flex items-center justify-center text-[11px]"
                     style={{ background: `${r.color}22`, color: r.color }}>{r.icon}</div>
                <div className="flex-1 text-[11.5px] font-semibold truncate">{r.name}</div>
              </div>
              <div className="flex gap-2 text-[9.5px] text-txt3">
                <span>{r.ability}</span><span>{r.description}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="h-[42px] shrink-0 flex items-center gap-2.5 px-4 border-b border-border bg-bg/40">
          <span className="text-[11.5px] text-txt2">角色配置</span>
          <div className="ml-auto flex gap-1.5">
            <button className="btn btn-sm btn-primary" disabled={!cur} onClick={() => toast('已保存', 'ok')}>保存</button>
            <button className="btn btn-sm btn-danger" disabled={!cur || usedBy > 0}
                    onClick={() => { if (cur) { deleteRole(cur.id); toast('已删除', 'ok') } }}>删除</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {!cur ? (
            <div className="text-center py-10 text-txt3">请选择或新建角色</div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="field"><label>角色名称</label><input defaultValue={cur.name} /></div>
                <div className="field"><label>能力标签</label><input defaultValue={cur.ability} /></div>
              </div>
              <div className="field">
                <label>绑定虚拟系统</label>
                <select defaultValue={cur.vmId ?? ''}>
                  {vms.map((v) => (
                    <option key={v.id} value={v.id}>{v.name} ({v.hostname})</option>
                  ))}
                </select>
              </div>
              <div className="field"><label>描述</label>
                <textarea rows={3} defaultValue={cur.description} />
              </div>
              <div className="card">
                <div className="flex items-center gap-2 text-[11.5px] font-bold mb-3">
                  <span className="w-1 h-1 rounded-full bg-tech shadow-[0_0_8px_#3b82f6]" />
                  角色预览
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-950/60 border border-border">
                  <div className="w-9 h-9 rounded-md flex items-center justify-center text-base"
                       style={{ background: `${cur.color}22`, color: cur.color }}>{cur.icon}</div>
                  <div>
                    <div className="text-[13px] font-bold">{cur.name}</div>
                    <div className="text-[10px] text-txt3 mt-0.5">{cur.ability} · {cur.description}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}