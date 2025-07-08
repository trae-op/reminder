import { ipcMainOn } from "../@shared/utils.js";
import { timer } from "./service.js";

export function registerIpc(): void {
  ipcMainOn("startScheduler", () => {
    timer();
  });
}
