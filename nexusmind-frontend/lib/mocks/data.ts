import type {
  ModelConfig, VirtualSystem, Role, Robot, Task, Work,
} from '@/lib/types'

export const MODELS: ModelConfig[] = [
  {
    id: 'MODEL-001', name: 'GPT-5.5 Turbo', provider: 'OpenAI',
    modelId: 'gpt-5.5-turbo', apiKey: 'sk-proj-••••8f3a',
    baseUrl: 'https://api.openai.com/v1', temperature: 0.7,
    maxTokens: 8192, enabled: true, color: '#10e08a', icon: '⚡',
    description: 'OpenAI 旗舰模型，复杂推理能力最强',
  },
  {
    id: 'MODEL-002', name: 'Claude Sonnet 4', provider: 'Anthropic',
    modelId: 'claude-sonnet-4', apiKey: 'sk-ant-••••2c1b',
    baseUrl: 'https://api.anthropic.com', temperature: 0.5,
    maxTokens: 8192, enabled: true, color: '#f97316', icon: '✦',
    description: 'Anthropic 模型，超长上下文能力',
  },
  {
    id: 'MODEL-003', name: 'DeepSeek V3', provider: 'DeepSeek',
    modelId: 'deepseek-chat', apiKey: 'sk-••••e8a9',
    baseUrl: 'https://api.deepseek.com/v1', temperature: 0.7,
    maxTokens: 4096, enabled: false, color: '#22d3ee', icon: '◆',
    description: '国产大模型，中文理解优秀',
  },
]

export const VMS: VirtualSystem[] = [
  {
    id: 'VM-001', name: '数据分析虚拟系统',
    hostname: 'nexus-vm-data-01', ipAddress: '10.0.5.11',
    osImage: 'ubuntu:22.04', spec: '4 vCPU / 8 GB', status: 'ready',
    networkRules: [
      { id: 'nr-1', hostPattern: 'api.nexus.internal', port: 443, isAllowed: true },
      { id: 'nr-2', hostPattern: '10.0.3.88', port: 5432, isAllowed: true },
    ],
    fileRules: [
      { id: 'fr-1', pathPattern: '/workspace/data', permission: 'rw' },
      { id: 'fr-2', pathPattern: '/workspace/output', permission: 'rw' },
      { id: 'fr-3', pathPattern: '/etc', permission: 'none' },
    ],
  },
  {
    id: 'VM-002', name: '采集虚拟系统',
    hostname: 'nexus-vm-crawl-01', ipAddress: '10.0.5.12',
    osImage: 'ubuntu:22.04', spec: '2 vCPU / 4 GB', status: 'ready',
    networkRules: [
      { id: 'nr-3', hostPattern: '10.0.3.88', port: 22, isAllowed: true },
    ],
    fileRules: [
      { id: 'fr-4', pathPattern: '/workspace/raw', permission: 'rw' },
    ],
  },
]

export const ROLES: Role[] = [
  { id: 'ROLE-001', name: '数据分析师', icon: '✦', color: '#8b5cf6', ability: '分析推理', description: '业务洞察', vmId: 'VM-001' },
  { id: 'ROLE-002', name: '数据采集员', icon: '⚙', color: '#10e08a', ability: '网络访问', description: '网络数据采集', vmId: 'VM-002' },
  { id: 'ROLE-003', name: '文件处理员', icon: '⇄', color: '#14b8a6', ability: '文件操作', description: '文件读写', vmId: 'VM-002' },
  { id: 'ROLE-004', name: '可视化工程师', icon: '◐', color: '#ec4899', ability: '图形渲染', description: '图表渲染', vmId: 'VM-001' },
  { id: 'ROLE-005', name: '报告撰写员', icon: '✎', color: '#8b5cf6', ability: '文本生成', description: '报告生成', vmId: 'VM-001' },
  { id: 'ROLE-006', name: '审核专员', icon: '◉', color: '#3b82f6', ability: '审核校验', description: '审核校验', vmId: 'VM-001' },
  { id: 'ROLE-007', name: '调度角色', icon: '▶', color: '#22d3ee', ability: '触发', description: '接收分发任务', vmId: 'VM-001' },
]

export const ROBOTS: Robot[] = [
  { id: 'BOT-001', name: 'Orion', roleId: 'ROLE-001', color: '#8b5cf6', status: 'idle', totalTasks: 0, successRate: 98.6 },
  { id: 'BOT-002', name: 'Vega', roleId: 'ROLE-002', color: '#10e08a', status: 'idle', totalTasks: 0, successRate: 97.2 },
  { id: 'BOT-003', name: 'Lyra', roleId: 'ROLE-004', color: '#ec4899', status: 'idle', totalTasks: 0, successRate: 96.4 },
  { id: 'BOT-004', name: 'Nova', roleId: 'ROLE-006', color: '#3b82f6', status: 'idle', totalTasks: 0, successRate: 99.1 },
  { id: 'BOT-005', name: 'Atlas', roleId: 'ROLE-003', color: '#14b8a6', status: 'idle', totalTasks: 0, successRate: 97.8 },
]

export const TASKS: Task[] = [
  {
    id: 'T-001', name: '接收工作请求', agentType: 'trigger', status: 'passed',
    roleId: 'ROLE-007', modelConfigId: 'MODEL-001', icon: '▶', color: '#22d3ee',
    prompt: '接收触发请求并解析上下文', timeoutSec: 30, maxRetries: 0, outputFormat: 'json',
    mcp: [], skills: [],
    testCases: [
      { id: 'tc-1', name: '正常触发', inputDesc: '模拟请求进入', expectedOutput: '返回上下文 JSON' },
    ],
  },
  {
    id: 'T-002', name: '需求分析', agentType: 'analyze', status: 'passed',
    roleId: 'ROLE-001', modelConfigId: 'MODEL-001', icon: '✦', color: '#8b5cf6',
    prompt: '拆解任务并生成执行计划', timeoutSec: 120, maxRetries: 2, outputFormat: 'json',
    mcp: [
      { id: 'mcp-a', name: 'filesystem', url: 'mcp://nexus-fs', enabled: true },
      { id: 'mcp-b', name: 'postgres', url: 'mcp://postgres@10.0.3.88:5432', enabled: true },
    ],
    skills: [
      { id: 'sk-a', name: 'SQL Query', description: '执行数据库 SQL 查询' },
    ],
    testCases: [
      { id: 'tc-2', name: '标准分析', inputDesc: '拆解季度分析任务', expectedOutput: '返回 ≥3 个子任务' },
      { id: 'tc-3', name: '模糊需求', inputDesc: '输入模糊需求', expectedOutput: '追问澄清' },
    ],
  },
  {
    id: 'T-003', name: '数据采集', agentType: 'crawl', status: 'passed',
    roleId: 'ROLE-002', modelConfigId: 'MODEL-002', icon: '⚙', color: '#10e08a',
    prompt: '从数据源采集数据', timeoutSec: 300, maxRetries: 3, outputFormat: 'csv',
    mcp: [], skills: [],
    testCases: [
      { id: 'tc-4', name: '数据库采集', inputDesc: 'PG 采集 1000 行', expectedOutput: 'CSV 输出成功' },
    ],
  },
  {
    id: 'T-004', name: '数据清洗', agentType: 'fileproc', status: 'passed',
    roleId: 'ROLE-003', modelConfigId: 'MODEL-001', icon: '⇄', color: '#14b8a6',
    prompt: '清洗数据', timeoutSec: 180, maxRetries: 2, outputFormat: 'parquet',
    mcp: [], skills: [],
    testCases: [],
  },
  {
    id: 'T-005', name: '可视化生成', agentType: 'render', status: 'passed',
    roleId: 'ROLE-004', modelConfigId: 'MODEL-002', icon: '◐', color: '#ec4899',
    prompt: '生成可视化图表', timeoutSec: 150, maxRetries: 2, outputFormat: 'png',
    mcp: [], skills: [],
    testCases: [],
  },
  {
    id: 'T-006', name: '报告撰写', agentType: 'report', status: 'passed',
    roleId: 'ROLE-005', modelConfigId: 'MODEL-002', icon: '✎', color: '#8b5cf6',
    prompt: '撰写分析报告', timeoutSec: 240, maxRetries: 2, outputFormat: 'md',
    mcp: [], skills: [],
    testCases: [],
  },
  {
    id: 'T-007', name: '完成交付', agentType: 'end', status: 'passed',
    roleId: 'ROLE-006', modelConfigId: 'MODEL-001', icon: '■', color: '#94a3b8',
    prompt: '汇总输出并归档', timeoutSec: 60, maxRetries: 1, outputFormat: 'json',
    mcp: [], skills: [],
    testCases: [],
  },
]

export const WORKS: Work[] = [
  {
    id: 'W-001', name: '季度数据分析报告', icon: '◈', color: '#3b82f6',
    status: 'inactive', testStatus: 'passed', doneNodes: 0,
    nodes: [
      { id: 'n1', taskId: 'T-001', nodeType: 'auto', positionX: 40, positionY: 240 },
      { id: 'n2', taskId: 'T-002', nodeType: 'auto', positionX: 300, positionY: 240 },
      { id: 'n3', taskId: 'T-003', nodeType: 'robot', positionX: 560, positionY: 120 },
      { id: 'n4', taskId: 'T-004', nodeType: 'robot', positionX: 560, positionY: 360 },
      { id: 'n5', taskId: 'T-005', nodeType: 'robot', positionX: 820, positionY: 120 },
      { id: 'n6', taskId: 'T-006', nodeType: 'robot', positionX: 820, positionY: 360 },
      { id: 'n7', taskId: 'T-007', nodeType: 'auto', positionX: 1080, positionY: 240 },
    ],
    edges: [
      { id: 'e1', fromNodeId: 'n1', toNodeId: 'n2', edgeType: 'sequential' },
      { id: 'e2', fromNodeId: 'n2', toNodeId: 'n3', edgeType: 'sequential' },
      { id: 'e3', fromNodeId: 'n2', toNodeId: 'n4', edgeType: 'sequential' },
      { id: 'e4', fromNodeId: 'n3', toNodeId: 'n5', edgeType: 'sequential' },
      { id: 'e5', fromNodeId: 'n4', toNodeId: 'n6', edgeType: 'sequential' },
      { id: 'e6', fromNodeId: 'n5', toNodeId: 'n7', edgeType: 'sequential' },
      { id: 'e7', fromNodeId: 'n6', toNodeId: 'n7', edgeType: 'sequential' },
    ],
  },
]