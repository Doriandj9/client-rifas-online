import { FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
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

let url = credentials.server + routesapi.user_profile;

const Perfil = () => {
    const user = useAuth(state => state.user);
    const updateUser = useAuth((state) => state.save);
    const token = useAccessToken(state => state.token);
    const [imgProfile, setImageProfile] = useState(credentials.server + user.avatar);
    const [loadingFetch,setLoadingFetch] = useState(false);
    const [errorFetch,setErrorFetch] = useState(null);
    const toast = useToast(toastConfig);
    const [inputs,setInputs] = useState({
        taxid: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        nationality: '',
        address: '',
        avatar: '',
    });
    const imageRef = useRef();
    const handleInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const handleSend = async (e) => {
        const img = e.target.files[0]
        if(!img){
            return;
        }
        const file = URL.createObjectURL(img);
        setImageProfile(file);

        const form = new FormData();
        form.append('avatar', img);

        try {
            const url = credentials.server + routesapi.user_avatar.replace('{id}',user.id);
            const response = await fetchQuery(token,url,{method:'POST',body:form},() => {},setErrorFetch);
            if(!response.status){
                throw Error(response.message);
            }
        } catch (e) {
            toast({
                title: 'Error',
                description: e.message,
                status: 'error'
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                      description: 'Se actualizo tu perfil'
                  });
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
        
        if(!EMAIL_REG_EXPRE.test(inputs.email)){
            toast({
                title: 'Error',
                description: 'Error el correo electrónico ingresado es incorrecto',
                status:'error'
            });

            return false;
        }

        return true;
    }

    useEffect(() => {
        setInputs({
            ...inputs,
            taxid: user.taxid,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            nationality: user.nationality,
            address: user.address,
            avatar: user.avatar,
        });
    },[user]);

    console.log(user);
    return (
        <>
            <Loader loading={loadingFetch} />
            <div className="w-full min-h-[48rem]">
                <div className="w-full md:w-1/2 md:m-auto bg-white pt-8 ps-8 rounded-lg min-h-[38rem]">
                    <h1 className="text-3xl font-black">Perfil</h1>
                    <p className="text-slate-500 text-sm">Cambiar foto de perfil</p>
                    <div className="flex gap-4 items-center">
                        <img className="w-40 h-40 rounded-full shadow" src={imgProfile} alt="" />
                        <AppButton onClick={ () => imageRef.current.click()}>
                            Cambiar avatar
                        </AppButton>
                        <Input 
                            className="hidden"
                            type="file"
                            onChange={handleSend}
                            accept="image/*"
                            ref={imageRef}
                        />
                    </div>
                    <div className="mt-10 w-full pe-4 md:p-0 md:w-10/12">
                        <Form onSubmit={handleSubmit}>
                        <FormControl isDisabled>
                                <FormLabel fontWeight={'bold'}>Cédula</FormLabel>
                                <Input name='taxid'
                                 onInput={handleInput}
                                 value={inputs.taxid}
                                 className='shadow' height={50} 
                                 placeholder='Por ejemplo: 0123456789' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Nombres</FormLabel>
                                <Input name='first_name'
                                onInput={handleInput}
                                value={inputs.first_name}
                                 className='shadow' height={50} placeholder='Por ejemplo: Nombre1 Nombre2' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Apellidos</FormLabel>
                                <Input name='last_name'
                                onInput={handleInput}
                                value={inputs.last_name}
                                 className='shadow' height={50} placeholder='Por ejemplo: Apellido1 Apellido2' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Correo electrónico</FormLabel>
                                <Input name='email'
                                onInput={handleInput}
                                value={inputs.email}
                                type="email"
                                 className='shadow' height={50} placeholder='Por ejemplo: ejemplo@email.com' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Número Telefónico</FormLabel>
                                <Input name='phone'
                                onInput={handleInput}
                                value={inputs.phone}
                                 className='shadow' height={50} placeholder='Por ejemplo: 0901234567' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Nacionalidad</FormLabel>
                                <Input name='nationality'
                                onInput={handleInput}
                                value={inputs.nationality}
                                 className='shadow' height={50} placeholder='Por ejemplo: Ecuador' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Dirección</FormLabel>
                                <Input name='address'
                                onInput={handleInput}
                                value={inputs.address}
                                 className='shadow' height={50} placeholder='Por ejemplo: Quito, Cotocollao Av. La Prensa' />
                            </FormControl>
                            <hr className="my-4" />
                            <AppButton type="submit" className="my-4">
                                Actualiza perfil
                            </AppButton>
                        </Form>
                        </div>
                </div>
            </div>
        </>
    );

}


export default Perfil;