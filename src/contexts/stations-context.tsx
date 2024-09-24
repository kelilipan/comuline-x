import { Station, StationLS } from "@/models/station";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface StationContextProps {
  query?: string;
  stations: Station[];
  filteredStations: Station[];
  sort: "name" | "date";
  addStation: (station: Station) => void;
  removeStation: (id: string) => void;
  sortBy: (by: "name" | "date") => void;
  setQuery: (name: string) => void;
}

const StationContext = createContext<StationContextProps | undefined>(
  undefined
);

const SAVED_STATION_LS_KEY = "saved-stations";
const SORT_STATION_LS_KEY = "sort-by";

const loadStationsFromLocalStorage = (): StationLS[] => {
  const storedStations = localStorage.getItem(SAVED_STATION_LS_KEY);
  return storedStations ? JSON.parse(storedStations) : [];
};

const loadSortbyFromLocalStorage = (): "name" | "date" => {
  const storedStations = localStorage.getItem(SORT_STATION_LS_KEY);
  return storedStations ? JSON.parse(storedStations) : "name";
};

export const StationProvider = ({ children }: PropsWithChildren) => {
  const [stations, setStations] = useState<StationLS[]>(
    loadStationsFromLocalStorage
  );
  const [sort, setSorted] = useState<"name" | "date">(
    loadSortbyFromLocalStorage
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Sync stations state with localStorage
    localStorage.setItem(SAVED_STATION_LS_KEY, JSON.stringify(stations));
  }, [stations]);

  useEffect(() => {
    // Sync stations state with localStorage
    localStorage.setItem(SORT_STATION_LS_KEY, JSON.stringify(sort));
  }, [sort]);

  const addStation = (station: Station) => {
    const newStation = { ...station, savedAt: new Date().toISOString() };
    setStations((prevStations) =>
      [...prevStations, newStation].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const sortBy = (by: "name" | "date") => {
    setSorted(by);
  };

  const removeStation = (id: string) => {
    setStations((prevStations) =>
      prevStations.filter((station) => station.id !== id)
    );
  };

  const filteredStations = useMemo(
    () =>
      stations
        .filter((station) =>
          station.name.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => {
          if (sort === "name") {
            return a.name.localeCompare(b.name);
          } else if (sort === "date") {
            return (
              new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
            );
          }
          return 0;
        }),
    [sort, stations, query]
  );

  return (
    <StationContext.Provider
      value={{
        query,
        stations,
        filteredStations,
        sort,
        addStation,
        removeStation,
        sortBy,
        setQuery,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};

export const useStationContext = () => {
  const context = useContext(StationContext);
  if (!context) {
    throw new Error("useStationContext must be used within a StationProvider");
  }
  return context;
};
