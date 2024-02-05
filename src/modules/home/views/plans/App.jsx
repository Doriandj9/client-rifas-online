import Layout from '@app/app/layouts/Layout';
import img from '@app/assets/imgs/undraw_gifts_0ceh.svg';
import AppCard from '@app/app/app_components/Core/AppCard';
import { useEffect, useState } from 'react';
import { credentials } from '../../../../app/config/app';
import routesapi from '../../../../app/config/routesapi';
import Lottie from 'react-lottie';
import welcome from '@app/assets/imgs/hayu24-bienvenida.png';
import { lottieOptions } from '../../../../app/utilities/web/configs';
import Plans from './components/Plans';
import { Img } from '@chakra-ui/react';


const url = credentials.server + routesapi.public_raffles;

function App() {
   

   const [load,setLoad] = useState(false);
   const hash = new URL(location.href);
   const [plans, setPlans] = useState(null);
   useEffect(() => {
        setTimeout(() => {
            setLoad(true);
        },5000)
   },[])
   useEffect(() => {
    // Encuentra el elemento y desplázate hacia él
    const targetElement = document.getElementById('plans');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []); 

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
          <div className="grid max-w-screen-xl pt-2 px-4 pb-2 mx-auto lg:gap-8 xl:gap-16 lg:py-2 lg:grid-cols-12 lg:pt-2">
              <div className="mr-auto place-self-center lg:col-span-6">
                  <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-3xl xl:text-4xl dark:text-white text-primary"><br/>Sistema de Rifas Online  <span className='text-secondary'>HAYU24</span></h1>
                  <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 text-justify">
                  Modernizando la dinámica de sorteos como parte integral de una iniciativa de responsabilidad social.
                  <br /> <br />
                  El sistema de rifas online HAYU24 no solo es una plataforma para la emoción de ganar premios asombrosos, sino un vehículo directo para brindar apoyo tangible a aquellos que más lo necesitan, ofreciendo una forma conveniente y segura de organizar rifas, permitiendo una participación fácil desde cualquier lugar.
                  <br /> <br />

                  Imaginen un espacio donde la ayuda social se moderniza, donde cada boleto adquirido es una contribución a proyectos humanitarios que tocan vidas de maneras inimaginables.
                  </p>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-6 lg:flex items-center justify-center">
                  <img src={welcome} alt="hero image" className='rounded-3xl h-96 block mt-10' />
              </div>  
          </div>
          </div>
        </div>
           
      </div>
      <div className="max-w-screen-xl px-4 pt-2 pb-2 mx-auto text-primary">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-3xl xl:text-4xl dark:text-white text-center">Listado de rifas </h1>
      </div>

      <div className="grid relative max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-6 lg:py-16 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 lg:pt-2 gap-4 md:place-items-stretch place-items-center">
        <AppCard url={url} />

        </div>
        <Plans />
      </section>
      </Layout>
    </>
  )
}


export default App;
