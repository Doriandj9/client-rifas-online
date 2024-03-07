import { Home_Medium, Analytics_Medium, Inventory_Medium } from "@app/components/ImgSVG";
import { useMenuStore } from "../../store/menuStore"
import logo from "@app/assets/imgs/DigitalEducas-Logos/hayu24.png"
import { NavLink } from "react-router-dom";
import { MdLockReset } from "react-icons/md";
import routesweb from "../../config/routesweb";
import { FaRegIdCard, FaRegFilePdf } from "react-icons/fa";
import { useEffect, useState } from "react";
import { GrUserSettings } from "react-icons/gr";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdCreditScore } from "react-icons/md";
import { BsTicketPerforated } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";
import { FcMoneyTransfer } from "react-icons/fc";
import { BiMoneyWithdraw } from "react-icons/bi";
import { useAuth } from "../../store/app/userStore";
const SidebarRaffles = () => {
    const user = useAuth((state) => state.user);

    const [block, setBlock] = useState(false);
    const [objRoutes, setObjRoutes] = useState({
        admin_plans: false,
        admin_reports: false
    })
    const sideBarOpen = useMenuStore((state) => state.sideBarOpen);
    const routes = routesweb.dashboard.children.raffles.children;
    const prefix = routesweb.dashboard.children.raffles.root;
    const handleRoute = ({ isActive, isPending, isTransitioning }) => {
       return isActive ? 'sidebar-active' : 'sidebar-inactive';
    };
    useEffect(() => {
        if(user && !user.organize_riffs){
            setBlock(true);
        } else {
            setBlock(false);
        }
    }, [user])
    return (
        <>
    { user.is_raffles &&
    <div className="mb-4 px-4 relative">
                {
                    block &&
                    <div title="Este menú no se encuentra disponible hasta que se verifique tu comprobante de pago "
                    className="absolute h-full top-0 left-0 w-full opacity-25 bg-white"></div>
                }
                <p className="pl-4 text-md font-semibold text-white mb-1">Menú rifas</p>
                <NavLink to={prefix + '/' + routes.plans} 
                className={(props) => handleRoute(props)}
                >
                    {/* <Home_Medium className="text-secondary" /> */}
                    <MdCreditScore className="text-xl mr-2" />
                    <span>Actualizar plan</span>
                </NavLink>
                <NavLink to={prefix + '/' + routes.lottery.root}
                className={(props) => handleRoute(props)}
                >
                    <BsTicketPerforated className="text-xl mr-2" />
                    <span className="text-white hover:text-gray-700">Crear rifas</span>
                </NavLink>
                <NavLink to={prefix + '/' + routes.confirm_payment}
                className={(props) => handleRoute(props)}
                >
                    <BiMoneyWithdraw className="text-xl mr-2" />
                    <span className="text-white hover:text-gray-700">Autorización de pagos</span>
                </NavLink>
                <NavLink to={prefix  + '/' + routes.payment_method.root} 
                className={(props) => handleRoute(props)}
                >
                    {/* <Home_Medium className="text-secondary" /> */}
                    <MdCreditScore className="text-xl mr-2" />
                    <span>Métodos de cobros</span>
                </NavLink>
                {/* <NavLink  to={'pending'}
                className={(props) => handleRoute(props)}
                >
                    <TbPigMoney className="text-xl mr-2" />
                    <span className="text-white">Comisiones</span>
                </NavLink>
                <NavLink to={'pending'} 
                className={(props) => handleRoute(props)}
                >
                    <FaRegFilePdf className="text-xl mr-2" />
                    <span className="text-white">Reportes</span>
                </NavLink>
                <NavLink  to={'/'}
                className={(props) => handleRoute(props)}
                >
                    <svg className="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
                    <path d="M16.557,4.467h-1.64v-0.82c0-0.225-0.183-0.41-0.409-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H5.901v-0.82c0-0.225-0.185-0.41-0.41-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H3.442c-0.904,0-1.64,0.735-1.64,1.639v9.017c0,0.904,0.736,1.64,1.64,1.64h13.114c0.904,0,1.64-0.735,1.64-1.64V6.106C18.196,5.203,17.461,4.467,16.557,4.467 M17.377,15.123c0,0.453-0.366,0.819-0.82,0.819H3.442c-0.453,0-0.82-0.366-0.82-0.819V8.976h14.754V15.123z M17.377,8.156H2.623V6.106c0-0.453,0.367-0.82,0.82-0.82h1.639v1.23c0,0.225,0.184,0.41,0.41,0.41c0.225,0,0.41-0.185,0.41-0.41v-1.23h8.196v1.23c0,0.225,0.185,0.41,0.41,0.41c0.227,0,0.409-0.185,0.409-0.41v-1.23h1.64c0.454,0,0.82,0.367,0.82,0.82V8.156z"></path>
                    </svg>
                    <span className="text-white">Calender</span>
                </NavLink> */}
        </div>
    }
        </>
    );
}


export default SidebarRaffles;