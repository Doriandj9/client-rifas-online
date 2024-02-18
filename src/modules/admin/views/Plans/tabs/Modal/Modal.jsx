import { Form } from "react-router-dom";
import AppModal from "../../../../../../app/app_components/Core/AppModal";
import { credentials } from "../../../../../../app/config/app";
import routesapi from "../../../../../../app/config/routesapi";
import { useAccessToken } from "../../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../../app/utilities/hooks/data/useFetch";
import { Checkbox, FormControl, FormLabel, Input, Radio, RadioGroup, Stack,ButtonGroup, Button, Textarea, Switch, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import Loader from "../../../../../../app/app_components/Core/Loader";
import { reloadTable } from "../../../../../../app/utilities/events/customs";
import { FaCircleCheck, FaUserXmark } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { toastConfig } from "../../../../../../app/utilities/web/configs";
import { fetchQuery } from "../../../../../../app/utilities/web/fetchQuery";


const Modal = ({id, open,onClose, setUpdate}) => {
    const [showObserver, setShowObserver] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorFetch, setErrorFetch] = useState(null);
    const toast = useToast(toastConfig);
    //states
    const [inputs,setInputs] = useState({
        title: '',
        subject: '',
        number_raffles: '',
        minimum_tickets: '',
        maximum_tickets: '',
        is_active: '',
        price: ''
    });
    //code
    let url =  credentials.server + routesapi.admin_subscriptions;
    url = url + `/${id}`;
    const token = useAccessToken((state) => state.token);
    const {data, error, loading, refetch } = useFetch(url,{method:'GET'},'data',true,token,[id]);

    const handleSubmit = async () => {
        setLoadingFetch(true);
        try{
          const response = await fetchQuery(token,url,{method:'PATCH',body:new URLSearchParams(inputs)},setLoadingFetch,setErrorFetch);
           if(response.status){
                document.dispatchEvent(reloadTable);
                toast({
                    status: 'success',
                    title: 'Actualización',
                    description: response.message
                });
                onClose();
                refetch();
                return;
           }

           throw Error(response.message);
        }catch(e){
            toast({
                status: 'error',
                title: 'Error',
                description: e.message
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
            setInputs({...inputs, is_active: true});
            setShowObserver(false);
            return;
        }

        setShowObserver(true);
        setInputs({...inputs, is_active: false});

    }
    const handleInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeActive =(e) => {
        setInputs({
            ...inputs,
            is_active: !inputs.is_active
        })
    }

    //effects
    useEffect(() => {
        if(data !== null &&  data['id'] > 0){
            setInputs({
                title: data.title,
                subject: data.subject,
                number_raffles: data.number_raffles,
                minimum_tickets: data.minimum_tickets,
                maximum_tickets: data.maximum_tickets,
                price: data.price,
                is_active: data.is_active,
            });
            
        }
    },[data])

    
    return (
        <>
            <Loader loading={loadingFetch} />
            <AppModal isOpen={open} onClose={onClose} scrollBehavior={'inside'}
                header={<><FaEdit className="text-secondary text-3xl" />Edita un plan</>}
                buttons={buttons}
                size='4xl'
            >
                <Form>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Titulo
                        </FormLabel>
                        <Input  
                        fontWeight={'bold'}
                        name="title"
                        onInput={handleInput}
                        value={inputs.title}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Asunto
                        </FormLabel>
                        <Input  
                        fontWeight={'bold'} 
                        name="subject"
                        onInput={handleInput}
                        value={inputs.subject}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Numero de rifas
                        </FormLabel>
                        <Input  
                        fontWeight={'bold'}
                        name="number_raffles"
                        onInput={handleInput}
                        value={inputs.number_raffles}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Precio
                        </FormLabel>
                        <Input  
                        fontWeight={'bold'}
                        name="price"
                        onInput={handleInput}
                        value={inputs.price}/>
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Activo
                        </FormLabel>
                        <Switch onChange={handleChangeActive} isChecked={inputs.is_active ? true : false}  colorScheme='blue' size='lg' />
                    </FormControl>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Máximo de boletos
                        </FormLabel>
                        <Input  
                        fontWeight={'bold'}
                        name="maximum_tickets"
                        onInput={handleInput}
                        value={inputs.maximum_tickets}/>
                    </FormControl>

                </Form>
            </AppModal>
        </>
    );
}


export default Modal;