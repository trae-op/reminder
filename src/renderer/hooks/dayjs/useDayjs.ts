import { useEffect, useState } from "react";

let cachedDayjs: typeof import("dayjs") | undefined = undefined;

export function useDayjs() {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (cachedDayjs === undefined) {
      import("dayjs").then((mod) => {
        const instance = mod.default || mod;
        cachedDayjs = instance;
        setLoaded(true);
      });
    }
  }, []);

  if (isLoaded) {
    return cachedDayjs;
  }

  return undefined;
}
