import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div className="">
      <Header />
      <div className="container mx-auto bg-gray-100">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
