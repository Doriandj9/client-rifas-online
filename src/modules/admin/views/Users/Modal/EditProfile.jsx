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
import { FaUserEdit } from "react-icons/fa";


const EditProfile = ({id, open,onClose, setUpdate, refetch}) => {
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
    const {data, error, loading } = useFetch(url,{method:'GET'},'data',true,token,[id]);

    const handleSubmit = async () => {

        setLoadingFetch(true);
        try{
          const params = {...inputs, editEmail: true};
          const response = await fetchQuery(token,url,{method:'PATCH',body:new URLSearchParams(params)},setLoadingFetch,setErrorFetch);
           if(response.status){
            refetch();
                setUpdate({
                    status: response.status,
                    message: response.message
                });
                onClose();
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
        Actualizar
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
                header={<div className="flex gap-2 items-center">
                    <FaUserEdit className="text-secondary text-3xl" />Editar el perfil de usuario
                </div>}
                buttons={buttons}
                size='4xl'
            >
                <Form>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Doc. Identidad
                        </FormLabel>
                        <Input  
                        onInput={handleInput}
                        name="taxid"
                        fontWeight={'bold'}
                        opacity={'0.75 !important'}
                        value={inputs.taxid}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Nombres
                        </FormLabel>
                        <Input  
                        onInput={handleInput}
                        fontWeight={'bold'}
                        name="first_name"
                        opacity={'0.75 !important'}
                        value={inputs.first_name}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Apellidos
                        </FormLabel>
                        <Input  
                        onInput={handleInput}
                        name="last_name"
                        fontWeight={'bold'}
                        opacity={'0.75 !important'}
                        value={inputs.last_name}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Correo electrónico
                        </FormLabel>
                        <Input  
                        onInput={handleInput}
                        fontWeight={'bold'}
                        name="email"
                        opacity={'0.75 !important'}
                        value={inputs.email}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Número de celular
                        </FormLabel>
                        <Input  
                        onInput={handleInput}
                        fontWeight={'bold'}
                        name="phone"
                        opacity={'0.75 !important'}
                        value={inputs.phone}/>
                    </FormControl>
                </Form>
            </AppModal>
        </>
    );
}


export default EditProfile;