import { UserButton } from "@clerk/nextjs";
import React from "react";

function Home() {
  return (
    <div>
      Home System
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Home;
