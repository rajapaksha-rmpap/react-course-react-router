import { useNavigation, Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation.js";

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" && (
        <div className="loading">
          <h3>Loading</h3>
          <p>loading events</p>
        </div>
      )}
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
