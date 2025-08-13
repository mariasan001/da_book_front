export const isNonEmptyUrl = (s?: string) =>
  !!s && !!s.trim() && /^(https?:)?\/\//i.test(s.trim());
