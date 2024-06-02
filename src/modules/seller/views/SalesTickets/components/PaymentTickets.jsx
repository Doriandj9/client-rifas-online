import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useAuth } from "../../../../../app/store/app/userStore";
import { useEffect, useState } from "react";
import { FaPersonCircleCheck } from "react-icons/fa6";
import routesweb from "../../../../../app/config/routesweb";
import ModalPayment from "./ModalPayment";
import { CEDULA_REG_EXPRE, CHARACTERS_LETTERS_SPECIALS, CHARACTERS_NUMBERS_SPECIALS, DIGIT_REG_EXPRE, EMAIL_REG_EXPRE, NUMBER_REG_EXPRE } from '@app/app/utilities/validations/Expresions';


const PaymentTickets = ({openPayment, handleClosePayment, tickets, price, total, onSubmit, bankAccounts,reset= false}) => {

    const user = useAuth(state => state.user);
    const [paymentUser, setPaymentUser] = useState(true);

    const[inputs,setInputs] = useState({
        email: '',
        taxid: '',
        first_name: '',
        last_name:'',
        phone:'',
        code: '',
    });

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

        if(inputName === 'first_name' || inputName === 'last_name'){
               value = value.replace(CHARACTERS_NUMBERS_SPECIALS,'');
        }

        if(inputName === 'phone'){
            value = value.replace(CHARACTERS_LETTERS_SPECIALS,'');
            setValidations({
                ...validations,
                phone: !NUMBER_REG_EXPRE.test(value)
            })
        }
        if(inputName === 'code'){
            value = value.replace(CHARACTERS_LETTERS_SPECIALS,'');
        }
        if(inputName === 'email'){
            setValidations({
                ...validations,
                email: !EMAIL_REG_EXPRE.test(value)
            })
        }
        setInputs(
            {
                ...inputs,
                [inputName]: value,
            }
        )
        
    }

    const url = new URL(window.location.href);
    const params = url.searchParams;
    const valueP = params.get('seller_code');
    useEffect(() => {
        if(params.has('seller_code')){
            setInputs({...inputs,code: valueP});
        }
    },[]);

    useEffect(() => {
            if(reset){
                setInputs({
                    email: '',
                    taxid: '',
                    first_name: '',
                    last_name:'',
                    phone:'',
                    code: '',
                });
            }
    },[reset])
   
    return (
        <>
        <ModalPayment bankAccounts={bankAccounts} onSubmit={onSubmit} open={openPayment} handleClose={handleClosePayment} price={price} total={total} tickets={tickets} />
             <h3 className="uppercase flex gap-2 items-center mb-4">
                     <FaPersonCircleCheck className="w-8 h-8 text-primary" />
                    <span className="text-xl font-black text-primary mt-3">
                    Datos Personales
                    </span> 
                </h3>
                <div>
                        <FormControl isInvalid={validations.taxid} isRequired>
                                <FormLabel  fontWeight={'bold'}>Cédula del cliente</FormLabel>
                                <Input name='taxid'
                                 value={inputs.taxid}
                                 focusBorderColor={validations.taxid ? 'red.500' : null }
                                 _hover={validations.taxid ? 'red.500' : null}
                                 onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: 0123456789' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Nombres del cliente</FormLabel>
                                <Input name='first_name'
                                value={inputs.first_name}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: Nombre1 Nombre2' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Apellidos del cliente</FormLabel>
                                <Input name='last_name'
                               value={inputs.last_name}
                               onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: Apellido1 Apellido2' />
                            </FormControl>
                            <FormControl isInvalid={validations.email} marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Correo electrónico del cliente</FormLabel>
                                <Input name='email'
                                type="email"
                                value={inputs.email}
                                focusBorderColor={validations.email ? 'red.500' : null }
                                _hover={validations.email ? 'red.500' : null}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: ejemplo@email.com' />
                            </FormControl>
                            <FormControl isInvalid={validations.phone} marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Número telefónico del cliente</FormLabel>
                                <Input name='phone'
                                value={inputs.phone}
                                focusBorderColor={validations.phone ? 'red.500' : null }
                                _hover={validations.phone ? 'red.500' : null}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: 0901234567' />
                            </FormControl>
                            {/* <FormControl  marginTop={25} isRequired>
                                <FormLabel>
                                <Input id="terms" className='shadow' marginRight={2}  width={26} height={26} type='checkbox'>
                                </Input>
                                    Aceptar términos y condiciones
                                </FormLabel>
                                <a target="__blank" href={routesweb.terms_and_conditions}
                                 className='text-sm text-primaryop-900 mt-2'> Leer términos y condiciones  </a>
                            </FormControl> */}
                            <hr className="my-4" />
                        </div>
        </>
        
    );
}





export default PaymentTickets;