import { mkdir } from "fs/promises";
import type { TPromiseCreateFolder } from "./types.js";
import { messages } from "../../../config.js";

export async function createFolder(
  folderPath: string
): Promise<TPromiseCreateFolder> {
  try {
    await mkdir(folderPath, { recursive: true });

    return {
      ok: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    } else {
      return {
        ok: false,
        message: messages.autoUpdater.errorCreatingFolder,
      };
    }
  }
}
