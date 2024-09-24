import { useEffect } from "react";
import { getSerwist } from "virtual:serwist";
import StationList from "./components/station-list";
import Navbar from "./components/navbar";
import { StationProvider } from "./contexts/stations-context";

function App() {
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
  }, []);
  return (
    <StationProvider>
      <Navbar />
      <main className="flex-1 mt-2 mb-8">
        <StationList />
      </main>
      {/* <div>bottomnav</div> */}
    </StationProvider>
  );
}

export default App;
