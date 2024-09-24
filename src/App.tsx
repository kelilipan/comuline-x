import StationList from "./components/station-list";
import Navbar from "./components/navbar";
import { StationProvider } from "./contexts/stations-context";

function App() {
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
