'use client'

import { HologramBackground } from '@/components/home/HologramBackground'
import { BrainCanvas } from '@/components/home/BrainCanvas'
import { AbilityRing } from '@/components/home/AbilityRing'

export default function HomePage() {
  return (
    <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-[#030812]">
      <HologramBackground />
      <div className="absolute inset-0 z-[3] pointer-events-none
                      bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,8,18,.6)_80%,rgba(3,8,18,.9)_100%)]" />

      <div className="relative w-[1180px] h-[740px] flex items-center justify-center z-[4]">
        <BrainCanvas thinking={false} />
        <div className="absolute left-1/2 bottom-[30px] -translate-x-1/2 z-[7] text-center pointer-events-none">
          <div className="text-[18px] font-extrabold tracking-[8px] text-blue-200
                          [text-shadow:0_0_14px_rgba(96,165,250,1),0_0_30px_rgba(59,130,246,.6)]">
            智慧大脑
          </div>
          <div className="text-[11px] tracking-[5px] mt-1.5 font-mono text-blue-300/70">
            WISDOM · BRAIN
          </div>
        </div>
        <AbilityRing />
      </div>
    </div>
  )
}