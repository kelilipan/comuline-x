import { useEffect, useState, type PropsWithChildren } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Weekday } from "@capacitor/local-notifications";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Schedule } from "@/models/schedule";
import { Checkbox } from "../ui/checkbox";
import { scheduleNotification } from "@/lib/local-notification";
import { NOTIFICATION_REMINDER_KEY } from "@/models/constants";
import { ReminderStore } from "@/models/reminders";
import { Preferences } from "@capacitor/preferences";

export interface SetScheduleDrawerProps extends PropsWithChildren {
  schedule: Schedule;
  stationName: string;
}

const formSchema = z.object({
  beforeMinutes: z.number().min(0).max(60).optional(),
  days: z
    .array(
      //https://capacitorjs.com/docs/apis/local-notifications#enums
      z.number().min(1).max(7)
    )
    .min(1, "Tolong pilih hari")
    .max(7),
});

export type LocalNotificationFormPayload = z.infer<typeof formSchema>;

const items = [
  {
    id: Weekday.Sunday,
    label: "Minnggu",
  },
  {
    id: Weekday.Monday,
    label: "Senin",
  },
  {
    id: Weekday.Tuesday,
    label: "Selasa",
  },
  {
    id: Weekday.Wednesday,
    label: "Rabu",
  },
  {
    id: Weekday.Thursday,
    label: "Kamis",
  },
  {
    id: Weekday.Friday,
    label: "Jumat",
  },
  {
    id: Weekday.Saturday,
    label: "Sabtu",
  },
] as const;

const SetScheduleDrawer = ({
  children,
  stationName,
  schedule,
}: SetScheduleDrawerProps) => {
  const [reminder, setReminder] = useState<ReminderStore>();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const loadValue = async () => {
      const { value: remindersLS } = await Preferences.get({
        key: NOTIFICATION_REMINDER_KEY,
      });
      if (remindersLS) {
        setReminder(JSON.parse(remindersLS) as ReminderStore);
      }
    };
    if (open) loadValue();
    return () => {
      setReminder(undefined);
    };
  }, [open]);

  const currentReminder = reminder?.[schedule.id] || null;
  const form = useForm<LocalNotificationFormPayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beforeMinutes: currentReminder?.beforeMinutes || 15,
      days: currentReminder?.days || [new Date().getDay() + 1],
    },
  });

  const handleSubmit = async (values: LocalNotificationFormPayload) => {
    await scheduleNotification(stationName, schedule, values);
    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      noBodyStyles
      setBackgroundColorOnScale={false}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">
            {Boolean(currentReminder) ? "Ubah" : "Tambahkan"} pengingat
          </DrawerTitle>
          <DrawerDescription className="text-center">
            <span className="capitalize">{stationName}</span>-
            <span className="capitalize">{schedule.destination}</span>{" "}
            {schedule.timeEstimated} WIB
          </DrawerDescription>
          <Form {...form}>
            <form
              id="schedule"
              onSubmit={form.handleSubmit(handleSubmit)}
              className="text-left mt-4"
            >
              <FormField
                control={form.control}
                name="days"
                render={() => (
                  <FormItem className="space-y-0">
                    <div className="sr-only">
                      <FormLabel className="sr-only">Hari</FormLabel>
                      <FormDescription className="sr-only">
                        Pilih hari untuk pengingat
                      </FormDescription>
                    </div>
                    <FormMessage className="text-center " />

                    <div className="flex justify-center gap-4 w-full">
                      {items.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="days"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex items-start"
                              >
                                <FormLabel className="text-base sr-only">
                                  Hari
                                </FormLabel>
                                <div className="flex gap-3 w-full justify-center mb-2">
                                  <FormControl>
                                    <div>
                                      <Checkbox
                                        className="peer sr-only"
                                        id={"weekday" + item.id}
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              );
                                        }}
                                      />
                                      <FormLabel
                                        className="font-normal text-xs border-secondary border rounded-full size-10 flex items-center justify-center peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary "
                                        htmlFor={"weekday" + item.id}
                                      >
                                        {item.label.slice(0, 3)}
                                      </FormLabel>
                                    </div>
                                  </FormControl>
                                </div>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="beforeMinutes"
                render={({ field }) => (
                  <>
                    <FormItem className="mt-4">
                      <FormLabel>Menit sebelum keberangkatan</FormLabel>
                      <FormControl>
                        <Input placeholder="15" {...field} />
                      </FormControl>
                      <FormDescription>
                        Default 15 menit sebelum keberangkatan kereta. Max 60
                        menit.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </form>
          </Form>
        </DrawerHeader>
        <DrawerFooter>
          <Button type="submit" form="schedule">
            Submit
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Batal</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default SetScheduleDrawer;
