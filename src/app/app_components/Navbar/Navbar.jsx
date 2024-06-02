import { useState } from "react"
import { useMenuStore } from "../../store/menuStore";
import { useAccessToken, useAuth } from "../../store/app/userStore";
import Loader from "../Core/Loader";
import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import { toastConfig } from "../../utilities/web/configs";
import { fetchQuery } from "../../utilities/web/fetchQuery";
import routesapi from "../../config/routesapi";
import { useNavigate } from "react-router-dom";
import { navigateRoutes } from "../../utilities/web/navigateRoutes";
import { credentials } from "../../config/app";
import {Avatar,Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import routesweb from "../../config/routesweb";
import { FaCircleInfo } from "react-icons/fa6";
import { formatTimeDate } from "../../utilities/web/times/formatTimeFull";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";


const urlLogout = credentials.server +  routesapi.logout;

const Navbar = ({stick=false}) => {
  const token = useAccessToken(state => state.token);
  const toast = useToast(toastConfig);
  const user = useAuth(state => state.user);
  const logout = useAuth(state => state.delete);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const handleSideBarOpen = useMenuStore((state) => state.handleSideBarOpen);
    const username = user.first_name.split(' ')[0] + ' ' + user.last_name.split(' ')[0];

    const handleDopDownOpen = () => {
        setDropDownOpen(!dropDownOpen);
    }

    const handleLogout = async () => {
      setDropDownOpen(!dropDownOpen);
      setLoading(true);
      try {
          const response = fetchQuery(token,urlLogout,{method: 'POST'});
          logout();
          navigate('/');
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error'
        })
      } finally{
        setLoading(false);
      }
    }
    const handleSingUp = () => {
      setDropDownOpen(!dropDownOpen);
      navigate(routesweb.dashboard.children.client.root + '/' + routesweb.dashboard.children.client.children.client_profile);
    }
    return (
        <>
        <Loader loading={loading} />
        
        <div onClick={() => {
            if(dropDownOpen === true){
              setDropDownOpen(false)
            }
          }}
          className={`${stick ? '' : 'sticky top-0 z-40'}`}>
            <div className="w-full h-20 px-6 bg-gray-50 border-b flex items-center justify-between">

              <div className="flex">

                <div className="inline-block lg:hidden flex items-center mr-4">
                  <button className="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger"  onClick={handleSideBarOpen}>
                    <svg className="h-5 w-5" style={{fill: 'black'}} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                  </button>
                </div>

                <div className="relative text-gray-600">
                  {/* <input type="search" name="serch" placeholder="Search products..." className="bg-white h-10 w-full xl:w-64 px-5 rounded-lg border text-sm focus:outline-none" /> */}
                  {/* <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{enableBackground: "new 0 0 56.966 56.966"}} xmlSpace="preserve" width="512px" height="512px">
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                    </svg>
                  </button> */}
                  <div className="">
                  { user && user.is_raffles &&  user.organize_riffs && <Popover >
                        <PopoverTrigger>
                          <IconButton backgroundColor={'#f9fafb'} _hover={'#f9fafb'} _active={'#f9fafb'} title="Información del plan actual"
                           icon={<FaCircleInfo className="text-yellow-500 w-8 h-8"  />} />
                        </PopoverTrigger>
                        <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader pt={4} fontWeight='bold' border='0'>Información de tu plan actual.</PopoverHeader>
                            <PopoverBody>
                              <table>
                                <tbody>
                                <tr>
                                  <td>Nombre:</td>
                                  <td> {user.subscription.title} </td>
                                </tr>
                                <tr>
                                  <td>Rifas permitidas:</td>
                                  <td> {user.subscription.number_raffles} </td>
                                </tr>
                                <tr>
                                  <td>Boletos permitidos:</td>
                                  <td> {user.subscription.maximum_tickets} </td>
                                </tr>
                                <tr>
                                  <td>Fecha de suscripción: </td>
                                  <td> {formatTimeDate(user.start_date_supcription)} </td>
                                </tr>
                                <tr>
                                  <td>Fecha de expiración:</td>
                                  <td> {formatTimeDate(user.end_date_suscription)} </td>
                                </tr>
                                </tbody>
                              </table>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                  }
                </div>
                </div>
              </div>

              <div className="flex items-center relative">
              
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="fill-current mr-3 hover:text-blue-500"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
               
                {/* <Menu>
              <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu> */}
            <div className="relative me-3" onClick={handleDopDownOpen}>
                <FaChevronDown className="absolute top-4 -right-4 cursor-pointer" />
                <Avatar className="cursor-pointer" name={username} size={'md'} src={credentials.server + user.avatar} />
            </div>
                {/* <img src="https://a7sas.net/wp-content/uploads/2019/07/4060.jpeg" className="w-12 h-12 rounded-full shadow-lg" onClick={handleDopDownOpen} /> */}
              </div>

            </div>


            

            <div className={`fixed top-[5rem] h-20 bg-gray-50 border border-t-0 shadow-xl text-gray-700 rounded-b-lg w-48 bottom-10 right-0 mr-6 top-5" ${dropDownOpen ? '' : 'hidden'}`}>
               
                <a onClick={handleSingUp} className="block px-4 py-2 hover:bg-gray-200 cursor-pointer flex gap-2 text-primary font-bold">
                  <FaRegUserCircle className="cursor-pointer w-5 h-5" />
                  Cuenta
                  </a>
                {/* <a onClick={() => {console.log('click')}} className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">Configuración</a> */}
                <a onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-200 cursor-pointer flex gap-2 text-secondary font-bold">
                <FiLogOut className="cursor-pointer w-5 h-5" />
                  Cerrar</a>
            </div>

    </div>
        </>
    );
}


export default Navbar;