
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div >
      <Header />
      <div className="min-h-[calc(100vh-136px)] w-full max-w-11/12 mx-auto">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
