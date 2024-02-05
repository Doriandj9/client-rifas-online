import { Form } from "react-router-dom";
import AppModal from "../../../../../../app/app_components/Core/AppModal";
import { credentials } from "../../../../../../app/config/app";
import routesapi from "../../../../../../app/config/routesapi";
import { useAccessToken } from "../../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../../app/utilities/hooks/data/useFetch";
import { Checkbox, FormControl, FormLabel, IconButton, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

const Modal = ({id, open,onClose, buttons}) => {
    //states
    const[items, setItems] = useState([]);
    const [itemDelete, setItemDelete] = useState(-1);
    const[count, setCount] = useState(0);

    const [inputs,setInputs] = useState({
        title: '',
        subject: '',
        price: '',
        descriptionInit: '',
        maximum_tickets: '',
        is_active: '',
        minimum_tickets: '',
        number_raffles: '',
        is_inactive: true,
    });
    //code
    let url =  credentials.server + routesapi.admin_subscriptions;
    url = url + `/${id}`;
    const token = useAccessToken((state) => state.token);
    const {data, error, loading, refetch } = useFetch(url,{method:'GET'},'data',true,token,[id]);
    //handlers
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }
    const removeItem = (e, id,itemsForm) => {
        e.preventDefault();
        e.stopPropagation();       
        setItemDelete(id);
    }
    const handleInput = (e) => {
        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.value,
            }
        )
    }
    const moreItem = (e,value) => {
        let num = count + 1;
        setCount(num);
        let itemsForm = [...items];
        itemsForm.push({
            id: count,
            element: <Item value={value} handleRemove={(e) => removeItem(e,num,items)} key={ num + '-item'} />
        });
        setItems(itemsForm);

    }
    //effects
    useEffect(() => {
        setItems([]);
       },[open])
    useEffect(() => {
        if(data !== null &&  data['id'] !== null){
            setInputs({...data,is_inactive: data.is_active ? '0' : '1',
                is_active: data.is_active ? '1' : '0',
            });
            const plans = JSON.parse(data.description ?? "[]");
            let itemsForm = [];
            let count = 0;
            plans.forEach(plan => {
                count = count + 1;
                itemsForm.push({
                    id: count,
                    element: <Item value={plan} handleRemove={(e) => removeItem(e,count,itemsForm)} key={ count + '-fetch-item'} />
                });
            })
            setCount(count);
            setItems(itemsForm);
        }
    },[data])

    useEffect(() => {
        if(items.length > 0){
            const itemsForm = [...items].filter((item) => item.id !== (itemDelete - 1));
            setItems(itemsForm);
        }

   },[itemDelete])

   
    return (
        <>
            <AppModal isOpen={open} onClose={onClose}
                header={<><MdEditDocument className="text-secondary text-3xl" /> Editar Promociones</>}
                buttons={buttons}
                size='4xl'
            >
                <Form>
                    <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Título
                        </FormLabel>
                        <Input 
                        onChange={handleChange}
                        name="title" 
                        value={inputs.title}/>
                    </FormControl>
                     <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Asunto
                        </FormLabel>
                        <Input 
                        onChange={handleChange}
                        name="subject" 
                        value={inputs.subject}/>
                    </FormControl>
                     <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                            Número de rifas
                        </FormLabel>
                        <Input 
                        onChange={handleChange}
                        name="number_raffles" 
                        value={inputs.number_raffles}/>
                    </FormControl>
                <div className="flex justify-between gap-4">
                     <FormControl className="w-4/5 flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'72%'}>
                           Precio
                        </FormLabel>
                        <Input 
                        onChange={handleChange}
                        name="price" 
                        value={inputs.price}/>
                    </FormControl>
                     <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'25%'}>
                           Activo
                        </FormLabel>
                        <RadioGroup> 
                        <Stack spacing={5} direction='row'>
                            <Radio colorScheme='green' name="is_active" value={inputs.is_active}
                            onChange={handleChange}
                            >
                            SI
                            </Radio>
                            <Radio colorScheme='red' name="is_inactive"    value={inputs.is_inactive}
                            onChange={handleChange}
                            >
                            NO
                            </Radio>
                        </Stack>
                        </RadioGroup>                      
                    </FormControl>
                </div>
                <div className="flex justify-between gap-4">
                     <FormControl isDisabled className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'}  margin={0} width={'72%'}>
                           Mínimo de tickets
                        </FormLabel>
                        <Input 
                        onChange={handleChange}
                        name="minimum_tickets" 
                        value={inputs.minimum_tickets}/>
                    </FormControl>
                     <FormControl className="flex items-center mt-3" >
                        <FormLabel fontWeight={'bold'} margin={0} width={'72%'}>
                           Máximo de tickets
                        </FormLabel>
                        <Input 
                        onChange={handleChange}
                        name="maximum_tickets"
                        value={inputs.maximum_tickets}/>
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
                </Form>
            </AppModal>
        </>
    );
}

const Item = ({handleRemove, value}) => {
    // const [inputs,setInputs] = useState({});
    return (
        <>
        <div className="flex mt-2">
            <Input name='list[]' data-list
                value={value}
                onInput={() => {}}
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


export default Modal;