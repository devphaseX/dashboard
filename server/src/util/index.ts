function markPathAsAbsolute(path: string) {
  return (path.startsWith('/') ? path : `/${path}`).replace(/\\{1,}$/, '');
}

export { markPathAsAbsolute };
