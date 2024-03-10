import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useAuth } from "../../../../../app/store/app/userStore";
import { useState } from "react";
import { FaPersonCircleCheck } from "react-icons/fa6";
import routesweb from "../../../../../app/config/routesweb";
import ModalPayment from "./ModalPayment";
import { CEDULA_REG_EXPRE, CHARACTERS_LETTERS_SPECIALS, CHARACTERS_NUMBERS_SPECIALS, DIGIT_REG_EXPRE, EMAIL_REG_EXPRE, NUMBER_REG_EXPRE } from '@app/app/utilities/validations/Expresions';


const PaymentTickets = ({openPayment, handleClosePayment, tickets, price, total, onSubmit, bankAccounts}) => {

    const user = useAuth(state => state.user);
    const [paymentUser, setPaymentUser] = useState(true);
   
    return (
        <>
        {user && paymentUser ? <PaymentAuth user={user}  setPaymentUser={setPaymentUser} /> : <PaymentNotAuth />}
        <ModalPayment bankAccounts={bankAccounts} onSubmit={onSubmit} open={openPayment} handleClose={handleClosePayment} price={price} total={total} tickets={tickets} />
        </>
        
    );
}


const PaymentAuth = ({user, setPaymentUser}) => {

    const handlePaymentYes = () => {
        setPaymentUser(true)
    }
    const handlePaymentNot = () => {
        setPaymentUser(false);
    }

    return (
        <>
           <article>
           <h3 className="uppercase flex gap-2 items-center mb-4">
                     <FaPersonCircleCheck className="w-8 h-8 text-primary" />
                    <span className="text-xl font-black text-primary mt-3">
                    Datos Personales
                    </span> 
                </h3>
                <section>
                    <h4 className="text-primary text-xl font-bold">Quieres comprar tus boletos como:
                    <br /> <span className="italic text-primaryop-900"> {user.first_name} {user.last_name} </span></h4>
                    <ul>
                        <li className="text-lg text-primary"><span className="font-bold">CI:</span> <span> {user.taxid.substring(0, user.taxid.length - 3)}xxx </span> </li>
                        <li className="text-lg text-primary"><span className="font-bold">Teléfono:</span> <span> {user.phone.substring(0, user.phone.length - 3)}xxx </span> </li>
                    </ul>
                </section>
                <div className="mt-2 text-start gap-2">
                    <Button type="button" onClick={handlePaymentNot}
                    className="mr-4" colorScheme="red">
                        NO
                    </Button>
                    {/* <Button onClick={handlePaymentYes}
                    type="button" colorScheme="blue">
                        SI          
                    </Button> */}
                </div>
           </article>
           <hr className="my-4" />
        </>
    );
}


const PaymentNotAuth = () => {
    const[inputs,setInputs] = useState({
        email: '',
        taxid: '',
        first_name: '',
        last_name:'',
        phone:'',
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

    return (
        <>
                <h3 className="uppercase flex gap-2 items-center mb-4">
                     <FaPersonCircleCheck className="w-8 h-8 text-primary" />
                    <span className="text-xl font-black text-primary mt-3">
                    Datos Personales
                    </span> 
                </h3>
                <div>
                        <FormControl isInvalid={validations.taxid} isRequired>
                                <FormLabel  fontWeight={'bold'}>Cédula</FormLabel>
                                <Input name='taxid'
                                 value={inputs.taxid}
                                 focusBorderColor={validations.taxid ? 'red.500' : null }
                                 _hover={validations.taxid ? 'red.500' : null}
                                 onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: 0123456789' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Nombres</FormLabel>
                                <Input name='first_name'
                                value={inputs.first_name}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: Nombre1 Nombre2' />
                            </FormControl>
                            <FormControl marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Apellidos</FormLabel>
                                <Input name='last_name'
                               value={inputs.last_name}
                               onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: Apellido1 Apellido2' />
                            </FormControl>
                            <FormControl isInvalid={validations.email} marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Correo electrónico</FormLabel>
                                <Input name='email'
                                type="email"
                                value={inputs.email}
                                focusBorderColor={validations.email ? 'red.500' : null }
                                _hover={validations.email ? 'red.500' : null}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: ejemplo@email.com' />
                            </FormControl>
                            <FormControl isInvalid={validations.phone} marginTop={15} isRequired>
                                <FormLabel fontWeight={'bold'}>Número Telefónico</FormLabel>
                                <Input name='phone'
                                value={inputs.phone}
                                focusBorderColor={validations.phone ? 'red.500' : null }
                                _hover={validations.phone ? 'red.500' : null}
                                onInput={handleInput}
                                 className='shadow' height={50} placeholder='Por ejemplo: 0901234567' />
                            </FormControl>
                            <FormControl  marginTop={25} isRequired>
                                <FormLabel>
                                <Input id="terms" className='shadow' marginRight={2}  width={26} height={26} type='checkbox'>
                                </Input>
                                    Aceptar términos y condiciones
                                </FormLabel>
                                <a target="__blank" href={routesweb.terms_and_conditions}
                                 className='text-sm text-primaryop-900 mt-2'> Leer términos y condiciones  </a>
                            </FormControl>
                            <hr className="my-4" />
                        </div>
        </>
    );
}

export default PaymentTickets;