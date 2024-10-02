import { useEffect } from "react";
import { getSerwist } from "virtual:serwist";
import { toast } from "sonner";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";

import { LocalNotifications } from "@capacitor/local-notifications";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { StationProvider } from "./contexts/stations-context";
import { UIProvider } from "./contexts/ui-context";
import useOnlineStatus from "./hooks/use-online-status";

import StationList from "./components/station-list";
import Navbar from "./components/navbar";
import { Toaster } from "./components/ui/sonner";
import BottomNav from "./components/bottom-nav";
import NotificationList from "./pages/notification-list";

CapacitorApp.addListener("backButton", ({ canGoBack }) => {
  if (canGoBack) {
    window.history.back();
  } else {
    CapacitorApp.exitApp();
  }
});

function App() {
  const isOnline = useOnlineStatus();
  const isMobile = Capacitor.isNativePlatform();

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
          //@todo: do nothing for now
        });
        void serwist?.register();
      }
    };
    loadSerwist();
  }, []);

  useEffect(() => {
    const checkExactNotifPermission = async () => {
      const { exact_alarm } =
        await LocalNotifications.checkExactNotificationSetting();
      if (exact_alarm !== "granted") {
        await LocalNotifications.changeExactNotificationSetting();
      }
    };
    isMobile && checkExactNotifPermission();
  }, [isMobile]);

  return (
    <Router>
      <StationProvider>
        <UIProvider>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <main>
                <StationList />
              </main>
            </Route>
            <Route path="/notifications" exact>
              <NotificationList />
            </Route>
          </Switch>

          <Toaster position="top-center" />
          {(isMobile || import.meta.env.DEV) && <BottomNav />}
        </UIProvider>
      </StationProvider>
    </Router>
  );
}

export default App;
