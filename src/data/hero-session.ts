import type { Locale } from '~/i18n/ui';

export type FrameTone = 'plain' | 'dim' | 'ok' | 'bold' | 'prompt' | 'choice' | 'choice-dim' | 'claude';

export interface Segment {
  text: string;
  tone?: FrameTone;
}

export type Frame =
  | { kind: 'type'; text: string }
  | { kind: 'line'; text?: string; parts?: Segment[]; tone?: FrameTone; delay?: number }
  | { kind: 'clear'; text: ''; delay?: number };

// 会话内容与 main 分支 TUI 首页的真实输出逐行对应（internal/cli/app.go
// runHome / runHomeLaunch、internal/ui/select.go 的渲染格式），Claude Code
// 欢迎画面与 v2.1.287 的实际输出一致。模型与目录是演示数据，格式与文案不是。
//
// 播放节奏模仿真实 TUI：命令逐字敲入，菜单整屏瞬间出现，切页整屏替换。
// delay 为 0 的行不做停顿，一屏的内容在同一帧内全部落下。

// Claude Code 的欢迎画面，两种语言一致（CC 界面本身是英文）。
// 螃蟹照抄 Claude Code 的真实字形，行高压紧凑才能拼出形状（term-art）。
const claudeWelcome: Frame[] = [
  { kind: 'line', text: ' ', delay: 0 },
  {
    kind: 'line',
    parts: [
      { text: ' ▐▛███▛█', tone: 'claude' },
      { text: '   Claude Code v2.1.289', tone: 'bold' },
    ],
    delay: 0,
  },
  {
    kind: 'line',
    parts: [
      { text: '▝▜██████▀', tone: 'claude' },
      { text: '  claude-opus-5-5 · API Usage Billing', tone: 'plain' },
    ],
    delay: 0,
  },
  {
    kind: 'line',
    parts: [
      { text: ' ▝▝   ▝▝', tone: 'claude' },
      { text: '   ~/projects/demo', tone: 'dim' },
    ],
    delay: 0,
  },
];

const en: Frame[] = [
  { kind: 'type', text: 'tf' },
  { kind: 'line', text: 'tf home', tone: 'bold', delay: 400 },
  { kind: 'line', text: '❯ Launch an AI tool  Choose Claude Code, Codex, OpenCode, or Pi', tone: 'choice', delay: 0 },
  { kind: 'line', text: '  Sign in            Save an API key or import from the web', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '  Check status       Inspect keys, models, and local setup', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '  Edit models        Adjust model slots for each tool', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '  Exit', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '↑↓ move   enter select   esc exit   type to filter', tone: 'dim', delay: 0 },
  // —— 回车，清屏进入工具列表 ——
  { kind: 'clear', text: '', delay: 1600 },
  { kind: 'line', text: 'Choose a tool to launch', tone: 'bold', delay: 150 },
  { kind: 'line', text: '❯ claude    claude-opus-5-5', tone: 'choice', delay: 0 },
  { kind: 'line', text: '  codex     gpt-5.6', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '  opencode  gemini-3.1-pro-high', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '  pi        gpt-5.6', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '  Back to home', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '↑↓ move   enter select   esc back to home   type to filter', tone: 'dim', delay: 0 },
  // —— 回车启动 claude ——
  { kind: 'clear', text: '', delay: 1600 },
  {
    kind: 'line',
    parts: [
      { text: 'tf', tone: 'bold' },
      { text: ' → claude' },
      { text: '   model ', tone: 'dim' },
      { text: 'claude-opus-5-5' },
    ],
    delay: 150,
  },
  ...claudeWelcome,
];

const zh: Frame[] = [
  { kind: 'type', text: 'tf' },
  { kind: 'line', text: 'tf 首页', tone: 'bold', delay: 400 },
  { kind: 'line', text: '❯ 启动 AI 工具  选择 Claude Code、Codex、OpenCode 或 Pi', tone: 'choice', delay: 0 },
  { kind: 'line', text: '  登录          保存 API Key 或从网页导入', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '  查看状态      查看 Key、模型和本地配置', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '  编辑模型      调整各工具的模型槽位', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '  退出', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '↑↓ 移动   enter 确认   esc 退出   直接输入可过滤', tone: 'dim', delay: 0 },
  // —— 回车，清屏进入工具列表 ——
  { kind: 'clear', text: '', delay: 1600 },
  { kind: 'line', text: '选择要启动的工具', tone: 'bold', delay: 150 },
  { kind: 'line', text: '❯ claude    claude-opus-5-5', tone: 'choice', delay: 0 },
  { kind: 'line', text: '  codex     gpt-5.6', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '  opencode  gemini-3.1-pro-high', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '  pi        gpt-5.6', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '  返回首页', tone: 'choice-dim', delay: 0 },
  { kind: 'line', text: '↑↓ 移动   enter 确认   esc 返回首页   直接输入可过滤', tone: 'dim', delay: 0 },
  // —— 回车启动 claude ——
  { kind: 'clear', text: '', delay: 1600 },
  {
    kind: 'line',
    parts: [
      { text: 'tf', tone: 'bold' },
      { text: ' → claude' },
      { text: '   模型 ', tone: 'dim' },
      { text: 'claude-opus-5-5' },
    ],
    delay: 150,
  },
  ...claudeWelcome,
];

export const heroSessions: Record<Locale, Frame[]> = { en, 'zh-cn': zh };
