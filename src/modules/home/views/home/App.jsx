import Layout from '@app/app/layouts/Layout';
import img from '@app/assets/imgs/undraw_gifts_0ceh.svg';
import AppCard from '@app/app/app_components/Core/AppCard';
import { useEffect, useState } from 'react';
import { credentials } from '../../../../app/config/app';
import routesapi from '../../../../app/config/routesapi';
import Lottie from 'react-lottie';
import sorprise from '@app/assets/imgs/animations/sorprise.json';
import welcome from '@app/assets/imgs/hayu24-bienvenida.png';
import { lottieOptions } from '../../../../app/utilities/web/configs';
import Plans from './components/Plans';
import { Img } from '@chakra-ui/react';
import { useSetHeader } from '../../../../app/utilities/hooks/web/useSetHeader';
import ReviewHayu from '../../../../components/ReviewHayu';
import ModalSorters from '../../../../components/ModalSorters';


const url = credentials.server + routesapi.public_raffles;

function App() {
  useSetHeader('Inicio');
   const [load,setLoad] = useState(false);
   const [open, setOpen] = useState(true);
   const hash = new URL(location.href);
   const [plans, setPlans] = useState(null);
   
   useEffect(() => {
        setTimeout(() => {
            setLoad(true);
        },5000)
   },[])
   useEffect(() => {
    // Encuentra el elemento y desplázate hacia él
    const targetElement = document.getElementById('home');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []); 

  return (
    <>
      <Layout>
       <ModalSorters open={open} onClose={() => setOpen(false)}  />

      <section id='home' className="bg-white dark:bg-gray-900">
    
      <div className=" max-w-screen-xl px-4 pt-8 pb-8 mx-auto lg:gap-8 xl:gap-2 lg:py-16 lg:pt-8">
        <div className='relative'>
          <div className='flex gap-6 mt-8'>
          <div className="grid max-w-screen-xl pt-0 px-4 pb-0 mx-auto lg:gap-0 xl:gap-0 lg:py-2 lg:grid-cols-12 lg:pt-0">
              <div className="mr-auto place-self-center md:col-span-12">
                  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-3xl text-center xl:text-4xl dark:text-white text-primary"><br/>Sistema de Rifas Online  <span className='text-secondary'>HAYU24</span></h1>
                  <p className="mb-2 font-light text-gray-500 lg:mb-0 md:text-lg lg:text-xl dark:text-gray-400 text-justify">
                  Modernizando la dinámica de sorteos como parte integral de una iniciativa de responsabilidad social.
                  <br />
                  El sistema de rifas online HAYU24 no solo es una plataforma para la emoción de ganar premios asombrosos, sino un vehículo directo para brindar apoyo tangible a aquellos que más lo necesitan, ofreciendo una forma conveniente y segura de organizar rifas, permitiendo una participación fácil desde cualquier lugar.
                  <br />
                  Imaginen un espacio donde la ayuda social se moderniza, donde cada boleto adquirido es una contribución a proyectos humanitarios que tocan vidas de maneras inimaginables.
                  </p>
              </div>
              <div className="lg:mt-0 lg:col-span-6 md:col-span-6 lg:flex items-start justify-center flex-col">
                  {/* <img src={welcome} alt="hero image" className='rounded-3xl h-96 block mt-10' /> */}
                  <iframe className='w-[180] h-[100] md:w-[390px] md:h-[290px] lg:w-[575px] md:h-[315px] m-auto md:m-0' src="https://www.youtube.com/embed/W_oVH-iNUyI?si=5YzgmOqNN9rAEz-f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

              </div>  
              <div className="lg:mt-0 lg:col-span-6 md:col-span-6 lg:flex items-start justify-center flex-col mb-16 md:mb-2">
                  {/* <img src={welcome} alt="hero image" className='rounded-3xl h-96 block mt-10' /> */}
                  <ReviewHayu />
              </div>  
          </div>
          </div>
        </div>
           
      </div>
      <div className="max-w-screen-xl px-4 pt-2 pb-2 mx-auto text-primary relative">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-3xl xl:text-4xl dark:text-white text-center">Listado de rifas </h1>
      <div className='absolute -top-28'>
        <Lottie options={{animationData: sorprise, ...lottieOptions}}  width={200} height={200} />
      </div>
      <div className='absolute -top-28 right-0'>
        <Lottie options={{animationData: sorprise, ...lottieOptions}}  width={200} height={200} />
      </div>
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
