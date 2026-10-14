'use client'

export default function AllocationPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-14 shrink-0 flex items-center gap-3.5 px-5 border-b border-border
                      bg-gradient-to-b from-panel/60 to-bg/30">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[15px]
                        bg-gradient-to-br from-amber-400/20 to-amber-400/5 border border-amber-400/35 text-amber-300">⚡</div>
        <div>
          <div className="text-sm font-bold">智能分配执行</div>
          <div className="text-[10.5px] text-txt3 mt-0.5">根据任务角色匹配机器人</div>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="btn btn-sm btn-primary">开始智能分配</button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center text-txt3 text-sm">
        请选择工作后点击「开始智能分配」
      </div>
    </div>
  )
}