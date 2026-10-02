import type { Locale } from '~/i18n/ui';

export type FrameTone = 'plain' | 'dim' | 'ok' | 'prompt' | 'choice' | 'choice-dim';

export type Frame = { kind: 'type'; text: string } | { kind: 'line'; text: string; tone?: FrameTone; delay?: number };

const en: Frame[] = [
  { kind: 'type', text: 'tf login' },
  { kind: 'line', text: 'Opening TokenFlux Keys in your browser…', tone: 'dim', delay: 500 },
  { kind: 'line', text: 'Confirm import in terminal [y/N]: y', tone: 'plain', delay: 900 },
  { kind: 'line', text: '✓ Saved as key "max" — 2 groups, 41 models', tone: 'ok', delay: 650 },
  { kind: 'type', text: 'tf claude' },
  { kind: 'line', text: 'Pick the main model for claude', tone: 'prompt', delay: 450 },
  { kind: 'line', text: '❯ claude-opus-4-6        flagship', tone: 'choice', delay: 250 },
  { kind: 'line', text: '  claude-sonnet-4-6      balanced', tone: 'choice-dim', delay: 250 },
  { kind: 'line', text: '✓ claude · max · claude-opus-4-6', tone: 'ok', delay: 900 },
  { kind: 'line', text: 'Launching Claude Code against TokenFlux…', tone: 'dim', delay: 500 },
];

const zh: Frame[] = [
  { kind: 'type', text: 'tf login' },
  { kind: 'line', text: '正在浏览器中打开 TokenFlux Keys 页面…', tone: 'dim', delay: 500 },
  { kind: 'line', text: '在终端确认导入 [y/N]: y', tone: 'plain', delay: 900 },
  { kind: 'line', text: '✓ 已保存为 Key "max" — 2 个分组，41 个模型', tone: 'ok', delay: 650 },
  { kind: 'type', text: 'tf claude' },
  { kind: 'line', text: '为 claude 选择主模型', tone: 'prompt', delay: 450 },
  { kind: 'line', text: '❯ claude-opus-4-6        旗舰', tone: 'choice', delay: 250 },
  { kind: 'line', text: '  claude-sonnet-4-6      均衡', tone: 'choice-dim', delay: 250 },
  { kind: 'line', text: '✓ claude · max · claude-opus-4-6', tone: 'ok', delay: 900 },
  { kind: 'line', text: '正在通过 TokenFlux 启动 Claude Code…', tone: 'dim', delay: 500 },
];

export const heroSessions: Record<Locale, Frame[]> = { en, 'zh-cn': zh };
