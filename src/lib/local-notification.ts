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
  let lastID = idsLS ? Number(idsLS) : 0;

  const { value: reminderLS } = await Preferences.get({
    key: NOTIFICATION_REMINDER_KEY,
  });
  const reminders = reminderLS ? (JSON.parse(reminderLS) as ReminderStore) : {};

  //exact notification settings

  // Request permission to display notifications
  const { display } = await LocalNotifications.requestPermissions();

  if (display !== "granted") return;

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
    lastID += 1;

    scheduleList.push({
      title: `Kereta ${stationName}-${schedule.destination}`,
      body: `Akan berangkat pada: ${schedule.timeEstimated} WIB`,
      id: lastID,
      schedule: {
        allowWhileIdle: true,
        on: {
          weekday,
          hour: scheduledAt.getHours(),
          minute: scheduledAt.getMinutes(),
        },
      },
    } satisfies LocalNotificationSchema);
  });

  const result = await LocalNotifications.schedule({
    notifications: scheduleList,
  });

  const notificationIds = result.notifications.map((item) => item.id);

  const notificationReminderPayload: ReminderData = {
    id: schedule.id,
    destination: schedule.destination,
    line: schedule.line,
    notificationIds,
    trainId: schedule.trainId,
    stationName,
    beforeMinutes,
    days,
    timeEstimated,
  };
  reminders[schedule.id] = notificationReminderPayload;

  await Preferences.set({
    key: NOTIFICATION_REMINDER_KEY,
    value: JSON.stringify(reminders),
  });

  await Preferences.set({
    key: NOTIFICATION_IDS_KEY,
    value: JSON.stringify(lastID),
  });
};

export const deleteNotification = async (id: string, store: ReminderStore) => {
  const _temp = { ...store };
  const currentData = _temp[id];

  LocalNotifications.cancel({
    notifications: currentData.notificationIds.map((id) => ({ id })),
  });

  delete _temp[id];
  await Preferences.set({
    key: NOTIFICATION_REMINDER_KEY,
    value: JSON.stringify(_temp),
  });
  return _temp;
};
