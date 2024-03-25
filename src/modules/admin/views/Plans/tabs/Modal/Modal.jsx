import { Form } from "react-router-dom";
import AppModal from "../../../../../../app/app_components/Core/AppModal";
import { credentials } from "../../../../../../app/config/app";
import routesapi from "../../../../../../app/config/routesapi";
import { useAccessToken } from "../../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../../app/utilities/hooks/data/useFetch";
import { Checkbox, FormControl, FormLabel, Input, Radio, RadioGroup, Stack,ButtonGroup, Button, Textarea, Switch, useToast, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdCancel, MdDelete } from "react-icons/md";
import Loader from "../../../../../../app/app_components/Core/Loader";
import { reloadTable } from "../../../../../../app/utilities/events/customs";
import { FaCircleCheck, FaUserXmark } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { toastConfig } from "../../../../../../app/utilities/web/configs";
import { fetchQuery } from "../../../../../../app/utilities/web/fetchQuery";
import { IoAddCircle, IoEar } from "react-icons/io5";


const Modal = ({id, open,onClose, setUpdate, refetch}) => {
    const [showObserver, setShowObserver] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [items, setItems] = useState([]);
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
        price: '',
        description: '',
    });
    //code
    let url =  credentials.server + routesapi.admin_subscriptions;
    url = url + `/${id}`;
    const token = useAccessToken((state) => state.token);
    const {data, error, loading } = useFetch(url,{method:'GET'},'data',true,token,[id]);

    const handleSubmit = async () => {
        // setLoadingFetch(true);
        const itemsForm = Array.from(document.querySelectorAll('input[data-list]')).map(item => item.value);
        if(inputs.description !== ''){
            itemsForm.push(inputs.description);
        }
        inputs.description = JSON.stringify([...itemsForm]);
        try{
          const response = await fetchQuery(token,url,{method:'PATCH',body:new URLSearchParams(inputs)},setLoadingFetch,setErrorFetch);
           if(response.status){
                refetch();
                toast({
                    status: 'success',
                    title: 'Actualización',
                    description: response.message
                });
                onClose();
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

    const handleRemoveItem =(e,value) => {
        const button =e.target
        const id = button.dataset.parent;
        const values = Array.from(document.querySelectorAll('input[data-list]')).map(item => item.value);
        const itemsForm = values.filter(item => item != value); 
        setItems([...itemsForm]);
    }

    const handleMoreItem = (e) => {
        const values = Array.from(document.querySelectorAll('input[data-list]')).map(item => item.value);
        setItems([...values, '']);
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
                description: ''
            });

            setItems(JSON.parse(data.description));
            
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
                    <FormControl isRequired marginTop={15}>
                        <FormLabel fontWeight={'bold'}>Funciones principales</FormLabel>
                            <div className="flex ">
                                <Input name='description'
                                    value={inputs.description}
                                    onInput={handleInput}
                                    className='shadow w-4/5' height={50} placeholder='Por ejemplo: Rifas ilimitadas'
                                    />
                                <IconButton
                                onClick={handleMoreItem}
                                 height={50} aria-label='Nuevo Item' className="w-14"
                                  icon={<IoAddCircle className="w-8 h-8 text-primary" />} />
                            </div>
                            {items.length > 0 && items.map((item,i) => {
                                return (
                                    <Item  key={i} id={i} handleRemove={handleRemoveItem} value={item} />
                                ); 
                            })}
                    </FormControl>
                </Form>
            </AppModal>
        </>
    );
}



const Item = ({id, handleRemove, value}) => {
    const idElement = `item-a-${id}`;
    useEffect(() => {
        document.getElementById(idElement + '-input').value = value;
    },[value])
    return (
        <>
        <div id={idElement} data-item-content className="flex mt-2">
            <Input data-list
                id={idElement + '-input'}
                className='shadow w-4/5' height={50} placeholder='Por ejemplo: Rifas ilimitadas'
            />
            <IconButton
            data-parent={idElement}
            onClick={(e) =>  handleRemove(e,value)}
            height={50} aria-label='Borrar Item' className="w-14"
            icon={<MdDelete  className="w-8 h-8 text-secondary pointer-events-none" />} />
        </div>
        </>
    );
}

export default Modal;