import { Form } from "react-router-dom";
import AppModal from "../../../../../app/app_components/Core/AppModal";
import { credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import { useAccessToken } from "../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../app/utilities/hooks/data/useFetch";
import { Checkbox, FormControl, FormLabel, Input, Radio, RadioGroup, Stack,ButtonGroup, Button, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchQuery } from "../../../../../app/utilities/web/fetchQuery";
import Loader from "../../../../../app/app_components/Core/Loader";
import { reloadTable } from "../../../../../app/utilities/events/customs";
import { MdLockReset } from "react-icons/md";
import InputPassword from "../../../../../components/InputPassword";
import { generatePassword } from "../../../../../app/utilities/web/logaritmos";
import { toastConfig } from "../../../../../app/utilities/web/configs";

const ResetPassword = ({id, open,onClose, setUpdate}) => {
    const [showObserver, setShowObserver] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorFetch, setErrorFetch] = useState(null);
    const toast = useToast(toastConfig);
    //states
    const [inputs,setInputs] = useState({
        taxid: '',  
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        password: '',
    });
    //code
    let url =  credentials.server + routesapi.admin_users;
    url = url + `/${id}`;
    const token = useAccessToken((state) => state.token);
    const {data, error, loading, refetch } = useFetch(url,{method:'GET'},'data',true,token,[id]);

    const handleSubmit = async () => {
        if(inputs.password === ''){
            toast({
                title:'Error',
                description: 'Debe ingresar una contraseña para continuar.',
                status: 'error'
            });
            return;
        }
        setLoadingFetch(true);
        try{
          const params = {password: inputs.password.trim(), resetPassword: true};
          const response = await fetchQuery(token,url,{method:'PATCH',body:new URLSearchParams(params)},setLoadingFetch,setErrorFetch);
           if(response.status){
                document.dispatchEvent(reloadTable);
                setUpdate({
                    status: response.status,
                    message: response.message
                });
                onClose();
                refetch();
                return;
           }

           throw Error(response.message);
        }catch(e){
            setUpdate({
                status: false,
                message: e.message
            })
        }finally{
            setLoadingFetch(false);
        }

    }

    const buttons = <>
    <Button colorScheme='red' mr={3} onClick={onClose}>
        Cerrar
    </Button>
    <Button colorScheme='blue' onClick={handleSubmit} >
        Guardar
      </Button>
    </>;
    //handlers
    const handleChange = (e) => {
        const op = e.target.dataset.info;
        if(op === 'accept'){
            setInputs({...inputs, organize_riffs: true});
            setShowObserver(false);
            return;
        }

        setShowObserver(true);
        setInputs({...inputs, organize_riffs: false});

    }
    const handleInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handlePass = () => {
        const pass = generatePassword();
        setInputs({...inputs, password: pass})
    }
    //effects
    useEffect(() => {
        if(data !== null &&  data['id'] > 0){
            
            setInputs({
                ...inputs,
                taxid: data.taxid,  
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
            });
        }
    },[data])
    return (
        <>
            <Loader loading={loadingFetch} />
            <AppModal isOpen={open} onClose={onClose} scrollBehavior={'inside'}
                header={<><MdLockReset className="text-secondary text-3xl" /> Restaurar una nueva contraseña</>}
                buttons={buttons}
                size='4xl'
            >
                <Form>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Doc. Identidad
                        </FormLabel>
                        <Input 
                        isDisabled 
                        fontWeight={'bold'}
                        opacity={'0.75 !important'}
                        value={inputs.taxid}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Nombres
                        </FormLabel>
                        <Input 
                        isDisabled 
                        fontWeight={'bold'}
                        opacity={'0.75 !important'}
                        value={`${inputs.first_name} ${inputs.last_name}`}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Correo electrónico
                        </FormLabel>
                        <Input 
                        isDisabled 
                        fontWeight={'bold'}
                        opacity={'0.75 !important'}
                        value={inputs.email}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Número de celular
                        </FormLabel>
                        <Input 
                        isDisabled 
                        fontWeight={'bold'}
                        opacity={'0.75 !important'}
                        value={inputs.phone}/>
                    </FormControl>
                    <FormControl isRequired className="mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Nueva contraseña
                        </FormLabel>
                        <InputPassword handleInput={handleInput} password={inputs.password} name={'password'} />
                    <Button onClick={handlePass} colorScheme="green" className="mt-5">
                        Generar contraseña
                    </Button>
                    </FormControl>
                </Form>
            </AppModal>
        </>
    );
}


export default ResetPassword;