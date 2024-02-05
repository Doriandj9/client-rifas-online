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


const url = credentials.server + routesapi.public_raffles;

function App() {

  return (
    <>
      <Layout>

      <section className="bg-white dark:bg-gray-900">

    
      <div className=" max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-2 lg:py-16 lg:pt-20">
        <div className='relative'>
            {/* <div className='lg:-top-20 lg:left-40 lg:absolute relative -top-10'>
                <Lottie options={{animationData: party, ...lottieOptions}}  width={125} height={125} />
            </div>
            <h1 className='text-xl italic font-bold text-primary text-center'> Encuentra la mejor rifa y cómprala para ganar muchos premios. </h1> */}
          <div className='flex gap-6 mt-8'>
          <div className="max-w-screen-xl pt-2 px-4 pb-2 w-full lg:gap-8 xl:gap-16 lg:py-2 lg:pt-2">
            <h1 className='text-black font-bold text-center text-2xl'>Políticas de Privacidad</h1>
            <img className='w-32 h-22 block m-auto' src={logo} alt="" />
            <p className='px-8 py-2'>
            Bienvenido a <span className='font-bold italic'>HAYU24.</span>  Nos comprometemos a proteger tu privacidad y a proporcionarte una
            experiencia segura y transparente. Por favor, lee detenidamente nuestra política de privacidad.
            </p>
            <p className='px-8 py-2'>
            <span className='font-bold'>Seguridad de información.-</span> Tomamos todas las medidas de seguridad para proteger y garantizar
            su confidencialidad de los datos aportados por los USUARIOS en cumplimiento de la Ley Orgánica
            de Protección de Datos Personales.
            </p>
            <p className='px-8 py-2'>
            <span className='font-bold'>Menores de edad.-</span> Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos
            intencionalmente información de personas de menores de 18 años.
            </p>
            <p className='px-8 py-2'>
            <span className='font-bold'>Compartir Información.-</span> No compartimos la información personal de los usuarios con terceros
            sin su consentimiento, misma que únicamente será proporcionada a las Autoridades que lo requieran
            mediante mandamiento judicial.
            </p>
            <p className='px-8 py-2'>
            <span className='font-bold'>Cambios en la Política de Privacidad.-</span> Nos reservamos el derecho de actualizar nuestra política
            de privacidad. Te notificaremos sobre cualquier cambio relevante.
            </p>
            <p className='px-8 py-2'>
            <span className='font-bold'>Derechos de Privacidad.-</span>Tienes derecho a acceder, corregir y solicitar la eliminación de tus datos
            personales. Puedes ejercer estos derechos a través de soporte@hayu24.ec
            </p>
            <p className='px-8 py-2'>
            <span className='font-bold'>Términos y condiciones.-</span>Asimismo, al aceptar los Términos y Condiciones, el usuario autoriza a
            HAYU24 a enviarle notificaciones mediante medios electrónicos y los SERVICIOS disponibles.
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
