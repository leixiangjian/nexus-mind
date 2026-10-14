# NexusMind Frontend

NexusMind 智慧大脑前端工程 · Next.js 14 + React 18 + TypeScript + Tailwind CSS

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 复制环境变量
cp .env.example .env.local

# 3. 启动开发服务器
npm run dev

# 4. 访问
open http://localhost:3000
```

## 工程结构

```
app/                 # Next.js App Router
├── layout.tsx       # 根布局
├── layout-shell.tsx # 布局外壳（顶栏 + 悬浮大脑）
├── page.tsx         # 主屏 · 智慧大脑
├── config/          # 智慧配置中心
├── tasks/           # 工作任务
├── works/           # 工作流编排
├── allocation/      # 智能分配
├── monitor/         # 监控中心
└── reports/         # 报告大厅

components/          # React 组件
├── layout/          # 布局组件
├── home/            # 主屏组件
├── config/          # 配置中心组件
├── works/           # 工作流组件
└── ui/              # 通用 UI

lib/                 # 工具与状态
├── api/             # API 客户端
├── stores/          # Zustand 状态管理
├── mocks/           # Mock 数据
├── types/           # TypeScript 类型
└── utils/           # 工具函数
```

## 功能模块

| 模块 | 路由 | 说明 |
|------|------|------|
| 主屏 | `/` | 智慧大脑全息展示 + 六大能力卡片 |
| 智慧配置中心 | `/config` | 大模型 / 虚拟系统 / 角色 / 机器人 CRUD |
| 工作任务 | `/tasks` | Agent 任务配置 + MCP + Skills |
| 工作流编排 | `/works` | React Flow 可视化编排 |
| 智能分配 | `/allocation` | 按角色匹配机器人 |
| 监控中心 | `/monitor` | 实时执行轨迹 |
| 报告大厅 | `/reports` | 进度与执行流水 |

## 技术栈

- **框架**: Next.js 14 (App Router)
- **UI**: React 18 + TypeScript
- **状态**: Zustand
- **请求**: TanStack Query
- **样式**: Tailwind CSS
- **画布**: React Flow 11
- **图表**: Recharts
- **动画**: Framer Motion

## 构建部署

```bash
# 构建生产版本
npm run build

# 启动生产服务
npm start

# 类型检查
npm run type-check
```

## 对接后端

修改 `.env.local`：

```bash
NEXT_PUBLIC_API_BASE=http://your-backend:8000
NEXT_PUBLIC_USE_MOCK=false
```

`next.config.js` 已配置 `/api/*` 反向代理到 `NEXT_PUBLIC_API_BASE`。

## License

MIT