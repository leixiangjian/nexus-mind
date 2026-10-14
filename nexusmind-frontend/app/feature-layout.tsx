import { TopBar } from '@/components/layout/TopBar'
import { FloatingBrain } from '@/components/layout/FloatingBrain'

export function FeatureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-[1] h-screen flex flex-col overflow-hidden">
      <TopBar />
      <main className="flex-1 relative min-h-0 overflow-hidden">
        {children}
        <FloatingBrain />
      </main>
    </div>
  )
}