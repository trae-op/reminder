import dotenv from "dotenv";

dotenv.config();

export const windows: TWindows = {
  main: "window:main",
  updateApp: "window:update-app",
  preloadApp: "window:preload-app",
  auth: "window:auth",
  addReminder: "window/reminder/add",
  updateReminder: "window/reminder/update",
  deleteReminder: "window/reminder/delete",
};

export const folders = {
  distRenderer: "dist-renderer",
  distMain: "dist-main",
  download: "app-update",
};

export const menu = {
  labels: {
    app: "App",
    checkUpdate: "Check for updates...",
    showApp: "Show",
    quit: "Quit",
    devTools: "Developer tools",
  },
};

export const icons = {
  trayIconTemplate: "trayIconTemplate.png",
  trayIcon: "trayIcon.png",
  notificationIcon: "72x72.png",
};

export const messages = {
  autoUpdater: {
    checkingForUpdate: "Checking for update...",
    updateNotAvailable: "Update not available",
    updateAvailable: "Update available",
    updateDownloaded: "Update downloaded",
    notificationTitle: "New updates",
    notificationBody: "Your app has new updates!",
    error: "Something wrong!",
    errorCreatingFolder: "Unknown error creating folder",
    errorOpenFolder: "Failed to open folder",
    errorVerifyDownload: "File does not exist",
  },
  crash: {
    uncaughtException: "Uncaught synchronous error in main process!",
    unhandledRejection: "Unhandled Promise failure in main process!",
    renderProcessGone: "The renderer process terminated unexpectedly!",
  },
  auth: {
    errorTokenUserMissing: "Token or userId is missing!",
    userAlreadyExists: "User already exists!",
  },
};

export const publishOptions = {
  repo: "reminder",
  owner: "trae-op",
};

export const restApi = {
  urls: {
    base: process.env.BASE_REST_API,
    baseApi: "/api",
    auth: {
      base: "/auth",
      google: "/google",
      facebook: "/facebook",
      sleep: "/sleep",
    },
    user: {
      base: "/user",
      byId: (id: string) => `/${id}`,
    },
    reminders: {
      base: "/reminders",
      byId: (id: string) => `/${id}`,
    },
    githubReleases: `https://api.github.com/repos/${publishOptions.owner}/${publishOptions.repo}/releases`,
  },
};

export const timers = {
  intervalCheckSleep: 60000,
  intervalScheduler: 500,
  deviation: 1000,
};
