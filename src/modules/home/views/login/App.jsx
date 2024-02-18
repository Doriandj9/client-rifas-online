import Layout from '@app/app/layouts/Layout';
import img from '@app/assets/imgs/login_hayu2024.png';
import { FormControl, FormLabel, FormErrorMessage,  Input, FormHelperText} from '@chakra-ui/react'
import { Form, Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from "react-icons/fi";
import { FaGoogle,FaWindows } from "react-icons/fa";
import {initialFetch} from '../../../../app/utilities/web/fetchQuery';
import { useEffect, useState } from 'react';
import { credentials } from '../../../../app/config/app';
import routes from '../../../../app/config/routesapi';
import Loader from '../../../../app/app_components/Core/Loader';
import { navigateRoutes } from '../../../../app/utilities/web/navigateRoutes';
import { ToastContainer,toast } from 'react-toastify'
import AppButton from '../../../../app/app_components/Core/AppButon';
import { useAccessToken, useAuth } from '../../../../app/store/app/userStore';
import routesweb from '../../../../app/config/routesweb';
import InputPassword from '../../../../components/InputPassword';
import { useSetHeader } from '../../../../app/utilities/hooks/web/useSetHeader';
const App = () => {
    const navigate = useNavigate();
    const user = useAuth((state) => state.user);
    const login = useAuth((state) => state.save)
    const accToken = useAccessToken((state) => state.save);
    useSetHeader('Iniciar Sesión');
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

    useEffect(() => {
        if(user){
            navigateRoutes(navigate,user)
        }
    },[user])

    return (
        <>
            <Layout >
            <ToastContainer className={'w-[32rem]'} 
            // style={{ position: 'fixed', top: '50%', left: '50%', translate: '-50%,-50%'}}
             />
            <Loader loading={loading} />
            <section className="bg-gray-100 dark:bg-gray-900 md:p-[3rem] p-0">
            <div className="md:max-w-screen-xl px-4 pt-20 pb-8 mx-auto w-full">
              <div className='flex items-center mt-12 border border-primary'>
                <div className='bg-primary w-2/5 md:flex flex-col justify-center items-center h-[38rem] gap-5 hidden'>
                    <img className='w-1/2' src={img} alt="" />
                    <p className='text-white text-3xl italic font-bold shadow'><span className='text-secondary'>H</span>AYU24</p>
                    <p className='text-center text-white'>¡Bienvenido/a a nuestra plataforma! Estamos emocionados/as de tenerte aquí. </p>
                </div>
                <div className='bg-white h-[38rem] flex-grow'>
                    <p className='p-4 text-center w-full  m-auto md:text-2xl text-xl font-bold text-black mt-4'>Ingresa con tu cuenta para explorar todas las increíbles oportunidades que te esperan. </p>

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
                                <InputPassword password={inputs.password} handleInput={handleInput} />
                            </FormControl>
                            <AppButton type='submit' className="mt-4" 
                            leftIcon={<FiLogIn />}> Iniciar sesión </AppButton> 
                               <p className='mt-2 mb-2'> ¿Aún no tiene una cuenta? <Link className='text-primary' to={routesweb.register}> Regístrate </Link> </p> 
                               <p className='mt-4 text-center mb-8'>
                                   <Link to={routesweb.recovery_password} className='text-lg text-primary underline'> ¿Has olvidado tu contraseña? </Link> 
                               </p>
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