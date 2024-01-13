import { useState } from "react"
import { useMenuStore } from "../store/menuStore";
import Sidebar from "../app_components/Sidebar/Sidebar";
import Navbar from "../app_components/Navbar/Navbar";
import FooterDashboard from "../app_components/Footer/FooterDashboard";
import SidebarClient from "../app_components/Sidebar/SidebarClient";
import { ChakraProvider } from '@chakra-ui/react';
import "react-toastify/dist/ReactToastify.css";
import SidebarRaffles from "../app_components/Sidebar/SidebarRaffles";
import SidebarSeller from "../app_components/Sidebar/SidebarSeller";

const DashboardClient = ({content, index=false, component=<></> }) => {
    const sideBarOpen = useMenuStore((state) => state.sideBarOpen);
    
    return (
        <ChakraProvider>
            <div className="leading-normal tracking-normal" id="main-body">
            <div className="flex flex-wrap">

              <Sidebar />


              <div className={`w-full bg-gray-50 pl-0 lg:pl-64 min-h-screen ${sideBarOpen ? 'overlay' : ''}`} id="main-content">

                <Navbar />

                <div className="p-6 bg-gray-50 mb-20">
                {index && (
                      component
                    )}
                    {content}

                </div>

                <FooterDashboard />
              </div>
            </div>
          </div>
        </ChakraProvider>
    );
}

export default DashboardClient;