import Lottie from "react-lottie";
import { lottieOptions, toastConfig } from "../../../../../app/utilities/web/configs";
import paymentMethod from '@app/assets/imgs/animations/payment-method.json';
import party from '@app/assets/imgs/animations/buy.json';
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
import { MdOutlinePayments } from "react-icons/md";
import { CEDULA_REG_EXPRE, CHARACTERS_LETTERS_SPECIALS, CHARACTERS_NUMBERS_SPECIALS, DIGIT_REG_EXPRE, EMAIL_REG_EXPRE, NUMBER_REG_EXPRE } from '@app/app/utilities/validations/Expresions';


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
                description: error
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

            <div className="xl:w-8/12 lg:w-full md:w-full m-auto">
                <header className="flex items-center justify-center gap-2">
                    <MdOutlinePayments className="text-4xl text-secondary" />
                    <h2 className="italic text-2xl text-primary font-bold">Agregue una nueva cuenta bancaria.</h2>
                </header>
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

export default NewAccount;