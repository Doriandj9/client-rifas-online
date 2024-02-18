import { FormControl, FormLabel, Input, List, ListIcon, ListItem, Select, Switch, useToast } from "@chakra-ui/react";
import AppButton from "../app/app_components/Core/AppButon";
import { useAccessToken, useAuth } from "../app/store/app/userStore";
import routesweb from "../app/config/routesweb";
import { Form, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { EMAIL_REG_EXPRE } from "../app/utilities/validations/Expresions";
import { toastConfig } from "../app/utilities/web/configs";
import { credentials } from "../app/config/app";
import routesapi from "../app/config/routesapi";
import { fetchQuery } from "../app/utilities/web/fetchQuery";
import Loader from "../app/app_components/Core/Loader";
import { MdCheckCircle, MdClose, MdCloseFullscreen, MdError, MdSettings } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import InputPassword from "./InputPassword";

let url = credentials.server + routesapi.user_profile;

const Settings = () => {
    const user = useAuth(state => state.user);
    const updateUser = useAuth((state) => state.save);
    const token = useAccessToken(state => state.token);
    const [imgProfile, setImageProfile] = useState(null);
    const [loadingFetch,setLoadingFetch] = useState(false);
    const [errorFetch,setErrorFetch] = useState(null);
    const [validPass, setValidPass] = useState([
        {status: false},{status: false},{status: false}
    ]) 
    const toast = useToast(toastConfig);
    const [inputs,setInputs] = useState({
        password: '',
        repeatPassword: '',
    });
    const handleInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })

        if(e.target.name === 'password'){
            const value = e.target.value;
            if(value.length >= 8){
                validPass[0].status = true; 
                setValidPass([...validPass]);
            }else {
                validPass[0].status = false; 
                setValidPass([...validPass]);
            }

            if(/[A-Z]/.test(value)){
                validPass[1].status = true; 
                setValidPass([...validPass]);
            }else{
                validPass[1].status = false; 
                setValidPass([...validPass]);
            }

            if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)){
                validPass[2].status = true; 
                setValidPass([...validPass]);
            }else {
                validPass[2].status = false; 
                setValidPass([...validPass]);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        return;
        if(!validations()){
            return;
        }
        url = url.replace('{id}',user.id);

        try{
            const response = await fetchQuery(token,url,{method:'PATCH',body:new URLSearchParams(inputs)},setLoadingFetch,setErrorFetch);
             if(response.status){
                  toast({
                      title: 'Actualización',
                      status: 'success',
                      description: 'Se actualizo correctamente la contraseña'
                  });
                  setInputs({
                    password: '',
                    repeatPassword: ''
                  });
                  setValidPass([
                    {status: false},{status: false},{status: false}
                  ]);
                  updateUser(response.data);
                  return;
             }
             throw Error(response.message);
          }catch(e){
              toast({
                  title: 'Error',
                  status: 'error',
                  description: e.message
              })
          }finally{
              setLoadingFetch(false);
          }

    }




    const validations = () => {
        const res = validPass.filter(item => item.status === false);
        if(inputs.password !== inputs.repeatPassword){
            toast({
                title: 'Error',
                description: 'La contraseñas no coinciden.',
                status: 'error'
            });
            return false;
        }

        if(res.length > 0){
            toast({
                title: 'Error',
                description: 'Por favor complete todos los requisitos de la contraseña para continuar',
                status: 'error'
            })
            return false;
        }
        return true;
    }

    return (
        <>
            <Loader loading={loadingFetch} />
            <div className="w-full min-h-[48rem]">
                <div className="w-full md:w-1/2 md:m-auto bg-white pt-8 ps-8 rounded-lg min-h-[38rem]">
                    <h1 className="text-3xl font-black">Actualiza tu configuración</h1>
                    <p className="text-slate-500 text-sm">Puedes sentirte cómodo según tus necesidades.</p>
                    <div className="mt-10 w-full pe-4 md:p-0 md:w-10/12">
                        <Form onSubmit={handleSubmit}>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>
                                    Idioma
                                </FormLabel>
                                <Select>
                                    <option>
                                        Español(es)
                                    </option>
                                </Select>
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Recibir notificaciones al correo electrónico</FormLabel>
                                <Switch defaultChecked colorScheme='blue' size='lg' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Notificaciones dentro de la plataforma</FormLabel>
                                <Switch defaultChecked colorScheme='blue' size='lg' />
                            </FormControl>
                            
                            <hr className="my-4" />
                            <AppButton type="submit" className="my-4">
                                Actualizar
                            </AppButton>
                        </Form>
                        </div>
                </div>
            </div>
        </>
    );

}


export default Settings;










