'use client'

export default function MonitorPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-14 shrink-0 flex items-center gap-3.5 px-5 border-b border-border
                      bg-gradient-to-b from-panel/60 to-bg/30">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[15px]
                        bg-gradient-to-br from-cyan/20 to-cyan/5 border border-cyan/35 text-cyan">📡</div>
        <div>
          <div className="text-sm font-bold">监控中心</div>
          <div className="text-[10.5px] text-txt3 mt-0.5">实时查看工作执行细节</div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center text-txt3 text-sm">
        选择工作后点击「启动执行」开始监控
      </div>
    </div>
  )
}