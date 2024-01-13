import { Form } from "react-router-dom";
import AppModal from "../../../../../../app/app_components/Core/AppModal";
import { credentials } from "../../../../../../app/config/app";
import routesapi from "../../../../../../app/config/routesapi";
import { useAccessToken } from "../../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../../app/utilities/hooks/data/useFetch";
import { Checkbox, FormControl, FormLabel, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdEditDocument } from "react-icons/md";
const Modal = ({id, open,onClose, buttons}) => {
    //states
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
    //effects
    useEffect(() => {
        if(data !== null &&  data['id'] !== null){
            setInputs({...data,is_inactive: data.is_active ? '0' : '1',
                is_active: data.is_active ? '1' : '0',
            });
        }
    },[data])
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

                </Form>
            </AppModal>
        </>
    );
}


export default Modal;