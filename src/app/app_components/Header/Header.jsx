import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from './../../../assets/imgs/DigitalEducas-Logos/hayu24.png';
import routesweb from '../../config/routesweb';
import { IoHomeSharp } from 'react-icons/io5';
import { IoIdCard } from "react-icons/io5";
import { useAuth } from '../../store/app/userStore';
import AppButton from '../Core/AppButon';
import { LuLayoutPanelLeft } from "react-icons/lu";
import { CgLogIn } from "react-icons/cg";
import { navigateRoutes } from '../../utilities/web/navigateRoutes';
import { IoIosContacts } from "react-icons/io";
import { FaAward } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@chakra-ui/react';
const Header  = () => {
    const user = useAuth((state) => state.user);
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);

    const handleClick = () => {
        navigateRoutes(navigate,user)
    }
    const handleRoute = ({ isActive, isPending, isTransitioning }) => {
        return isActive ? 'navbar-active' : 'navbar-inactive';
     };
    
     const handleOpenMenu = () => setMenu(!menu);

    return (
        <>
             <header className="fixed w-full z-30"> 
                <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
                    <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                        <Link to={routesweb.inicio} className="flex items-center">
                            <img src={logo} className="h-8 mr-3 sm:h-14" alt="Landwind Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
                        </Link>
                        <div className="flex items-center lg:order-2">
                            {/* <div className="hidden mt-2 mr-4 sm:inline-block">
                                <a className="github-button" href="https://github.com/themesberg/landwind" data-size="large" data-icon="octicon-star" data-show-count="true" aria-label="Star themesberg/landwind on GitHub">Star</a>
                            </div> */}
                            {/* <!-- <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a> --> */}
                            {
                             user ? 
                             <AppButton onClick={handleClick} className='' leftIcon={<LuLayoutPanelLeft className='w-4 h-4' />}>
                                <span className='mt-1'>Panel</span>
                             </AppButton>
                             :
                                <NavLink to={routesweb.login} 
                                className="text-white bg-primary hover:bg-primaryop-900 focus:ring-4 focus:ring-primaryop-700 font-medium rounded-lg
                                 text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-primary dark:hover:bg-primaryop-900
                                  focus:outline-none dark:focus:ring-primaryop-700 flex gap-2">
                                   <CgLogIn className='w-6 h-6' /> <span className='mt-1'> Inicio de Sesión </span>
                                </NavLink>
                            }
                            <button data-collapse-toggle="mobile-menu-2" type="button" 
                            onClick={handleOpenMenu}
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                                <span className="sr-only pointer-events-none">Open main menu</span>
                                <svg className="w-6 h-6 pointer-events-none" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                <svg className="hidden w-6 h-6 pointer-events-none" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div className={`items-center justify-between ${menu ? '' :'hidden'}  w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <NavLink  to={routesweb.inicio} 
                                    className={(props) => handleRoute(props)}
                                    >
                                    <IoHomeSharp className='h-6 w-6' />
                                        <span className='mt-2'>Inicio</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={routesweb.mission_and_vision} 
                                    className={(props) => handleRoute(props)}
                                    >
                                        <IoIosContacts className='w-6 h-6' />
                                        <span className='mt-2'> Acerca de </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={routesweb.benefits} 
                                    className={(props) => handleRoute(props)}
                                    >
                                        <FaAward className='w-6 h-6' />
                                        <span className='mt-2'> Beneficios </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={routesweb.plans}
                                    className={(props) => handleRoute(props)}
                                    >
                                        <IoIdCard className='w-6 h-6' />
                                        <span className='mt-2'> Planes de compra </span>
                                    </NavLink>
                                </li>
                                {/* <li>
                                    <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-secondarylite lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-secondarylite lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-secondarylite lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-secondarylite lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

        </>
    );
}

export default Header;