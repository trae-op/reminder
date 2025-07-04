type TOpenLatestVersion = {
  updateFile: string;
};

type TWindowAuth = {
  provider: TProviders;
};

type TEventPayloadSend = {
  restart: undefined;
  windowClosePreload: undefined;
  user: undefined;
  logout: undefined;
  checkAuth: undefined;
  windowAuth: TWindowAuth;
  openLatestVersion: TOpenLatestVersion;
};

type TSend = {
  restart: () => void;
  windowClosePreload: () => void;
  user: () => void;
  checkAuth: () => void;
  logout: () => void;
  windowAuth: (payload: TEventPayloadSend["windowAuth"]) => void;
  openLatestVersion: (payload: TEventPayloadSend["openLatestVersion"]) => void;
};
