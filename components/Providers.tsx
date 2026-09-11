"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} newestOnTop />
    </SessionProvider>
  );
}
