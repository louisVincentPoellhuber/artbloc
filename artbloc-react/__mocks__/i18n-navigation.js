/**
 * Vitest stub for @/i18n/navigation.
 *
 * next-intl's createNavigation calls next/navigation (useRouter etc.) which
 * can't resolve inside the jsdom test environment. This stub replaces the
 * whole module with a plain <a> Link so unit tests can assert href and
 * children without Next.js router context.
 */
export function Link({ href, children, ...rest }) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
