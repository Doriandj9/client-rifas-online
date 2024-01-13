import Layout from '@app/app/layouts/Layout';
import img from '@app/assets/imgs/DigitalEducas-Logos/hayu24.png';
import { FormControl, FormLabel, FormErrorMessage,  Input, FormHelperText} from '@chakra-ui/react'
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
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
    const {code} = useParams();
    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);
    const[inputs,setInputs] = useState({
        password: '',
        passwordRepite: ''
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const form = new FormData();
            for(let [key,value] of Object.entries(inputs)){
                form.append(key,value)
            }
            const response = await initialFetch(credentials.server + routes.confirm + `/${atob(code)}`  ,{method: 'POST',body:form});
            if(response.status){
                navigate(routesweb.success_register);
            }
            toast.error(response.message, {
                    position: toast.POSITION.TOP_CENTER,
                    className: 'p-12 w-full',

                    });
            
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
            <section className="bg-gray-100 dark:bg-gray-900 md:p-12 sm:p-0">
            <div className="max-w-screen-xl px-4 pt-20 pb-8 mx-auto sm:w-full">
              <div className='flex items-center mt-12 border border-primary xl:w-5/12 m-auto'>
                <div className='bg-white min-h-[38rem] flex-grow lg:px-4 xl:px-8 sm:px-0 p-0'>
                    <div className='flex justify-center items-center p-4'>
                        <img src={img} className='block w-48' alt="" />
                    </div>
                    <p className='p-4 text-center w-full  m-auto text-xl italic font-bold text-primary mt-4'>Crea una contraseña segura y accede a la plataforma.</p>

                    <div className='p-2 w-11/12 m-auto'>
                        <Form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                                <FormLabel fontWeight={'bold'}>Nueva Contraseña</FormLabel>
                                <Input name='password'
                                value={inputs.password}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: *******' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Repite la Contraseña</FormLabel>
                                <Input name='passwordRepite'
                                value={inputs.passwordRepite}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: ********' />
                            </FormControl>
                            <AppButton type='submit' className="my-4" 
                            leftIcon={<FiLogIn />}> Confirmar </AppButton> 
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