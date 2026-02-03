"use client";
import { useConfigStore } from "@/store/config-store";
import { useEffect } from "react";
export const ClientInitialization = () => {
  const setConfig = useConfigStore((state) => state.setConfig);
  useEffect(() => {
    /* Init Config Store */
    fetch("/next-api/config")
      .then((res) => res.json())
      .then(async (data) => {
        setConfig(data);
      })
      .catch((err) => {
        console.error("Failed to fetch config:", err);
      });

    /* Add focus event listener to check WhatsApp login on window focus */
  }, []);

  return <></>;
};
