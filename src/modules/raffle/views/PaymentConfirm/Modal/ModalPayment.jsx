import { Form } from "react-router-dom";
import AppModal from "../../../../../app/app_components/Core/AppModal";
import { credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import { useAccessToken } from "../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../app/utilities/hooks/data/useFetch";
import { Checkbox, FormControl, FormLabel, Input, Radio, RadioGroup, Stack,ButtonGroup, Button, Textarea, Alert, AlertIcon, Table, Thead, Tr, Th, Tbody, Td, Tfoot, TableContainer, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdEditDocument } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { fetchQuery } from "../../../../../app/utilities/web/fetchQuery";
import Loader from "../../../../../app/app_components/Core/Loader";
import { reloadTable } from "../../../../../app/utilities/events/customs";
import { FaRegImages } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { formatTimeFull } from "../../../../../app/utilities/web/times/formatTimeFull";
import { toastConfig } from "../../../../../app/utilities/web/configs";
const Modal = ({id, open,onClose, setUpdate, refetch}) => {
    const [showObserver, setShowObserver] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [raffle, setRaffle] = useState(null);
    const [ticket,setTickets] = useState(null);
    const [errorFetch, setErrorFetch] = useState(null);
    const toast = useToast(toastConfig);
   
    //states
    const [inputs,setInputs] = useState({
        taxid: '',  
        email: '',
        first_name: '',
        last_name: '',
        img: '',
        phone: '',
        total: '',
        observation: '',
        accept: false,
        status: null,
    });
    //code
    let url =  credentials.server + routesapi.raffles_receipts;
    url = url + `/${id}`;
    const token = useAccessToken((state) => state.token);
    const {data, error, loading } = useFetch(url,{method:'GET'},'data',true,token,[id]);

    const handleSubmit = async () => {
        if(showObserver && inputs.observation === ''){
            setUpdate({
                status: false,
                message: 'Ingrese una observación para continuar'
            });
            return;
        }
        setLoadingFetch(true);
        try{
          const params = {user_id: data.user.id, accept: inputs.accept, observation: inputs.observation};
          const response = await fetchQuery(token,url,{method:'PATCH',body:new URLSearchParams(params)},setLoadingFetch,setErrorFetch);
           if(response.status){
               onClose();
                setUpdate({
                    status: response.status,
                    message: response.message
                });
                refetch();
                return;
           }
           throw new Error(response.message);

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
    </>;
    //handlers
    const handleChange = (e) => {
        if(e.target.tagName !== 'BUTTON'){
            return;
        }
        const op = e.target.dataset.info;
        if(op === 'accept'){
            setInputs({...inputs, accept: true});
            setShowObserver(false);
            return;
        }

        setShowObserver(true);
        setInputs({...inputs, accept: false});

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
                total: data.total,
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                phone: data.user.phone,
                img: data.voucher,
                observation: '',
                accept: data.is_active ? false : true,
                status: data.status
            });
            setShowObserver(data.is_active);
            setRaffle(data.tickets[0].raffle);
            setTickets(data.tickets);
            toast({
                title: '',
                description: 'Presione ESC para salir',
                duration: 1000,
                status: 'info',
                position: 'top'
            });
        }
    },[data])
    return (
        <>
            <Loader loading={loadingFetch} />
            <AppModal isOpen={open} onClose={onClose} scrollBehavior={'inside'}
                header={<div className="flex items-center gap-4 border-b-2 pb-2 border-b-black"><FaFileInvoiceDollar className="text-secondary text-3xl" /> 
                <span className="mt-2">Autorización de boletos </span>
                </div>}
                buttons={buttons}
                size='full'
            >
                <div className="w-full lg:w-1/2 m-auto">
                <Alert status='info'>
                    <AlertIcon />
                    Esta presentación es unicamente informativa, puede realizar el reenvió del correo electrónico
                    al cliente si lo cree necesario.
                </Alert>
                <div className="pt-12">
                    <div className="flex">
                        <div className="w-1/2">
                            <p>
                                <span className="font-bold">Consumidor:</span>
                                <span> {inputs.first_name} {inputs.last_name} </span>
                            </p>
                            <p className="mt-2">
                                <span className="font-bold">Correo electrónico:</span>
                                <span> {inputs.email} </span>
                            </p>
                            <p className="mt-2">
                                <span className="font-bold">Nº de celular:</span>
                                <span> {inputs.phone} </span>
                            </p>
                            <p className="mt-2">
                                <span className="font-bold">Fecha:</span>
                                <span> {formatTimeFull(data?.created_at)} </span>
                            </p>
                        </div>
                        <div className="w-1/2">
                        <p>
                                <span className="font-bold">Organizador:</span>
                                <span> {raffle ? raffle.user.first_name : ''} {raffle ? raffle.user.last_name : ''} </span>
                            </p>
                        <p>
                                <span className="font-bold">Rifa:</span>
                                <span> {raffle ?  raffle.name : ''} </span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-5">
                            <TableContainer>
                            <Table size='full'>
                                <Thead>
                                <Tr>
                                    <Th style={{textAlign:'end'}}>Nº de boleto</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                {
                                    ticket && ticket.map((item) => {
                                        return(
                                            <Tr key={item.id}>
                                            <Td  style={{textAlign:'end'}}>{item.order}</Td>
                                        </Tr>
                                        );
                                    })
                                }  
                                
                                </Tbody>
                            </Table>
                            </TableContainer>
                    </div>
                </div>
                {
                    inputs.img === '' || !inputs.img ?
                    <>
                        <div className="shadow-md w-full h-24 mt-12 flex items-center justify-center shadow-primary/50 flex-col">
                            <span className="text-3xl text-primary italic font-black">VENTA FÍSICA</span>
                            <span className="text-xs text-primary">No existe un comprando de pago.</span>
                        </div>
                    </>
                    :
                    <div>
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
                    </div>
                }
            </div>
            
            </AppModal>
        </>
    );
}


export default Modal;