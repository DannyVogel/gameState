import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col ">
      <Header />
      <div className="flex-grow mt-5 mb-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
