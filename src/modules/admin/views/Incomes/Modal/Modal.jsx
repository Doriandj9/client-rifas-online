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
        email: '',
        observation: '',
        amount: '',
        account: ''
    });
    //code
    let url =  credentials.server + routesapi.raffles_income;
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
        
        if(showObserver && inputs.observation === ''){
            toast({
                title: 'Error',
                description: 'Ingrese una observación para continuar',
                status: 'error'
            });
            return;
        }

        let statusForm = 'CL';

        if(buttonsClicks.accept){
            statusForm = 'AC';
        }
       
        try{
          const params = {status: statusForm  , observation: inputs.observation};
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
    const handleInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleCopy = async (e,text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast({
                position: 'bottom-right',
                render: () => (
                  <Box color='white' p={3} bg='black'>
                    Texto copiado al portapapeles.
                  </Box>
                ),
              })
        } catch (e) {
            toast({
                position: 'bottom-right',
                status: 'error',
                render: () => (
                  <Box color='white' p={3} bg='red.500'>
                    Error al copiar el texto al portapapeles.
                  </Box>
                ),
              })
        }
   }
    //effects
    useEffect(() => {
        if(!Array.isArray(data) &&  data.id !== null){
            const accountPayphone = data?.user?.bank_accounts?.find((item) => item.type === "Payphone" && item.is_account_local === false);
            if(!accountPayphone) {
                toast({
                    title: 'Error',
                    description: 'Error no dispone de una cuenta payphone',
                    status: 'error'
                });
            }

            setInputs({
                ...inputs,
                taxid: data?.user?.taxid,
                email: data?.user?.email,
                observation: '',
                full_name: data?.user?.first_name + ' ' + data?.user?.last_name,
                amount: data.amount,
                account: accountPayphone?.account_number
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
                            Correo electrónico
                        </FormLabel>
                        <Input 
                        isDisabled 
                        fontWeight={'bold'}
                        opacity={'0.75 !important'}
                        defaultValue={inputs.email}/>
                    </FormControl>
                    
                    <div className="bg-primary p-4 mt-1">
                        <h2 className="text-center text-white font-black mb-1">Datos relevantes</h2>
                        <div className="flex gap-4 items-center bg-black/30 p-2 relative mt-2">
                           <span className="font-bold text-white">Número de cuenta payphone (número telefónico):</span> 
                            <span className="text-white mt-1">{inputs.account}</span>
                            <FaRegCopy onClick={(e) => handleCopy(e,inputs.account)}
                            className="w-6 h-6 text-white absolute
                            cursor-pointer
                            right-2 top-1/2 -translate-y-1/2" />
                        </div>
                        <div className="flex gap-4 items-center bg-black/30 p-2 relative">
                            <span className="font-bold text-white">Monto de transacción:</span> 

                            <span className="text-white mt-1">${formatNumberTwoDigits(inputs.amount)}</span>

                            <FaRegCopy onClick={(e) => handleCopy(e,inputs.amount)}
                            className="w-6 h-6 text-white absolute
                            cursor-pointer
                            right-2 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>
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