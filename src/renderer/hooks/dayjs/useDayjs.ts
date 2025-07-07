import { useEffect, useState } from "react";

type TDayjs = typeof import("dayjs") | null;
let cachedDayjs: TDayjs = null;

export function useDayjs() {
  const [dayjs, setDayjs] = useState<TDayjs>(cachedDayjs);

  useEffect(() => {
    if (!cachedDayjs) {
      let isMounted = true;
      import("dayjs").then((mod) => {
        const instance = mod.default || mod;
        cachedDayjs = instance;
        if (isMounted) setDayjs(instance);
      });
      return () => {
        isMounted = false;
      };
    }

    setDayjs(cachedDayjs);
  }, []);

  return dayjs;
}
