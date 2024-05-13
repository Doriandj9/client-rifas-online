import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../app_components/Navbar/Navbar';
import routesweb from '../config/routesweb';
import logo from "@app/assets/imgs/DigitalEducas-Logos/hayu24.png"
import { useMenuStore } from '../store/menuStore';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const SorterLayout = ({children}) => {
    const sideBarOpen = useMenuStore((state) => state.sideBarOpen);

    return (
        <>
            <ChakraProvider>
            <div className='min-h-screen flex flex-col'>
                <div className="flex flex-wrap relative w-full h-20">
                    <div className="h-20 border-b flex px-4 py items-center mb-8 bg-gray-50">
                            <p className="font-semibold text-3xl text-blue-400 pl-4 flex flex-col">
                            <Link to={routesweb.dashboard.root}>
                            <img src={logo} className="w-40 h-12" alt="" />
                            </Link> 
                            </p>
                    </div>
                    <div className='flex-grow'>
                        <Navbar stick />
                    </div>
                    <Link to={'/dashboard/raffles/me/sorter'}>
                        <div className='absolute -bottom-12 left-1 bg-primary rounded-xl'>
                            <MdOutlineKeyboardBackspace className='w-12 h-12 text-white cursor-pointer' />
                        </div>
                    </Link>
                </div>
                <div className='flex-grow w-full flex overflow-x-auto'>
                    {children}
                </div>
            </div>
            </ChakraProvider>
        </>
    );
}


export default SorterLayout;