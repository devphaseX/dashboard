function pathMatch(current: string, expected: string) {
  current = current.replace(/^\//, '').toLowerCase();
  expected = expected.replace(/^\//, '').toLowerCase();
  return current === expected;
}

function dropEmptyProps<ObjectData extends object>(
  data: ObjectData,
  predicate: (
    key: keyof ObjectData,
    value: ObjectData[keyof ObjectData]
  ) => boolean
) {
  const result = {} as Partial<ObjectData>;
  const keys = Object.keys(data) as Array<keyof ObjectData>;

  keys.forEach((key) => {
    if (!predicate(key, data[key])) {
      result[key] = data[key];
    }
  });
  return result;
}

export { pathMatch, dropEmptyProps };
