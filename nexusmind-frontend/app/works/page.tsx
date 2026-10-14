'use client'

import { useWorkStore } from '@/lib/stores/workStore'
import { useConfigStore } from '@/lib/stores/configStore'
import { WorkCanvas } from '@/components/works/WorkCanvas'
import { NodeToolbar } from '@/components/works/NodeToolbar'
import { toast } from '@/components/ui/Toast'

export default function WorksPage() {
  const { works, curWorkId, selectWork, createWork, deleteWork, updateWorkStatus } = useWorkStore()
  const cur = works.find((w) => w.id === curWorkId)
  const canDelete = cur?.status === 'inactive' || cur?.status === 'draft'

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-[50px] shrink-0 flex items-center gap-2 px-4 border-b border-border
                      bg-gradient-to-b from-panel/70 to-bg/50">
        <div className="text-[12.5px] font-bold mr-2">工作</div>
        <div className="flex-1 flex gap-1.5 overflow-x-auto">
          {works.map((w) => (
            <button
              key={w.id}
              onClick={() => selectWork(w.id)}
              className={`px-3.5 py-1.5 rounded-[7px] text-[11px] font-semibold whitespace-nowrap transition border ${
                curWorkId === w.id
                  ? 'bg-tech/15 border-tech/40 text-tech-light'
                  : 'border-transparent text-txt3 hover:bg-panel3/60'
              }`}
            >
              {w.icon} {w.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-sm btn-primary" onClick={() => { createWork(); toast('已创建工作', 'ok') }}>
            + 创建工作
          </button>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-txt3/15 text-txt3">
            {cur?.testStatus === 'passed' ? '测试通过' : '未测试'}
          </span>
          <button className="btn btn-sm" onClick={() => toast('正在测试…', 'info')}>测试验证</button>
          <button className="btn btn-sm btn-warn" disabled={!cur || cur.testStatus !== 'passed'}
                  onClick={() => { if (cur) { updateWorkStatus(cur.id, 'active'); toast('已激活', 'ok') } }}>
            激活工作
          </button>
          <button className="btn btn-sm btn-danger" disabled={!canDelete}
                  onClick={() => {
                    if (cur && confirm(`确定删除工作「${cur.name}」？`)) {
                      deleteWork(cur.id); toast('已删除', 'ok')
                    }
                  }}>
            删除工作
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <NodeToolbar />
        {cur ? <WorkCanvas work={cur} /> : <div className="flex-1 flex items-center justify-center text-txt3">请创建工作</div>}
      </div>
    </div>
  )
}