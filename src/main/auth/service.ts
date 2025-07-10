import { restApi } from "../config.js";
import { get } from "../@shared/services/rest-api/service.js";
import { showErrorMessages } from "../@shared/services/error-messages.js";
import { TResponseSleep } from "./types.js";

export async function sleep<R extends TResponseSleep>(): Promise<
  R | undefined
> {
  const response = await get<R>(
    `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth.sleep}`
  );

  if (response.error !== undefined) {
    showErrorMessages({
      title: "Error request by sleep",
      body: response.error.message,
      isDialog: false,
    });
  }

  return response.data;
}
