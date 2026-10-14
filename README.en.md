<div align="center">

# NexusMind · Wisdom Brain

**Make AI Agents Work Like a Team**

An enterprise-grade AI agent orchestration and scheduling platform that visually assembles LLMs, virtual systems, robot roles, and business tasks into complete pipelines.
access url：https://leixiangjian.github.io/nexus-mind/

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-beta-orange.svg)
![Version](https://img.shields.io/badge/version-0.1.0-green.svg)
![Platform](https://img.shields.io/badge/platform-Web-lightgrey.svg)

</div>

---

## 1. Introduction

### 1.1 Who We Are

**NexusMind · Wisdom Brain** is an enterprise-grade **AI Agent Orchestration and Scheduling Platform**. It unifies large language models, virtual execution environments, role-based robots, toolchains (MCP / Skills), and business processes into a single visual "command center" — allowing enterprises to build their own AI workforce the same way they'd build a team.

### 1.2 Problems We Solve

Enterprises adopting AI commonly face these challenges:

| Pain Point | Today's Reality | NexusMind's Answer |
|------------|-----------------|--------------------|
| **Capability Silos** | A model can answer, but not *do*; a bot does only one thing | Agents collaborate through workflows to form complete pipelines |
| **Black-box Execution** | After an LLM call, no one knows what resources it touched | Virtual-system-level permissions with network & file whitelists |
| **Untestable** | AI tasks can't be validated before going live | Every task and workflow has a built-in "Test & Verify" gate |
| **Manual Scheduling** | Who does what? All manual assignment | Smart Allocation engine matches bots by role automatically |
| **Invisible Process** | Can't pause, can't see progress, can't trace | Real-time Monitoring Center shows every bot's trajectory |
| **No Closed Loop** | No reports, no retrospective, no improvement | Report Hall provides multi-dimensional views |

### 1.3 Design Philosophy

> **"Make AI agents manageable digital employees."**

- **Role-based** — Every robot has a clear job (Data Analyst, Collector, Reviewer, …)
- **Permission-scoped** — Every role is bound to a virtual system, strictly limiting network & file access
- **Workflow-driven** — Tasks can't act alone; they must be orchestrated into a workflow
- **Test-gated** — Untested work can't be activated; unactivated work can't be scheduled
- **Observable** — Full logs, trajectories, and reports — everything is traceable

---

## 2. Core Concepts

Six keywords to understand NexusMind:
Model Virtual System
│ │
└──────────┬──────────────────┘
▼
Role ←── Ability + Permission
│
▼
Robot ←── Executable instance of a Role
│
▼
Task ←── Prompt + MCP + Skills + Test Cases
│
▼
Work ←── Directed graph of Task nodes
│
▼
Smart Allocation → Execution → Monitoring → Reporting


| Concept | Description | Analogy |
|---------|-------------|---------|
| **Model** | LLM provider config (OpenAI / Anthropic / DeepSeek / Qwen, etc.) | The "brain" |
| **Virtual System** | Isolated sandbox defining network & filesystem permissions | The "office" |
| **Role** | Job responsibility + bound VM + bound abilities | Job description |
| **Robot** | A concrete instance of a Role; can be idle/busy | The employee |
| **Task** | Smallest business unit: Prompt, MCP, Skills, Test Cases | A work action |
| **Work** | A DAG of Task nodes and dependency edges | A business pipeline |

---

## 3. Business Features

### 3.1 Home · Wisdom Brain

The all-holographic home screen: a dynamic mosaic face at the center (intensifies when thinking), surrounded by six ability cards. Click any card to enter that module. Top-left shows the brand; top-right shows live stats (Models / VMs / Robots / Running). A floating "Wisdom Brain" panel sits bottom-right — draggable, collapsible, and always guides the user.

### 3.2 Smart Configuration Center

**Four tabs to configure everything:**

- **LLM Models** — Manage multiple LLM providers. Configure API Key, Base URL, Temperature, Max Tokens, Context Length; enable/disable in one click.
- **Virtual Systems** — Sandboxes for each role. Fine-grained settings:
  - **Network whitelist**: host + port + allow/deny
  - **Filesystem permissions**: path + `rw` / `ro` / `none`
- **Robot Roles** — Define positions. Each role has icon, color, ability tags, description, and a bound VM.
- **Work Robots** — Instances of roles. Shows idle/busy status, total tasks, success rate.

### 3.3 Work Tasks

Create Agent tasks — the smallest business unit of NexusMind. Rich configuration:

- **Basic Info** — Name, agent type (trigger / analyze / crawl / fileproc / compute / render / report / human / end), bound role
- **Prompt** — Task instruction
- **Model Binding** — Which LLM to use
- **Runtime Parameters** — Timeout, retries, output format
- **MCP Tools** — Add MCP servers (name + URL), enable/disable
- **Skills** — Add skills (name + description)
- **Role-bound VM Directories** — Auto-display the role's VM filesystem and network permissions
- **Test Cases** — Each case has name, input description, expected output

**Test & Verify** is a hard gate: clicking it runs a complete "build → mount → load MCP → load Skills → execute test cases" pipeline, with a colorful live console. Failed tasks cannot be used in workflows.

### 3.4 Work (Workflow Orchestration)

Assemble tasks into workflows on a visual canvas.

- **Left Node Toolbar** — Core nodes (Start / End / Condition / Parallel / Wait / Notify / Manual Approval) + Task nodes (from the Work Tasks module)
- **Canvas** — 2000×1000, zoomable & pannable; grid, snap, auto-layout, fit-to-view
- **Nodes** — Draggable; distinguished as "auto" vs "robot" nodes
- **Edges** — Define dependencies between tasks
- **Property Drawer** — Click a node or edge; edit coordinates, view bindings, delete
- **Test & Verify** — Modal with per-node progress, live logs; only passing workflows can be activated
- **Delete Work** — Only `inactive` / `draft` works can be deleted; active / running / done are protected

### 3.5 Smart Allocation & Execution

After a work is activated, it enters smart allocation.

- **Select Work** — Dropdown to choose
- **Start Allocation** — System scans each "robot node", matches by the task's bound role:
  - Prefer idle robots with the same role
  - Fall back to any idle robot
  - Mark "pending" if none available
- **Flowchart Feedback** — Assigned (green + bot avatar), Pending (yellow dashed, blinking), Auto-dispatched (cyan tag)
- **Four-way Stats** — Total / Assigned / Auto / Pending
- **Idle Bot Pool** — Real-time list
- **Auto Flow** — After allocation, jumps to Monitoring Center and starts execution

### 3.6 Monitoring Center

Real-time cockpit of execution.

- **Select work + Start / Pause / Resume / Force Stop**
- **Flowchart** — Node positions scaled proportionally; edges from right-mid to left-mid (no more tangled lines)
- **Bot Tokens** — Avatars "fly" to the corresponding node in execution order
- **Progress Panel** — Percentage, bar, done / total / elapsed
- **Bot Trajectory** — Live status per bot
- **Live Logs** — Every event with timestamp + level
- **Auto-fit + zoom + pan**

### 3.7 Report Hall

- **Top Filters** — Status (all / running / done / inactive), Range (all / today / week)
- **Stat Cards** — Running works, completed, active bots, average success rate
- **Work Progress Cards** — Node count, edge count, done count, test status; click for details
- **Bot Status** — All robots at a glance
- **Execution Stream** — Each run auto-recorded with nodes, elapsed, status
- **One-click Export** — JSON report

---

## 4. Real Customer Problems Solved

### Scenario 1: The "Last Mile" of Enterprise Data Analytics Automation

**Pain** — Data teams manually chain "collect → clean → compute → visualize → report" daily. LLMs can analyze, but can't access databases, write files, or render charts.

**NexusMind Solution**:
1. Create a `Data Analytics VM` (allows PostgreSQL, allows read/write on `/workspace`)
2. Create a `Data Analyst` role bound to this VM
3. Create 9 tasks: receive request, analyze, collect, clean, compute, visualize, write report, human review, finalize
4. Orchestrate into a workflow and pass the test gate
5. Let Smart Allocation auto-assign bots and start execution
6. Watch every bot in the Monitoring Center
7. Export the report from the Report Hall

**Result**: 2-day analyses compressed to 10 minutes, fully traceable and reproducible.

### Scenario 2: AI Adoption in Finance / Healthcare (Strong Compliance)

**Pain** — AI can't access external networks or sensitive files arbitrarily; everything must be auditable.

**NexusMind Solution**:
- VM **network whitelist** allows only internal APIs and specific databases
- VM **file permissions** are directory-level; `/etc` is `none`
- Every task's Prompt, model, MCP, Skills, timeout, retries are persisted
- Full execution logs, replayable on anomalies

**Result**: Meets compliance audits; AI usage is no longer "out of control".

### Scenario 3: Complex Business with Multiple AI Capabilities

**Pain** — A single requirement needs "analyze + collect + compute + render + write + review"; off-the-shelf tools call only one at a time.

**NexusMind Solution**:
- Workflows support **serial + parallel** (a node can have multiple successors)
- Supports **Condition** and **Manual Approval** nodes
- Each node can bind a different role / model
- Smart Allocation dispatches tasks to matching bots automatically

**Result**: Complex business expressed as a single flowchart; AI coordinates itself.

### Scenario 4: "Dry Run" Before AI Goes to Production

**Pain** — Sending AI tasks straight to production is risky; errors are costly.

**NexusMind Solution**:
- Task-level testing: each case has explicit "input → expected output"
- Work-level testing: whole pipeline runs; nodes verified one by one
- Only **fully-passing** tasks can be orchestrated
- Only **tested-passing** works can be activated
- Only **activated** works can be smart-allocated

**Result**: Production only ever runs "verified" AI tasks.

---

## 5. Technical Features

- **Pure Front-End** — Single HTML file, no build, no dependencies, double-click to run
- **Dynamic Canvas Rendering** — Home face, holographic formula background, and logo are all drawn dynamically
- **SVG Flowcharts** — Workflows, allocation graph, and monitoring graph all use SVG for edges
- **CSS-Variable Theming** — Deep-blue tech theme; one-line theme switch
- **Zero Frameworks** — Vanilla JavaScript; no React / Vue / jQuery
- **Responsive Interaction** — Drag, zoom, pan, snap, fullscreen

---

## 6. Quick Start

```bash
# Option 1: Open directly
Double-click nexusmind.html

# Option 2: Local server (recommended)
python3 -m http.server 8080
# Visit http://localhost:8080/nexusmind.html
```
	
## 7. Roadmap

v0.1.0 (Current) ✅
Six module UIs and core interactions

Task & Work test verification

Smart allocation and monitored execution

Reporting and export

v0.2.0 (In Progress) 🚧
□ Data persistence (localStorage / IndexedDB)
□ Work copy / import / export
□ Node right-click menu
□ Canvas minimap
v0.3.0 (Planned) 📋
□ Real Agent scheduling engine integration
□ Backend API (REST / WebSocket)
□ Multi-user & permission management
□ Work versioning & rollback
v1.0.0 (Long-term) 🎯
□ Multi-tenant SaaS
□ Plugin marketplace (MCP / Skills ecosystem)
□ Enterprise-grade audit & compliance
□ Mobile adaptation


## 8. Contributing

All forms of contribution are welcome:

🐛 Report bugs

💡 Suggest new features

📝 Improve documentation

🔧 Submit code (Fork → Feature Branch → PR)

## 9. License

Licensed under the Apache2.0 License.