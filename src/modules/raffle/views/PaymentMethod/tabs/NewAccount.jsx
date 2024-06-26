import Lottie from "react-lottie";
import { lottieOptions, toastConfig } from "../../../../../app/utilities/web/configs";
import paymentMethod from '@app/assets/imgs/animations/payment-method.json';
import party from '@app/assets/imgs/animations/buy.json';
import { FaTicketAlt } from "react-icons/fa"; 
import { Form, Link } from "react-router-dom";
import { Alert, AlertIcon, Button, FormControl, FormLabel, IconButton, Input, List, ListIcon, ListItem, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { MdCheckCircle, MdDelete, MdOutlineLockReset } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { BsImage } from "react-icons/bs";
import { FaRegImages } from "react-icons/fa6";
import { useEffect } from "react";
import AppButton from "../../../../../app/app_components/Core/AppButon";
import { MdOutlineAddCircle } from "react-icons/md";
import { fetchQuery } from "../../../../../app/utilities/web/fetchQuery";
import { useAccessToken, useAuth } from "../../../../../app/store/app/userStore";
import { colors, credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import Loader from "../../../../../app/app_components/Core/Loader";
import moment from "moment";
import { MdOutlinePayments } from "react-icons/md";
import { CEDULA_REG_EXPRE, CHARACTERS_LETTERS_SPECIALS, CHARACTERS_NUMBERS_SPECIALS, DIGIT_REG_EXPRE, EMAIL_REG_EXPRE, NUMBER_REG_EXPRE } from '@app/app/utilities/validations/Expresions';
import { ImProfile } from "react-icons/im";
import { BsBank } from "react-icons/bs";
import { GoCreditCard } from "react-icons/go";
import AppModal from "../../../../../app/app_components/Core/AppModal";
import { FaCircleInfo } from "react-icons/fa6";

const url = credentials.server + routesapi.raffle_bank_accounts;

const NewAccount = () => {

    const accToken = useAccessToken(state => state.token);
    const user = useAuth(state => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const toast = useToast(toastConfig);
    const [qrImage,setQrImage] = useState('');

    const[inputs, setInputs] = useState({
        name_account:'',
        account_number: '',
        bank_name: '',
        type: '',
        qr_image: '',
        taxid: '',
    })
    const [validations,setValidations] = useState({
        taxid: false,
        phone: false,
        email: false
    })
    const handleInput = (e) => {

        let value = e.target.value;
        const inputName = e.target.name;
        if(inputName === 'taxid'){
            value = value.replace(CHARACTERS_LETTERS_SPECIALS,'');
            if(value.length > 10){
                value = value.substring(0,(value.length - 1));
            }
            setValidations({
                ...validations,
                taxid: !CEDULA_REG_EXPRE.test(value)
            })
        }

        if(inputName === 'bank_name' || inputName === 'type' || inputName === 'name_account'){
            value = value.replace(CHARACTERS_NUMBERS_SPECIALS,'');
     }
     if(inputName === 'account_number'){
        value = value.replace(CHARACTERS_LETTERS_SPECIALS,'');
     }

        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.name === 'qr_image' ?  setQrImage(e.target.files[0]) : value,
            }
        )
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            if(!validationsInputs()){
                return;
            }
            const form = new FormData();
            if(inputs.qr_image !== ''){
                form.append('qr_image', qrImage);
                delete inputs.qr_image;
            }

            for(let[key, value] of Object.entries(inputs)){
                form.append(key,value);
            }

            const data = await fetchQuery(accToken,url,{method: 'POST',body: form},() => {},setError);
            if(data.status){
                toast({
                    title: 'Nueva cuenta bancaria',
                    description: 'Se creo correctamente tu cuenta bancaria.',
                    status: 'success'
                });

                setInputs({
                    name_account:'',
                    account_number: '',
                    bank_name: '',
                    taxid: '',
                    type: '',
                    qr_image: ''
                });

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

    const validationsInputs = () => {
        
        if(user.bank_accounts.length > 0 && user.bank_accounts.some(account => account.is_account_local)){
            toast({
                title: 'Error',
                description: 'Ya dispone de una cuenta bancaria, por favor actualize los datos en la pestaña superior de  Listado de cuentas bancarias.',
                status: 'error',
                duration: 3000
            })
            return false;
        }

        return true;
    }
    return (
        <>
            <Loader loading={loading} />
            <div className="">
            <Tabs variant='unstyled'>
                <div className="flex justify-center">
                    <TabList>
                    <Tab _selected={{border: `2px solid ${colors.primaryop[900]}`,bg: colors.primaryop[50]}} sx={{border: '2px solid #ccc' , borderRadius: '.25rem'}}>
                        <div className='flex items-center gap-2 flex-col pt-1'>
                        <BsBank className='text-secondary w-5 h-5 -mt-1'  />
                        <span className="text-xs">
                            Cuenta <br /> Bancaria
                        </span> 
                        </div>
                    </Tab>
                    <Tab _selected={{border: `2px solid ${colors.primaryop[900]}`,bg: colors.primaryop[50]}} sx={{border: '2px solid #ccc' , borderRadius: '.25rem', marginLeft: '.15rem'}}>
                    <div className='flex items-center gap-2 flex-col'>
                        <GoCreditCard className='text-secondary w-6 h-6 pt-1'  />
                        <span className="text-xs">
                        Cuenta <br /> Payphone
                        </span> 
                        </div>
                    </Tab>
                    </TabList>
                </div>
                <TabPanels>
                <TabPanel >
                    <div className="xl:w-8/12 lg:w-full md:w-full m-auto">
                        {/* <header className="flex items-center justify-center gap-2">
                            <MdOutlinePayments className="text-4xl text-secondary" />
                            <h2 className="italic text-2xl text-primary font-bold">Agregue una nueva cuenta bancaria.</h2>
                        </header> */}
                        <div className="">
                        <div className="">
                        <Lottie options={{animationData: paymentMethod, ...lottieOptions}}  width={150} height={150} />
                        </div>
                            <Form onSubmit={handleSubmit}>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'bold'}>
                                        Nombre de la entidad bancaria
                                        </FormLabel>
                                        <Input className="shadow"
                                            name="bank_name"
                                            value={inputs.bank_name}
                                            onInput={handleInput}
                                            placeholder="Por ejemplo: Banco Pichincha"
                                        />
                                    </FormControl>
                                    <div className="flex items-center gap-2">

                                    <FormControl isInvalid={validations.taxid} marginTop={15} isRequired>
                                        <FormLabel fontWeight={'bold'}>
                                        Número de cédula
                                        </FormLabel>
                                        <Input className="shadow"
                                            name="taxid"
                                            value={inputs.taxid}
                                            focusBorderColor={validations.taxid ? 'red.500' : null }
                                            _hover={validations.taxid ? 'red.500' : null}
                                            onInput={handleInput}
                                            placeholder="Por ejemplo: 0123456789"
                                        />
                                    </FormControl>

                                    <FormControl marginTop={15} isRequired>
                                        <FormLabel fontWeight={'bold'}>
                                        Nombre de la cuenta
                                        </FormLabel>
                                        <Input className="shadow"
                                            name="name_account"
                                            value={inputs.name_account}
                                            onInput={handleInput}
                                            placeholder="Por ejemplo: Pedro Jose Perez Aldaz"
                                        />
                                    </FormControl>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FormControl marginTop={15} isRequired>
                                            <FormLabel fontWeight={'bold'}>
                                            Número de la cuenta
                                            </FormLabel>
                                            <Input className="shadow"
                                                name="account_number"
                                                value={inputs.account_number}
                                                onInput={handleInput}
                                                placeholder="Por ejemplo: 2254887464"
                                            />
                                        </FormControl>
                                        <FormControl marginTop={15} isRequired>
                                            <FormLabel fontWeight={'bold'}>
                                            Tipo de cuenta
                                            </FormLabel>
                                            <Input className="shadow"
                                                name="type"
                                                value={inputs.type}
                                                onInput={handleInput}
                                                placeholder="Por ejemplo: Ahorros"
                                            />
                                        </FormControl>
                                    </div>
                                    <FormControl marginTop={15} className="">
                                            <FormLabel fontWeight={'bold'}>
                                            <span className="text-sm">Seleccione la imagen QR de pago </span> 
                                            </FormLabel>
                                            <Input className="shadow"
                                                name="qr_image"
                                                accept="image/*"
                                                onChange={handleInput}
                                                type="file"
                                            />
                                        </FormControl>
                                    
                                    <AppButton className="mt-5" type="submit" leftIcon={<MdOutlineAddCircle className="text-xl" />}>
                                            Agregar Cuenta Bancaria
                                    </AppButton>
                            </Form>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <AccountPayphone />
                </TabPanel>
                </TabPanels>
            </Tabs>
            </div>
        </>
    );
}


const AccountPayphone = () => {
    const accToken = useAccessToken(state => state.token);
    const user = useAuth(state => state.user);
    const [open, setOpen] = useState(false);
    const toast = useToast(toastConfig);
    const [validations,setValidations] = useState({
        taxid: false,
        phone: false,
        email: false
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const[inputs, setInputs] = useState({
        name_account:'',
        account_number: '',
        taxid: '',
    })
    const handleInput = (e) => {

        let value = e.target.value;
        const inputName = e.target.name;
        if(inputName === 'taxid'){
            value = value.replace(CHARACTERS_LETTERS_SPECIALS,'');
            if(value.length > 10){
                value = value.substring(0,(value.length - 1));
            }
            setValidations({
                ...validations,
                taxid: !CEDULA_REG_EXPRE.test(value)
            })
        }

        if(inputName === 'bank_name' || inputName === 'type' || inputName === 'name_account'){
            value = value.replace(CHARACTERS_NUMBERS_SPECIALS,'');
     }
     if(inputName === 'account_number'){
        value = value.replace(CHARACTERS_LETTERS_SPECIALS,'');
        if(value.length > 10){
            value = value.substring(0,(value.length - 1));
        }
     }

        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.name === 'qr_image' ?  setQrImage(e.target.files[0]) : value,
            }
        )
    }
    const handleSubmit =  async (e) => {
        e.preventDefault();
       
        try {
            const form = new FormData();

            for(let[key, value] of Object.entries(inputs)){
                form.append(key,value);
            }

            form.append('bank_name','Payphone');
            form.append('type','Payphone');
            form.append('is_account_local',false);

            const data = await fetchQuery(accToken,url,{method: 'POST',body: form},() => {},setError);
            if(data.status){
                toast({
                    title: 'Nueva cuenta Payphone',
                    description: 'Se creo correctamente tu cuenta Payphone.',
                    status: 'success'
                });

                setInputs({
                    name_account:'',
                    account_number: '',
                    bank_name: '',
                    taxid: '',
                    type: '',
                    qr_image: ''
                });

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
                description: error.message,
                status: 'error'
            })
            
        } finally {
            setLoading(false);
        }

    }
    return (<>
        <AppModal 
        size="6xl"
        header={
            <>
            <div className="flex gap-2">
                <FaCircleInfo className="text-primary w-6 h-6" />
                <h3>Como funciona la cuenta payphone</h3>
            </div>
            </>
        }
        isOpen={open}
        onClose={() => setOpen(false)}
        buttons={<>
            <Button onClick={() => setOpen(false)}  colorScheme="blue">Regresar</Button>
        </>}
        >
            <p>
                <strong>Para que sirve la cuenta Payphone</strong>.<br />
                Con esta opción los clientes pueden adquirir tus boletos por medio de una tarjeta de crédito o débito de forma segura. 
            </p>
            <p>
                <strong>Como funciona:</strong>
                <List spacing={3} sx={{marginLeft: '1rem'}}>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        Regístrate en la pagina oficial de 
                        <strong> <Link target="__blank" to="https://www.payphone.app/">Payphone</Link> </strong>
                    </ListItem>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        Ingresa el número de tu celular como cuenta payphone.
                    </ListItem>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        Se habilitara la opción para que las ventas de tus boletos se realicen por medio de la tarjeta.
                    </ListItem>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        Ese saldo de las ventas se van acumulando en la plataforma de forma segura y confiable.
                    </ListItem>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        Una vez tu 
                        decidas retirar esos fondos, debes realizar la solicitud de extracción del monto de las ventas en el apartado <strong className="">Ingresos </strong>.
                    </ListItem>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        Se mostraran todas tus rifas con sus respectivos saldos,
                        debes dar click en retiro, en menos de 24 horas se realizara el pago del monto las  
                        ventas a tu cuenta payphone.
                    </ListItem>
                    
                    
                </List>
            </p>
            <h4 className="text-2xl bold text-primary text-center mt-4 italic">Video de referencia</h4>

        </AppModal>
        <Alert status='warning'>
            <AlertIcon />
            <div>
                Para ingresar una cuenta <strong>Payphone</strong>, primero debes crearla en la plataforma oficial (<a target="__blank" className="text-primary italic underline" href="https://www.payphone.app/">Ingresar</a>) 
                 una vez que tenga su cuenta registrada puede ingresar su número telefónico el mismo que suministro al momento de crear la cuenta de payphone. 
                 <br />
                 <span onClick={() => setOpen(true)} className="text-primary cursor-pointer">Conocer más</span>
            </div>
        </Alert>
        <div className="xl:w-8/12 lg:w-full md:w-full m-auto">
    
        <div>
            <Lottie options={{animationData: paymentMethod, ...lottieOptions}}  width={150} height={150} />
        </div>
        <div>
            <Form onSubmit={handleSubmit}>
            <FormControl isRequired>
                    <FormLabel fontWeight={'bold'}>
                        Nombre completo del propietario de la cuenta payphone
                        </FormLabel>
                        <Input className="shadow"
                            name="name_account"
                            value={inputs.name_account}
                            onInput={handleInput}
                            placeholder="Por ejemplo: Apellido1 Apellido2 Nombre1 Nombre2"
                                        />
                    </FormControl>
                    <div className="flex items-center gap-2">

                    <FormControl marginTop={15} isRequired>
                        <FormLabel fontWeight={'bold'}>
                                Número de celular <span className="text-xs">(El mismo que ingreso en Payphone)</span>
                        </FormLabel>
                        <Input className="shadow"
                            name="account_number"
                            value={inputs.account_number}
                            onInput={handleInput}
                            placeholder="Por ejemplo: 0912345678"
                        />
                                        </FormControl>

                        <FormControl isInvalid={validations.taxid} marginTop={15} isRequired>
                            <FormLabel fontWeight={'bold'}>
                                Número de cédula
                            </FormLabel>
                            <Input className="shadow"
                            name="taxid"
                            value={inputs.taxid}
                            focusBorderColor={validations.taxid ? 'red.500' : null }
                            _hover={validations.taxid ? 'red.500' : null}
                            onInput={handleInput}
                            placeholder="Por ejemplo: 0123456789"
                            />
                            </FormControl>
                    </div>
                    <div className="flex justify-center">
                        <AppButton className="mt-5" type="submit" leftIcon={<MdOutlineAddCircle className="text-xl" />}>
                            Agregar Cuenta Payphone
                        </AppButton>
                    </div>
            </Form>
        </div>
        </div>
    </>);
}

export default NewAccount;