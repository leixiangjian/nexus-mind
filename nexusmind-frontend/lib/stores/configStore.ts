import { create } from 'zustand'
import type { ModelConfig, VirtualSystem, Role, Robot } from '@/lib/types'
import { MODELS, VMS, ROLES, ROBOTS } from '@/lib/mocks/data'

interface ConfigState {
  models: ModelConfig[]
  vms: VirtualSystem[]
  roles: Role[]
  robots: Robot[]
  curModelId: string | null
  curVmId: string | null
  curRoleId: string | null

  selectModel: (id: string) => void
  selectVm: (id: string) => void
  selectRole: (id: string) => void

  createModel: () => void
  deleteModel: (id: string) => void
  saveModel: (patch: Partial<ModelConfig> & { id: string }) => void
  toggleModelEnable: (id: string) => void

  createVm: () => void
  deleteVm: (id: string) => void

  createRole: () => void
  deleteRole: (id: string) => void

  createRobot: () => void
  deleteRobot: (id: string) => void
}

export const useConfigStore = create<ConfigState>((set, get) => ({
  models: MODELS,
  vms: VMS,
  roles: ROLES,
  robots: ROBOTS,
  curModelId: MODELS[0]?.id ?? null,
  curVmId: VMS[0]?.id ?? null,
  curRoleId: ROLES[0]?.id ?? null,

  selectModel: (id) => set({ curModelId: id }),
  selectVm: (id) => set({ curVmId: id }),
  selectRole: (id) => set({ curRoleId: id }),

  createModel: () => {
    const id = `MODEL-${String(get().models.length + 1).padStart(3, '0')}`
    const m: ModelConfig = {
      id, name: `新模型 ${id}`, provider: 'OpenAI', modelId: 'gpt-4',
      apiKey: '', baseUrl: 'https://api.openai.com/v1',
      temperature: 0.7, maxTokens: 4096, enabled: false,
      color: '#3b82f6', icon: '◆', description: '请填写描述',
    }
    set((s) => ({ models: [...s.models, m], curModelId: id }))
  },
  deleteModel: (id) => set((s) => {
    const m = s.models.find((x) => x.id === id)
    if (!m || m.enabled) return s
    const next = s.models.filter((x) => x.id !== id)
    return { models: next, curModelId: next[0]?.id ?? null }
  }),
  saveModel: (patch) => set((s) => ({
    models: s.models.map((x) => (x.id === patch.id ? { ...x, ...patch } : x)),
  })),
  toggleModelEnable: (id) => set((s) => ({
    models: s.models.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)),
  })),

  createVm: () => {
    const id = `VM-${String(get().vms.length + 1).padStart(3, '0')}`
    const v: VirtualSystem = {
      id, name: `新虚拟系统 ${id}`, hostname: `nexus-vm-${id.toLowerCase()}`,
      ipAddress: `10.0.5.${10 + get().vms.length}`, osImage: 'ubuntu:22.04',
      spec: '2 vCPU / 4 GB', status: 'ready',
      networkRules: [], fileRules: [],
    }
    set((s) => ({ vms: [...s.vms, v], curVmId: id }))
  },
  deleteVm: (id) => set((s) => {
    const used = s.roles.some((r) => r.vmId === id)
    if (used) return s
    const next = s.vms.filter((x) => x.id !== id)
    return { vms: next, curVmId: next[0]?.id ?? null }
  }),

  createRole: () => {
    const id = `ROLE-${String(get().roles.length + 1).padStart(3, '0')}`
    const r: Role = {
      id, name: `新角色 ${id}`, icon: '✦', color: '#8b5cf6',
      ability: '通用能力', description: '请填写角色描述',
      vmId: get().vms[0]?.id ?? null,
    }
    set((s) => ({ roles: [...s.roles, r], curRoleId: id }))
  },
  deleteRole: (id) => set((s) => {
    const used = s.robots.some((b) => b.roleId === id)
    if (used) return s
    const next = s.roles.filter((x) => x.id !== id)
    return { roles: next, curRoleId: next[0]?.id ?? null }
  }),

  createRobot: () => {
    if (!get().roles.length) return
    const id = `BOT-${String(get().robots.length + 1).padStart(3, '0')}`
    const role = get().roles[0]
    const b: Robot = {
      id, name: `Bot-${id.split('-')[1]}`, roleId: role.id,
      color: role.color, status: 'idle', totalTasks: 0, successRate: 98,
    }
    set((s) => ({ robots: [...s.robots, b] }))
  },
  deleteRobot: (id) => set((s) => {
    const b = s.robots.find((x) => x.id === id)
    if (!b || b.status === 'busy') return s
    return { robots: s.robots.filter((x) => x.id !== id) }
  }),
}))