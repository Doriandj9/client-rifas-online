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
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineRequestPage } from "react-icons/md";
import { TfiMoney } from "react-icons/tfi";
const SidebarSeller = () => {
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
            <p className="pl-4 text-md font-semibold text-white mb-1">Menú vendedores</p>
            <NavLink to={routes.children.plans.root} 
            className={(props) => handleRoute(props)}
            >
                {/* <Home_Medium className="text-secondary" /> */}
                <MdOutlineRequestPage className="text-xl mr-2" />
                 <span>Solicitud de venta</span>
            </NavLink>
            <NavLink to={routes.children.reports.root}
            className={(props) => handleRoute(props)}
            >
                <FaMoneyBillTransfer className="text-xl mr-2" />
                <span className="text-white hover:text-gray-700">Venta de boletos</span>
            </NavLink>
            <NavLink  to={routes.children.users.root}
            className={(props) => handleRoute(props)}
            >
                <TfiMoney className="text-xl mr-2" />
                <span className="text-white">Adquisiciones</span>
            </NavLink>
            <NavLink to={routes.children.passwords.root} 
            className={(props) => handleRoute(props)}
            >
                <RiLockPasswordLine className="text-xl mr-2" />
                <span className="text-white">Contraseñas</span>
            </NavLink>
            <NavLink  to={'/'}
            className={(props) => handleRoute(props)}
            >
                <svg className="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
                <path d="M16.557,4.467h-1.64v-0.82c0-0.225-0.183-0.41-0.409-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H5.901v-0.82c0-0.225-0.185-0.41-0.41-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H3.442c-0.904,0-1.64,0.735-1.64,1.639v9.017c0,0.904,0.736,1.64,1.64,1.64h13.114c0.904,0,1.64-0.735,1.64-1.64V6.106C18.196,5.203,17.461,4.467,16.557,4.467 M17.377,15.123c0,0.453-0.366,0.819-0.82,0.819H3.442c-0.453,0-0.82-0.366-0.82-0.819V8.976h14.754V15.123z M17.377,8.156H2.623V6.106c0-0.453,0.367-0.82,0.82-0.82h1.639v1.23c0,0.225,0.184,0.41,0.41,0.41c0.225,0,0.41-0.185,0.41-0.41v-1.23h8.196v1.23c0,0.225,0.185,0.41,0.41,0.41c0.227,0,0.409-0.185,0.409-0.41v-1.23h1.64c0.454,0,0.82,0.367,0.82,0.82V8.156z"></path>
                </svg>
                <span className="text-white">Calender</span>
            </NavLink>
            </div>
        </>
    );
}


export default SidebarSeller;