import { Form } from "react-router-dom";
import AppModal from "@appcomponents/Core/AppModal";
import { Button, FormControl, FormLabel, IconButton, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdDelete, MdEditDocument, MdOutlineAddCircle } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "@appcomponents/Core/Loader";
import { FaRegImages } from "react-icons/fa6";
import { credentials } from "../../../../../../app/config/app";
import { useAccessToken } from "../../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../../app/utilities/hooks/data/useFetch";
import routesapi from "../../../../../../app/config/routesapi";
import { fetchQuery } from "../../../../../../app/utilities/web/fetchQuery";
import { reloadTable } from "../../../../../../app/utilities/events/customs";
import { toastConfig } from "../../../../../../app/utilities/web/configs";
import { IoAddCircle } from "react-icons/io5";
import { BsImage } from "react-icons/bs";
import AppButton from "../../../../../../app/app_components/Core/AppButon";
import { IoTicketOutline } from "react-icons/io5";

const Modal = ({id, open,onClose, setUpdate}) => {
    const [showObserver, setShowObserver] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorFetch, setErrorFetch] = useState(null);
    const[count, setCount] = useState(0);
    const[items, setItems] = useState([]);
    const [itemDelete, setItemDelete] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const toast = useToast(toastConfig);
    //states
    const [inputs,setInputs] = useState({
        name: '',  
        draw_date: '',
        is_complete: '',
        logo_raffles: '',
        description: '',
        summary: '',
        price: '',
        commission_sellers: '',
        number_tickets: '',
        awards: '',
    });
    const[awards, setAwards] = useState({
        title: 'Primer lugar',
        description: '',
        img: ''
    })
    //code
    const url = credentials.server + routesapi.raffles_lottery + `/${id}`;
    const token = useAccessToken((state) => state.token);
    const {data, error:erroFetch, loading:loadingUseFetch, refetch } = useFetch(url,{method:'GET'},'data',true,token,[id]);

    const handleSubmit = async () => {
        const url = credentials.server + routesapi.raffles_lottery + `/${id}`;
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
    const handleInput = (e) => {
        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.name === 'logo_raffles' ?  setLogoRaffles(e.target.files[0]) : e.target.value,
            }
        )
    }
    const handleInputItems = (e) => {
        setAwards(
            {
                ...awards,
                [e.target.name]: e.target.value,
            }
        )
    }
    const handleInputItemsFile = (e) => {
        setAwards(
            {
                ...awards,
                [e.target.name]: e.target.files[0],
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
    //effects
    useEffect(() => {
        if(data !== null &&  data['id'] > 0){
            setInputs({...data});
        }
    },[data])

    useEffect(() => {
        if(items.length > 0){
            const itemsForm = [...items].filter((item) => item.id !== (itemDelete - 1));
            setItems(itemsForm);
        }

   },[itemDelete]);

    return (
        <>
            <Loader loading={loadingFetch} />
            <AppModal   isOpen={open} onClose={onClose} scrollBehavior={'inside'}
                header={<><IoTicketOutline className="text-secondary text-3xl" /> Edita tu rifa.</>}
                buttons={buttons}
                size='4xl'
            >
                <div className="fixed w-full h-screen top-0 left-0 bg-white/75 flex justify-center items-center" style={{zIndex: '999999'}}>
                   <span className="text-2xl font-bold"> 
                   Funcionalidad en desarrolló (Presione la tecla ESC para salir)
                    </span> 
                </div>
                <Form onSubmit={handleSubmit}>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'bold'}>
                                Asígnele un nombre a su rifa
                                </FormLabel>
                                <Input className="shadow"
                                    name="name"
                                    value={inputs.name}
                                    onInput={handleInput}
                                    placeholder="Por ejemplo: Celular Samsung A10"
                                />
                            </FormControl>
                            <div className="flex xl:flex-row md:flex-row  flex-col gap-5 mt-4">
                                <FormControl isRequired className="">
                                    <FormLabel fontWeight={'bold'}>
                                    Escoja una fecha del sorteo
                                    </FormLabel>
                                    <Input className="shadow"
                                        name="draw_date"
                                        value={inputs.draw_date}
                                        onChange={handleInput}
                                        type="date"
                                    />
                                </FormControl>
                                <FormControl  className="">
                                    <FormLabel fontWeight={'bold'}>
                                    <span className="text-sm">Seleccione una imagen para su rifa (opcional)</span> 
                                    </FormLabel>
                                    <Input className="shadow"
                                        name="logo_raffles"
                                        accept="image/*"
                                        onChange={handleInput}
                                        type="file"
                                    />
                                </FormControl>
                            </div>
                            <div className="flex xl:flex-row md:flex-row flex-col gap-5 mt-4">
                                <FormControl isRequired className="">
                                    <FormLabel fontWeight={'bold'}>
                                    Número de tickets
                                    </FormLabel>
                                    <NumberInput defaultValue={15} min={1} max={50} 
                                    name="number_tickets"
                                    value={inputs.number_tickets}
                                    onInput={handleInput}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                        </NumberInput>
                                </FormControl>
                                <FormControl  className="">
                                    <FormLabel fontWeight={'bold'}>
                                    Porcentaje para comisiones de vendedores
                                    </FormLabel>
                                    <NumberInput 
                                    name="commission_sellers"
                                    value={inputs.commission_sellers}
                                    onInput={handleInput}
                                    defaultValue={15} min={1} >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                        </NumberInput>
                                </FormControl>
                            </div>
                            <div className="mt-4 xl:w-1/4">
                            <FormControl  className="">
                                    <FormLabel fontWeight={'bold'}>
                                    Precio de la rifa
                                    </FormLabel>
                                    <NumberInput 
                                    name="price"
                                    value={inputs.price}
                                    onInput={handleInput}
                                    
                                    defaultValue={15} min={1} >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                        </NumberInput>
                                </FormControl>
                            </div>
                            <FormControl isRequired className="mt-2">
                                <FormLabel fontWeight={'bold'}>
                                Resumen de la rifa 
                                </FormLabel>
                                <Textarea 
                                name="description"
                                value={inputs.description}
                                onInput={handleInput}
                                placeholder="Por ejemplo:Participa en nuestra emocionante rifa y tendrás la oportunidad de ganar increíbles premios. " className="shadow">
                                </Textarea>
                            </FormControl>
                            <FormControl isRequired className="mt-2">
                                <FormLabel fontWeight={'bold'}>
                                    Medio de difusión de la rifa
                                </FormLabel>
                                <Textarea 
                                 name="summary"
                                 value={inputs.summary}
                                 onInput={handleInput}
                                placeholder="Por ejemplo: Transmisión en vivo." className="shadow">
                                </Textarea>
                            </FormControl>
                            <FormControl isRequired marginTop={15}>
                        <FormLabel fontWeight={'bold'}>Registra los premios a rifarse</FormLabel>
                            <div className="flex ">
                            <Input name="title"
                            onInput={handleInputItems}
                             className='shadow' width={'35%'} height={50}
                             value={awards.title} />
                                <Input name='description'
                                    value={awards.description}
                                    onInput={handleInputItems}
                                    className='shadow w-4/5' height={50} placeholder='Por ejemplo: Celular Samsung A10'
                                    />
                                <IconButton
                                onClick={moreItem}
                                 height={50} aria-label='Nuevo Item' className="w-14"
                                  icon={<IoAddCircle className="w-8 h-8 text-primary" />} />
                                
                                <FormControl borderRadius={'0.5rem'} backgroundColor={'#f1f5f9'} position={'relative'} width={'auto'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    <FormLabel margin={0} padding={0} paddingRight={2} paddingLeft={2} cursor={'pointer'} >
                                        <BsImage className="w-6 h-6 text-primary" />
                                        <Input 
                                        name="img"
                                        onChange={handleInputItemsFile}
                                        position={'absolute'} top={0} left={0} zIndex={-2} width={1} height={1} type="file" opacity={0} />
                                    </FormLabel>
                                </FormControl>
                            </div>
                            {items.map((item) => {
                                return (
                                    item.element
                                );
                            })}
                    </FormControl>
                            <AppButton className="mt-5" type="submit" leftIcon={<MdOutlineAddCircle className="text-xl" />}>
                                    Crear rifa
                            </AppButton>
                    </Form>
            </AppModal>
        </>
    );
}


const Item = ({handleRemove}) => {
    return (
        <>
        <div data-content-items className="flex mt-2">
            <Input data-header-item 
            className='shadow' width={'35%'} height={50} 
            defaultValue={'Otro lugar'} />
            <Input data-header-content
                className='shadow w-4/5' height={50} placeholder='Por ejemplo: Audífonos Inalámbricos.'
            />
            <IconButton
            onClick={handleRemove}
            height={50} aria-label='Borrar Item' className="w-14"
            icon={<MdDelete className="w-8 h-8 text-secondary" />} />

            <FormControl borderRadius={'0.5rem'} backgroundColor={'#f1f5f9'} position={'relative'} width={'auto'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <FormLabel margin={0} padding={0} paddingRight={2} paddingLeft={2} cursor={'pointer'} >
                    <BsImage className="w-6 h-6 text-primary" />
                    <Input position={'absolute'} top={0} left={0} zIndex={-2} width={1} height={1} type="file" opacity={0} />
                </FormLabel>
            </FormControl>
        </div>
        </>
    );

}
export default Modal;