import routesapi from '../../../../app/config/routesapi';
import { credentials } from '../../../../app/config/app';
import { useAccessToken, useAuth } from '../../../../app/store/app/userStore';
import { useEffect, useState } from 'react';
// import Modal from './Modal/Modal';
import { reloadTable } from '../../../../app/utilities/events/customs';
import { ToastContainer,toast } from 'react-toastify';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { IoQrCodeOutline } from "react-icons/io5";
import AppCard from '@app/app/app_components/Core/AppCard';
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ImProfile } from "react-icons/im";
import { MdOutlineLockReset } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import Perfil from '../../../../components/Perfil';
import ResetPassword from '../../../../components/ResetPassword';
import Settings from '../../../../components/Settings';
import { useSetHeader } from '../../../../app/utilities/hooks/web/useSetHeader';
let actions = [
   {
       name: 'Código QR',
       icon: IoQrCodeOutline,
       color: 'green.700',
       element: null,
       onclick: () => {
           console.log('click | Editar');
       }
   }
  ];
const url = credentials.server + routesapi.public_raffles;

const App  = () => {
  useSetHeader('Perfil');
    //hooks 
    const token = useAccessToken((state) => state.token);
    const user = useAuth(state => state.user);
    //states

     return (
        <>
    <div className='bg-gray-100'>

   <Tabs position="relative" variant="unstyled">
    <TabList>
      <Tab>
        <div className='flex items-center gap-2'>
          <ImProfile className='text-secondary w-5 h-5'  />
          Información personal
        </div>
      </Tab>
      <Tab>
      <div className='flex items-center gap-2'>
          <MdOutlineLockReset className='text-secondary w-6 h-6'  />
          Restaurar la contraseña
        </div>
        </Tab>
      <Tab>
      <div className='flex items-center gap-2'>
          <IoSettingsOutline className='text-secondary w-6 h-6'  />
          Configuración
        </div>
        </Tab>
    </TabList>
    <TabIndicator
      mt="-1.5px"
      height="2px"
      bg="blue.500"
      borderRadius="1px"
    />
    <TabPanels>
      <TabPanel>
        <Perfil />
      </TabPanel>
      <TabPanel>
        <ResetPassword />
      </TabPanel>
      <TabPanel>
       <Settings />
      </TabPanel>
    </TabPanels>
  </Tabs>
  </div>

        </>
     );
}

export default App;