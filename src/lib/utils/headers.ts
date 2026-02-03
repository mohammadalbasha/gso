"use server";
import { headers } from "next/headers";
export const getIsFirstLoad = async () => {
  const headerList = await headers();
  const secFetchMode = headerList.get("sec-fetch-mode");
  return secFetchMode === "navigate";
};
