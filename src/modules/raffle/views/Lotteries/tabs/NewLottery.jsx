import Lottie from "react-lottie";
import { lottieOptions, toastConfig } from "../../../../../app/utilities/web/configs";
import presentation from '@app/assets/imgs/animations/presentation.json';
import party from '@app/assets/imgs/animations/party.json';
import { FaTicketAlt } from "react-icons/fa"; 
import { Form } from "react-router-dom";
import { FormControl, FormLabel, IconButton, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { BsImage } from "react-icons/bs";
import { FaRegImages } from "react-icons/fa6";
import { useEffect } from "react";
import AppButton from "../../../../../app/app_components/Core/AppButon";
import { MdOutlineAddCircle } from "react-icons/md";
import { fetchQuery } from "../../../../../app/utilities/web/fetchQuery";
import { useAccessToken, useAuth } from "../../../../../app/store/app/userStore";
import { credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import Loader from "../../../../../app/app_components/Core/Loader";
import moment from "moment";

const url = credentials.server + routesapi.raffles_lottery;

const NewLottery = () => {

    const accToken = useAccessToken(state => state.token);
    const user = useAuth(state => state.user);
    const[count, setCount] = useState(0);
    const[items, setItems] = useState([]);
    const [itemDelete, setItemDelete] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toast = useToast(toastConfig);

    const[inputs, setInputs] = useState({
        name: '',
        description: '',
        summary: 'Facebook',
        draw_date: '',
        logo_raffles: '',
        price: '',
        commission_sellers: '0.00',
        number_tickets: '',
        awards: '',
        time: ''
    })
    const[awards, setAwards] = useState({
        title: 'Primer lugar',
        description: '',
        img: ''
    })
    const [logoRaffles , setLogoRaffles] = useState(null);

    const verifyLogo = (file) => {

        const reader = new FileReader(); // Crear un objeto FileReader

        reader.onload = function (readerEvent) {
          const image = new Image(); // Crear un elemento de imagen
          image.src = readerEvent.target.result; // Establecer la fuente de la imagen con los datos del archivo
          
          // Esperar a que la imagen esté completamente cargada
          image.onload = function () {
            const width = this.width; // Obtener el ancho de la imagen
            const height = this.height; // Obtener la altura de la imagen
            console.log('w',width,'h',height);
            // if(width <= 554 && height <= 600){
                setLogoRaffles(file);
                return;
            // }
            // document.getElementById('img-logo').value = '';
            // toast({
            //     title: 'Error',
            //     description:`La imagen tiene que tener de ancho ${554}px y de largo ${600}px vuelva a ingresar otra imagen`,
            //     status: 'error',
            //     duration: 3500
            // });
            
          };
        };
    
        reader.readAsDataURL(file);
        
    }
    const handleInput = (e) => {
        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.name === 'logo_raffles' ?  verifyLogo(e.target.files[0]) : e.target.value,
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


    const handleSubmit =  async (e) => {
        e.preventDefault();
        if(!validations()){
            return;
        }
        const commission_sellers = document.getElementById('commission');
        setLoading(true);
        const form = new FormData();
        let dataAwards = [{id:0, title: awards.title, description: awards.description, imgId: 'award0', img: awards.img, path: ''}];
        const awardsTotal = Array.from(document.querySelectorAll('div[data-content-items]'));
        
        awardsTotal.forEach((award,i) => {
            const id = i + 1;
            const title = award.querySelector('input[data-header-item ]').value;
            const description = award.querySelector('input[data-header-content]').value;
            const img = award.querySelector('input[type=file]').files[0];
            const imgId = `award${i + 1}`;
            dataAwards.push({id,title,description,img,imgId,path: ''});
        })

        dataAwards.forEach((item,i) => {
            if(item.img){
                form.append(item.imgId, item.img);
                delete dataAwards[i]['img'];
            }
        })

        const dataInputs = {...inputs,awards: JSON.stringify(dataAwards),   
            subscription_id: user.subscription_id,
            draw_date: inputs.draw_date + ' ' + inputs.time
        };
        delete dataInputs.time;

        if(logoRaffles){
            dataInputs.logo_raffles = logoRaffles;
        }

        for(let [key,value] of Object.entries(dataInputs) ){
            form.append(key,value);
        }
        try {
            const data = await fetchQuery(accToken,url,{method: 'POST',body: form},() => {},setError);
            console.log(data);
            if(data.status){
                toast({
                    title: 'Nueva Rifa',
                    description: 'Se organizo correctamente la nueva rifa.',
                    status: 'success'
                });

                setInputs({
                    name: '',
                    description: '',
                    summary: 'Facebook',
                    draw_date: '',
                    logo_raffles: '',
                    price: '',
                    commission_sellers: '0.00',
                    number_tickets: '',
                    awards: '',
                    time: ''
                });

                setAwards({
                    title: 'Primer lugar',
                    description: '',
                    img: ''
                })
                document.querySelectorAll('input[type=file]').forEach(item => item.value = '');
                setItems([]);
                return;
            }

            toast({
                title: 'Error',
                description: data.message,
                status: 'error'
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message
            })
            
        } finally {
            setLoading(false);
        }

    }

    const handleSelect = (e) => {
        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.value
            }
        ) 
        
    }

    const validations = () => {
        
        if(inputs.number_tickets > user.subscription.maximum_tickets){
            toast({
                title: 'Error',
                description: 'No puede crear mas boletos de los que le permite su subscription',
                status: 'error',
                duration: 3000
            })
            return false;
        }
        if(!moment(inputs.draw_date + ' ' + inputs.time).isAfter(moment())){
            toast({
                title: 'Error',
                description: 'No puede ingresar un fecha de sorteo menor a la fecha de hoy',
                status: 'error',
                duration: 3000
            })
            return false;
        }

        return true;
    }

    useEffect(() => {
        if(items.length > 0){
            const itemsForm = [...items].filter((item) => item.id !== (itemDelete - 1));
            setItems(itemsForm);
        }

   },[itemDelete]);
    return (
        <>
            <Loader loading={loading} />

            <div className="xl:w-8/12 lg:w-full md:w-full m-auto">
                <header className="flex items-center justify-center gap-2">
                    <FaTicketAlt className="text-4xl text-secondary" />
                    <h2 className="italic text-2xl text-primary font-bold">Organiza una nueva rifa a tu gusto.</h2>
                </header>
                <div className="">
                <div className="">
                <Lottie options={{animationData: presentation, ...lottieOptions}}  width={150} height={150} />
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
                                    placeholder="Por ejemplo: Rifa Solidaria"
                                />
                            </FormControl>
                            <div className="flex xl:flex-row md:flex-row  flex-col gap-5 mt-4">
                                <FormControl isRequired className="">
                                    <FormLabel fontWeight={'bold'}>
                                    Escoja una fecha y hora del sorteo
                                    </FormLabel>
                                    <div className="flex gap-2 items-center flex-col">
                                        <Input className="shadow"
                                            name="draw_date"
                                            value={inputs.draw_date}
                                            onChange={handleInput}
                                            type="date"
                                        />
                                        <Input className="shadow"
                                            width={'100%'}
                                            name="time"
                                            value={inputs.time}
                                            onChange={handleInput}
                                            type="time"
                                        />
                                    </div>
                                </FormControl>
                                <FormControl  className="">
                                    <FormLabel fontWeight={'bold'}>
                                    <span className="text-sm">Seleccione una imagen para su rifa (opcional)</span> 
                                    </FormLabel>
                                    <Input className="shadow"
                                        name="logo_raffles"
                                        id="img-logo"
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
                                <FormControl isRequired  className="">
                                    <FormLabel fontWeight={'bold'}>
                                    Porcentaje para comisiones de vendedores
                                    </FormLabel>
                                    <Select onChange={handleSelect} name="commission_sellers"
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
                            <div className="mt-4 xl:w-1/4">
                            <FormControl isRequired  className="">
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
                                    Medio de transmisión de rifa
                                </FormLabel>
                                <Select onChange={handleSelect} name="summary">
                                        <option value="Facebook Live">Facebook Live</option>
                                        <option  value="You Tube Live">You Tube Live</option>
                                        <option value="Twitch">Twitch</option>
                                        <option value="TikTok Live">TikTok Live</option>
                                </Select>
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
                </div>
            </div>
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

export default NewLottery;