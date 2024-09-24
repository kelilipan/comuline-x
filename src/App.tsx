import useSWR from "swr";
import StationList from "./components/station-list";
import fetcher from "./lib/fetcher";
import type { APIResponse } from "./models/response";
import type { Schedule } from "./models/schedule";
import Navbar from "./components/navbar";

function App() {
  // const { data, error, isLoading } = useSWR<APIResponse<Schedule>>(
  //   "/v1/station/",
  //   fetcher
  // );
  // console.log({ data, error, isLoading });
  return (
    <>
      <Navbar />
      <main className="flex-1 px-3 mt-2">
        <StationList />
      </main>
      {/* <div>bottomnav</div> */}
    </>
  );
}

export default App;
