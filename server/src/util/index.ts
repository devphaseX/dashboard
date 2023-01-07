function markPathAsAbsolute(path: string) {
  return (path.startsWith('/') ? path : `/${path}`).replace(/\\{1,}$/, '');
}

function getExternalSettlePromise<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reasons?: unknown) => void;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return { promise, resolve, reject };
}

export { markPathAsAbsolute, getExternalSettlePromise };
