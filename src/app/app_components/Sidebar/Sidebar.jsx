import { Home_Medium, Analytics_Medium, Inventory_Medium } from "@app/components/ImgSVG";
import { useMenuStore } from "../../store/menuStore"
import logo from "@app/assets/imgs/DigitalEducas-Logos/hayu24.png"
import SidebarRaffles from "./SidebarRaffles";
import SidebarClient from "./SidebarClient";
import SidebarSeller from "./SidebarSeller";
import { Link } from "react-router-dom";
import routesweb from "../../config/routesweb";

const Sidebar = () => {

    const sideBarOpen = useMenuStore((state) => state.sideBarOpen);

    return (
        <>
            <div className={`w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-primary border-r z-30 ${sideBarOpen ? '' : 'hidden'} overflow-auto`} id="main-nav">
            <div className="w-full h-28 border-b flex px-4 py items-center mb-8 bg-gray-50">
            <p className="font-semibold text-3xl text-blue-400 pl-4">
               <Link to={routesweb.dashboard.root}>
               <img src={logo} className="w-44" alt="" />
               </Link> 
               </p>
            </div>
            <SidebarRaffles /> 
            <SidebarClient />
            <SidebarSeller />
</div>
        </>
    );
}

export default Sidebar;