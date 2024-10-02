import {
  IoAdd,
  IoNotifications,
  IoNotificationsOutline,
  IoSearch,
} from "react-icons/io5";
import { Button } from "../ui/button";
import { useUIContext } from "@/contexts/ui-context";
import { Link, useRouteMatch } from "react-router-dom";
import { Capacitor } from "@capacitor/core";

const BottomNav = () => {
  const { handleToggleState } = useUIContext();
  const matchNotification = useRouteMatch("/notifications");
  const isMobile = Capacitor.isNativePlatform();

  const NotificationIcon = matchNotification
    ? IoNotifications
    : IoNotificationsOutline;
  return (
    <div className="fixed bottom-0 w-full border-t border-t-border px-2 py-1 flex gap-2 justify-end z-50 bg-background max-w-[500px]">
      <Button
        aria-label="add"
        variant="ghost"
        className="px-2 py-1"
        onClick={() => handleToggleState("showAddStation")}
      >
        <IoAdd className="size-5" />
      </Button>
      {isMobile && (
        <Button
          aria-label="reminded station"
          variant="ghost"
          className="px-2 py-1"
          asChild
        >
          <Link to={matchNotification ? "/" : "/notifications"} replace>
            <NotificationIcon className="size-5" />
          </Link>
        </Button>
      )}
      <Button
        aria-label="search"
        variant="ghost"
        className="px-2 py-1"
        onClick={() => handleToggleState("showSearch")}
      >
        <IoSearch className="size-5" />
      </Button>
    </div>
  );
};
export default BottomNav;
