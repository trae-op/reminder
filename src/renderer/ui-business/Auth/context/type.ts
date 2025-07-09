export type TContext = {
  isAuthenticated: boolean | undefined;
  isSleepOff: boolean;
};

export type TContextActions = {
  logout: () => void;
  setAuthenticated: (value: boolean) => void;
  setSleepOff: React.Dispatch<React.SetStateAction<TContext["isSleepOff"]>>;
};
