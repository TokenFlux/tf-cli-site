export const locales = ['en', 'zh-cn'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  'zh-cn': '中文',
};

const en = {
  meta: {
    title: 'tf · One command for every AI coding client',
    description:
      'tf launches Claude Code, Codex, OpenCode and Pi against TokenFlux or your self-hosted TokenRouter — gateway keys, model routing and model slots injected per process. Open source under Apache-2.0.',
  },
  nav: {
    why: 'Why tf',
    install: 'Install',
    docs: 'Docs',
    github: 'GitHub',
    toggleMenu: 'Toggle navigation menu',
    mainNav: 'Main navigation',
  },
  hero: {
    tagline: 'Open source · Apache-2.0 · Built for the terminal',
    title: 'One command.<br />Every AI coding client.',
    offer: 'Your AI coding tools, one entry point.',
    description:
      'tf manages gateway keys, model routing and model slots.<br />Your clients work exactly the way they always did.',
    install: 'Install tf',
    source: 'View source',
    releaseSuffix: 'is out',
    terminalLabel:
      'Terminal session: tf login imports a key from the browser, tf claude picks a main model and launches Claude Code.',
  },
  clients: {
    caption: 'The clients you know.<br />One entry point.',
  },
  stats: [
    { value: '4', label: 'Coding clients' },
    { value: '5', label: 'Platform binaries' },
    { value: '6', label: 'npm packages' },
    { value: '0', label: 'Runtime dependencies' },
  ],
  why: {
    tagline: 'Less setup, more focus',
    title: 'Switch tools without starting over.',
    subtitle: 'Let tf handle the connection. Your client handles the code.',
    link: 'Learn more',
    items: [
      {
        title: 'Your config stays untouched',
        visual: 'inject',
        description:
          'Gateway settings are injected into the child process environment and launch arguments only. tf never rewrites the global config of Claude, Codex or Pi — and leaves nothing behind on exit.',
        icon: 'tabler:layers-intersect',
      },
      {
        title: 'Every key knows its job',
        visual: 'keys',
        description:
          'Key bindings live per client, so work and personal accounts stay isolated. Pass -k to borrow another key once without touching tomorrow\u2019s default.',
        icon: 'tabler:key',
      },
      {
        title: 'Slots beyond the main model',
        visual: 'slots',
        description:
          'Summary, title and review slots are configured alongside the chat model, so background tasks stop failing silently on a missing default.',
        icon: 'tabler:adjustments-horizontal',
      },
      {
        title: 'Verified before launch',
        visual: 'probe',
        description:
          'Zero-token probing filters models your key and protocol can actually run, and tf status surfaces quota and config conflicts before they bite.',
        icon: 'tabler:shield-check',
      },
    ],
  },
  workflow: {
    eyebrow: 'Your choices stick',
    title: 'Try a different model tonight,<br />keep your defaults tomorrow.',
    copy: 'One-off flags affect only this launch. Test another model, borrow the work account, or raise the reasoning effort — your tuned defaults stay exactly where you left them.',
    link: 'Read more in TokenDocs',
    examples: [
      { label: 'Switch model', cmd: 'tf claude -m' },
      { label: 'Switch account', cmd: 'tf codex -k work' },
      { label: 'Think harder', cmd: 'tf pi -e high' },
      { label: 'Resume session', cmd: 'tf claude -- --resume' },
    ],
  },
  trust: {
    strong: 'Connect to gateways you trust.',
    copy: 'Works with TokenFlux or a self-hosted TokenRouter. Keys live on your machine with 0600 permissions; tf never proxies your traffic and collects no telemetry.',
    link: 'Read the security boundaries',
  },
  install: {
    tagline: 'Get started',
    title: 'One install command away.',
    subtitle: 'Free and open source. Model usage is billed by the gateway you connect.',
    methodLabel: 'Install method',
    methods: [
      {
        id: 'npm',
        name: 'npm',
        command: 'npm install -g @tokenflux/tf',
        note: 'Requires Node.js 18+. Works on macOS, Linux and Windows.',
      },
      {
        id: 'shell',
        name: 'macOS / Linux',
        command: 'curl -fsSL https://raw.githubusercontent.com/tokenflux/tf-cli/main/install.sh | sh',
        note: 'Standalone binary, no Node.js required. Installs to ~/.local/bin, no sudo needed.',
      },
      {
        id: 'powershell',
        name: 'Windows',
        command: 'irm https://raw.githubusercontent.com/tokenflux/tf-cli/main/install.ps1 | iex',
        note: 'PowerShell 5.1 or 7. Installs to %USERPROFILE%\\.local\\bin without admin rights.',
      },
      {
        id: 'once',
        name: 'One-off run',
        command: 'npx @tokenflux/tf status',
        note: 'Run via npx without a global install. Reading status requires a saved key first.',
      },
    ],
    copy: 'Copy command',
    copied: 'Command copied',
    copyFailed: 'Clipboard unavailable — command selected',
    onboarding: [
      {
        step: '01',
        cmd: 'tf login',
        desc: 'Import a key from your browser or paste one, then confirm in the terminal.',
      },
      { step: '02', cmd: 'tf claude', desc: 'Pick the main model once; tf fills the auxiliary slots for you.' },
      { step: '03', cmd: 'tf status', desc: 'Quota, bindings and config conflicts at a glance — offline by default.' },
    ],
    linksPrefix: 'Windows is supported via PowerShell and Git Bash.',
    linksDocs: 'Open TokenDocs',
    linksReleases: 'Binaries for every platform',
  },
  faq: {
    tagline: 'Before you start',
    title: 'You might still wonder',
    items: [
      {
        title: 'How does tf-cli relate to TokenFlux?',
        description:
          'tf-cli is an open-source launcher and credential manager for coding clients. You can point it at the TokenFlux gateway or at your own TokenRouter deployment via --host. It is not another chat client.',
      },
      {
        title: 'Does tf-cli cost anything?',
        description:
          'tf-cli is Apache-2.0 and free. Model calls consume the quota of the gateway you connect to; pricing and available models are decided by that gateway.',
      },
      {
        title: 'Will it modify my existing client config?',
        description:
          'No global config is written. tf keeps its own credentials and bindings, and injects them into the child process at launch. Existing client settings can still override the injection — tf status warns you when it detects a conflict.',
      },
      {
        title: 'Can I use it in CI or containers?',
        description:
          'Yes. Inject a key with the TF_API_KEY environment variable, no local credential needed. Combine with --no-input and explicit model flags; pass --host explicitly for self-hosted gateways.',
      },
    ],
  },
  closing: {
    eyebrow: 'Leave the wiring to the tool',
    title: 'Back to your next commit.',
    install: 'Install tf',
    docs: 'Open TokenDocs',
  },
  footer: {
    product: 'Product',
    install: 'Install tf',
    releases: 'Release notes',
    source: 'Source code',
    tokenflux: 'TokenFlux',
    gateway: 'Gateway service',
    docs: 'TokenDocs',
    issues: 'Report an issue',
    license: 'Apache-2.0',
    security: 'Security policy',
    githubLabel: 'tf-cli on GitHub',
  },
};

export type Dictionary = typeof en;

const zh: Dictionary = {
  meta: {
    title: 'tf · AI 编程工具的统一入口',
    description:
      '一条 tf 命令，启动 Claude Code、Codex、OpenCode 和 Pi。管理网关凭据与模型，不改客户端全局配置。开源，免费，支持 TokenFlux 与自建 TokenRouter。',
  },
  nav: {
    why: '为什么用 tf',
    install: '安装',
    docs: '文档',
    github: 'GitHub',
    toggleMenu: '切换导航菜单',
    mainNav: '主导航',
  },
  hero: {
    tagline: '开源 · 免费 · 为终端而生',
    title: '一条命令。<br />每个 AI 编程客户端。',
    offer: '你的 AI 编程工具，一个入口。',
    description: '管理网关、Key 和模型。<br />不改变你熟悉的工作方式。',
    install: '安装 tf',
    source: '查看源码',
    releaseSuffix: '已发布',
    terminalLabel: '终端会话：tf login 从浏览器导入 Key，tf claude 选择主模型并启动 Claude Code。',
  },
  clients: {
    caption: '熟悉的客户端，<br />同一个入口。',
  },
  stats: [
    { value: '4', label: '编程客户端' },
    { value: '5', label: '平台二进制' },
    { value: '6', label: 'npm 包' },
    { value: '0', label: '运行时依赖' },
  ],
  why: {
    tagline: '少一点配置，多一点专注',
    title: '换工具，不用重来一遍。',
    subtitle: '把连接的事情交给 tf，把编程的事情留给你的客户端。',
    link: '了解更多',
    items: [
      {
        title: '原来的配置，留在原处',
        visual: 'inject',
        description:
          '仅通过子进程环境和启动参数注入网关配置。不改 Claude、Codex 或 Pi 的全局配置文件，退出后不留下配置覆盖。',
        icon: 'tabler:layers-intersect',
      },
      {
        title: '不同的 Key，各司其职',
        visual: 'keys',
        description: '按客户端保存 Key 绑定，工作和个人账户各自独立。临时用 -k 换一把，不影响下次的默认选择。',
        icon: 'tabler:key',
      },
      {
        title: '主模型之外，也配置好',
        visual: 'slots',
        description: '不只管理对话模型，也照顾摘要、标题和代码审查的模型槽，后台任务不再因缺省配置静默失败。',
        icon: 'tabler:adjustments-horizontal',
      },
      {
        title: '启动前先验证',
        visual: 'probe',
        description: '零 token 探测过滤 Key 与协议实际可用的模型，tf status 提前暴露额度与配置冲突。',
        icon: 'tabler:shield-check',
      },
    ],
  },
  workflow: {
    eyebrow: '你的选择，始终有效',
    title: '这一次换模型，<br />不用改变下一次。',
    copy: '临时参数只影响当前启动。想试另一个模型、换工作账户，或调高思考强度，都不必改掉已经顺手的默认配置。',
    link: '在 TokenDocs 了解更多',
    examples: [
      { label: '换模型', cmd: 'tf claude -m' },
      { label: '换账户', cmd: 'tf codex -k work' },
      { label: '多想一步', cmd: 'tf pi -e high' },
      { label: '继续上次会话', cmd: 'tf claude -- --resume' },
    ],
  },
  trust: {
    strong: '连接可信的网关。',
    copy: '支持 TokenFlux 与自建 TokenRouter。Key 以明文保存在本机，文件权限为 0600；tf 不代理会话流量，也不采集遥测。',
    link: '了解安全边界',
  },
  install: {
    tagline: '开始使用',
    title: '从一条安装命令开始。',
    subtitle: '工具免费开源。模型调用费用由你连接的网关计费。',
    methodLabel: '安装方式',
    methods: [
      {
        id: 'npm',
        name: 'npm',
        command: 'npm install -g @tokenflux/tf',
        note: '需要 Node.js 18+。支持 macOS、Linux 和 Windows。',
      },
      {
        id: 'shell',
        name: 'macOS / Linux',
        command: 'curl -fsSL https://raw.githubusercontent.com/tokenflux/tf-cli/main/install.sh | sh',
        note: '独立二进制，无需 Node.js。默认安装到 ~/.local/bin，不需要 sudo。',
      },
      {
        id: 'powershell',
        name: 'Windows',
        command: 'irm https://raw.githubusercontent.com/tokenflux/tf-cli/main/install.ps1 | iex',
        note: 'PowerShell 5.1 / 7，安装到 %USERPROFILE%\\.local\\bin，不需要管理员权限。',
      },
      {
        id: 'once',
        name: '单次运行',
        command: 'npx @tokenflux/tf status',
        note: '通过 npx 运行，不做全局安装。查看状态需要先保存本地 Key。',
      },
    ],
    copy: '复制命令',
    copied: '已复制命令',
    copyFailed: '无法访问剪贴板，命令已选中',
    onboarding: [
      { step: '01', cmd: 'tf login', desc: '从网页导入或粘贴 Key，在终端确认。' },
      { step: '02', cmd: 'tf claude', desc: '主模型只选一次，辅助槽位自动填充。' },
      { step: '03', cmd: 'tf status', desc: '额度、绑定与配置冲突一目了然，默认不联网。' },
    ],
    linksPrefix: 'Windows 可通过 PowerShell 或 Git Bash 使用。',
    linksDocs: '查看 TokenDocs',
    linksReleases: '下载其他平台二进制',
  },
  faq: {
    tagline: '开始之前',
    title: '你可能还想知道',
    items: [
      {
        title: 'tf-cli 和 TokenFlux 是什么关系？',
        description:
          'tf-cli 是开源的客户端启动与凭据管理工具。你可以连接 TokenFlux 网关，也可以通过 --host 连接自己部署的 TokenRouter。它不是一个新的聊天客户端。',
      },
      {
        title: '使用 tf-cli 需要付费吗？',
        description:
          'tf-cli 使用 Apache-2.0 许可证，工具本身免费。模型调用会消耗你所连接网关的额度，费用和可用模型由网关服务决定。',
      },
      {
        title: '会改动我原来的客户端配置吗？',
        description:
          '不会写入客户端的全局配置。tf 管理自己的凭据与绑定，在启动时注入当前子进程。已有客户端设置仍可能覆盖注入；tf status 会提示已检测到的冲突。',
      },
      {
        title: '可以在 CI 或容器中使用吗？',
        description:
          '可以。通过环境变量 TF_API_KEY 注入 Key，无需先保存本地凭据。配合 --no-input 与明确的模型参数使用；自建网关请显式指定 --host。',
      },
    ],
  },
  closing: {
    eyebrow: '把配置留给工具',
    title: '回到你的下一次提交。',
    install: '安装 tf-cli',
    docs: '打开 TokenDocs',
  },
  footer: {
    product: '产品',
    install: '安装 tf-cli',
    releases: '版本记录',
    source: '源代码',
    tokenflux: 'TokenFlux',
    gateway: '网关服务',
    docs: 'TokenDocs',
    issues: '问题反馈',
    license: 'Apache-2.0',
    security: '安全策略',
    githubLabel: 'tf-cli on GitHub',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, 'zh-cn': zh };
