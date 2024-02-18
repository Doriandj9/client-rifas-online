import Layout from '@app/app/layouts/Layout';
import img from '@app/assets/imgs/undraw_gifts_0ceh.svg';
import { useEffect, useState } from 'react';
import { credentials } from '../../../../app/config/app';
import logo from '@app/assets/imgs/DigitalEducas-Logos/hayu24.png';

import routesapi from '../../../../app/config/routesapi';
import Lottie from 'react-lottie';
import welcome from '@app/assets/imgs/hayu24-bienvenida.png';
import { lottieOptions } from '../../../../app/utilities/web/configs';
import { Img } from '@chakra-ui/react';
import { useSetHeader } from '../../../../app/utilities/hooks/web/useSetHeader';


const url = credentials.server + routesapi.public_raffles;

function App() {
useSetHeader('Acerca de nosotros');
  return (
    <>
      <Layout>

      <section className="bg-white dark:bg-gray-900 min-h-[45rem]">

    
      <div className=" max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-2 lg:py-16 lg:pt-20">
        <div className='relative'>
            {/* <div className='lg:-top-20 lg:left-40 lg:absolute relative -top-10'>
                <Lottie options={{animationData: party, ...lottieOptions}}  width={125} height={125} />
            </div>
            <h1 className='text-xl italic font-bold text-primary text-center'> Encuentra la mejor rifa y cómprala para ganar muchos premios. </h1> */}
          <div className='flex gap-6 mt-8'>
          <div className="max-w-screen-xl pt-2 px-4 pb-2 w-full lg:gap-8 xl:gap-16 lg:py-2 lg:pt-2">
            <h1 className='text-black font-bold text-center text-2xl'>MISIÓN Y VISIÓN</h1>
            {/* <img className='w-32 h-22 block m-auto' src={logo} alt="" /> */}
            <p className='px-8 py-2'>
                <span className='font-bold'>Misión.-</span>
                “Facilitar el acceso equitativo a oportunidades de apoyo y solidaridad a través de nuestro
sistema de rifas online. Estamos comprometidos en promover la ayuda social al brindar una
plataforma inclusiva y transparente donde la comunidad pueda contribuir y beneficiarse
mutuamente, creando un impacto positivo en la sociedad”
            </p>
            <p className='px-8 py-2'>
                <span className='font-bold'>Visión.-</span>
                “Ser la principal plataforma de rifas online reconocido a nivel nacional e internacional por
nuestro compromiso inquebrantable con la ayuda social y la solidaridad.”
            </p>
            <p className='px-8 py-2'>
                <span className='font-bold'>Valores de la empresa.-</span>
                <ul className='ms-10 list-disc'>
                    <li> Solidaridad </li>
                    <li> Transparencia </li>
                    <li> Equidad </li>
                    <li> Responsabilidad </li>
                    <li> Compromiso con la Comunidad </li>
                    <li> Impacto Positivo </li>
                </ul>
            </p>
          </div>
          </div>
        </div>
           
      </div>
      </section>
      </Layout>
    </>
  )
}


export default App;
