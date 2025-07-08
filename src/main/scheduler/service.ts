import { cacheReminders } from "../@shared/cache-responses.js";
import { notification } from "../@shared/notification.js";
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
    const now: number = currentDate.getTime() - startOfCurrentDay.getTime();

    reminders.forEach((reminder) => {
      if (!reminder) return;

      if (reminder.isDaily) {
        if (typeof reminder.time !== "string") {
          console.error(
            `Invalid time type for daily reminder ${
              reminder.id
            }: expected string, got ${typeof reminder.time}`
          );
          return;
        }

        const dailyReminderSourceTime: Date = new Date(reminder.time);

        if (isNaN(dailyReminderSourceTime.getTime())) {
          console.error(
            `Could not parse time string for daily reminder ${reminder.id}: ${reminder.time}`
          );
          return;
        }

        const hours = dailyReminderSourceTime.getHours();
        const minutes = dailyReminderSourceTime.getMinutes();
        const seconds = dailyReminderSourceTime.getSeconds();

        const targetDateForDailyReminder: Date = new Date(currentDate);
        targetDateForDailyReminder.setHours(hours, minutes, seconds, 0);

        const startOfDayForReminder: Date = new Date(
          targetDateForDailyReminder
        );
        startOfDayForReminder.setHours(0, 0, 0, 0);

        const reminderTime: number =
          targetDateForDailyReminder.getTime() -
          startOfDayForReminder.getTime();

        if (now >= reminderTime && now <= reminderTime + 1000) {
          if (notification) {
            notification.title = "PAY ATTENTION!";
            notification.body = reminder.name;
            notification.show();
          }
        }
      } else {
        if (typeof reminder.time !== "string") {
          console.error(
            `Missing or invalid time for one-time reminder ${reminder.id}: ${reminder.time}`
          );
          return;
        }

        const fullReminderDateTime: Date = new Date(reminder.time);

        if (isNaN(fullReminderDateTime.getTime())) {
          console.error(
            `Could not parse full date/time for one-time reminder ${reminder.id} from reminder.time: ${reminder.time}`
          );

          return;
        }

        const currentFullTime: number = currentDate.getTime();

        if (
          currentFullTime >= fullReminderDateTime.getTime() &&
          currentFullTime <= fullReminderDateTime.getTime() + 2000
        ) {
          console.log(`One-time reminder ${reminder.id} is triggered`);
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
