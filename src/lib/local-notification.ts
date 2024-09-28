import {
  LocalNotifications,
  LocalNotificationSchema,
} from "@capacitor/local-notifications";
import { Preferences } from "@capacitor/preferences";

import { subMinutes } from "date-fns";
import { LocalNotificationFormPayload } from "@/components/set-schedule-drawer/set-schedule-drawer";
import { Schedule } from "@/models/schedule";
import {
  NOTIFICATION_IDS_KEY,
  NOTIFICATION_REMINDER_KEY,
} from "@/models/constants";
import { ReminderData, ReminderStore } from "@/models/reminders";

export const scheduleNotification = async (
  stationName: string,
  schedule: Schedule,
  payload: LocalNotificationFormPayload
) => {
  const { value: idsLS } = await Preferences.get({ key: NOTIFICATION_IDS_KEY });
  const ids = idsLS ? Number(idsLS) : 0;

  const { value: reminderLS } = await Preferences.get({
    key: NOTIFICATION_REMINDER_KEY,
  });
  const reminders = reminderLS ? (JSON.parse(reminderLS) as ReminderStore) : {};

  //exact notification settings

  // Request permission to display notifications
  await LocalNotifications.requestPermissions();
  const { beforeMinutes = 0, days } = payload;
  const { timeEstimated } = schedule;
  const dateObj = new Date();
  const [hours, minutes] = timeEstimated.split(".").map(Number);
  dateObj.setHours(hours);
  dateObj.setMinutes(minutes);
  const scheduledAt = subMinutes(dateObj, beforeMinutes ? beforeMinutes : 15);

  // Schedule the notification
  const scheduleList: LocalNotificationSchema[] = [];
  days.forEach(async (weekday) => {
    await Preferences.set({
      key: NOTIFICATION_IDS_KEY,
      value: JSON.stringify(ids + 1),
    });

    scheduleList.push({
      title: "Weekday Notification",
      body: "This is a weekday notification!",
      id: ids,
      schedule: {
        allowWhileIdle: true,
        on: {
          weekday,
          hour: scheduledAt.getHours(),
          minute: scheduledAt.getMinutes(),
        },
        repeats: true,
      },
    });
  });

  const result = await LocalNotifications.schedule({
    notifications: scheduleList,
  });

  const notificationIds = result.notifications.map((item) => item.id);

  console.log(days, result);

  const notificationReminderPayload: ReminderData = {
    id: schedule.id,
    destination: schedule.destination,
    line: schedule.line,
    notificationIds,
    trainId: schedule.trainId,
    stationName,
    beforeMinutes,
    days,
  };
  reminders[schedule.id] = notificationReminderPayload;

  await Preferences.set({
    key: NOTIFICATION_REMINDER_KEY,
    value: JSON.stringify(reminders),
  });
};
