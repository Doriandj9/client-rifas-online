import Layout from '@app/app/layouts/Layout';
import img from '@app/assets/imgs/DigitalEducas-Logos/hayu24.png';
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
import FormRaffles from './components/FormRaffles';

const App = () => {
    const navigate = useNavigate();
    const login = useAuth((state) => state.save)
    const accToken = useAccessToken((state) => state.save)
    const[loading, setLoading] = useState(false);
    const[inputs,setInputs] = useState({
        email: '',
        taxid: '',
        first_name: '',
        last_name:'',
        phone:'',
        is_raffles: 0,
        is_pending: 1,
        is_seller: 0,
        accept_terminus: 0,
        photo: '',
        is_client: true,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const form = new FormData();
            for(let [key,value] of Object.entries(inputs)){
                form.append(key,value)
            }
            const response = await initialFetch(credentials.server + routes.register,{method: 'POST',body:form});
            
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
    const handleCheck = (e) => {
        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.checked ? 1 : 0,
            }
        )
    }
    const handleChange  = (e) => {
        setInputs({
            ...inputs,
            photo: e.target.files[0]
        })
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
              <div className='flex items-center mt-12 border border-primary xl:w-9/12 m-auto'>
                <div className='bg-white min-h-[38rem] flex-grow lg:px-4 xl:px-8 sm:px-0 p-0'>
                    {/* <div className='flex justify-center items-center p-4'>
                        <img src={img} className='block w-48' alt="" />
                    </div> */}
                    <p className='p-4 text-center w-full  m-auto text-xl italic font-bold text-primary mt-4'>Regístrate y crea increíbles oportunidades en tu sistema de rifas en linea.</p>

                    <div className='p-2 w-11/12 m-auto'>
                        <Form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                                <FormLabel fontWeight={'bold'}>Cédula</FormLabel>
                                <Input name='taxid'
                                value={inputs.taxid}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: 0123456789' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'bold'}>Nombres</FormLabel>
                                <Input name='first_name'
                                value={inputs.first_name}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: Nombre1 Nombre2' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Apellidos</FormLabel>
                                <Input name='last_name'
                                value={inputs.last_name}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: Apellido1 Apellido2' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Correo electrónico</FormLabel>
                                <Input name='email'
                                value={inputs.email}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: ejemplo@email.com' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Número Telefónico</FormLabel>
                                <Input name='phone'
                                value={inputs.phone}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: 0901234567' />
                            </FormControl>

                            <FormControl  marginTop={15}>
                                <FormLabel fontWeight={'bold'}>
                                <Input value={inputs.is_raffles}
                                name='is_raffles'
                                onChange={handleCheck}
                                 className='shadow' marginRight={2}  width={26} height={26} type='checkbox'>
                                </Input>
                                   ¿Desea ser un usuario capaz de organizar rifas en tu sistema?
                                </FormLabel>
                            </FormControl>
                            <FormControl  marginTop={15}>
                                <FormLabel fontWeight={'bold'}>
                                <Input value={inputs.is_seller}
                                onChange={handleCheck}
                                name='is_seller'
                                className='shadow' marginRight={2}  width={26} height={26} type='checkbox'>
                                </Input>
                                   ¿Desea ser un usuario capaz de realizar ventas de boletos en tu sistema?
                                </FormLabel>
                            </FormControl>
                            {inputs.is_raffles === 1  && <FormRaffles photo={inputs.photo} handleChange={handleChange} />}
                            <FormControl  marginTop={25} isRequired>
                                <FormLabel>
                                <Input className='shadow' marginRight={2} value={inputs.accept_terminus}  width={26} height={26} type='checkbox'>
                                </Input>
                                    Aceptar términos y condiciones
                                </FormLabel>
                                <Link target="__blank" to={routesweb.company_policy}
                                 className='text-sm text-primaryop-900 mt-2'> Leer términos y condiciones  </Link>
                            </FormControl>
                            <AppButton type='submit' className="my-4" 
                            leftIcon={<FiLogIn />}> Registrarse </AppButton> 
                            <hr />
                            <p className='text-center text-black/50'>Regístrate con</p>
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