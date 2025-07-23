import { Outlet } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";

export default function RootPage() {
  return (
    <>
      <header>
        <NavigationBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
