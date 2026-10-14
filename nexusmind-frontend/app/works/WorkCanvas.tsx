'use client'

import { useCallback, useMemo } from 'react'
import ReactFlow, {
  Background, Controls, MiniMap,
  type Node, type Edge, type NodeChange, applyNodeChanges,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useState } from 'react'
import { useWorkStore } from '@/lib/stores/workStore'
import { TASKS } from '@/lib/mocks/data'
import type { Work } from '@/lib/types'

export function WorkCanvas({ work }: { work: Work }) {
  const { selectedNodeId, selectNode, moveNode } = useWorkStore()
  const [nodes, setNodes] = useState<Node[]>(() => toFlowNodes(work, selectedNodeId))
  const [edges, setEdges] = useState<Edge[]>(() => toFlowEdges(work))

  // work 变化时重建
  useMemo(() => {
    setNodes(toFlowNodes(work, selectedNodeId))
    setEdges(toFlowEdges(work))
  }, [work, selectedNodeId])

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => {
      const next = applyNodeChanges(changes, nds)
      changes.forEach((c) => {
        if (c.type === 'position' && c.position) {
          moveNode(work.id, c.id, c.position.x, c.position.y)
        }
      })
      return next
    })
  }, [work.id, moveNode])

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    const taskId = event.dataTransfer.getData('application/nexusmind-task')
    if (!taskId) return
    const task = TASKS.find((t) => t.id === taskId)
    if (!task) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newNode: Node = {
      id: `n-${Date.now()}`,
      type: 'default',
      position: { x, y },
      data: { label: task.name, icon: task.icon, color: task.color, type: task.agentType },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: {
        background: 'linear-gradient(180deg, #172237, #111a2b)',
        border: `1.5px solid ${task.color}88`,
        borderRadius: 11,
        color: '#e6edfa',
        fontSize: 12,
        padding: 10,
        width: 180,
      },
    }
    setNodes((nds) => nds.concat(newNode))
  }, [])

  return (
    <div className="flex-1 min-w-0 relative" onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeClick={(_, n) => selectNode(n.id)}
        onPaneClick={() => selectNode(null)}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} size={1} color="rgba(52,72,105,.28)" />
        <Controls className="!bg-panel2 !border !border-border !rounded-lg" />
        <MiniMap className="!bg-panel2 !border !border-border !rounded-lg" />
      </ReactFlow>

      {selectedNodeId && (
        <div className="absolute right-0 top-0 bottom-0 w-[330px] border-l border-border
                        bg-gradient-to-b from-panel/90 to-bg/95 flex flex-col">
          <div className="p-3.5 border-b border-border flex items-center gap-2 bg-bg/50">
            <div className="flex-1 text-[11.5px] font-bold">节点属性</div>
            <button onClick={() => selectNode(null)}
                    className="w-5 h-5 rounded border border-border2 text-txt3 text-[11px]">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 text-txt2 text-[11.5px]">
            选中节点：{selectedNodeId}
          </div>
        </div>
      )}
    </div>
  )
}

function toFlowNodes(work: Work, selectedId: string | null): Node[] {
  return work.nodes.map((n) => {
    const task = TASKS.find((t) => t.id === n.taskId)
    if (!task) return null
    const sel = selectedId === n.id
    return {
      id: n.id,
      position: { x: n.positionX, y: n.positionY },
      data: { label: task.name, icon: task.icon, color: task.color, type: task.agentType },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: {
        background: 'linear-gradient(180deg, #172237, #111a2b)',
        border: `1.5px solid ${sel ? '#60a5fa' : task.color + '88'}`,
        borderRadius: 11,
        color: '#e6edfa',
        fontSize: 12,
        padding: 10,
        width: 180,
        boxShadow: sel ? '0 0 0 3px rgba(59,130,246,.25), 0 8px 26px rgba(59,130,246,.35)' : undefined,
      },
    } as Node
  }).filter(Boolean) as Node[]
}

function toFlowEdges(work: Work): Edge[] {
  return work.edges.map((e) => ({
    id: e.id,
    source: e.fromNodeId,
    target: e.toNodeId,
    type: 'smoothstep',
    style: { stroke: '#3b82f6', strokeWidth: 2.2 },
    animated: true,
  }))
}