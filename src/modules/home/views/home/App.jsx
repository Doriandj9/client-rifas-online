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

   useEffect(() => {
        setTimeout(() => {
            setLoad(true);
        },5000)
   },[])

//    useEffect(() => {
//     // Encuentra el elemento y desplázate hacia él
//     const targetElement = document.getElementById('plans');
//     if (targetElement) {
//       targetElement.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, []); 

  return (
    <>
      <Layout>

      <section className="bg-white dark:bg-gray-900">

    
      <div className=" max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:pt-28">
        <div className='relative'>
            {/* <div className='lg:-top-20 lg:left-40 lg:absolute relative -top-10'>
                <Lottie options={{animationData: party, ...lottieOptions}}  width={125} height={125} />
            </div>
            <h1 className='text-xl italic font-bold text-primary text-center'> Encuentra la mejor rifa y cómprala para ganar muchos premios. </h1> */}
          <div className='flex gap-2 mt-8'>
          <div className="grid max-w-screen-xl pt-2 px-4 pb-2 mx-auto lg:gap-8 xl:gap-0 lg:py-2 lg:grid-cols-12 lg:pt-2">
              <div className="mr-auto place-self-center lg:col-span-7">
                  <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white text-primary"><br/> Bienvenidos a HAYU24. </h1>
                  <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Bienvenidos al Sistema de Rifas Online. <br />
                  Donde la convergencia de la tecnología y la compasión se unen, porque creemos que cada clic puede ser un paso hacia un cambio positivo. 
                  <br />
                  Este sistema de rifa online no solo es una plataforma para la emoción de ganar premios asombrosos, sino un vehículo directo para brindar apoyo tangible a aquellos que más lo necesitan, ofreciendo una forma conveniente y segura de organizar rifas, permitiendo una participación fácil desde cualquier lugar. <br />
                  Imaginen un espacio donde la ayuda social se moderniza, donde cada boleto adquirido es una contribución a proyectos humanitarios que tocan vidas de maneras inimaginables.
                  </p>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                  <img src={welcome} alt="hero image" className='rounded-3xl' />
              </div>  
          </div>
          </div>
        </div>
           
      </div>
      <div className="max-w-screen-xl px-4 pt-2 pb-2 mx-auto text-primary">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white text-center">Listado de rifas </h1>
      </div>

      <div className="grid relative max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-6 lg:py-16 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 lg:pt-2 gap-4 md:place-items-stretch place-items-center">
        <AppCard url={url} />

        </div>
        <Plans />

          <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
              <div className="mr-auto place-self-center lg:col-span-7">
                  <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"><br/> Modernizando la experiencia de sorteos. </h1>
                  <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Bienvenidos al Sistema de Rifas Online. <br />
                  La plataforma ofrece una forma conveniente y segura de organizar rifas, permitiendo una participación fácil desde cualquier lugar.
                  <br />
                  Con funcionalidades automáticas y transparentes, el sistema garantiza la equidad en los resultados, brindando a los organizadores la confianza necesaria.
                  </p>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                  <img src={img} alt="hero image" className='' />
              </div>  
          </div>

          
          {/* <div id='plans' className='w-full m-auto'>
                  <AppTable url='https://jsonplaceholder.typicode.com/users' columns={columns} actionColumns={actionColumns}  />
          </div> */}
      </section>
      </Layout>
    </>
  )
}


export default App;
