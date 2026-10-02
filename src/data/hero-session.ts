import type { Locale } from '~/i18n/ui';

export type FrameTone = 'plain' | 'dim' | 'ok' | 'bold' | 'prompt' | 'choice' | 'choice-dim';

export interface Segment {
  text: string;
  tone?: FrameTone;
}

export type Frame =
  { kind: 'type'; text: string } | { kind: 'line'; text?: string; parts?: Segment[]; tone?: FrameTone; delay?: number };

// 会话内容与 tf v0.10.0 的真实输出逐行对应（internal/cli/web_import.go、
// cmd_login.go、cmd_launch.go、internal/ui/select.go）。模型数量、分组名
// 与端口是演示数据，格式与文案不是。

const en: Frame[] = [
  { kind: 'type', text: 'tf login' },
  { kind: 'line', text: 'Waiting for web import', tone: 'bold', delay: 600 },
  { kind: 'line', text: '  listen   http://127.0.0.1:52891', delay: 250 },
  { kind: 'line', text: '  open     https://tokenflux.dev/keys#tfcli=1.52891.…', delay: 250 },
  { kind: 'line', text: 'Web import received', tone: 'bold', delay: 1400 },
  { kind: 'line', text: '  group    Max #12', delay: 200 },
  { kind: 'line', text: '  key      sk-tfx…9k2z  "max"', delay: 200 },
  { kind: 'line', text: '  name     assigned automatically after validation', delay: 200 },
  { kind: 'line', text: 'Write to ~/.config/tf/credentials.json?', tone: 'prompt', delay: 700 },
  { kind: 'line', text: '❯ write', tone: 'choice', delay: 900 },
  { kind: 'line', text: '✓ saved as key "ccmax"', tone: 'ok', delay: 650 },
  {
    kind: 'line',
    parts: [{ text: '  models   6 ' }, { text: 'claude-opus-5-5, claude-sonnet-5-5, …', tone: 'dim' }],
    delay: 200,
  },
  { kind: 'line', text: '  can run  claude pi', delay: 200 },
  { kind: 'type', text: 'tf claude' },
  { kind: 'line', text: 'Pick the main model for claude', tone: 'prompt', delay: 450 },
  { kind: 'line', text: '❯ claude-opus-5-5    ccmax/', tone: 'choice', delay: 250 },
  { kind: 'line', text: '  claude-sonnet-5-5  ccmax/', tone: 'choice-dim', delay: 250 },
  {
    kind: 'line',
    parts: [
      { text: 'tf', tone: 'bold' },
      { text: ' → claude' },
      { text: '   model ', tone: 'dim' },
      { text: 'claude-opus-5-5' },
    ],
    delay: 1000,
  },
];

const zh: Frame[] = [
  { kind: 'type', text: 'tf login' },
  { kind: 'line', text: '等待网页导入', tone: 'bold', delay: 600 },
  { kind: 'line', text: '  监听    http://127.0.0.1:52891', delay: 250 },
  { kind: 'line', text: '  打开    https://tokenflux.dev/keys#tfcli=1.52891.…', delay: 250 },
  { kind: 'line', text: '收到网页导入请求', tone: 'bold', delay: 1400 },
  { kind: 'line', text: '  分组    Max #12', delay: 200 },
  { kind: 'line', text: '  Key     sk-tfx…9k2z  "max"', delay: 200 },
  { kind: 'line', text: '  名称    校验后自动命名', delay: 200 },
  { kind: 'line', text: '写入 ~/.config/tf/credentials.json？', tone: 'prompt', delay: 700 },
  { kind: 'line', text: '❯ 写入', tone: 'choice', delay: 900 },
  { kind: 'line', text: '✓ 已保存为 Key "ccmax"', tone: 'ok', delay: 650 },
  {
    kind: 'line',
    parts: [{ text: '  模型    6 ' }, { text: 'claude-opus-5-5, claude-sonnet-5-5, …', tone: 'dim' }],
    delay: 200,
  },
  { kind: 'line', text: '  可用于  claude pi', delay: 200 },
  { kind: 'type', text: 'tf claude' },
  { kind: 'line', text: '为 claude 选择主模型', tone: 'prompt', delay: 450 },
  { kind: 'line', text: '❯ claude-opus-5-5    ccmax/', tone: 'choice', delay: 250 },
  { kind: 'line', text: '  claude-sonnet-5-5  ccmax/', tone: 'choice-dim', delay: 250 },
  {
    kind: 'line',
    parts: [
      { text: 'tf', tone: 'bold' },
      { text: ' → claude' },
      { text: '   模型 ', tone: 'dim' },
      { text: 'claude-opus-5-5' },
    ],
    delay: 1000,
  },
];

export const heroSessions: Record<Locale, Frame[]> = { en, 'zh-cn': zh };
