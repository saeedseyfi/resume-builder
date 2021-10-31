export const cn = (...args: unknown[]): string | undefined =>
  args.filter(Boolean).join(' ');
