import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConfigState {
  config: {
    appUrl?: string;
    backendUrl?: string;
    graphqlEndpoint?: string;
    graphqlWsEndpoint?: string;
    apiEndpoint?: string;
    googleMapsApiKey?: string;
  };
  hydrated: boolean;
  setConfig: (config: ConfigState["config"]) => void;
  setHydrated: (hydrated: boolean) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      config: {},
      hydrated: false,
      setConfig: (config) => set({ config }),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "config-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true); // <-- set hydrated to true after rehydration
      },
    },
  ),
);
