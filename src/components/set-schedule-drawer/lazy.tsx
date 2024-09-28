import { lazy, Suspense } from "react";
import { SetScheduleDrawerProps } from "./set-schedule-drawer";
const ScheduleDrawer = lazy(() => import("./set-schedule-drawer"));
const LazyScheduleDrawer = (props: SetScheduleDrawerProps) => {
  return (
    <Suspense fallback={null}>
      <ScheduleDrawer {...props} />
    </Suspense>
  );
};
export default LazyScheduleDrawer;
