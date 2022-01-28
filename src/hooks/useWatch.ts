import { useState, useMemo } from "react";

function useWatch(target: any, keys: any) {
  const [__, updateChangeId] = useState(0);

  // useMemo to prevent unnecessary calls
  return useMemo(() => {
    const descriptor = keys.reduce((acc: any, key: any) => {
      const internalKey = `@@__${key}__`;

      acc[key] = {
        enumerable: true,
        configurable: true,
        get() {
          return target[internalKey];
        },
        set(value: any) {
          if (target[internalKey] !== value) {
            target[internalKey] = value;
            updateChangeId((id) => id + 1); // <-- notify React about the change,
            // the value's not important
          }
        },
      };
      return acc;
    }, {});

    return Object.defineProperties(target, descriptor);
  }, [target, ...keys]);
}

export default useWatch;
