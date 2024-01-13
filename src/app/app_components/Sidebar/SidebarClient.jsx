import { Home_Medium, Analytics_Medium, Inventory_Medium } from "@app/components/ImgSVG";
import { useMenuStore } from "../../store/menuStore"
import logo from "@app/assets/imgs/DigitalEducas-Logos/hayu24.png"
import { NavLink } from "react-router-dom";
import { MdLockReset } from "react-icons/md";
import routesweb from "../../config/routesweb";
import { FaRegIdCard, FaRegFilePdf } from "react-icons/fa";
import { useState } from "react";
import { GrUserSettings } from "react-icons/gr";
import { RiLockPasswordLine } from "react-icons/ri";
import { ImTicket } from "react-icons/im";
import { FaListCheck } from "react-icons/fa6";
const SidebarClient = () => {
    const [objRoutes, setObjRoutes] = useState({
        admin_plans: false,
        admin_reports: false
    })
    const sideBarOpen = useMenuStore((state) => state.sideBarOpen);
    const routes = routesweb.admin;
    const handleRoute = ({ isActive, isPending, isTransitioning }) => {
       return isActive ? 'sidebar-active' : 'sidebar-inactive';
    };
    return (
        <>
   <div className="mb-4 px-4">
            <p className="pl-4 text-md font-semibold text-white mb-1">Menú cliente</p>
            <NavLink to={routes.children.plans.root} 
            className={(props) => handleRoute(props)}
            >
                {/* <Home_Medium className="text-secondary" /> */}
                <ImTicket className="text-xl mr-2" />
                 <span>Compra de rifas</span>
            </NavLink>
            <NavLink to={routes.children.reports.root}
            className={(props) => handleRoute(props)}
            >
                <FaListCheck className="text-xl mr-2" />
                <span className="text-white hover:text-gray-700">Detalles</span>
            </NavLink>
            </div>
        </>
    );
}


export default SidebarClient;