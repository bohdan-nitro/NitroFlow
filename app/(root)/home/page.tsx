import { UserButton } from "@clerk/nextjs";
import React from "react";

function Home() {
  return (
    <div>
      Home
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Home;
