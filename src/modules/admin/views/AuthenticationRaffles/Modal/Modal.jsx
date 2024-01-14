import { Form } from "react-router-dom";
import AppModal from "../../../../../app/app_components/Core/AppModal";
import { credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import { useAccessToken } from "../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../app/utilities/hooks/data/useFetch";
import { Checkbox, FormControl, FormLabel, Input, Radio, RadioGroup, Stack,ButtonGroup, Button, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdEditDocument } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { fetchQuery } from "../../../../../app/utilities/web/fetchQuery";
import Loader from "../../../../../app/app_components/Core/Loader";
import { reloadTable } from "../../../../../app/utilities/events/customs";
import { FaRegImages } from "react-icons/fa6";
const Modal = ({id, open,onClose, setUpdate}) => {
    const [showObserver, setShowObserver] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorFetch, setErrorFetch] = useState(null);
    //states
    const [inputs,setInputs] = useState({
        taxid: '',  
        email: '',
        first_name: '',
        last_name: '',
        img: '',
        phone: '',
        observation: '',
        organize_riffs: false,
    });
    //code
    let url =  credentials.server + routesapi.admin_auth_raffles;
    url = url + `/${id}`;
    const token = useAccessToken((state) => state.token);
    const {data, error, loading, refetch } = useFetch(url,{method:'GET'},'data',true,token,[id]);

    const handleSubmit = async () => {
        const url = credentials.server + routesapi.admin_auth_raffles + `/${id}`;
        if(showObserver && inputs.observation === ''){
            setUpdate({
                status: false,
                message: 'Ingrese una observación para continuar'
            });
            return;
        }
        setLoadingFetch(true);
        try{
          const params = {user_id: data.user.id, organize_riffs: inputs.organize_riffs, observation: inputs.observation};
          const response = await fetchQuery(token,url,{method:'PATCH',body:new URLSearchParams(params)},setLoadingFetch,setErrorFetch);
           if(response.status){
                document.dispatchEvent(reloadTable);
                setUpdate({
                    status: response.status,
                    message: response.message
                });
                onClose();
                refetch();
           }
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
    //effects
    useEffect(() => {
        if(data !== null &&  data['id'] > 0){
            
            setInputs({
                taxid: data.user.taxid,  
                email: data.user.email,
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                phone: data.user.phone,
                img: data.file.path,
                observation: '',
                organize_riffs: data.user.organize_riffs
            });
            setShowObserver(data.is_pending);
        }
    },[data])
    return (
        <>
            <Loader loading={loadingFetch} />
            <AppModal isOpen={open} onClose={onClose} scrollBehavior={'inside'}
                header={<><FaRegImages className="text-secondary text-3xl" /> Autorizar comprobante de pago</>}
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
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Autorización
                        </FormLabel>
                        <Input 
                        isDisabled 
                        fontWeight={'bold'}
                        opacity={'0.75 !important'}
                        value={inputs.organize_riffs ? 'Aprobado' : 'Negado'}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Imagen de Autorización
                        </FormLabel>
                    </FormControl>
                    <div className="p-4">
                        {
                            inputs.img ? <a target="__blank"
                            href={credentials.server + inputs.img}>
                                <img className="block w-full"
                                src={credentials.server + inputs.img} alt="auth" />
                            </a> 
                            : 
                            <div className="font-bold text-secondary">
                                No se ha registrado la imagen de verificación.
                            </div>
                        }
                        
                    </div>
                    <ButtonGroup gap='4'>
                    <Button 
                    onClick={handleChange}
                    data-info='reprove'
                    rightIcon={<MdCancel />} 
                    colorScheme='red'>Negar</Button>
                    <Button 
                    rightIcon={<FaCircleCheck />} 
                    onClick={handleChange}
                    data-info='accept'
                    colorScheme='blue'>Aprobar</Button>
                    </ButtonGroup>
                    {
                    showObserver &&
                    <FormControl marginTop={15} isRequired >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Observación
                        </FormLabel>
                        <Textarea 
                         name="observation"
                         onInput={handleInput}
                         value={inputs.observation}
                        isRequired placeholder='Texto aquí..' />
                    </FormControl>
                    }

                </Form>
            </AppModal>
        </>
    );
}


export default Modal;