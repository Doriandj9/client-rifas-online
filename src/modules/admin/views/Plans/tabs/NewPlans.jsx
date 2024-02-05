import { Form } from "react-router-dom";
import { FormControl, IconButton, Input, Textarea, FormLabel,NumberInputField,NumberInputStepper,
    NumberIncrementStepper,NumberDecrementStepper,NumberInput} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import AppButton from "../../../../../app/app_components/Core/AppButon";
import { credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import { VscAdd } from "react-icons/vsc";
import { MdDelete } from "react-icons/md";
import { fetchQuery } from "../../../../../app/utilities/web/fetchQuery";
import { useAccessToken, useAuth } from "../../../../../app/store/app/userStore";
import { ToastContainer,toast } from 'react-toastify';
import Loader from "../../../../../app/app_components/Core/Loader";

const NewPlans = () => {
    //hooks
    const user  = useAuth((state) => state.user);
    const accToken = useAccessToken((state) => state.token);
    //states
    const[count, setCount] = useState(0);
    const[items, setItems] = useState([]);
    const [itemDelete, setItemDelete] = useState(-1);
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [notifyToast, setNotifyToast] = useState({});
    const[inputs, setInputs] = useState({
        title: '',
        subject: '',
        price: '',
        descriptionInit: '',
        maximum_tickets: '',
        minimum_tickets: 1,
        number_raffles: '',
        message: '',
    })
    //handlers
    const handleInput = (e) => {
        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.value,
            }
        )
    }
    const moreItem = (e) => {
        let num = count + 1;
        setCount(num);
        let itemsForm = [...items];
        itemsForm.push({
            id: count,
            element: <Item handleRemove={(e) => removeItem(e,num,items)} key={ num + '-item'} />
        });
        setItems(itemsForm);

    }

    const removeItem = (e, id,itemsForm) => {
        e.preventDefault();
        e.stopPropagation();       
        setItemDelete(id);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = credentials.server + routesapi.admin_subscriptions;
        const form = new FormData();
        try{
          const list =  Array.from(e.target.querySelectorAll('input[data-list]'));
          const itemsF = list.map(item => {
            return (item.value);
          })
          const description = [inputs.descriptionInit,...itemsF];
          const inputsQuery ={ ...inputs,description: JSON.stringify(description)}
          console.log(inputsQuery);
          setInputs(inputsQuery);
          for( const[key,value] of Object.entries(inputsQuery)){
            form.append(key,value);
          }

           const data = await fetchQuery(accToken,url,{method: 'POST',body: form},setLoading,setError);
           if(data.status){
               toast.success(data.message, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'p-8 w-full',
               })
               setInputs({
                title: '',
                subject: '',
                price: '',
                descriptionInit: '',
                maximum_tickets: '',
                minimum_tickets: 1,
                number_raffles: '',
                message: '',
               });
               setItems([]);
               return;
           }
           toast.error(data.message,{
            position: toast.POSITION.TOP_RIGHT,
            className: 'p-8 w-full',
        })
        }catch(e){
            toast.error(e.message,{
                position: toast.POSITION.TOP_RIGHT,
                className: 'p-8 w-full',
            })
        }finally{
            setLoading(false);
        }
        
    }
    //effects
   useEffect(() => {
        if(items.length > 0){
            const itemsForm = [...items].filter((item) => item.id !== (itemDelete - 1));
            setItems(itemsForm);
        }

   },[itemDelete])
    return (
        <>
            <Loader loading={loading} />
            <ToastContainer className={'w-[32rem]'}  />
            <div className="w-full  lg:w-4/5 shadow m-auto h-22">
                <p className='p-4 text-center w-full text-primary  m-auto text-2xl font-bold text-black mt-4'>Ingresa un nuevo plan de compra. </p>
                <Form className="p-8" onSubmit={handleSubmit} >
                    <FormControl isRequired >
                        <FormLabel fontWeight={'bold'}>Título</FormLabel>
                            <Input name='title'
                                value={inputs.title}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: Premium'
                                />
                    </FormControl>
                    <FormControl isRequired marginTop={15}>
                        <FormLabel fontWeight={'bold'}>Resumen</FormLabel>
                                <Textarea name='subject'
                                value={inputs.subject}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: Premium'
                                />
                    </FormControl>
                <div className="flex justify-between gap-2 sm:flex-row flex-col">
                    <FormControl width={'50%'} isRequired marginTop={15}>
                        <FormLabel fontWeight={'bold'}>Precio</FormLabel>
                                <NumberInput name="price" 
                                onInput={handleInput}
                                value={inputs.price}
                                className="shadow"  min={1}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                    </FormControl>
                    <FormControl width={'50%'} isRequired marginTop={15}>
                        <FormLabel fontWeight={'bold'}>Número de rifas</FormLabel>
                                <NumberInput inputMode="numeric"
                                onInput={handleInput}
                                name="number_raffles" 
                                 value={inputs.number_raffles}
                                className="shadow"  min={1}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                    </FormControl>
                </div>
                <div className="flex justify-between gap-2 sm:flex-row flex-col">
                <FormControl width={'50%'} isRequired marginTop={15}>
                        <FormLabel fontWeight={'bold'}>Máximo de tickets</FormLabel>
                                <NumberInput inputMode="numeric"
                                onInput={handleInput}
                                 name="maximum_tickets"
                                 value={inputs.maximum_tickets}
                                className="shadow"  min={1}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                    </FormControl>
                    <FormControl width={'50%'} isRequired marginTop={15}>
                        <FormLabel fontWeight={'bold'}>Minimo de tickets</FormLabel>
                                <NumberInput isDisabled value={inputs.minimum_tickets} 
                                name="minimum_tickets" 
                                onInput={handleInput}
                                className="shadow"  min={1}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                    </FormControl>
                </div>
                    <FormControl isRequired marginTop={15}>
                        <FormLabel fontWeight={'bold'}>Funciones principales</FormLabel>
                            <div className="flex ">
                                <Input name='descriptionInit'
                                    value={inputs.descriptionInit}
                                    onInput={handleInput}
                                    className='shadow w-4/5' height={50} placeholder='Por ejemplo: Rifas ilimitadas'
                                    />
                                <IconButton
                                onClick={moreItem}
                                 height={50} aria-label='Nuevo Item' className="w-14"
                                  icon={<IoAddCircle className="w-8 h-8 text-primary" />} />
                            </div>
                            {items.map((item) => {
                                
                                return (
                                    item.element
                                ); 
                            })}
                    </FormControl>
                    <AppButton type="submit" className="mt-4" leftIcon={<VscAdd />}>
                        Guardar
                    </AppButton>
                </Form>
            </div>
        </>
    );
}

const Item = ({handleRemove}) => {
    const [inputs,setInputs] = useState({});
    return (
        <>
        <div className="flex mt-2">
            <Input name='list[]' data-list
                value={inputs.list}
                className='shadow w-4/5' height={50} placeholder='Por ejemplo: Rifas ilimitadas'
            />
            <IconButton
            onClick={handleRemove}
            height={50} aria-label='Borrar Item' className="w-14"
            icon={<MdDelete className="w-8 h-8 text-secondary" />} />
        </div>
        </>
    );
}

export default NewPlans;
