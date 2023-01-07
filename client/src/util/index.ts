function pathMatch(current: string, expected: string) {
  current = current.replace(/^\\/, '').toLowerCase();
  expected = expected.replace(/^\\/, '').toLowerCase();
  return current === expected;
}

export { pathMatch };
