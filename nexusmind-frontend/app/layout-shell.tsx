'use client'

import { usePathname } from 'next/navigation'
import { TopBar } from '@/components/layout/TopBar'
import { FloatingBrain } from '@/components/layout/FloatingBrain'

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div className="relative z-[1] h-screen flex flex-col overflow-hidden">
      <TopBar />
      <main className="flex-1 relative min-h-0 overflow-hidden">
        {children}
        {!isHome && <FloatingBrain />}
      </main>
    </div>
  )
}