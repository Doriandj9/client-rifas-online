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
import { MdOutlinePayment } from "react-icons/md";
import { useAuth } from "../../store/app/userStore";
import { FaGifts } from "react-icons/fa";

const SidebarClient = () => {
    const user = useAuth(state => state.user);
    const [objRoutes, setObjRoutes] = useState({
        admin_plans: false,
        admin_reports: false
    })
    const sideBarOpen = useMenuStore((state) => state.sideBarOpen);
    const routes = routesweb.dashboard.children.client;
    const prefix = routesweb.dashboard.children.client.root;
    const handleRoute = ({ isActive, isPending, isTransitioning }) => {
       return isActive ? 'sidebar-active' : 'sidebar-inactive';
    };
    return (
        <>
        { user.is_client &&
            <div className="mb-4 px-4">
            <p className="pl-4 text-md font-semibold text-white mb-1">Menú cliente</p>
            <NavLink to={ prefix + '/' +routes.children.tickets} 
            className={(props) => handleRoute(props)}
            >
                {/* <Home_Medium className="text-secondary" /> */}
                <ImTicket className="text-xl mr-2" />
                 <span>Mis boletos</span>
            </NavLink>
            <NavLink to={prefix + '/' + routes.children.payment_tickets} 
            className={(props) => handleRoute(props)}
            >
                {/* <Home_Medium className="text-secondary" /> */}
                <MdOutlinePayment className="text-xl mr-2" />
                 <span>Compra de boletos</span>
            </NavLink>
            {
            user && (user.is_raffles === false ||  user.is_seller === false ) &&
            <NavLink to={prefix + '/' + routes.children.organization_raffles} 
            className={(props) => handleRoute(props)}
            >
                {/* <Home_Medium className="text-secondary" /> */}
                <FaGifts className="text-xl mr-2" />
                 <span>Rifas / Afiliaciones</span>
            </NavLink>
            }
            </div>
        }
        </>
    );
}


export default SidebarClient;