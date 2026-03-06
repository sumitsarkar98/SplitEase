import { Outlet } from "react-router-dom";
import Header from "../Header.tsx";
import Footer from "../Footer.tsx";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
