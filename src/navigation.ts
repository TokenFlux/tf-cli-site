import { getRelativeLocaleUrl } from 'astro:i18n';
import { dictionaries, localeNames, locales, type Locale } from '~/i18n/ui';

const repo = 'https://github.com/TokenFlux/tf-cli';
const docs = 'https://docs.tokenflux.dev';

export function getHeaderData(locale: Locale) {
  const t = dictionaries[locale];
  const home = getRelativeLocaleUrl(locale);
  const other = locales.find((l) => l !== locale)!;
  return {
    links: [
      { text: t.nav.why, href: `${home}#why-tf` },
      { text: t.nav.install, href: `${home}#install` },
      { text: t.nav.docs, href: docs },
    ],
    actions: [
      { text: localeNames[other], href: getRelativeLocaleUrl(other), variant: 'tertiary' as const },
      { text: t.nav.github, href: repo, icon: 'tabler:brand-github' },
    ],
    homeHref: home,
    toggleMenuLabel: t.nav.toggleMenu,
    navLabel: t.nav.mainNav,
  };
}

export function getFooterData(locale: Locale) {
  const t = dictionaries[locale];
  const home = getRelativeLocaleUrl(locale);
  return {
    links: [
      {
        title: t.footer.product,
        links: [
          { text: t.footer.install, href: `${home}#install` },
          { text: t.footer.releases, href: `${repo}/releases` },
          { text: t.footer.source, href: repo },
        ],
      },
      {
        title: t.footer.tokenflux,
        links: [
          { text: t.footer.gateway, href: 'https://tokenflux.dev' },
          { text: t.footer.docs, href: docs },
          { text: t.footer.issues, href: `${repo}/issues` },
        ],
      },
    ],
    secondaryLinks: [
      { text: t.footer.license, href: `${repo}/blob/main/LICENSE` },
      { text: t.footer.security, href: `${repo}/blob/main/SECURITY.md` },
    ],
    socialLinks: [{ ariaLabel: t.footer.githubLabel, icon: 'tabler:brand-github', href: repo }],
    footNote: '© 2026 TokenFlux. Built with <a href="https://github.com/arthelokyo/astrowind">AstroWind</a>.',
  };
}
