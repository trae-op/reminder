import { cacheReminders } from "../@shared/cache-responses.js";
import { notification } from "../@shared/notification.js";
import { showErrorMessages } from "../@shared/services/error-messages.js";
import { getElectronStorage } from "../@shared/store.js";

let intervalId: NodeJS.Timeout | null = null;

export function timer(): void {
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    const token = getElectronStorage("authToken");
    if (!token) {
      stopTimer();
      return;
    }

    const reminders = cacheReminders();
    if (!reminders) {
      return;
    }

    const currentDate: Date = new Date();
    const startOfCurrentDay: Date = new Date(currentDate);
    startOfCurrentDay.setHours(0, 0, 0, 0);
    const timeOnly: number =
      currentDate.getTime() - startOfCurrentDay.getTime();

    reminders.forEach((reminder) => {
      if (!reminder) return;

      if (reminder.isDaily) {
        if (typeof reminder.time !== "string") {
          showErrorMessages({
            title: "Time invalid!",
            body: `Invalid time type for daily reminder ${
              reminder.id
            }: expected string, got ${typeof reminder.time}`,
            isDialog: false,
          });
          return;
        }

        const reminderTime = extractLocalTimeFromIso(reminder.time);

        if (
          reminderTime &&
          timeOnly >= reminderTime &&
          timeOnly <= reminderTime + 1000
        ) {
          openNotification(reminder.name);
        }
      } else {
        if (typeof reminder.time !== "string") {
          showErrorMessages({
            title: "Time invalid!",
            body: `Missing or invalid time for one-time reminder ${reminder.id}: ${reminder.time}`,
            isDialog: false,
          });
          return;
        }

        if (reminder.date === undefined) {
          console.error("Missing date!");
          return;
        }

        const fullReminderDateTime: Date = new Date(reminder.date);

        if (isNaN(fullReminderDateTime.getTime())) {
          showErrorMessages({
            title: "Date invalid!",
            body: `Could not parse full date/time for one-time reminder ${reminder.id} from reminder.time: ${reminder.time}`,
            isDialog: false,
          });
          return;
        }

        const currentFullTime: number = Date.now();
        const reminderDate: string = extractLocalDateFromIso(
          reminder.date + ""
        );
        const currentDate = extractLocalDateFromIso(currentFullTime);
        const currentTime = extractLocalTimeFromIso(currentFullTime);
        const reminderTime = extractLocalTimeFromIso(reminder.time);

        if (
          reminderDate === currentDate &&
          currentTime &&
          reminderTime &&
          currentTime >= reminderTime &&
          currentTime <= reminderTime + 500
        ) {
          openNotification(reminder.name);
        }
      }
    });
  }, 1000);
}

export function stopTimer(): void {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function extractLocalDateFromIso(isoString: string | number): string {
  const dateObject: Date = new Date(isoString);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function extractLocalTimeFromIso(
  isoString: string | number
): number | undefined {
  const currentDate: Date = new Date();
  const dailyReminderSourceTime: Date = new Date(isoString);

  if (isNaN(dailyReminderSourceTime.getTime())) {
    showErrorMessages({
      title: "Time invalid!",
      body: "Could not parse time string for daily reminder",
      isDialog: false,
    });
    return;
  }

  const hours = dailyReminderSourceTime.getHours();
  const minutes = dailyReminderSourceTime.getMinutes();
  const seconds = dailyReminderSourceTime.getSeconds();

  const targetDateForDailyReminder: Date = new Date(currentDate);
  targetDateForDailyReminder.setHours(hours, minutes, seconds, 0);

  const startOfDayForReminder: Date = new Date(targetDateForDailyReminder);
  startOfDayForReminder.setHours(0, 0, 0, 0);

  return targetDateForDailyReminder.getTime() - startOfDayForReminder.getTime();
}

function openNotification(body: string) {
  if (notification) {
    notification.title = "PAY ATTENTION!";
    notification.body = body;
    notification.show();
  }
}
