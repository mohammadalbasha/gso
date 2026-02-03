import { Suspense } from "react";
import { ClientInitialization } from "./client-initialization";

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense>
        <ClientInitialization />
      </Suspense>
      {children}
    </>
  );
};
