import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";
import { Capacitor } from "@capacitor/core";

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const isMobile = Capacitor.isNativePlatform();

  useEffect(() => {
    const updateOnlineStatus = async () => {
      const currentStatus = isMobile
        ? (await Network.getStatus()).connected
        : navigator.onLine;
      setIsOnline(currentStatus);
    };
    if (isMobile) {
      Network.addListener("networkStatusChange", () => {
        updateOnlineStatus();
      });
    } else {
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);
    }

    return () => {
      if (isMobile) {
        Network.removeAllListeners();
      } else {
        window.removeEventListener("online", updateOnlineStatus);
        window.removeEventListener("offline", updateOnlineStatus);
      }
    };
  }, []);

  return isOnline;
}

export default useOnlineStatus;
