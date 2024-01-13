import Layout from '@app/app/layouts/Layout';
import img from '@app/assets/imgs/undraw_secure_login_pdn4.svg';
import { FormControl, FormLabel, FormErrorMessage,  Input, FormHelperText} from '@chakra-ui/react'
import { Form, Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from "react-icons/fi";
import { FaGoogle,FaWindows } from "react-icons/fa";
import {initialFetch} from '../../../../app/utilities/web/fetchQuery';
import { useState } from 'react';
import { credentials } from '../../../../app/config/app';
import routes from '../../../../app/config/routesapi';
import Loader from '../../../../app/app_components/Core/Loader';
import { navigateRoutes } from '../../../../app/utilities/web/navigateRoutes';
import { ToastContainer,toast } from 'react-toastify'
import AppButton from '../../../../app/app_components/Core/AppButon';
import { useAccessToken, useAuth } from '../../../../app/store/app/userStore';
import routesweb from '../../../../app/config/routesweb';
const App = () => {
    const navigate = useNavigate();
    const login = useAuth((state) => state.save)
    const accToken = useAccessToken((state) => state.save)
    const[loading, setLoading] = useState(false);
    const[inputs,setInputs] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const form = new FormData();
            for(let [key,value] of Object.entries(inputs)){
                form.append(key,value)
            }
            const response = await initialFetch(credentials.server + routes.login,{method: 'POST',body:form});
            const json = await response;
            if(json.status){
                accToken(json.data);
                login(json.data);
                navigateRoutes(navigate,json.data.user)
                return
            }
            toast.error(json.message, {
                    position: toast.POSITION.TOP_CENTER,
                    className: 'p-12 w-full',

                    });
            setInputs({...inputs,password: ''})
            
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
                className: 'p-12 w-full',
                });
        }finally{
            setLoading(false);
        }
    }

    const handleInput = (e) => {
        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.value,
            }
        )
    }

    return (
        <>
            <Layout >
            <ToastContainer className={'w-[32rem]'} 
            // style={{ position: 'fixed', top: '50%', left: '50%', translate: '-50%,-50%'}}
             />
            <Loader loading={loading} />
            <section className="bg-gray-100 dark:bg-gray-900 p-[3rem]">
            <div className="max-w-screen-xl px-4 pt-20 pb-8 mx-auto">
              {/* <div className="mr-auto place-self-center lg:col-span-7">
                  <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"><br/> Modernizando la experiencia de sorteos. </h1>
                  <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Bienvenidos al Sistema de Rifas Online. <br />
                  La plataforma ofrece una forma conveniente y segura de organizar rifas, permitiendo una participación fácil desde cualquier lugar.
                  <br />
                  Con funcionalidades automáticas y transparentes, el sistema garantiza la equidad en los resultados, brindando a los organizadores la confianza necesaria.
                  </p>
                  <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                      <a href="https://github.com/themesberg/landwind" className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                          <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg> View on GitHub
                      </a> 
                      <a href="https://www.figma.com/community/file/1125744163617429490" className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                          <svg className="w-4 h-4 mr-2" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="1667" height="2500"><style type="text/css">{`.st0{fill:#0acf83}.st1{fill:#a259ff}.st2{fill:#f24e1e}.st3{fill:#ff7262}.st4{fill:#1abcfe}`}</style><title>Figma.logo</title><desc>Created using Figma</desc><path id="path0_fill" className="st0" d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z"/><path id="path1_fill" className="st1" d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z"/><path id="path1_fill_1_" className="st2" d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z"/><path id="path2_fill" className="st3" d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z"/><path id="path3_fill" className="st4" d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z"/></svg> Get Figma file
                      </a>
                  </div>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                  <img src={''} alt="hero image" />
              </div>   */}
              <div className='flex items-center mt-12 border border-primary'>
                <div className='bg-primary w-2/5 flex flex-col justify-center items-center h-[38rem] gap-5'>
                    <img className='w-1/2' src={img} alt="" />
                    <p className='text-white text-3xl italic font-bold shadow'><span className='text-secondary'>H</span>AYU24</p>
                    <p className='text-center text-white'>¡Bienvenido/a a nuestra plataforma! Estamos emocionados/as de tenerte aquí. </p>
                </div>
                <div className='bg-white h-[38rem] flex-grow'>
                    <p className='p-4 text-center w-full  m-auto text-2xl font-bold text-black mt-4'>Ingresa con tu cuenta para explorar todas las increíbles oportunidades que te esperan. </p>

                    <div className='p-2 w-11/12 m-auto'>
                        <Form onSubmit={handleSubmit}>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'bold'}>Correo electrónico</FormLabel>
                                <Input name='email'
                                value={inputs.email}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: ejemplo@email.com' />
                            </FormControl>
                            <FormControl marginTop={25}  isRequired>
                                <FormLabel fontWeight={'bold'}>Contraseña</FormLabel>
                                <Input 
                                onInput={handleInput}
                                value={inputs.password}
                                name='password' type='password' className='shadow' height={50} placeholder='*********' />
                            </FormControl>

                            <FormControl  marginTop={25} isRequired>
                                <FormLabel>
                                <Input className='shadow' marginRight={2}  width={26} height={26} type='checkbox'>
                                </Input>
                                    Aceptar terminos y condiciones
                                </FormLabel>
                                <Link className='text-sm text-primaryop-900 mt-2'> Leer términos y condiciones  </Link>
                            </FormControl>
                            <AppButton type='submit' className="mt-4" 
                            leftIcon={<FiLogIn />}> Iniciar sesión </AppButton> 
                               <p className='mt-2 mb-4'> ¿Aún no tiene una cuenta? <Link className='text-primary' to={routesweb.register}> Regístrate </Link> </p> 
                            <hr />
                            <p className='text-center text-black/50'>Inicia sesión con</p>
                            <div className='flex justify-center gap-2'>
                                <FaGoogle /> <FaWindows />
                            </div>
                        </Form>
                    </div>
                </div>
              </div>
          </div>
      </section>
            </Layout>
        </>
    );
}

export default App;