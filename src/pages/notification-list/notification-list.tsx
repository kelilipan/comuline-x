import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NOTIFICATION_REMINDER_KEY } from "@/models/constants";
import { ReminderStore } from "@/models/reminders";
import { Button } from "@/components/ui/button";
import { IoNotificationsOff } from "react-icons/io5";
import { deleteNotification } from "@/lib/local-notification";

const NotificationList = () => {
  const [reminder, setReminder] = useState<ReminderStore>({});
  const isEmpty = !Boolean(Object.keys(reminder).length);
  useEffect(() => {
    const loadReminder = async () => {
      const { value: reminderLS } = await Preferences.get({
        key: NOTIFICATION_REMINDER_KEY,
      });
      const _parsedReminder = reminderLS
        ? (JSON.parse(reminderLS) as ReminderStore)
        : {};

      setReminder(_parsedReminder);
    };
    loadReminder();
  }, []);

  const handleDeleteClick = async (id: string) => {
    const nextReminder = await deleteNotification(id, reminder);
    setReminder(nextReminder);
  };

  return (
    <main className="overflow-hidden px-2">
      {/*@todo: need to refactor whole container, so no need to use calc */}
      <ScrollArea className="mt-12 mb-14 h-[calc(100vh-48px-56px)] select-none">
        <div className="divide-y divide-solid">
          {isEmpty && <h1 className="mt-4">Belum ada pengingat</h1>}
          {!isEmpty &&
            Object.keys(reminder).map((key) => {
              const item = reminder[key];
              return (
                <div
                  key={key}
                  className="py-4 flex gap-2 justify-between items-center px-1"
                >
                  <div>
                    <h2 className="capitalize font-bold">
                      {item.stationName.toLocaleLowerCase()} -{" "}
                      {item.destination.toLocaleLowerCase()}
                    </h2>
                    <p className="text-xs">{item.timeEstimated} WIB</p>
                  </div>
                  <Button
                    aria-label="hapus pengingat"
                    variant="ghost"
                    className="px-3"
                    onClick={() => handleDeleteClick(key)}
                  >
                    <IoNotificationsOff />
                  </Button>
                </div>
              );
            })}
        </div>
      </ScrollArea>
    </main>
  );
};
export default NotificationList;
