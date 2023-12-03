import { useState } from "react"
import { useMenuStore } from "../store/menuStore";
import Sidebar from "../app_components/Sidebar/Sidebar";
import Navbar from "../app_components/Navbar/Navbar";
import FooterDashboard from "../app_components/Footer/FooterDashboard";

const DashboradLayout = ({children}) => {
    const sideBarOpen = useMenuStore((state) => state.sideBarOpen);
    
    return (
        <>
    <div className="leading-normal tracking-normal" id="main-body">
    <div className="flex flex-wrap">

      <Sidebar />

      <div className={`w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen ${sideBarOpen ? 'overlay' : ''}`} id="main-content">

        <Navbar />

        <div className="p-6 bg-gray-100 mb-20">
          {children}
        </div>

        <FooterDashboard />
      </div>
    </div>
  </div>








        </>
    );
}

export default DashboradLayout;