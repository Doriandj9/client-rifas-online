import { Form } from "react-router-dom";
import AppModal from "../../../../../app/app_components/Core/AppModal";
import { credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import { useAccessToken } from "../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../app/utilities/hooks/data/useFetch";
import { Checkbox, FormControl, FormLabel, Input, Radio, RadioGroup, Stack,ButtonGroup, Button, Textarea, useToast, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdEditDocument } from "react-icons/md";
import { FaCircleCheck, FaCode, FaRegCopy } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { fetchQuery } from "../../../../../app/utilities/web/fetchQuery";
import Loader from "../../../../../app/app_components/Core/Loader";
import { reloadTable } from "../../../../../app/utilities/events/customs";
import { FaUserCheck } from "react-icons/fa";
import { formatNumberTwoDigits } from "../../../../../app/utilities/web/formatNumber";
import { toastConfig } from "../../../../../app/utilities/web/configs";
import { TbWorldCode } from "react-icons/tb";

const Modal = ({id, open,onClose, setUpdate, refetch}) => {
    const [showObserver, setShowObserver] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorFetch, setErrorFetch] = useState(null);
    const toast = useToast(toastConfig);
    const [buttonsClicks , setButtonsClick] = useState({
        accept: false,
        cancel: false
    })
    //states
    const [inputs,setInputs] = useState({
        full_name: '',
        taxid: '',
        comment: '',
    });
    //code
    let url =  credentials.server + routesapi.admin_rating;
    url = url + `/${id}`;
    const token = useAccessToken((state) => state.token);
    const {data, error, loading } = useFetch(url,{method:'GET'},'data',true,token,[id]);

    const handleSubmit = async () => {
        
        if(buttonsClicks.accept === false && buttonsClicks.cancel === false){
            toast({
                title: 'Error',
                description: 'Para continuar seleccione Aprobar o Negar',
                status: 'error'                
            });
            return;
        }
       

        let statusForm = 'CL';
        let active = true;
        if(buttonsClicks.accept){
            statusForm = 'AC';
            active = false;
        }
       
        try{
          const params = {status: statusForm  , is_active: active};
          const response = await fetchQuery(token,url,{method:'PATCH',body:new URLSearchParams(params)},setLoadingFetch,setErrorFetch);
          if(!response.status){
            throw Error(response.message);
          }
          
          toast({
            title:'Éxito',
            description: 'Se actualizo correctamente el estado de la solicitud',
            status: 'success'
          });
          refetch();
          onClose();
        }catch(e){
            toast({
                title:'Error',
                description: e.message,
                status: 'error',
                duration: 3000
            });
        }finally{
            setLoadingFetch(false);
        }

    }

    const handleButtons = (option) => {
        if(option === 'accept'){
            setButtonsClick({
                cancel: false,
                accept: true
            })
        }

        if(option === 'reprove'){
            setButtonsClick({
                accept: false,
                cancel: true
            })
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
        handleButtons(op);
        if(op === 'accept'){
            setInputs({...inputs, is_pending: false});
            setShowObserver(false);
            return;
        }

        setShowObserver(true);
        setInputs({...inputs, is_pending: true});

    }
  

    //effects
    useEffect(() => {
        if(!Array.isArray(data) &&  data.id !== null){
            setInputs({
                ...inputs,
                taxid: data?.user?.taxid,
                email: data?.user?.email,
                full_name: data?.user?.first_name + ' ' + data?.user?.last_name,
                comment: data.comment
            });   
        }
        
    },[data])

    return (
        <>
            <Loader loading={loadingFetch} />
            <AppModal isOpen={open} onClose={onClose} scrollBehavior={'inside'}
                header={<><FaUserCheck className="text-secondary text-3xl" />Realizar transaccion de retiro.</>}
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
                        defaultValue={inputs.taxid}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Nombres
                        </FormLabel>
                        <Input 
                        isDisabled 
                        fontWeight={'bold'}
                        opacity={'0.75 !important'}
                        defaultValue={inputs.full_name}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Comentario
                        </FormLabel>
                        <p className="shadow p-2 w-full">
                            {inputs.comment}
                        </p>
                    </FormControl>
                    <ButtonGroup marginTop={15} gap='4'>
                    <Button 
                    isDisabled={buttonsClicks.cancel}
                    onClick={handleChange}
                    data-info='reprove'
                    rightIcon={<MdCancel />} 
                    colorScheme='red'>Negar</Button>
                    <Button 
                    isDisabled={buttonsClicks.accept}
                    rightIcon={<FaCircleCheck />} 
                    onClick={handleChange}
                    data-info='accept'
                    colorScheme='blue'>Aprobar</Button>
                    </ButtonGroup>
                </Form>
            </AppModal>
        </>
    );
}


export default Modal;