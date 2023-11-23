import NavBar from "@/components/shared/Navbar/NavBar";
import React from "react";
import Sidebar from "@/components/shared/Sidebar/Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="background-light850_dark100 relative">
      <div className="flex">
        <NavBar />
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        RIghtBar
      </div>
      TOaster
    </main>
  );
}

export default Layout;
