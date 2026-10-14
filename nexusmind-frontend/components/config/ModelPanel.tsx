'use client'

import { useConfigStore } from '@/lib/stores/configStore'
import { toast } from '@/components/ui/Toast'

export function ModelPanel() {
  const { models, curModelId, selectModel, createModel, deleteModel, saveModel, toggleModelEnable } = useConfigStore()
  const cur = models.find((m) => m.id === curModelId)

  return (
    <div className="flex-1 flex overflow-hidden">
      <aside className="w-[300px] shrink-0 border-r border-border bg-gradient-to-b from-panel/70 to-bg/85 flex flex-col">
        <div className="p-3.5 border-b border-border flex items-center gap-2 bg-bg/50">
          <div className="flex-1 text-[11.5px] font-bold flex items-center gap-1.5
                          before:content-[''] before:w-1 before:h-1 before:rounded-full
                          before:bg-tech before:shadow-[0_0_6px_#3b82f6]">
            大模型列表
          </div>
          <button onClick={createModel} className="w-6 h-6 rounded-md border border-border2 bg-panel2
                          text-txt2 hover:bg-tech/15 hover:text-tech-light transition flex items-center justify-center">
            +
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2.5">
          {models.map((m) => (
            <div
              key={m.id}
              onClick={() => selectModel(m.id)}
              className={`p-2.5 rounded-[10px] border mb-1.5 cursor-pointer transition relative
                          ${curModelId === m.id
                            ? 'border-tech/50 bg-gradient-to-b from-tech/10 to-panel2/70'
                            : 'border-border bg-panel2/50 hover:bg-panel3/75 hover:translate-x-0.5'}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-[7px] flex items-center justify-center text-[11px]"
                     style={{ background: `${m.color}22`, color: m.color }}>
                  {m.icon}
                </div>
                <div className="flex-1 text-[11.5px] font-semibold truncate">{m.name}</div>
                <span className={`status-pill ${m.enabled ? 'enabled' : 'disabled'}`}>
                  {m.enabled ? '启用' : '禁用'}
                </span>
              </div>
              <div className="flex gap-2 text-[9.5px] text-txt3">
                <span>{m.provider}</span>
                <span>{m.modelId}</span>
              </div>
              {!m.enabled && (
                <button
                  onClick={(e) => { e.stopPropagation(); deleteModel(m.id); toast('已删除模型', 'ok') }}
                  className="absolute top-2 right-2 w-5 h-5 rounded-md text-[10px]
                             bg-red-500/10 border border-red-500/25 text-red-300 opacity-0
                             hover:opacity-100 transition"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="h-[42px] shrink-0 flex items-center gap-2.5 px-4 border-b border-border bg-bg/40">
          <span className="text-[11.5px] text-txt2">{cur ? `${cur.name} 配置` : '大模型配置'}</span>
          <div className="ml-auto flex gap-1.5">
            <button
              className={`btn btn-sm ${cur?.enabled ? 'btn-warn' : ''}`}
              disabled={!cur}
              onClick={() => cur && toggleModelEnable(cur.id)}
            >
              {cur?.enabled ? '禁用' : '启用'}
            </button>
            <button className="btn btn-sm" disabled={!cur}
                    onClick={() => toast('正在测试连接…', 'info')}>测试连接</button>
            <button className="btn btn-sm btn-primary" disabled={!cur}
                    onClick={() => { if (cur) { saveModel(cur); toast('已保存', 'ok') } }}>保存</button>
            <button className="btn btn-sm btn-danger" disabled={!cur || cur.enabled}
                    onClick={() => { if (cur) { deleteModel(cur.id); toast('已删除', 'ok') } }}>删除</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {!cur ? (
            <div className="text-center py-10 text-txt3">请选择或新建模型</div>
          ) : (
            <>
              <div className="field">
                <label>模型名称</label>
                <input value={cur.name} onChange={(e) => saveModel({ id: cur.id, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="field"><label>提供商</label>
                  <input value={cur.provider} onChange={(e) => saveModel({ id: cur.id, provider: e.target.value })} />
                </div>
                <div className="field"><label>模型标识</label>
                  <input value={cur.modelId} onChange={(e) => saveModel({ id: cur.id, modelId: e.target.value })} />
                </div>
              </div>
              <div className="field"><label>API Key</label>
                <input type="password" value={cur.apiKey}
                       onChange={(e) => saveModel({ id: cur.id, apiKey: e.target.value })} />
              </div>
              <div className="field"><label>Base URL</label>
                <input value={cur.baseUrl} onChange={(e) => saveModel({ id: cur.id, baseUrl: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="field"><label>Temperature</label>
                  <input type="number" step="0.1" value={cur.temperature}
                         onChange={(e) => saveModel({ id: cur.id, temperature: +e.target.value })} />
                </div>
                <div className="field"><label>Max Tokens</label>
                  <input type="number" value={cur.maxTokens}
                         onChange={(e) => saveModel({ id: cur.id, maxTokens: +e.target.value })} />
                </div>
              </div>
              <div className="field"><label>描述</label>
                <textarea rows={3} value={cur.description}
                          onChange={(e) => saveModel({ id: cur.id, description: e.target.value })} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}