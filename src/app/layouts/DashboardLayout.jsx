import { useState } from "react"
import { useMenuStore } from "../store/menuStore";
import Sidebar from "../app_components/Sidebar/Sidebar";
import Navbar from "../app_components/Navbar/Navbar";
import FooterDashboard from "../app_components/Footer/FooterDashboard";
import SidebarAdmin from "../app_components/Sidebar/SidebarAdmin";
import { ChakraProvider } from '@chakra-ui/react';
import "react-toastify/dist/ReactToastify.css";
import { useMatches } from "react-router-dom";
import { application } from "../config/app";

const DashboradLayout = ({content, index=false, component=<></> }) => {
    const sideBarOpen = useMenuStore((state) => state.sideBarOpen);
    const handlers = useMatches();
    let classT = 'p-6 mb-20';
    for(let entries of handlers ){
      const [id,pathnames] = Object.entries(entries);
      if(pathnames[1] === '/admin/client/user/profile'
      ){
          classT = ''
      }
    }
    
    return (
        <ChakraProvider>
          {
            application.environment === 'test' &&
            <div className="fixed top-0 left-0 w-full bg-primary/25 text-black text-center text-xl" style={{zIndex: 9999}}>
                ES UN AMBIENTE DE PRUEBAS
          </div>
          } 
            <div className="leading-normal tracking-normal" id="main-body">
            <div className="flex flex-wrap">

              <SidebarAdmin />

              <div className={`w-full bg-gray-50 pl-0 lg:pl-64 min-h-screen ${sideBarOpen ? 'overlay' : ''}`} id="main-content">

                <Navbar />

                <div className={`${classT} bg-gray-50`}>
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

export default DashboradLayout;