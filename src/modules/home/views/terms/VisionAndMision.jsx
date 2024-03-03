import Layout from '@app/app/layouts/Layout';
import { credentials } from '../../../../app/config/app';
import logo from '@app/assets/imgs/DigitalEducas-Logos/hayu24.png';
import missionVision from '@app/assets/imgs/mision_vision.png';
import solidarity from '@app/assets/imgs/solidarity.png';
import transparent from '@app/assets/imgs/transparent.png';
import groupWork from '@app/assets/imgs/group-work.png';
import services from '@app/assets/imgs/services.png';
import ampaty from '@app/assets/imgs/ampaty.png';
import routesapi from '../../../../app/config/routesapi';
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
          <div className='flex gap-6 mt-8'>
          <div className="max-w-screen-xl pt-2 px-4 pb-2 w-full lg:gap-8 xl:gap-16 lg:py-2 lg:pt-2">

            <div className=''>
                <div className='min-h-[12.5rem] flex md:flex-row flex-col w-full'>
                  <article className='md:w-[33.33%] w-full'>
                      <h2 className='text-xl font-black text-primary text-center'>NUESTRA HISTORIA</h2>
                      <p></p>
                  </article>
                  <div className='md:w-[33.33%] w-full flex justify-center items-center'>
                    <div className='rounded-full flex justify-center items-center w-40 h-40 border border-primary border-dashed'>
                        <img className='rounded-full w-36 h-36' src={logo} alt="logo" />
                    </div>
                    </div>
                  <article className='md:w-[33.33%] w-full'>
                      <p className='text-lg'>
                      <span className='font-black text-xl text-primaryop-900'>HAYU24</span> nace con una visión de Digital
                      Educas: crear una plataforma de rifas en
                      línea que no solo brinde la emoción y el
                      entretenimiento de ganar, sino que también
                      tenga un impacto social significativo en la
                      sociedad. Cada rifa que se llevaba a cabo
                      en la plataforma tiene un propósito más
                      grande: mejorar la vida de las personas y
                      el mundo que compartimos.”
                      </p>
                  </article>
                </div>

                <div className='min-h-[12.5rem] flex md:flex-row flex-col mt-8'>
                <article className='md:w-[33.33%] w-full'>
                      <h2 className='text-xl font-black text-primary text-center'>MISIÓN</h2>
                      <p className='text-lg'>“Facilitar el acceso equitativo a
                    oportunidades de apoyo y
                    solidaridad a través de nuestro
                    sistema de rifas online.
                    </p>
                  </article>
                    <div className='md:w-[33.33%] w-full'>
                        <img className=''  src={missionVision} alt="mission" />
                    </div>
                    <article className='md:w-[33.33%] w-full'>
                      <h2 className='text-xl font-black text-primary text-center'>VISIÓN</h2>
                      <p className='text-lg'>
                      “Ser la principal plataforma de rifas online
                      reconocido a nivel nacional e internacional
                      por nuestro compromiso inquebrantable
                      con la ayuda social y la solidaridad.”
                      </p>
                  </article>
                </div>
            </div>

            <div className='mt-12'> 
                    <h2 className='text-2xl font-black text-primary text-center'>NUESTROS VALORES</h2>
            </div>

            <div className='mt-16 flex justify-around flex-wrap'>
                <div className='flex flex-col w-56'>
                    <div className='w-52 h-52 border-[1rem] border-primary rounded-full flex justify-center items-center'>
                          <img className='w-36 h-36 rounded-full' src={solidarity} alt="" />
                    </div>
                    <h3 className='text-2xl text-center text-primary mt-4 font-bold'>Solidaridad</h3>
                </div>
                <div className='flex flex-col w-56'>
                    <div className='w-52 h-52 border-[1rem] border-primary rounded-full flex justify-center items-center'>
                          <img className='w-36 h-36 rounded-full' src={transparent} alt="" />
                    </div>
                    <h3 className='text-2xl text-center text-primary mt-4 font-bold'>Transparencia</h3>
                </div>
                <div className='flex flex-col w-56'>
                    <div className='w-52 h-52 border-[1rem] border-primary rounded-full flex justify-center items-center'>
                          <img className='w-36 h-36 rounded-full' src={ampaty} alt="" />
                    </div>
                    <h3 className='text-2xl text-center text-primary mt-4 font-bold'>Empatía</h3>
                </div>
                <div className='flex flex-col w-56'>
                    <div className='w-52 h-52 border-[1rem] border-primary rounded-full flex justify-center items-center'>
                          <img className='w-36 h-36 rounded-full' src={groupWork} alt="" />
                    </div>
                    <h3 className='text-2xl text-center text-primary mt-4 font-bold'>Trabajo en equipo</h3>
                </div>
                <div className='flex flex-col w-56'>
                    <div className='w-52 h-52 border-[1rem] border-primary rounded-full flex justify-center items-center'>
                          <img className='w-36 h-36 rounded-full' src={services} alt="" />
                    </div>
                    <h3 className='text-2xl text-center text-primary mt-4 font-bold'>Vocación de servicio</h3>
                </div>
            </div>
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
