import { useEffect } from "react";
import { getSerwist } from "virtual:serwist";
import { toast } from "sonner";

import StationList from "./components/station-list";
import Navbar from "./components/navbar";
import { Toaster } from "./components/ui/sonner";
import { StationProvider } from "./contexts/stations-context";
import { UIProvider } from "./contexts/ui-context";
import useOnlineStatus from "./hooks/use-online-status";
import { LocalNotifications } from "@capacitor/local-notifications";

function App() {
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (!isOnline)
      toast.warning("Anda sedang offline.", {
        description: "Periksa koneksi internet Anda.",
      });
  }, [isOnline]);

  useEffect(() => {
    const loadSerwist = async () => {
      if ("serviceWorker" in navigator) {
        const serwist = await getSerwist();
        serwist?.addEventListener("installed", () => {
          console.log("Serwist installed!");
        });
        void serwist?.register();
      }
    };
    loadSerwist();
    const checkExactNotifPermission = async () => {
      const { exact_alarm } =
        await LocalNotifications.checkExactNotificationSetting();
      if (exact_alarm !== "granted") {
        await LocalNotifications.changeExactNotificationSetting();
      }
    };
    checkExactNotifPermission();
    LocalNotifications.getPending();
  }, []);

  return (
    <StationProvider>
      <UIProvider>
        <Navbar />
        <main className="mt-2 overflow-hidden relative">
          <StationList />
        </main>
        <Toaster position="top-center" />

        {/* <div>bottomnav</div> */}
      </UIProvider>
    </StationProvider>
  );
}

export default App;
