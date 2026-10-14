'use client'

export default function ReportsPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-14 shrink-0 flex items-center gap-3.5 px-5 border-b border-border
                      bg-gradient-to-b from-panel/60 to-bg/30">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[15px]
                        bg-gradient-to-br from-teal-500/20 to-teal-500/5 border border-teal-500/35 text-teal-400">📊</div>
        <div>
          <div className="text-sm font-bold">工作报告大厅</div>
          <div className="text-[10.5px] text-txt3 mt-0.5">实时展示执行进度与历史流水</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { l: '运行中工作', v: 0, c: 'text-amber-400' },
            { l: '已完成', v: 0, c: 'text-green' },
            { l: '活跃机器人', v: 0, c: 'text-cyan' },
            { l: '平均成功率', v: '—', c: 'text-tech-light' },
          ].map((s) => (
            <div key={s.l} className="card">
              <div className="text-[10px] text-txt3">{s.l}</div>
              <div className={`text-2xl font-bold mt-1 font-mono ${s.c}`}>{s.v}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="flex items-center gap-2 text-[11.5px] font-bold mb-3">
            <span className="w-1 h-1 rounded-full bg-tech shadow-[0_0_8px_#3b82f6]" />
            工作实时进度
          </div>
          <div className="text-center py-8 text-txt3 text-[11px]">暂无执行记录</div>
        </div>
      </div>
    </div>
  )
}