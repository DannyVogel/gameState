import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="container mx-auto min-h-screen flex flex-col ">
      <Header />
      <div className="px-4 flex-grow mt-5 mb-20 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
