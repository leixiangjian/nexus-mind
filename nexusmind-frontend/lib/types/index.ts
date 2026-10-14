export type ID = string

export interface ModelConfig {
  id: ID
  name: string
  provider: string
  modelId: string
  apiKey: string
  baseUrl: string
  temperature: number
  maxTokens: number
  enabled: boolean
  color: string
  icon: string
  description: string
}

export interface NetworkRule {
  id: ID
  hostPattern: string
  port: number
  isAllowed: boolean
}

export interface FileRule {
  id: ID
  pathPattern: string
  permission: 'rw' | 'ro' | 'none'
}

export interface VirtualSystem {
  id: ID
  name: string
  hostname: string
  ipAddress: string
  osImage: string
  spec: string
  status: 'ready' | 'stopped' | 'error'
  networkRules: NetworkRule[]
  fileRules: FileRule[]
}

export interface Role {
  id: ID
  name: string
  icon: string
  color: string
  ability: string
  description: string
  vmId: ID | null
}

export interface Robot {
  id: ID
  name: string
  roleId: ID
  color: string
  status: 'idle' | 'busy' | 'error' | 'offline'
  totalTasks: number
  successRate: number
  note?: string
}

export type AgentType =
  | 'trigger' | 'analyze' | 'crawl' | 'fileproc'
  | 'compute' | 'render' | 'report' | 'human' | 'end'

export interface TestCase {
  id: ID
  name: string
  inputDesc: string
  expectedOutput: string
}

export interface MCPBinding {
  id: ID
  name: string
  url: string
  enabled: boolean
}

export interface SkillBinding {
  id: ID
  name: string
  description: string
}

export interface Task {
  id: ID
  name: string
  agentType: AgentType
  status: 'draft' | 'testing' | 'passed' | 'failed'
  roleId: ID | null
  modelConfigId: ID | null
  icon: string
  color: string
  prompt: string
  timeoutSec: number
  maxRetries: number
  outputFormat: string
  mcp: MCPBinding[]
  skills: SkillBinding[]
  testCases: TestCase[]
}

export interface WorkNode {
  id: ID
  taskId: ID
  nodeType: 'auto' | 'robot'
  positionX: number
  positionY: number
  label?: string
}

export interface WorkEdge {
  id: ID
  fromNodeId: ID
  toNodeId: ID
  edgeType: 'sequential' | 'conditional' | 'parallel'
}

export interface Work {
  id: ID
  name: string
  icon: string
  color: string
  status: 'inactive' | 'active' | 'running' | 'done'
  testStatus: 'untested' | 'testing' | 'passed' | 'failed'
  nodes: WorkNode[]
  edges: WorkEdge[]
  doneNodes: number
}

export interface AllocationItem {
  nodeId: ID
  robotId: ID | null
  robotName: string | null
  robotColor: string | null
  pending: boolean
}

export interface ExecutionEvent {
  id: string
  type: 'info' | 'ok' | 'err' | 'warn' | 'build' | 'test'
  message: string
  ts: string
  nodeId?: ID
  robotId?: ID
}