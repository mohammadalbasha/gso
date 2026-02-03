"use client";
import { useConfigStore } from "@/store/config-store";
import { useEffect } from "react";
export const ClientInitialization = () => {
  const setConfig = useConfigStore((state) => state.setConfig);

  return <></>;
};
