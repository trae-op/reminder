import { restApi } from "../config.js";
import { getElectronStorage } from "./store.js";

export function cacheUser(userId: string | undefined): TUser | undefined {
  let user: TUser | undefined = undefined;
  const cacheResponse = getElectronStorage("response");

  if (cacheResponse !== undefined && userId !== undefined) {
    user =
      cacheResponse[
        `${restApi.urls.base}${restApi.urls.baseApi}${
          restApi.urls.user.base
        }${restApi.urls.user.byId(userId)}`
      ];
  }

  if (user !== undefined) {
    return user;
  }

  return undefined;
}

export function cacheReminders(): TReminder[] | undefined {
  let reminders: TReminder[] | undefined = undefined;
  const cacheResponse = getElectronStorage("response");

  if (cacheResponse !== undefined) {
    reminders =
      cacheResponse[
        `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.reminders.base}`
      ];
  }

  if (reminders !== undefined) {
    return reminders;
  }

  return undefined;
}
