import { SORT_BY_KEY, STATIONS_KEY } from "@/models/constants";
import { Station, StationLS } from "@/models/station";
import { Preferences } from "@capacitor/preferences";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

export const StationProvider = ({ children }: PropsWithChildren) => {
  const [stations, setStations] = useState<StationLS[]>([]);
  const [sort, setSorted] = useState<"name" | "date">("name");
  const [query, setQuery] = useState("");
  const firstRender = useRef(true);

  useEffect(() => {
    const loadValue = async () => {
      const { value: savedStationLS } = await Preferences.get({
        key: STATIONS_KEY,
      });

      if (savedStationLS) {
        try {
          setStations(JSON.parse(savedStationLS) as StationLS[]);
        } catch (error) {
          //do nothing
        }
      }

      const { value: sortByLS } = await Preferences.get({
        key: SORT_BY_KEY,
      });

      if (sortByLS) {
        setSorted(JSON.parse(sortByLS) as "name" | "date");
      }
      firstRender.current = false;
    };

    loadValue();
  }, []);

  useEffect(() => {
    const syncState = async () => {
      await Preferences.set({
        key: SORT_BY_KEY,
        value: JSON.stringify(sort),
      });
    };
    if (!firstRender.current) {
      syncState();
    }
  }, [sort]);

  useEffect(() => {
    const syncState = async () => {
      await Preferences.set({
        key: STATIONS_KEY,
        value: JSON.stringify(stations),
      });
    };
    if (!firstRender.current) {
      syncState();
    }
  }, [stations]);

  const addStation = (station: Station) => {
    const newStation = { ...station, savedAt: new Date().toISOString() };

    setStations((prevStations) => {
      const newData = [...prevStations, newStation].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return newData;
    });
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
