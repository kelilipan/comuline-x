import { useEffect } from "react";
import { getSerwist } from "virtual:serwist";
import StationList from "./components/station-list";
import Navbar from "./components/navbar";
import { StationProvider } from "./contexts/stations-context";
import { UIProvider } from "./contexts/ui-context";

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
      <UIProvider>
        <Navbar />
        <main className="mt-2 overflow-hidden relative">
          <StationList />
        </main>

        {/* <div>bottomnav</div> */}
      </UIProvider>
    </StationProvider>
  );
}

export default App;
