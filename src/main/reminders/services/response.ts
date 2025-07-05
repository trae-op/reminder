import { restApi } from "../../config.js";
import {
  del,
  post,
  get,
  put,
} from "../../@shared/services/rest-api/service.js";
import type { TPostBody, TPutBody } from "./types.js";
import { showErrorMessages } from "../../@shared/services/error-messages.js";
import { ApiError } from "../../@shared/services/rest-api/types.js";

export async function byId<R extends TReminder>(
  id: string
): Promise<R | undefined> {
  const response = await get<R>(
    `${restApi.urls.base}${restApi.urls.baseApi}${
      restApi.urls.reminders.base
    }${restApi.urls.reminders.byId(id)}`
  );

  if (response.error !== undefined) {
    errorMessages(response.error);
    return;
  }

  return response.data;
}

export async function deleteById<R extends TReminder>(
  id: string
): Promise<R | undefined> {
  const response = await del<R>(
    `${restApi.urls.base}${restApi.urls.baseApi}${
      restApi.urls.reminders.base
    }${restApi.urls.reminders.byId(id)}`
  );

  if (response.error !== undefined) {
    errorMessages(response.error);
    return;
  }

  return response.data;
}

export async function add<R extends TReminder>(
  body: TPostBody
): Promise<R | undefined> {
  const response = await post<R>(
    `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.reminders.base}`,
    body
  );

  if (response.error !== undefined) {
    errorMessages(response.error);
    return;
  }

  return response.data;
}

export async function update<R extends TReminder>(
  id: string,
  body: TPutBody
): Promise<R | undefined> {
  const response = await put<R>(
    `${restApi.urls.base}${restApi.urls.baseApi}${
      restApi.urls.reminders.base
    }${restApi.urls.reminders.byId(id)}`,
    body
  );

  if (response.error !== undefined) {
    errorMessages(response.error);
    return;
  }

  return response.data;
}

export async function list<R extends TReminder[]>(): Promise<R | undefined> {
  const response = await get<R>(
    `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.reminders.base}`,
    {
      isCache: true,
    }
  );

  if (response.error !== undefined) {
    errorMessages(response.error);
    return;
  }

  return response.data;
}

function errorMessages(apiError: ApiError) {
  showErrorMessages({
    title: `Something wrong with server! ${apiError.code || ""}`,
    body: apiError.message,
  });
}
