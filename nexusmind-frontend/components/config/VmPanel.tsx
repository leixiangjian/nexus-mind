'use client'

import { useConfigStore } from '@/lib/stores/configStore'
import { toast } from '@/components/ui/Toast'

export function VmPanel() {
  const { vms, roles, curVmId, selectVm, createVm, deleteVm } = useConfigStore()
  const cur = vms.find((v) => v.id === curVmId)
  const usedBy = cur ? roles.filter((r) => r.vmId === cur.id).length : 0

  return (
    <div className="flex-1 flex overflow-hidden">
      <aside className="w-[260px] shrink-0 border-r border-border bg-gradient-to-b from-panel/70 to-bg/85 flex flex-col">
        <div className="p-3.5 border-b border-border flex items-center gap-2 bg-bg/50">
          <div className="flex-1 text-[11.5px] font-bold">虚拟系统列表</div>
          <button onClick={createVm} className="w-6 h-6 rounded-md border border-border2 bg-panel2
                          text-txt2 hover:bg-tech/15 hover:text-tech-light transition">+</button>
        </div>
        <div className="flex-1 overflow-y-auto p-2.5">
          {vms.map((v) => (
            <div
              key={v.id}
              onClick={() => selectVm(v.id)}
              className={`p-2.5 rounded-[10px] border mb-1.5 cursor-pointer transition
                          ${curVmId === v.id
                            ? 'border-tech/50 bg-gradient-to-b from-tech/10 to-panel2/70'
                            : 'border-border bg-panel2/50 hover:bg-panel3/75'}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-[7px] flex items-center justify-center text-[11px] bg-blue-500/20 text-blue-400">🌐</div>
                <div className="flex-1 text-[11.5px] font-semibold truncate">{v.name}</div>
                <span className="status-pill passed">Ready</span>
              </div>
              <div className="flex gap-2 text-[9.5px] text-txt3">
                <span>{v.ipAddress}</span>
                <span>{v.spec}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="h-[42px] shrink-0 flex items-center gap-2.5 px-4 border-b border-border bg-bg/40">
          <span className="text-[11.5px] text-txt2">{cur ? `${cur.name} 配置` : '虚拟系统配置'}</span>
          <div className="ml-auto flex gap-1.5">
            <button className="btn btn-sm" disabled={!cur} onClick={() => toast('已复制', 'ok')}>复制</button>
            <button className="btn btn-sm btn-warn" disabled={!cur} onClick={() => toast('已切换状态', 'ok')}>
              {cur?.status === 'ready' ? '停用' : '启用'}
            </button>
            <button className="btn btn-sm btn-primary" disabled={!cur} onClick={() => toast('已保存', 'ok')}>保存</button>
            <button className="btn btn-sm btn-danger" disabled={!cur || usedBy > 0}
                    onClick={() => { if (cur) { deleteVm(cur.id); toast('已删除', 'ok') } }}>删除</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {!cur ? (
            <div className="text-center py-10 text-txt3">请选择或新建虚拟系统</div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="field"><label>主机名</label><input defaultValue={cur.hostname} /></div>
                <div className="field"><label>IP 地址</label><input defaultValue={cur.ipAddress} /></div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="field"><label>操作系统</label><input defaultValue={cur.osImage} /></div>
                <div className="field"><label>规格</label><input defaultValue={cur.spec} /></div>
              </div>

              <div className="card">
                <div className="flex items-center gap-2 text-[11.5px] font-bold mb-2.5">
                  <span className="w-1 h-1 rounded-full bg-tech shadow-[0_0_8px_#3b82f6]" />
                  网络访问权限
                </div>
                {cur.networkRules.map((r) => (
                  <div key={r.id} className="flex items-center gap-2 p-2 rounded-md bg-panel2/50 border border-border mb-1">
                    <span className="text-[10px]">🌐</span>
                    <span className="flex-1 text-[10.5px] font-mono text-txt2">{r.hostPattern}:{r.port}</span>
                    <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold
                      ${r.isAllowed ? 'bg-green/10 text-green' : 'bg-red/10 text-red-400'}`}>
                      {r.isAllowed ? '允许' : '禁止'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="card">
                <div className="flex items-center gap-2 text-[11.5px] font-bold mb-2.5">
                  <span className="w-1 h-1 rounded-full bg-tech shadow-[0_0_8px_#3b82f6]" />
                  文件访问权限
                </div>
                {cur.fileRules.map((r) => (
                  <div key={r.id} className="flex items-center gap-2 p-2 rounded-md bg-panel2/50 border border-border mb-1">
                    <span className="text-[10px]">📁</span>
                    <span className="flex-1 text-[10.5px] font-mono text-txt2">{r.pathPattern}</span>
                    <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold
                      ${r.permission !== 'none' ? 'bg-green/10 text-green' : 'bg-red/10 text-red-400'}`}>
                      {r.permission}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}