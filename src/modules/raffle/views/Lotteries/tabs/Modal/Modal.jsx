import { Form } from "react-router-dom";
import AppModal from "@appcomponents/Core/AppModal";
import { Button, FormControl, FormLabel, IconButton, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdDelete, MdEditDocument, MdOutlineAddCircle } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "@appcomponents/Core/Loader";
import { FaRegImages } from "react-icons/fa6";
import { credentials } from "../../../../../../app/config/app";
import { useAccessToken, useAuth } from "../../../../../../app/store/app/userStore";
import { useFetch } from "../../../../../../app/utilities/hooks/data/useFetch";
import routesapi from "../../../../../../app/config/routesapi";
import { fetchQuery } from "../../../../../../app/utilities/web/fetchQuery";
import { reloadTable } from "../../../../../../app/utilities/events/customs";
import { toastConfig } from "../../../../../../app/utilities/web/configs";
import { IoAddCircle } from "react-icons/io5";
import { BsImage } from "react-icons/bs";
import AppButton from "../../../../../../app/app_components/Core/AppButon";
import { IoTicketOutline } from "react-icons/io5";
import logoRaffle from '@app/assets/imgs/biglietti-lotteria.png';
import moment from "moment";
import gift from '@app/assets/imgs/gifts.png';

const Modal = ({id, open,onClose, setUpdate, refetch}) => {
    const [showObserver, setShowObserver] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [errorFetch, setErrorFetch] = useState(null);
    const[count, setCount] = useState(0);
    const[items, setItems] = useState([]);
    const [itemDelete, setItemDelete] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [logoRaffles , setLogoRaffles] = useState(null);
    const [imgRaffles,setImgRaffles] = useState(null);
    const toast = useToast(toastConfig);
    const user = useAuth(state => state.user);
    
    const [currentTickets,setCurrentTickets] = useState(0);
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
        title: 'Otro lugar',
        description: '',
        img: ''
    })
    //code
    const url = credentials.server + routesapi.raffles_lottery + `/${id}`;
    const token = useAccessToken((state) => state.token);
    const {data, error:erroFetch, loading:loadingUseFetch } = useFetch(url,{method:'GET'},'data',true,token,[id]);

    const handleSubmit = async () => {
        const url = credentials.server + routesapi.raffle_custom_lottery_update.replace('{id}',id);

        if(!validationsInputs()){
            return;
        }

        let awardsTotal = Array.from(document.querySelectorAll('div[data-item-content]'));
        const idFinal = parseInt(awardsTotal.sort((a,b) => a.id + b.id)[0].id) + 1;
        let dataAwards = [];
        if(awards.title !== '' && awards.description !== ''){
            const awardFinal = {id: idFinal, title: awards.title, description: awards.description, imgId: `award${idFinal}`, img: awards.img, path: ''};
            dataAwards.push(awardFinal);
        }
        const form  = new FormData();
        awardsTotal.forEach((div,i) => {
            const [titleInput, descriptionInput, imgInput] = div.querySelectorAll('input');
            let data = JSON.parse(div.dataset.json);
            const title = titleInput.value;
            const description = descriptionInput.value;
            const img = imgInput.files[0];
            data.title = title;
            data.description = description;
            data.img = img;
            dataAwards.push(data);
        })

        
        dataAwards.forEach((item,i) => {
            if(item.img){
                form.append(item.imgId, item.img);
                dataAwards[i].path = '';
                delete dataAwards[i]['img'];
            }
        })

        const dataInputs = {...inputs,awards: JSON.stringify(dataAwards),
            more_tickets: currentTickets
            // draw_date: inputs.draw_date + ' ' + inputs.time
        };

        if(logoRaffles){
            dataInputs.logo_raffles = logoRaffles;
        }

        for(let [key,value] of Object.entries(dataInputs) ){
            form.append(key,value);
        }
       
       // setLoadingFetch(true);
        try{
          const response = await fetchQuery(token,url,{method:'POST',body:form},setLoadingFetch,setErrorFetch);
           if(response.status){
               refetch();
                setUpdate({
                    status: response.status,
                    message: response.message
                });
                onClose();
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
        let value = e.target.value;
        const inputName = e.target.name;
        if(inputName === 'draw_date'){
           const date = moment(value);
           value = date.format('YYYY-MM-DD hh:mm:ss');
        }

        if(inputName === 'number_tickets'){
            setCurrentTickets(value);
            return;
        }

        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.name === 'logo_raffles' ?  changeImgRaffles(e.target.files[0]) : value,
            }
        )
    }
    const changeImgRaffles = (img) => {
        setLogoRaffles(img);
        const result = URL.createObjectURL(img);
        setImgRaffles(result);
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
    const handleSelect = (e) => {
        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.value
            }
        ) 
        
    }

    const moreItem = (e) => {
        const values = Array.from(document.querySelectorAll('div[data-item-content]')).map(item => {
            const [title, description, img] = item.querySelectorAll('input');
            
            let data = JSON.parse(item.dataset.json);
            let path = '';
            if(img.files[0]){
                const reader = new FileReader();
                reader.onload = function(event) {
                const base64String = event.target.result;
                const imgShow = document.querySelector(`#img-raffle-${data.id}`);
                imgShow.src = base64String;
                };

                reader.readAsDataURL(img.files[0]);
            } else {
                Promise.resolve(() => {
                    if(data.path === ''){
                    const imgShow = document.querySelector(`#img-raffle-${data.id}`);
                    if(imgShow){
                        imgShow.src = gift;
                    }
                }
                })
            }
            
            
            data.title = title.value;
            data.description = description.value;
            return data;
        });
        const id = values.sort((a,b) => a.id + b.id)[0].id + 1;
        const newItem = {id: id ,description: '', img: '', imgId:`award${id}`, path:'', title: 'Otro lugar' };
        setItems([...values, newItem].sort((a,b) => a.id - b.id));

    }

    const handleRemoveItem =(e,value) => {
        const button =e.target
        const id = button.dataset.parent;
        const div = Array.from(document.querySelectorAll('div[data-item-content]'))
        
        const values = div.map(item => {
            const [title, description, img] = item.querySelectorAll('input');
            let data = JSON.parse(item.dataset.json);
            let path = '';
            if(img.files[0]){
                const reader = new FileReader();
                reader.onload = function(event) {
                const base64String = event.target.result;
                const imgShow = document.querySelector(`#img-raffle-${data.id}`);
                if(imgShow){
                    imgShow.src = base64String;
                }
                };

                reader.readAsDataURL(img.files[0]);
            }else if( data.path != '' ){
                const img = credentials.server + data.path;
                const imgShow = document.querySelector(`#img-raffle-${data.id}`);
                if(imgShow){
                    imgShow.src = img;
                }
            }
            
            data.title = title.value;
            data.description = description.value;
            return data;
        });
        
        const itemsForm = values.filter(item => item.id != value.id); 
        setItems([...itemsForm]);

    }

    const validationsInputs = () => {
        
        if(awards.title != 'Otro lugar' && awards.description === ''){
            toast({
                title: 'Error',
                description: 'Por favor ingrese una descripción del premio no puede ir como un campo vació.',
                duration: 2000,
                status: 'error'
            })

            return false;
        }
        
        if(data.draw_date !== inputs.draw_date){
            const fecha1 = moment(data.draw_date);
            const fecha2 = moment(inputs.draw_date);

            if(!fecha2.isAfter(fecha1)){
                toast({
                    title: 'Error',
                    description: 'Por favor ingrese una fecha de sorteo mayor a la actual.',
                    duration: 2000,
                    status: 'error'
                })

                return false;
            }
        }

        if((parseInt(currentTickets) + parseInt(inputs.number_tickets)) > user.subscription.maximum_tickets){
            toast({
                title: 'Error',
                description: 'No puede ingresar mas boletos de los que le permite su plan de rifas.',
                duration: 2000,
                status: 'error'
            })

            return false;
        }

        return true;
    }
    //effects
    useEffect(() => {
        if(data !== null &&  data['id'] > 0){
            setInputs({...data});
            setImgRaffles(
                data.logo_raffles === 'logo-raffle.png' ? logoRaffle : `${credentials.server}${data.logo_raffles}`
            )

            setItems(JSON.parse(data.awards).sort((a,b) => a.id - b.id));

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
                size='full'
            >
                {/* <div className="fixed w-full h-screen top-0 left-0 bg-white/75 flex justify-center items-center" style={{zIndex: '999999'}}>
                   <span className="text-2xl font-bold"> 
                   Funcionalidad en desarrolló (Presione la tecla ESC para salir)
                    </span> 
                </div> */}
                <div className="w-10/12 m-auto">
                <Form onSubmit={handleSubmit}>
                            
                            <div className="flex xl:flex-row md:flex-row  flex-col gap-5 mt-4">
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
                                <FormControl isRequired className="">
                                    <FormLabel fontWeight={'bold'}>
                                    Escoja una fecha y hora del sorteo
                                    </FormLabel>
                                    <Input className="shadow"
                                        name="draw_date"
                                        value={inputs.draw_date}
                                        onChange={handleInput}
                                        type="datetime-local"
                                    />
                                </FormControl>
                               
                            </div>
                            <div className="flex xl:flex-row md:flex-row  flex-col gap-5 mt-4">
                                <div className="w-full md:w-1/2">
                                <FormControl  className="">
                                        <FormLabel fontWeight={'bold'}>
                                        <span className="text-md">Seleccione una imagen para su rifa (opcional)</span> 
                                        </FormLabel>
                                        <Input className="shadow"
                                            name="logo_raffles"
                                            accept="image/*"
                                            onChange={handleInput}
                                            type="file"
                                        />
                                    </FormControl>
                                </div>
                                <div className="w-full md:w-1/2 min-h-[10rem] flex justify-center items-center">
                            
                                    <img 
                                    style={{
                                        width: '17.625rem',
                                        height: '17.5rem'
                                    }}
                                    className="shadow-lg"
                                    src={imgRaffles} alt="LOGO" />

                                </div>
                            </div>
                            <div className="flex xl:flex-row md:flex-row flex-col gap-5 mt-4">
                                <FormControl isRequired className="">
                                    <FormLabel fontWeight={'bold'}>
                                    Número de tickets
                                    </FormLabel>
                                    <div className="flex items-center gap-4">
                                        <span className="shadow py-2 px-3 rounded-lg">
                                        <span className="font-bold">Boletos Actuales: </span>  
                                        <span> {inputs.number_tickets} </span>
                                        </span>
                                        <NumberInput flexGrow={1} defaultValue={15} min={1} max={50} 
                                        name="number_tickets"
                                        value={currentTickets}
                                        onInput={handleInput}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </div>
                                </FormControl>
                                <FormControl  className="">
                                    <FormLabel fontWeight={'bold'}>
                                    Porcentaje para comisiones de vendedores
                                    </FormLabel>
                                    <Select value={inputs.commission_sellers} onChange={handleSelect} name="commission_sellers"
                                    isRequired>
                                        <option value="0.00">0%</option>
                                        <option value="0.03">3%</option>
                                        <option value="0.05">5%</option>
                                        <option value="0.1">10%</option>
                                        <option value="0.15">15%</option>
                                        <option value="0.2">20%</option>
                                        <option value="0.25">25%</option>
                                        <option value="0.3">30%</option>
                                        <option value="0.35">35%</option>
                                        <option value="0.4">40%</option>
                                        <option value="0.45">45%</option>
                                        <option value="0.5">50%</option>
                                    </Select>
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
                                    Medio de transmisión de rifa
                                </FormLabel>
                                <Select value={inputs.summary} onChange={handleSelect} name="summary">
                                        <option value="Facebook Live">Facebook Live</option>
                                        <option  value="You Tube Live">You Tube Live</option>
                                        <option value="Twitch">Twitch</option>
                                        <option value="TikTok Live">TikTok Live</option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired marginTop={15}>
                        <FormLabel fontWeight={'bold'}>Registra los premios a rifarse</FormLabel>
                            {items.length > 0 && items.map((item,i) => {
                                
                                return (
                                    <Item  key={item.id} id={item.id} handleRemove={handleRemoveItem} value={item} />
                                ); 
                            })}
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
                    </FormControl>
                    </Form>
                </div>
            </AppModal>
        </>
    );
}


const Item = ({id, handleRemove,value=''}) => {
    const [img,setImg] = useState(value.path !== '' ? credentials.server + value.path : gift);
    const idElement = `item-a-${id}`;
    const title = value != '' ? value.title : '';
    const description = value != '' ? value.description : '';
    const path = value != '' ? value.path : ''

    const handleChange = (e) => {
        const img = URL.createObjectURL(e.target.files[0]);
        setImg(img)
    }

    useEffect(() => {
        document.getElementById(idElement + '-input').value = description;        
    },[value,id])
    return (
        <>
        <div data-item-content
            data-json={JSON.stringify(value)}
            id={id} data-content-items className="flex mt-2">
            <Input data-header-item
            className='shadow' width={'35%'} height={50} 
            defaultValue={title}
            />
            <Input data-header-content data-list
             id={idElement + '-input'}
             defaultValue={description}
             className='shadow w-4/5' height={50} placeholder='Por ejemplo: Audífonos Inalámbricos.'
            />
            <IconButton
            onClick={(e) =>  {
                const imgs = document.querySelectorAll('img[data-img-raffle]')
                .forEach(img => img.src = gift);
                handleRemove(e,value)
            }}
            data-parent={idElement}
            height={50} aria-label='Borrar Item' className="w-14"
            icon={<MdDelete className="w-8 h-8 text-secondary" />} />

            <FormControl borderRadius={'0.5rem'} backgroundColor={'#f1f5f9'} position={'relative'} width={'auto'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <FormLabel margin={0} padding={0} paddingRight={2} paddingLeft={2} cursor={'pointer'} >
                    <BsImage className="w-6 h-6 text-primary" />
                    <Input onChange={handleChange}
                    position={'absolute'} top={0} left={0} zIndex={-2} width={1} height={1} type="file" opacity={0} 
                    />
                </FormLabel>
            </FormControl>
            <div className="w-24 h-4">
                    <img data-img-raffle id={'img-raffle-' + id} src={img} alt="AWARD" />
            </div>
        </div>
        </>
    );

}
export default Modal;